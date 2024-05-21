$(document).ready(function () {
    // Calculator class to encapsulate all functionality
    class Calculator {
        constructor() {
            // Initializing properties
            this.display = $('#current-operand');
            this.deleteButton = $('button[data-value="del"]');
            this.currentOperand = '0';
            this.memory = 0;

            // Initialize the calculator
            this.initialize();
        }

        // Initialize method to set up event handlers and initial state
        initialize() {
            this.attachEventHandlers();
            this.updateDisplay();
            this.toggleDeleteButton();
        }

        // Attach event handlers for button clicks
        attachEventHandlers() {
            $('#buttons').on('click', 'button', (event) => this.handleButtonClick(event));
        }

        // Handle button click events
        handleButtonClick(event) {
            const button = $(event.target).closest('button');
            const value = button.data('value');

            // Determine action based on button value
            switch (value) {
                case 'C':
                    this.clear();
                    break;
                case 'M+':
                    this.addToMemory();
                    break;
                case 'MR':
                    this.recallMemory();
                    break;
                case 'MC':
                    this.clearMemory();
                    break;
                case 'del':
                    this.deleteLastDigit();
                    break;
                case '%':
                    this.calculatePercentage();
                    break;
                case '=':
                    this.evaluate();
                    break;
                case 'sin':
                case 'cos':
                case 'tan':
                    this.applyTrigonometricFunction(value);
                    break;
                default:
                    this.appendDigit(value);
            }

            // Update display and toggle delete button state
            this.updateDisplay();
            this.toggleDeleteButton();
        }

        // Clear the current operand
        clear() {
            this.currentOperand = '0';
        }

        // Add the current operand to memory
        addToMemory() {
            this.memory += parseFloat(this.currentOperand) || 0;
        }

        // Recall the memory value
        recallMemory() {
            this.currentOperand = this.memory.toString();
        }

        // Clear memory and current operand
        clearMemory() {
            this.memory = 0;
            this.clear();
        }

        // Delete the last digit of the current operand
        deleteLastDigit() {
            if (this.currentOperand.length > 1) {
                this.currentOperand = this.currentOperand.slice(0, -1);
            } else {
                this.clear();
            }
        }

        // Calculate percentage of the current operand
        calculatePercentage() {
            this.currentOperand = (parseFloat(this.currentOperand) / 100).toString();
        }

        // Evaluate the current expression
        evaluate() {
            try {
                this.currentOperand = this.evaluateExpression(this.currentOperand).toString();
            } catch {
                this.currentOperand = 'Error';
            }
        }

        // Evaluate mathematical expression
        evaluateExpression(expression) {
            return Function(`'use strict'; return (${expression})`)();
        }

        // Apply trigonometric functions
        applyTrigonometricFunction(func) {
            const value = parseFloat(this.currentOperand);
            const trigFunctions = {
                'sin': Math.sin,
                'cos': Math.cos,
                'tan': Math.tan
            };
            this.currentOperand = trigFunctions[func](value).toString();
        }

        // Append a digit or operator to the current operand
        appendDigit(digit) {
            if (this.currentOperand === '0') {
                this.currentOperand = digit.toString();
            } else {
                this.currentOperand += digit.toString();
            }
        }

        // Update the display with the current operand
        updateDisplay() {
            this.display.val(this.currentOperand);
        }

        // Toggle the state of the delete button
        toggleDeleteButton() {
            this.deleteButton.prop('disabled', !(this.currentOperand.length > 1 || this.currentOperand !== '0'));
        }
    }

    // Instantiate the Calculator class
    new Calculator();
});
