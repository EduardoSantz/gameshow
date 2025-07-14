# 💰 Show do Milhão (Versão Terminal)

Este é um projeto de um jogo de perguntas e respostas baseado no clássico “Show do Milhão”, desenvolvido em JavaScript para ser executado no terminal com Node.js. O objetivo é testar seus conhecimentos gerais e tentar ganhar o prêmio máximo de R\$ 1 milhão!

---

## ✒️ Autor

**Nome:** Jefferson Eduardo Santos Lima
**GitHub:** [EduardoSantz/gameshow](https://github.com/EduardoSantz/gameshow)

---

## 📜 Regras do Jogo

* **Objetivo:** Responder a uma sequência de 5 perguntas de múltipla escolha para ganhar o prêmio máximo.
* **Níveis de Dificuldade:** As perguntas são selecionadas aleatoriamente de um banco de 15 questões com diferentes níveis de dificuldade.
* **Premiação:**

  * **Acertar:** valor acumulado ao responder corretamente.
  * **Parar:** valor garantido ao escolher parar antes da próxima pergunta.
  * **Errar:** prêmio de consolação ao errar a pergunta.
* **Fim de Jogo:**

  1. Acertar a última pergunta e ganhar R\$ 1 milhão.
  2. Parar e levar o prêmio acumulado até a rodada anterior.
  3. Errar e ficar com o prêmio de consolação.
* **Ranking:** Os jogadores que ganham algum prêmio aparecem no ranking (top 5), salvo em `ranking.json`.

---

## 🎮 Como Jogar

1. **Novo Jogo**

   * Insira seu nome.
   * Em cada rodada, responda escolhendo 1, 2 ou 3 ou digite **P** para parar.
2. **Ver Ranking**

   * Exibe as 5 maiores pontuações registradas.
3. **Sair**

   * Encerra o jogo.

---

## ⚙️ Como Executar

1. **Pré-requisitos:**

   * [Node.js](https://nodejs.org/) instalado.
2. **Clone o repositório:**

   ```bash
   git clone https://github.com/EduardoSantz/gameshow.git
   cd gameshow
   ```
3. **Inicie o projeto Node.js:**

   ```bash
   npm init -y
   ```
4. **Instale as dependências:**

   ```bash
   npm install chalk prompt-sync
   ```
5. **Configure o script `start`** em `package.json`:

   ```json
   "scripts": {
     "start": "node script.js"
   }
   ```
6. **Execute o jogo:**

   ```bash
   npm start
   ```

---

## ✨ Funcionalidades

* **Seleção Aleatória de Perguntas:** sorteia 5 de 15 questões a cada partida.
* **Alternativas Embaralhadas:** usa shuffle para evitar padrões.
* **Ranking Persistente:** mantém histórico em `ranking.json`.

---

## 📚 Referências

1. **Node.js** – Ambiente de execução JavaScript no terminal
   [https://nodejs.org/](https://nodejs.org/)
2. **npm** – Gerenciador de pacotes para Node.js
   [https://www.npmjs.com/](https://www.npmjs.com/)
3. **chalk** – Estilização de texto no terminal
   [https://www.npmjs.com/package/chalk](https://www.npmjs.com/package/chalk)
4. **prompt-sync** – Entrada de usuário síncrona no terminal
   [https://www.npmjs.com/package/prompt-sync](https://www.npmjs.com/package/prompt-sync)
5. **fs** (File System) – Leitura e escrita de arquivos em Node.js
   [https://nodejs.org/api/fs.html](https://nodejs.org/api/fs.html)
6. **Game Loop** – Estrutura `while` para manter o jogo em execução
   [https://maicon.io/entendendo-o-game-loop](https://maicon.io/entendendo-o-game-loop)
7. **async/await** – Programação assíncrona em JavaScript
   [https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/async\_function](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/async_function)
8. **Fisher–Yates Shuffle** – Algoritmo de embaralhamento de arrays
   [https://www.geeksforgeeks.org/shuffle-a-given-array-using-fisher-yates-algorithm/](https://www.geeksforgeeks.org/shuffle-a-given-array-using-fisher-yates-algorithm/)
9. **try…catch** – Tratamento de erros em JavaScript
   [https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/try...catch](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/try...catch)
10. **JSON** – Formato de intercâmbio de dados
    [https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global\_Objects/JSON](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON)

---

## 📄 Licença

Este projeto está sob a licença **MIT**.
Veja o arquivo [LICENSE](LICENSE) para mais detalhes.