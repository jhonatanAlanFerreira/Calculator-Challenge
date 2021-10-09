module.exports = class CalculatorValidade {
    static errorMsg = "Opa parece que há um erro na expressão. ";

    static validate(expression) {
        let validadeFunctions = Object.keys(this.validations);
        validadeFunctions.forEach(fn => this.validations[fn](expression));
    }

    static inputValidate(input) {
        if (input.length < 3 || !input[2] || /[\+\*\-]/.test(input[2][0])) {
            console.error('A expressão não foi escrita ou começa com um sinal, como um número negativo por exemplo, se for o caso coloque o número com sinal entre parênteses');
            process.exit();
        }
        if (input.length > 3) {
            console.error("A expressão não foi escrita entre aspas ou foi enviado mais de um parâmetro");
            process.exit();
        }
    }

    static validations = {
        checkChars: expression => {
            if (!/^[\+\-\*\^\.\e\/\(\)\s\d]+$/.test(expression))
                this.sendError("A expressão não deve conter letras ou simbolos diferentes de: + - * ^ . e / ( )");
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

            if (/\([\*\^\/]/.test(expression))
                this.sendError('Confira se não tem algum operador logo após abrir um novo parêntese.');
        },

        checkNumberParentheses: expression => {
            if (/\d\(/.test(expression)) this.sendError('Confira se não tem algum parêntese aberto logo depois de um número');

            if (/\)\d/.test(expression)) this.sendError('Confira se não tem algum número logo após fechar um parêntese');
        },

        checkNumbersOperators: expression => {
            if (/\d\s+\d/.test(expression)) this.sendError('Confira se não faltou algum operador entre 2 números');
        },

        checkManyOperators: expression => {
            let isValid = true;
            expression = expression.replace(/\*{2}/g, '*');
            if (/[\-\+\*\^\/][\+\*\^\/]/.test(expression)) isValid = false;
            if (/(?:^[\/\^])|(?:[\/\^\+\-\*]$)/.test(expression)) isValid = false;

            if (!isValid) this.sendError('Confira se não faltou colocar um número entre algum operador');
        },

        checkDot: expression => {
            let isValid = true;
            if (/\D\.|\.\D/.test(expression)) isValid = false;
            if (/(.\..\.)/.test(expression)) isValid = false;

            if (!isValid) this.sendError('Confira se não tem algum ponto fora do lugar');
        },

        checkScientificNotation: expression => {
            expression = expression.replace(/\d+?e[\+\-]\d+/g, '');
            if (expression.includes('e')) this.sendError("Confira se não tem um 'e' de notação científica fora de lugar")
        }
    };

    static sendError(msg) {
        console.error(this.errorMsg + msg);
        process.exit();
    }

}