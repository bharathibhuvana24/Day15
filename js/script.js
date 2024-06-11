document.addEventListener('DOMContentLoaded', function () {
    const app = document.getElementById('app');
    const calculator = document.createElement('div');
    calculator.className = 'calculator card';

    // Display
    const displayRow = document.createElement('div');
    displayRow.className = 'row';
    const displayCol = document.createElement('div');
    displayCol.className = 'col-12';
    const display = document.createElement('input');
    display.type = 'text';
    display.id = 'result'; // Updated id for validation
    display.className = 'form-control';
    display.readOnly = true;
    displayCol.appendChild(display);
    displayRow.appendChild(displayCol);
    calculator.appendChild(displayRow);

    // Buttons
    const buttons = [
        '7', '8', '9', '/', 
        '4', '5', '6', '*', 
        '1', '2', '3', '-', 
        '0', '00', '.', '+', 
        '%', 'C', 'DEL', '='
    ];

    let buttonRow;
    buttons.forEach((button, index) => {
        if (index % 4 === 0) {
            buttonRow = document.createElement('div');
            buttonRow.className = 'row';
        }
        const buttonCol = document.createElement('div');
        buttonCol.className = 'col-3';
        const buttonElement = document.createElement('button');
        buttonElement.className = 'btn btn-secondary btn-block';
        buttonElement.textContent = button;
        buttonElement.id = getButtonId(button); // Set id for each button
        buttonElement.addEventListener('click', () => handleButtonClick(button));
        buttonCol.appendChild(buttonElement);
        buttonRow.appendChild(buttonCol);
        calculator.appendChild(buttonRow);
    });

    app.appendChild(calculator);

    // Keyboard events
    document.addEventListener('keydown', handleKeydown);

    // Functions
    let currentInput = '';
    let expression = '';

    function handleButtonClick(button) {
        if (button === 'C') {
            currentInput = '';
            expression = '';
            display.value = '';
        } else if (button === 'DEL') {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        } else if (button === '=') {
            try {
                expression = currentInput;
                display.value = eval(expression);
                currentInput = display.value;
            } catch (error) {
                alert('Invalid expression');
                currentInput = '';
                display.value = '';
            }
        } else if (button === '%') {
            currentInput += '/100';
            display.value = currentInput;
        } else {
            currentInput += button;
            display.value = currentInput;
        }
    }

    function handleKeydown(event) {
        const allowedKeys = '0123456789/*-+.%'.split('');
        if (allowedKeys.includes(event.key)) {
            currentInput += event.key;
            display.value = currentInput;
        } else if (event.key === 'Enter') {
            try {
                expression = currentInput;
                display.value = eval(expression);
                currentInput = display.value;
            } catch (error) {
                alert('Invalid expression');
                currentInput = '';
                display.value = '';
            }
        } else if (event.key === 'Backspace') {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        } else if (event.key === 'Escape') {
            currentInput = '';
            expression = '';
            display.value = '';
        } else {
            alert('Only numbers and basic operators are allowed.');
            event.preventDefault();
        }
    }

    function getButtonId(button) {
        switch (button) {
            case 'C': return 'clear'; // Clear button
            case '=': return 'equal'; // Equal button
            case '+': return 'add'; // Add button
            case '-': return 'subtract'; // Subtract button
            case '*': return 'multiply'; // Multiply button (not required by validation, but good to have)
            case '/': return 'divide'; // Divide button (not required by validation, but good to have)
            case '1': return '1';
            case '2': return '2';
            case '3': return '3';
            case '4': return '4';
            case '5': return '5';
            case '6': return '6';
            case '7': return '7';
            case '8': return '8';
            case '9': return '9';
            case '0': return '0';
            case '00': return '00';
            case '.': return '.';
            default: return ''; // No id for other buttons
        }
    }
});
