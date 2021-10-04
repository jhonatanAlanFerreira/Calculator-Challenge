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
            let count = 0;

            for (let i = 0; i < expression.length; i++) {
                let l = expression[i];

                if (l == '(') count++;
                if (l == ')') count--;

                if (count < 0) this.sendError('Confira se não esqueceu de abrir algum parêntese');
            }

            if (count > 0) this.sendError('Confira se não faltou fechar algum parêntese');
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