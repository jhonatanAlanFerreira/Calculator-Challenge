# Calculator Challenge

> Um desafio para fazer uma calculadora capaz de validar expressões matemáticas e realizar qualquer expressão dada pelo usuário, sem usar eval(), bibliotecas e coisas do tipo.

## 💻 Pré-requisitos
Necessário ter Node.js e NPM instalados.
<br>https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

## ☕ Usando Calculator Challenge
Não é necessário nem uma instalação adicional, na pasta onde está o package.json é só executar um dos três scripts, por exemplo:
* `npm run start '1+1 + (10-5) * 20'`
* `npm run start:verbose '1+1 + (10-5) * 20'`
* `npm run start:debugger '1+1 + (10-5) * 20'`

## ✔️ Validações

Para cada uma das validações a baixo, é informado ao usuário o motivo com uma mensagem no terminal além de encerrar o programa.
* Verifica se existe algum carácter inválido como letras e símbolos diferentes dos operados permitidos ou de notação científica como: '10a + 10' ou 'G + 50'.
* Verifica não só a quantidade de parênteses abertos com os fechados como também a sintase, se existe algum parêntese aberto ou fechado fora de ordem como: '(1+5) - )5+5('.
* Verfica se existe algum operador em um lugar inválido como: '(1+5+)' ou '1+++5' ou '/8 + 9'.
* Verifica se existe algum número em um lugar inválido ou faltando um operador como: '20 20+5' ou '(2+2)50-10'
* Verifica se existe algum ponto fora do lugar como: '20.50.2 + 3' ou '. 50 + 80' ou '50..10 - 10'.
* Verifica se existe algum 'e' de notação científico em um lugar inválido ou sendo usado de forma incorreta como: '50e10 + 5' ou '50e*10' ou 'e 10 + 1'.

## 🛠️ Implementações futuras
* Verificar possibilidade de diminuir os algoritmos e encurtar os regex.
* Criar uma função para retornar o base64 da imagem da expressão em notação científica.
