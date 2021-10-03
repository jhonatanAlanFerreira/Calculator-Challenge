const CalculatorValidade = require("./CalculatorValidade");

module.exports = class Calculator {
    _expression;

    constructor(expression) {
        CalculatorValidade.validate(expression);
        this._expression = expression;
    }

}