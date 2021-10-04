const CalculatorValidade = require("./CalculatorValidade");

module.exports = class Calculator {
    _expression;

    constructor(expression) {
        CalculatorValidade.validate(expression);
        this._expression = expression;
    }

    execute() {
        let operation = this._getNextOperation();
        console.log(operation);
    }

    _getNextOperation() {
        return this._expression;
    }

}