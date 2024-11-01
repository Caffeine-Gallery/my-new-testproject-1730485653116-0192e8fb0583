import { backend } from 'declarations/backend';

const display = document.getElementById('display');
const loader = document.getElementById('loader');

window.appendToDisplay = (value) => {
    display.value += value;
};

window.clearDisplay = () => {
    display.value = '';
};

window.calculate = async () => {
    const expression = display.value;
    if (!expression) return;

    const [num1, operator, num2] = expression.split(/([+\-*/])/);

    if (!num1 || !operator || !num2) {
        display.value = 'Error: Invalid expression';
        return;
    }

    loader.classList.remove('d-none');

    try {
        let result;
        switch (operator) {
            case '+':
                result = await backend.add(parseFloat(num1), parseFloat(num2));
                break;
            case '-':
                result = await backend.subtract(parseFloat(num1), parseFloat(num2));
                break;
            case '*':
                result = await backend.multiply(parseFloat(num1), parseFloat(num2));
                break;
            case '/':
                result = await backend.divide(parseFloat(num1), parseFloat(num2));
                break;
            default:
                throw new Error('Invalid operator');
        }
        display.value = result.toString();
    } catch (error) {
        display.value = `Error: ${error.message}`;
    } finally {
        loader.classList.add('d-none');
    }
};
