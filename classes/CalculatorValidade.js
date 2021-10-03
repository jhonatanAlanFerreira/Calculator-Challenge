module.exports = class CalculatorValidade {

    static validations = {
        checkChars: expression => {
            let isValid = /^[\+\-\*\^\/\(\)\s\d]+$/.test(expression);
            if (!isValid) console.error("A expressão não deve conter letras ou simbolos diferentes de: + - * ^ / ( )");
            return isValid;
        },

        checkParentheses: expression => {
            return true;
        }
    };

    static validate(expression) {
        let validadeFunctions = Object.keys(this.validations);
        let isValid = validadeFunctions.every(fn => this.validations[fn](expression));
        if (!isValid) process.exit();
    }

}