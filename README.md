# Calculator Challenge

> Um desafio para fazer uma calculadora capaz de validar expressões matemáticas e realizar qualquer expressão dada pelo usuário, sem usar eval(), bibliotecas e coisas do tipo.

## 💻 Pré-requisitos
Necessário ter Node.js instalado.
<br>https://nodejs.org/en/download

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

## 🧩 Como a calculadora funciona

<br>A primeira coisa que o programa faz é executar uma função de validação da classe CalculatorValidade, essa função vai fazer um loop em várias funções de validação, assim que uma delas encontrar algo errado na expressão uma mensagem informando o motivo é retornada e o programa é encerrado.

Se estiver tudo certo agora é só resolver todo o cálculo,  a função 'execute' começa pegando a posição da primeira parte a ser resolvido através da função  '_getNextOperationPosition' que encontra o primeiro parênteses fechado e o que foi aberto antes dele, se não existirem parênteses ele retorna a expressão inteira. Após encontrar o trecho a ser resolvido, é passado a função '_getResult' para fazer o cálculo, com o resultado encontrado pela função '_getResult' agora é só fazer um replace usando as posições de início e final do trecho pelo resultado. Por fim a função 'execute' termina usando um regex para verificar se a expressão toda foi resolvida, caso contrário ela é executada recursivamente até o regex dizer que terminou e informa o resultado.

Para resolver o trecho da operação, dentro da função '_getResult' existe uma função para cada operador diferente e a ordem delas estão organizadas conforme a ordem em que cada operação deve ser realizada na matemática. Para cada operação existe um regex para encontrar a operação no trecho, ele encontra o número da esquerda que pode conter sinais, pontos e até notação científica o que também vale pelo número da direta, depois executa a operação, faz algumas tratativas de sinais usando a função '_negativeFix', faz um replace com o resultado e executa de novo a mesma função recursivamente até que nem um dos regex encontre outra operação e por fim retorna o resultado a função 'execute' removendo os parênteses caso tenha.

Essa função '_negativeFix' serve para verificar regras de sinais como, por exemplo, menos com menos vira mais.

## 🛠️ Implementações futuras
* Verificar possibilidade de diminuir os algoritmos e encurtar os regex.
* Criar uma função para retornar o base64 da imagem da expressão em notação científica.
