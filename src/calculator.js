$(document).ready(function () {
    class Calculator {
        constructor() {
            this.display = $('#current-operand');
            this.deleteButton = $('button[data-value="del"]');
            this.currentOperand = '0';
            this.memory = 0;

            this.initialize();
        }

        initialize() {
            this.attachEventHandlers();
            this.updateDisplay();
            this.toggleDeleteButton();
        }

        attachEventHandlers() {
            $('#buttons').on('click', 'button', (event) => this.handleButtonClick(event));
        }

        handleButtonClick(event) {
            const button = $(event.target).closest('button');
            const value = button.data('value');

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

            this.updateDisplay();
            this.toggleDeleteButton();
        }

        clear() {
            this.currentOperand = '0';
        }

        addToMemory() {
            this.memory += parseFloat(this.currentOperand) || 0;
        }

        recallMemory() {
            this.currentOperand = this.memory.toString();
        }

        clearMemory() {
            this.memory = 0;
            this.clear();
        }

        deleteLastDigit() {
            if (this.currentOperand.length > 1) {
                this.currentOperand = this.currentOperand.slice(0, -1);
            } else {
                this.clear();
            }
        }

        calculatePercentage() {
            this.currentOperand = (parseFloat(this.currentOperand) / 100).toString();
        }

        evaluate() {
            try {
                this.currentOperand = this.evaluateExpression(this.currentOperand).toString();
            } catch {
                this.currentOperand = 'Error';
            }
        }

        evaluateExpression(expression) {
            return Function(`'use strict'; return (${expression})`)();
        }

        applyTrigonometricFunction(func) {
            const value = parseFloat(this.currentOperand);
            const trigFunctions = {
                'sin': Math.sin,
                'cos': Math.cos,
                'tan': Math.tan
            };
            this.currentOperand = trigFunctions[func](value).toString();
        }

        appendDigit(digit) {
            if (this.currentOperand === '0') {
                this.currentOperand = digit.toString();
            } else {
                this.currentOperand += digit.toString();
            }
        }

        updateDisplay() {
            this.display.val(this.currentOperand);
        }

        toggleDeleteButton() {
            this.deleteButton.prop('disabled', !(this.currentOperand.length > 1 || this.currentOperand !== '0'));
        }
    }

    new Calculator();
});
