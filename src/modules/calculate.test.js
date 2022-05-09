/* eslint-disable no-undef */
const { calculate } = require("./calculate");

describe("TEST POSITIVE INTEGERS", () => {
	it("should be 10: 4 + 6", () => {
		expect(calculate(4, "addition", 6)).toBe(10);
	});

	it("should be 14: 22 - 8", () => {
		expect(calculate(22, "subtraction", 8)).toBe(14);
	});

	it("should be 8: 2 * 4", () => {
		expect(calculate(2, "multiplication", 4)).toBe(8);
	});

	it("should be 12: 24 / 2", () => {
		expect(calculate(24, "division", 2)).toBe(12);
	});

	it("should be 1: 3 % 2", () => {
		expect(calculate(3, "remainder", 2)).toBe(1);
	});
});

describe("TEST NEGATIVE INTEGERS", () => {
	it("should be -1: -3 + 2", () => {
		expect(calculate(-3, "addition", 2)).toBe(-1);
	});

	it("should be 8: 2 - (-6)", () => {
		expect(calculate(2, "subtraction", -6)).toBe(8);
	});

	it("should be -4: -1 * 4", () => {
		expect(calculate(-1, "multiplication", 4)).toBe(-4);
	});

	it("should be -6: 24 / -4", () => {
		expect(calculate(24, "division", -4)).toBe(-6);
	});

	it("should be -1: -10 % 3", () => {
		expect(calculate(-10, "remainder", 3)).toBe(-1);
	});
});

describe("TEST NON-INTEGERS", () => {
	it("should be 1.08333: 0.75 + 0.33333", () => {
		expect(calculate(0.75, "addition", 0.33333)).toBeCloseTo(1.08333);
	});

	it("should be 22.6366: 23.76 - 1.1234", () => {
		expect(calculate(23.76, "subtraction", 1.1234)).toBeCloseTo(22.6366);
	});

	it("should be -0.34443: -0.45 * 0.7654", () => {
		expect(calculate(-0.45, "multiplication", 0.7654)).toBeCloseTo(
			-0.34443,
		);
	});

	it("should be -102.363341151: 56.74 / -0.5543", () => {
		expect(calculate(56.74, "division", -0.5543)).toBeCloseTo(
			-102.363341151,
		);
	});

	it("should be -0.08330000000000004: 0.4433 % -0.12", () => {
		expect(calculate(0.4433, "remainder", -0.12)).toBeCloseTo(
			0.08330000000000004,
		);
	});
});

describe("TEST EXPECTED ERROR", () => {
	it("should be an error when there is no parameters: Equation parameters were not provided to calculate.", () => {
		expect(() => calculate()).toThrow(
			"ERROR: Equation parameters were not provided to calculate."
		);
	});

	it("should be an error when there is 1 parameter: Equation parameters were not provided to calculate.", () => {
		expect(() => calculate(4)).toThrow(
			"ERROR: Equation parameters were not provided to calculate."
		);
	});

	it("should be an error when there is 2 parameters: Equation parameters were not provided to calculate.", () => {
		expect(() => calculate(4, "multiplication")).toThrow(
			"ERROR: Equation parameters were not provided to calculate."
		);
	});

	it("should be an error when right parameter is 0 in a division: Division by zero requested.", () => {
		expect(() => calculate(30, "division", 0)).toThrow(
			"ERROR: Division by zero requested."
		);
	});

	it("should be an error when a invalid operation is passed: Invalid math operation requested..", () => {
		expect(() => calculate(4, null, 8)).toThrow(
			"ERROR: Invalid math operation requested."
		);
	});
});
