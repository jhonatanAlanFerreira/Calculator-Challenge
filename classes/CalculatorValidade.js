module.exports = class CalculatorValidade {
    static errorMsg = "Opa parece que há um erro na expressão. ";

    static validate(expression) {
        let validadeFunctions = Object.keys(this.validations);
        validadeFunctions.forEach(fn => this.validations[fn](expression));
    }

    static validations = {
        checkChars: expression => {
            if (!/^[\+\-\*\^\.\/\(\)\s\d]+$/.test(expression))
                this.sendError("A expressão não deve conter letras ou simbolos diferentes de: + - * ^ . / ( )");
        },

        checkParentheses: expression => {
            let openParentheses = (expression.match(/\(/g) || []).length;
            let closeParentheses = (expression.match(/\)/g) || []).length;

            if (openParentheses > closeParentheses)
                this.sendError('Confira se não faltou fechar alguns parênteses.');

            if (openParentheses < closeParentheses)
                this.sendError('Confira se não tem parênteses a mais fechados.');
        },

        checkOperatorsParentheses: expression => {
            if (/[\+\-\*\^\/]\)/.test(expression))
                this.sendError('Confira se não tem algum parêntese fechando logo após um operador.');

            if (/\([\+\-\*\^\/]/.test(expression))
                this.sendError('Confira se não tem algum operador logo após abrir um novo parêntese.');
        },

        checkNumberParentheses: expression => {
            if (/\d\(/.test(expression)) this.sendError('Confira se não tem algum parêntese aberto logo depois de um número');

            if (/\)\d/.test(expression)) this.sendError('Confira se não tem algum número logo após fechar um parêntese');
        }
    };

    static sendError(msg) {
        console.error(this.errorMsg + msg);
        process.exit();
    }

}