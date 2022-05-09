/* eslint-disable no-console */
const { ApiHandeler } = require("./modules/ApiHandler");
const { calculate } = require("./modules/calculate");
const { logSeparatorLine, logBlankLine } = require("./modules/util");
const config = require("./config.json");

let counter = 0;

async function main() {
	counter += 1;

	try {
		// Log a header to inform execution number
		logSeparatorLine();
		console.log(`${counter} EXECUTION`);
		logSeparatorLine();
		logBlankLine();

		// Log to inform
		console.log("Getting data...");
		logBlankLine();

		// Get the data
		const { status: getStatus, data } = await ApiHandeler.get(
			config.getURL
		);

		// Check if the get response was successful
		if (!(getStatus >= 200 && getStatus < 300))
			throw new Error("ERROR: The get response was not successful.");

		// Check if the necessary data exists
		if (
			!data ||
			!(data.id && data.operation && data.left && data.left && data.right)
		)
			throw new Error("ERROR: The necessary data does not exist.");

		// Log the retrieved data formatted
		console.log(`ID:        ${data.id}`);
		console.log(`OPERATION: ${data.operation}`);
		console.log(`LEFT:      ${data.left}`);
		console.log(`RIGHT:     ${data.right}`);
		logBlankLine();

		// Log to inform
		console.log("Calculation...");
		logBlankLine();

		// Solve the math equation
		const result = calculate(
			Number(data.left),
			data.operation,
			Number(data.right)
		);

		// Log the math equation result
		console.log(`RESULT: ${result}`);
		logBlankLine();

		// Log to inform
		console.log("Posting the result...");
		logBlankLine();

		// Post the result
		const postData = { id: data.id, result };
		const { status: postStatus } = await ApiHandeler.post(
			config.postURL,
			postData
		);

		// Log the post result (success message or error message)
		if (postStatus >= 200 && postStatus < 300)
			console.info("SUCCESS: The result was posted.");
		else
			throw new Error(
				`ERROR (${postStatus}): The result was NOT posted.`
			);

		logBlankLine();
	} catch (error) {
		console.error(error.message);
	}
}

exports.main = main;
