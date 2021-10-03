const Calculator = require("./classes/Calculator");
const input = process.argv;

if (input.length < 3) {
    console.error('A expressão não foi escrita');
    process.exit();
}
if (input.length > 3) {
    console.error("A expressão deve ser escrita entre aspas se existirem espaços entre os caracteres, exemplo: '1 + 1'");
    process.exit();
}

let calculator = new Calculator(input[2]);