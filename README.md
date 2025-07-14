# gameshow

💰 Show do Milhão (Versão Terminal)
Este é um projeto de um jogo de perguntas e respostas baseado no clássico "Show do Milhão", desenvolvido em JavaScript para ser executado no terminal com Node.js. O objetivo é testar seus conhecimentos gerais e tentar ganhar o prêmio máximo de R$ 1 milhão!

✒️ Autor
Nome: Jefferson Eduardo Santos Lima 

📜 Regras do Jogo
Objetivo: O jogador deve responder a uma sequência de 5 perguntas de múltipla escolha para ganhar o prêmio máximo.

Níveis de Dificuldade: As perguntas são selecionadas aleatoriamente de um banco de 15 questões com diferentes níveis de dificuldade.

Premiação: Cada rodada possui três valores de premiação:

Acertar: O valor que o jogador acumula se responder corretamente.

Parar: O valor que o jogador leva para casa se decidir parar antes de responder à pergunta da rodada.

Errar: O valor com o qual o jogador fica se errar a pergunta.

Fim de Jogo: O jogo termina se o jogador:

Acertar a última pergunta e ganhar o prêmio máximo.

Escolher parar e levar o prêmio acumulado até a rodada anterior.

Errar uma pergunta e levar o prêmio de consolação.

Ranking: Os jogadores que ganham algum prêmio são adicionados a um ranking, que exibe as 5 maiores pontuações. O ranking é salvo localmente em um arquivo ranking.json.

🎮 Como Jogar
Ao iniciar o jogo, você verá um menu principal com as seguintes opções:

Novo Jogo:

Você será solicitado a inserir seu nome.

A cada rodada, uma pergunta com 3 alternativas será exibida. As alternativas são embaralhadas a cada vez.

Digite o número da alternativa que você acredita ser a correta (1, 2 ou 3) e pressione ENTER.

Se não tiver certeza da resposta, você pode digitar P e pressionar ENTER para parar o jogo e levar o prêmio acumulado.

Ver Ranking:

Exibe a lista dos 5 jogadores com as maiores pontuações.

Sair:

Encerra o jogo.

⚙️ Como Executar o Projeto
Você precisará ter o Node.js instalado em seu computador.

Clone o Repositório:

git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

Crie o arquivo package.json:
No terminal, dentro da pasta do projeto, execute o comando abaixo para iniciar um projeto Node.js.

npm init -y

Instale as Dependências:
O projeto utiliza as bibliotecas chalk para estilizar o terminal e prompt-sync para ler a entrada do usuário.

npm install chalk prompt-sync

Configure o script start:
Abra o arquivo package.json que foi criado e adicione o seguinte script dentro do objeto "scripts":

"scripts": {
  "start": "node script.js"
},

Execute o Jogo:
Agora você pode iniciar o jogo com o comando:

npm start


✨ Funcionalidades Únicas (Variações)
Esta versão do Show do Milhão possui algumas características próprias:

Seleção Aleatória de Perguntas: As 5 perguntas de cada partida são sorteadas de um banco com 15 questões, tornando cada jogo diferente.

Alternativas Embaralhadas: A ordem das alternativas de resposta é embaralhada a cada pergunta, evitando que o jogador memorize a posição da resposta correta.

Ranking Persistente: O ranking dos melhores jogadores é salvo em um arquivo ranking.json, mantendo o histórico de pontuações mesmo após fechar o jogo.

🏆 Funcionalidades Bônus Implementadas
Ranking dos Melhores Jogadores: O jogo salva e exibe um ranking com as 5 melhores pontuações, incentivando a rejogabilidade.

🛠️ Ferramentas e Bibliotecas

Node.js
Função: Ambiente para executar o jogo no terminal.
Referência: Node.js

NPM
Função: Gerenciador de pacotes para instalar as bibliotecas do projeto.
Referência: npm

chalk
Função: Adiciona cor e estilo ao texto do terminal.
Referência: chalk - npm

prompt-sync
Função: Captura a digitação do usuário no terminal de forma síncrona.
Referência: prompt-sync - npm

fs (File System)
Função: Módulo nativo para ler e escrever arquivos, usado para persistir o ranking.
Referência: File system | Node.js Documentation

💡 Conceitos e Técnicas Aplicadas

Lógica de Jogo (Game Loop)
Função: Estrutura while que mantém o jogo em execução e processa as ações.
Referência: Entendendo o Game Loop - Maicon.io

Programação Assíncrona (async/await)
Função: Cria pausas para melhorar a experiência do usuário sem travar a aplicação.
Referência: async function - JavaScript | MDN

Algoritmo de Fisher-Yates
Função: Implementado para embaralhar as perguntas e alternativas de forma aleatória.
Referência: Shuffle an array using JavaScript (Fisher-Yates shuffle) - GeeksforGeeks

Tratamento de Erros (try...catch)
Função: Garante que o jogo não pare se ocorrer um erro na leitura ou gravação do ranking.
Referência: try...catch - JavaScript | MDN

Manipulação de JSON
Função: Converte o ranking em texto para ser salvo em arquivo e o lê de volta.
Referência: Trabalhando com JSON - Aprendendo desenvolvimento web | MDN


📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes ou leia sobre a licença aqui.