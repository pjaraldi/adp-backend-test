/* eslint-disable no-undef */
const { main } = require("./main");
const { ApiHandeler } = require("./modules/ApiHandler");

// Mock function for "ApiHandeler.get()"
function MockApiHandelerGetMethod(returnedObj) {
	jest.spyOn(ApiHandeler, "get").mockImplementation(() => returnedObj);
}

// Mock function for "ApiHandeler.post()"
function MockApiHandelerPostMethod(returnedObj) {
	jest.spyOn(ApiHandeler, "post").mockImplementation(() => returnedObj);
}

// // Disable "console.log", "console.error" and "console.info" before each test
beforeEach(() => {
	jest.spyOn(console, "log").mockImplementation(() => {});
	jest.spyOn(console, "error").mockImplementation(() => {});
	jest.spyOn(console, "info").mockImplementation(() => {});
});

// Clear the mock after each test
afterEach(() => jest.clearAllMocks());

describe("INTEGRATION TEST", () => {
	it("should be a sucess: The result was posted", async() => {
		MockApiHandelerGetMethod({
			data: { id: "01", operation: "multiplication", left: 2, right: 2 },
			status: 200,
		});

		MockApiHandelerPostMethod({ status: 200 });

		const spyGet = jest.spyOn(ApiHandeler, "get");
		const spyPost = jest.spyOn(ApiHandeler, "get");
		const spyInfo = jest.spyOn(console, "info");

		await main();

		// Expect to be to called 1 time
		expect(spyGet).toHaveBeenCalledTimes(1);
		expect(spyPost).toHaveBeenCalledTimes(1);
		expect(spyInfo).toHaveBeenCalledTimes(1);

		// Expect success message
		expect(spyInfo).toHaveBeenCalledWith("SUCCESS: The result was posted.");
	});
});

describe("TEST EXPECTED ERROR", () => {
	it("should be an error when get response status is not between 200 and 299: The get response was not successful.", async() => {
		MockApiHandelerGetMethod({
			data: { id: "01", operation: "multiplication", left: 2, right: 2 },
			status: 404,
		});

		const spy = jest.spyOn(console, "error");
		await main();
		expect(spy).toHaveBeenCalledWith("ERROR: The get response was not successful.");
	});

	it("should be an error when get response does not contain 'data': The get response was not successful.", async() => {
		MockApiHandelerGetMethod({
			status: 200
		});

		const spy = jest.spyOn(console, "error");
		await main();
		expect(spy).toHaveBeenCalledWith("ERROR: The necessary data does not exist.");
	});

	it("should be an error when get response does not contain 'data.id': The get response was not successful.", async() => {
		MockApiHandelerGetMethod({
			data: { operation: "multiplication", left: 2, right: 2 },
			status: 200
		});

		const spy = jest.spyOn(console, "error");
		await main();
		expect(spy).toHaveBeenCalledWith("ERROR: The necessary data does not exist.");
	});

	it("should be an error when post response status is 404: The result was NOT posted.", async() => {
		MockApiHandelerGetMethod({
			data: { id: "01", operation: "multiplication", left: 2, right: 2 },
			status: 200,
		});

		MockApiHandelerPostMethod({ status: 404 });

		const spy = jest.spyOn(console, "error");
		await main();
		expect(spy).toHaveBeenCalledWith("ERROR (404): The result was NOT posted.");
	});
});
