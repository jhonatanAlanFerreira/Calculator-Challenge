const Calculator = require("./classes/Calculator");
const CalculatorValidade = require("./classes/CalculatorValidade");
const input = process.argv;

CalculatorValidade.inputValidate(input);

let calculator = new Calculator(input[2], true);
calculator.execute();