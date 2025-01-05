let display = document.getElementById("display");
let toggleState = true; // Keeps track of the toggle state for brackets

function clearDisplay() {
  display.textContent = "0";
}

function backspace() {
  // Remove the last character, or reset to 0 if empty
  display.textContent = display.textContent.slice(0, -1) || "0";
}

function appendNumber(number) {
  // If the display shows 0 or is reset, replace it with the number
  if (display.textContent === "0" || display.textContent === "Error") {
    display.textContent = number;
  } else {
    display.textContent += number; // Append the number to the display
  }
}

function appendOperator(operator) {
  // Prevent adding an operator after an operator
  const lastChar = display.textContent.slice(-1);
  if (["+", "-", "*", "/"].includes(lastChar)) {
    return; // Do nothing if the last character is already an operator
  }
  display.textContent += operator;
}

function toggleBracket() {
  // Toggle between '(' and ')'
  display.textContent += toggleState ? "(" : ")";
  toggleState = !toggleState;
}

function calculateResult() {
  try {
    // Replace `÷` with `/` and `×` with `*`
    let expression = display.textContent
      .replace(/÷/g, "/")
      .replace(/×/g, "*");
    
    // Validate the expression to avoid invalid calculations
    if (expression.includes("undefined") || expression.includes("NaN")) {
      throw new Error("Invalid expression");
    }

    // Evaluate the expression and update the display
    let result = eval(expression); 

    // Check for result errors (like division by zero)
    if (!isFinite(result)) {
      throw new Error("Math error");
    }

    display.textContent = result.toString();
  } catch (error) {
    display.textContent = "Error"; // Display an error message if something goes wrong
  }
}
