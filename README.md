# calc-topzera
Um desafio para fazer uma calculadora topzera capaz de validar expressões matemáticas e realizar qualquer expressão dada pelo usuário, sem usar eval(), bibliotecas e coisas do tipo.

### Sobre o desafio
Fazer essa calcula foi um desafio bem legal, o que mais gostei foram os regexs bem complicados que tive que aplicar tanto para fazer as validações que não eram fáceis quanto para encontrar a parte correta do próximo cálculo e dividi-las entre números e os operadores que é ainda mais difícil. Tentei encontrar o máximo de formas erradas de escrever a expressão não só para validar, mas também mostrar a causa do erro ao usuário como, por exemplo, dizer que faltou abrir ou fechar um parêntese na expressão.

### Estrutura do código
Separei os algoritmos em duas classes, uma para fazer os cálculos e outra só para as validações usando métodos estáticos. Para execução existem três arquivos, a index.js que executa o código e só retorna o resultado, o verbose.js que vai mostrando o passo a passo da resolução e o debugger.js que criei para facilitar a busca por erros mostrando como o regex está encontrando os trechos e o resultado de cada operação.

### Como executar
Não é necessário nem uma instalação adicional, na pasta onde está o package.json é só executar um dos três scripts, por exemplo:
<br>npm run start '1+1'
<br>npm run start:verbose '1+1'
<br>npm run start:debugger '1+1'

### Validações

Para cada uma das validações a baixo, é informado ao usuário o motivo com uma mensagem no terminal além de encerrar o programa.

<br>-Verifica se existe algum carácter inválido como letras e símbolos diferentes dos operados permitidos ou de notação científica como: '10a + 10' ou 'G + 50'.
<br>-Verifica não só a quantidade de parênteses abertos com os fechados como também a sintase, se existe algum parêntese aberto ou fechado fora de ordem como: '(1+5) - )5+5('.
<br>-Verfica se existe algum operador em um lugar inválido como: '(1+5+)' ou '1+++5' ou '/8 + 9'.
<br>-Verifica se existe algum número em um lugar inválido ou faltando um operador como: '20 20+5' ou '(2+2)50-10'
<br>-Verifica se existe algum ponto fora do lugar como: '20.50.2 + 3' ou '. 50 + 80' ou '50..10 - 10'.
<br>-Verifica se existe algum 'e' de notação científico em um lugar inválido ou sendo usado de forma incorreta como: '50e10 + 5' ou '50e*10' ou 'e 10 + 1'.

### Como a calculadora funciona
Os números das linhas que eu citar são do arquivo Calculator.js ok?
<br>A primeira coisa que o programa faz é executar uma função de validação da classe CalculatorValidade, essa função vai fazer um loop em várias funções de validação, assim que uma delas encontrar algo errado na expressão uma mensagem informando o motivo é retornada e o programa é encerrado.

Se estiver tudo certo agora é só resolver todo o cálculo,  a função 'execute' começa pegando a posição da primeira parte a ser resolvido através da função  '_getNextOperationPosition' que encontra o primeiro parênteses fechado e o que foi aberto antes dele, se não existirem parênteses ele retorna a expressão inteira. Após encontrar o trecho a ser resolvido, é passado a função '_getResult' para fazer o cálculo, com o resultado encontrado pela função '_getResult' agora é só fazer um replace usando as posições de início e final do trecho pelo resultado. Por fim a função 'execute' termina usando um regex na linha 34 para verificar se a expressão toda foi resolvida, caso contrário ela é executada recursivamente até o regex dizer que terminou e informa o resultado.

Para resolver o trecho da operação, dentro da função '_getResult' existe uma função para cada operador diferente e a ordem delas estão organizadas conforme a ordem em que cada operação deve ser realizada na matemática. Para cada operação existe um regex para encontrar a operação no trecho, ele encontra o número da esquerda que pode conter sinais, pontos e até notação científica o que também vale pelo número da direta, depois executa a operação, faz algumas tratativas de sinais usando a função '_negativeFix', faz um replace com o resultado e executa de novo a mesma função recursivamente até que nem um dos regex encontre outra operação e por fim retorna o resultado a função 'execute' removendo os parênteses caso tenha na linha 184.

Essa função '_negativeFix' serve para verificar regras de sinais como, por exemplo, menos com menos vira mais.

### Implementações futuras
-Verificar possibilidade de diminuir os algoritmos e encurtar os regex.
<br>-Criar uma função para retornar o base64 da imagem da expressão em notação científica.
