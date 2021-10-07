const Calculator = require("./classes/Calculator");
const input = process.argv;

if (input.length < 3) {
    console.error('A expressão não foi escrita ou começa com um número negativo, se for o caso coloque o número negativo entre parênteses');
    process.exit();
}
if (input.length > 3) {
    console.error("A expressão não foi escrita entre aspas ou é curta de mais");
    process.exit();
}

let calculator = new Calculator(input[2]);
calculator.execute();