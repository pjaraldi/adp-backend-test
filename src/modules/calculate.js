function calculate(left, operation, right) {
	// Check if parameters were provided
	if (
		typeof left === "undefined" ||
		typeof operation === "undefined" ||
		typeof right === "undefined"
	)
		throw new Error(
			"ERROR: Equation parameters were not provided to calculate.",
		);

	// Check if is a division by zero
	if (operation === "division" && right === 0)
		throw new Error("ERROR: Division by zero requested.");

	if (operation === "addition") return left + right;
	if (operation === "subtraction") return left - right;
	if (operation === "multiplication") return left * right;
	if (operation === "division") return left / right;
	if (operation === "remainder") return left % right;

	throw new Error("ERROR: Invalid math operation requested.");
}

exports.calculate = calculate;
