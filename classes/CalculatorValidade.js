module.exports = class CalculatorValidade {

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
                console.error('Opa. Confira se não faltou fechar alguns parênteses...');
            }
            if (openParentheses < closeParentheses) {
                isValid = false;
                console.error('Opa... Confira se não tem parênteses a mais fechados...');
            }

            return isValid;
        }
    };

    static validate(expression) {
        let validadeFunctions = Object.keys(this.validations);
        let isValid = validadeFunctions.every(fn => this.validations[fn](expression));
        if (!isValid) process.exit();
    }

}