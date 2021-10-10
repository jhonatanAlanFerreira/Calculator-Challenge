# calc-topzera
Uma calculadora topzera capaz de validar expressões matemáticas e realizar qualquer expressão numérica dada pelo usuário.

### Sobre o desafio
Fazer essa calcula foi um desafio bem legal, o que mais gostei foram os regexs bem complicados que tive que aplicar tanto para fazer as validações que não eram fáceis quanto para encontrar a parte correta do próximo cálculo e dividi-las entre números e os operadores que é ainda mais difícil. Tentei encontrar o máximo de formas erradas de escrever a expressão não só para validar, mas também mostrar a causa do erro ao usuário como, por exemplo, dizer que faltou abrir ou fechar um parêntese na expressão.
<br>  Consegui com cerca de 5 horas fazer um código que já era valido usando o arquivo de validação, mas eu preferi fazer bastante testes com notações científicas, pontos fora do lugar, vou detalhar tudo num tópico separado... Finalizei tudo com quase 10 horas.

### Estrutura do código
Separei os algoritmos em duas classes, uma para fazer os cálculos e outra só para as validações usando métodos estáticos. Para execução existem três arquivos, a index.js que executa o código e só retorna o resultado, o verbose.js que vai mostrando o passo a passo da resolução e o debugger.js que criei para facilitar a busca por erros mostrando como o regex está encontrando os trechos e o resultado de cada operação.

### Como executar
Não é necessário nem uma instalação adicional, na pasta onde está o package.json é só executar um dos três scripts, por exemplo:
<br>npm run start '1+1'
<br>npm run start:verbose '1+1'
<br>npm run start:debugger '1+1'
