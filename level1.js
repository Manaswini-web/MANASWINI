document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    let currentInput = '0';
    let previousInput = '';
    let operator = null;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            
            if (value === 'C') {
                currentInput = '0';
                previousInput = '';
                operator = null;
                display.innerText = currentInput;
                return;
            }

            if (value === '=') {
                if (previousInput !== '' && operator !== null) {
                    currentInput = calculate(previousInput, currentInput, operator);
                    display.innerText = currentInput;
                    previousInput = '';
                    operator = null;
                }
                return;
            }

            if (this.classList.contains('operator')) {
                if (operator !== null) {
                    currentInput = calculate(previousInput, currentInput, operator);
                    display.innerText = currentInput;
                }
                operator = value;
                previousInput = currentInput;
                currentInput = '0';
                return;
            }

            if (currentInput === '0') {
                currentInput = value;
            } else {
                currentInput += value;
            }

            display.innerText = currentInput;
        });
    });

    function calculate(a, b, op) {
        a = parseFloat(a);
        b = parseFloat(b);

        switch(op) {
            case '+': return (a + b).toString();
            case '-': return (a - b).toString();
            case '*': return (a * b).toString();
            case '/': return (a / b).toString();
            default: return b;
        }
    }
});
