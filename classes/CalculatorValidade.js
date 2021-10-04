module.exports = class CalculatorValidade {

    static validate(expression) {
        let validadeFunctions = Object.keys(this.validations);
        let isValid = validadeFunctions.every(fn => this.validations[fn](expression));
        if (!isValid) process.exit();
    }

    static validations = {
        checkChars: expression => {
            let isValid = /^[\+\-\*\^\/\(\)\s\d]+$/.test(expression);
            if (!isValid) console.error("A expressão não deve conter letras ou simbolos diferentes de: + - * ^ / ( )");
            return isValid;
        },

        checkParentheses: expression => {
            let isValid = true;
            let openParentheses = (expression.match(/\(/g) || []).length;
            let closeParentheses = (expression.match(/\)/g) || []).length;

            if (openParentheses > closeParentheses) {
                isValid = false;
                console.error('Opa parece que há um erro na expressão. Confira se não faltou fechar alguns parênteses.');
            }
            if (openParentheses < closeParentheses) {
                isValid = false;
                console.error('Opa parece que há um erro na expressão. Confira se não tem parênteses a mais fechados.');
            }

            return isValid;
        },

        checkOperatorsParentheses: expression => {
            let isValid = true;

            if (/[\+\-\*\^\/]\)/.test(expression)) {
                isValid = false;
                console.error('Opa parece que há um erro na expressão. Confira se não tem algum parêntese fechando logo após um operador.');
            }
            if (/\([\+\-\*\^\/]/.test(expression)) {
                isValid = false;
                console.error('Opa parece que há um erro na expressão. Confira se não tem algum operador logo após abrir um novo parêntese.');
            }

            return isValid;
        }
    };

}