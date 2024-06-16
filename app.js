/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/

/*------------------------ Cached Element References ------------------------*/

/*----------------------------- Event Listeners -----------------------------*/

/*-------------------------------- Functions --------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    let currentInput = '';
    let firstOperand = null;
    let operator = null;
    let secondOperand = null;
  
    const buttons = document.querySelectorAll('.button');
  
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const buttonText = button.innerText;
  
        if (button.classList.contains('number')) {
          handleNumberClick(buttonText);
        } else if (button.classList.contains('operator') && buttonText !== 'C'){
          handleOperatorClick(buttonText);
        } else if (button.classList.contains('clear')) {
          clearDisplay();
        } else if (button.classList.contains('equals')) {
          handleEqualsClick();
        }
  
        updateDisplay();
      });
    });
  
    function handleNumberClick(number) {
      currentInput += number;
    }
  
    function handleOperatorClick(op) {
      if (currentInput !== '') {
        if (firstOperand === null) {
          firstOperand = parseFloat(currentInput);

          // only first call of operand enters here
        //   console.log("firstOperand", firstOperand)
          operator = op;
          currentInput = '';
          } else if (firstOperand !== null && operator !== null && currentInput !== '') {
            secondOperand = parseFloat(currentInput);
            // console.log("secondOperand", secondOperand)
            const result = calculate(firstOperand, operator, secondOperand);
            // console.log("result", result)
            
            // using operation will get us correct result, but when pressing on "=", everything goes invalid
            firstOperand = result;
            operator = op;
            // secondOperand = null;
            currentInput = '';


        }
      }
    }
  
    function handleEqualsClick() {
        if (firstOperand !== null && operator !== null && currentInput !== '') {
            secondOperand = parseFloat(currentInput);
            // console.log("firstOperand", firstOperand)
            // console.log("secondOperand", secondOperand)
            const result = calculate(firstOperand, operator, secondOperand);
            // console.log("result", result)
            currentInput = result.toString();
            firstOperand = null
            operator = null;
            secondOperand = null;
        }
    }
  
    function calculate(num1, op, num2) {
      switch (op) {
        case '+':
          return num1 + num2;
        case '-':
          return num1 - num2;
        case '*':
          return num1 * num2;
        case '/':
          if (num2 === 0) {
            return 'Error';
          }
          return num1 / num2;
        default:
          return 'Error';
      }
    }
  
    function clearDisplay() {
      currentInput = '';
      firstOperand = null;
      operator = null;
      secondOperand = null;
    }
  
    function updateDisplay() {
      display.innerText = currentInput;
    }
  });
  