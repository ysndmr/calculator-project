$(document).ready(function () {
    class Calculator {
        constructor() {
            this.display = $('#current-operand');
            this.deleteButton = $('button[data-value="del"]');
            this.operationButtons = this.getOperationButtons();
            this.currentOperand = '0';
            this.memory = 0;

            this.initialize();
        }

        initialize() {
            this.attachEventHandlers();
            this.updateDisplay();
            this.toggleButtons();
        }

        getOperationButtons() {
            return $('button[data-value="+"], button[data-value="-"], button[data-value="/"], button[data-value="*"], button[data-value="%"], button[data-value="="], button[data-value="sin"], button[data-value="cos"], button[data-value="tan"], button[data-value="M+"], button[data-value="MR"], button[data-value="MC"]');
        }

        attachEventHandlers() {
            $('#buttons').on('click', 'button', (event) => this.handleButtonClick(event));
        }

        handleButtonClick(event) {
            const button = $(event.target).closest('button');
            const value = this.sanitizeInput(button.data('value'));

            if (this.isDigit(value)) {
                this.appendDigit(value);
            } else {
                this.handleOperation(value);
            }

            this.updateDisplay();
            this.toggleButtons();
        }

        sanitizeInput(value) {
            // Simple input sanitization example
            return String(value).replace(/[^\w.]/gi, '');
        }

        isDigit(value) {
            return !isNaN(value) || value === '.';
        }

        handleOperation(value) {
            const operations = {
                'C': this.clear,
                'M+': this.addToMemory,
                'MR': this.recallMemory,
                'MC': this.clearMemory,
                'del': this.deleteLastDigit,
                '%': this.calculatePercentage,
                '=': this.evaluate,
                'sin': this.applyTrigonometricFunction,
                'cos': this.applyTrigonometricFunction,
                'tan': this.applyTrigonometricFunction
            };

            if (operations[value]) {
                operations[value].call(this, value);
            }
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
            if (this.currentOperand === '0' && digit !== '.') {
                this.currentOperand = digit.toString();
            } else {
                this.currentOperand += digit.toString();
            }
        }

        updateDisplay() {
            this.display.val(this.currentOperand);
        }

        toggleButtons() {
            const isOperandEmpty = this.currentOperand === '0';
            this.operationButtons.prop('disabled', isOperandEmpty);
            this.deleteButton.prop('disabled', !(this.currentOperand.length > 1 || this.currentOperand !== '0'));
        }
    }

    new Calculator();
});
