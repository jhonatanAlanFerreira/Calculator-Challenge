const Calculator = require("./classes/Calculator");
const input = process.argv;

if (input.length < 3 || !input[2] || /[\+\-\*\^\.\e\/]/.test(input[2][0])) {
    console.error('A expressão não foi escrita ou começa com um sinal, como um número negativo por exemplo, se for o caso coloque o número com sinal entre parênteses');
    process.exit();
}
if (input.length > 3) {
    console.error("A expressão não foi escrita entre aspas ou foi enviado mais de um parâmetro");
    process.exit();
}

let calculator = new Calculator(input[2]);
calculator.execute();