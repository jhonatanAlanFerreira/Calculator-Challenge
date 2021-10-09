const CalculatorValidade = require("./CalculatorValidade");

module.exports = class Calculator {
    _expression;
    _verbose;
    _debugger;
    _parentheseCal = false;

    constructor(expression, verbose = false, debugg = false) {
        CalculatorValidade.validate(expression);
        expression = expression.replace(/\s/g, '');
        this._expression = expression;
        this._verbose = verbose;
        this._debugger = debugg;
        if (this._verbose) console.log(this._expression);
    }

    execute() {
        if (this._verbose && this._parentheseCal) console.log('Parêntese resolvido -> ' + this._expression);

        let operationPosition = this._getNextOperationPosition();
        let {
            start,
            end
        } = operationPosition;
        end++;

        let operation = this._expression.slice(start, end);
        let result = this._getResult(operation);

        if (result == 'Infinity') {
            console.error(`O resultado dessa operação '${operation}' é muito grande`);
            process.exit();
        }

        let exp = this._expression;
        this._expression = exp.substring(0, start) + result + exp.substring(end);

        if (!/^[-\+]?[\d\.]+(?:e[\+\-]\d+?)?$/.test(this._expression)) this.execute();
        else console.log(this._expression);
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

    _negativeFix(number, result) {
        if (number.toString()[0] == '-' && result.toString()[0] != '-') result = '+' + result;
        return result;
    }

    _getResult(operation) {
        let exec;

        operation = operation.replace(/(\+-)|(-\+)/g, '-');
        operation = operation.replace(/-{2}/g, '+');

        if (this._verbose) {
            let hasParentheses = /\(/.test(operation);

            if (hasParentheses) {
                console.log('Resolvendo parêntese -> ' + operation);
                this._parentheseCal = true;
            } else {
                this._parentheseCal = false;
                console.log(operation);
            }
        }

        let pow = /(-?[\d\.]+(?:e[\+\-]\d+?)?)\*{2}(-?[\d\.]+(?:e[\+\-]\d+)?)/;
        exec = pow.exec(operation);
        if (exec) {
            if (this._debugger) console.log({
                pow: exec
            });

            if (/-/.test(exec[1]) && /\./.test(exec[2])) {
                console.log(`Opa cheguei em um número negativo elevado a um número com decimais aqui '${this._expression}'`);
                process.exit();
            }

            let result = exec[1] ** exec[2];
            if (this._debugger) console.log('Resultado -> ' + result);

            operation = operation.replace(pow, this._negativeFix(exec[1], result));
            return this._getResult(operation);
        }

        let multiplication = /(?<!\/)(-?[\d\.]+(?:e[\+\-]\d+?)?)\*(-?[\d\.]+(?:e[\+\-]\d+)?)/;
        exec = multiplication.exec(operation);
        if (exec) {
            if (this._debugger) console.log({
                multiplication: exec
            });

            let result = exec[1] * exec[2];
            if (this._debugger) console.log('Resultado -> ' + result);

            operation = operation.replace(multiplication, this._negativeFix(exec[1], result));
            return this._getResult(operation);
        }

        let division = /(-?[\d\.]+(?:e[\+\-]\d+?)?)\/(-?[\d\.]+(?:e[\+\-]\d+)?)/;
        exec = division.exec(operation);
        if (exec) {
            if (this._debugger) console.log({
                division: exec
            });
            if (exec[2] == 0) {
                console.log(`Opa cheguei em uma divisão por 0 aqui '${this._expression}'`);
                process.exit();
            }

            let result = exec[1] / exec[2];
            if (this._debugger) console.log('Resultado -> ' + result);

            operation = operation.replace(division, this._negativeFix(exec[1], result));
            return this._getResult(operation);
        }

        let sum = /(-?[\d\.]+(?:e[\+\-]\d+?)?)\+(-?[\d\.]+(?:e[\+\-]\d+)?)/;
        exec = sum.exec(operation);
        if (exec) {
            if (this._debugger) console.log({
                sum: exec
            });

            let result = +exec[1] + +exec[2];
            if (this._debugger) console.log('Resultado -> ' + result);

            operation = operation.replace(sum, this._negativeFix(exec[1], result));
            return this._getResult(operation);
        }

        let minus = /(-?[\d\.]+(?:e[\+\-]\d+?)?)-(-?[\d\.]+(?:e[\+\-]\d+)?)/;
        exec = minus.exec(operation);
        if (exec) {
            if (this._debugger) console.log({
                minus: exec
            });

            let result = exec[1] - exec[2];
            if (this._debugger) console.log('Resultado -> ' + result);

            operation = operation.replace(minus, this._negativeFix(exec[1], result));
            return this._getResult(operation);
        }

        let xor = /(-?[\d\.]+(?:e[\+\-]\d+?)?)\^(-?[\d\.]+(?:e[\+\-]\d+)?)/;
        exec = xor.exec(operation);
        if (exec) {
            if (this._debugger) console.log({
                xor: exec
            });

            let result = exec[1] ^ exec[2];
            if (this._debugger) console.log('Resultado -> ' + result);

            operation = operation.replace(xor, this._negativeFix(exec[1], result));
            return this._getResult(operation);
        }

        return operation.replace(/[\(\)]/g, '');
    }

}