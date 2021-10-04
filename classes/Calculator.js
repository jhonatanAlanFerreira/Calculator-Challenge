const CalculatorValidade = require("./CalculatorValidade");

module.exports = class Calculator {
    _expression;

    constructor(expression) {
        CalculatorValidade.validate(expression);
        this._expression = expression;
    }

    execute() {
        let operationPosition = this._getNextOperationPosition();
        let {
            start,
            end
        } = operationPosition;
        end++;

        let operation = this._expression.slice(start, end);
        let result = this._getResult(operation); //falta implementar, será o resultado da operação

        let exp = this._expression;
        this._expression = exp.substring(0, start) + result + exp.substring(end);

        //linhas de teste, serão removidas
        console.log(operation);
        console.log(this._expression);
    }

    _getNextOperationPosition() {
        let openIn = -1;
        let closeIn = -1;

        for (let i = 0; i < this._expression.length; i++) {
            let l = this._expression[i];

            if (l == '(') openIn = i;
            if (l == ')') {
                closeIn = i;
                break;
            }
        }

        if (openIn > -1 && closeIn > -1) return {
            start: openIn,
            end: closeIn
        };

        return {
            start: 0,
            end: this._expression.length
        };
    }

    //falta implementar
    _getResult(operation) {
        return 0;
    }

}