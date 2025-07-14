// --- IMPORTAÇÃO DAS BIBLIOTECAS ---
const fs = require('fs');
const prompt = require('prompt-sync')({ sigint: true });
const chalk = require('chalk');

// --- DADOS DO JOGO ---
const RANKING_FILE = 'ranking.json'; // Nome do arquivo para salvar o ranking

const allQuestions = [
    // Perguntas fáceis
    { question: "Qual a cor da mistura de azul e amarelo?", options: ["Verde", "Roxo", "Marrom"], answer: "Verde" },
    { question: "Quantos dias tem uma semana?", options: ["5", "7", "10"], answer: "7" },
    { question: "Qual animal é conhecido como " +
        "" + "o rei da selva?", options: ["Elefante", "Leão", "Tigre"], answer: "Leão" },
    { question: "Qual a capital da França?", options: ["Paris", "Lyon", "Marselha"], answer: "Paris" },
    { question: "Quantos continentes existem na Terra?", options: ["5", "6", "7"], answer: "7" },
    // Perguntas médias
    { question: "Em que ano ocorreu a independência do Brasil?", options: ["1822", "1889", "1808"], answer: "1822" },
    { question: "Quem pintou a Mona Lisa?", options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso"], answer: "Leonardo da Vinci" },
    { question: "Qual é o maior oceano do planeta?", options: ["Atlântico", "Pacífico", "Índico"], answer: "Pacífico" },
    { question: "Qual é a fórmula química da água?", options: ["CO2", "H2O", "O2"], answer: "H2O" },
    { question: "Em qual cidade fica a Estátua da Liberdade?", options: ["Londres", "Paris", "Nova York"], answer: "Nova York" },
    // Perguntas difíceis
    { question: "Quem escreveu 'Guerra e Paz'?", options: ["Fiódor Dostoiévski", "Liev Tolstói", "Charles Dickens"], answer: "Liev Tolstói" },
    { question: "Qual é a velocidade da luz no vácuo (aprox.)?", options: ["300.000 km/s", "150.000 km/s", "1.000 km/s"], answer: "300.000 km/s" },
    { question: "Qual elemento tem número atômico 79?", options: ["Ouro", "Prata", "Mercúrio"], answer: "Ouro" },
    { question: "Quem foi o primeiro homem a orbitar a Terra?", options: ["Neil Armstrong", "Yuri Gagarin", "Buzz Aldrin"], answer: "Yuri Gagarin" },
    { question: "Qual país sediou a Copa do Mundo FIFA de 2018?", options: ["Rússia", "Brasil", "Alemanha"], answer: "Rússia" }
];

const prizeLevels = [
    { correct: 1000, stop: 0, wrong: 0 },
    { correct: 5000, stop: 1000, wrong: 500 },
    { correct: 50000, stop: 5000, wrong: 2500 },
    { correct: 100000, stop: 50000, wrong: 25000 },
    { correct: 1000000, stop: 100000, wrong: 50000 }
];

// Array para armazenar o ranking dos jogadores (será carregado do arquivo)
let ranking = [];

// --- FUNÇÕES DE PERSISTÊNCIA ---

/**
 * Salva o ranking atual no arquivo JSON.
 */
function saveRanking() {
    try {
        const data = JSON.stringify(ranking, null, 2); // Formata o JSON para melhor leitura
        fs.writeFileSync(RANKING_FILE, data);
    } catch (error) {
        console.error(chalk.red('Erro ao salvar o ranking:'), error);
    }
}

/**
 * Carrega o ranking do arquivo JSON ao iniciar o jogo.
 */
function loadRanking() {
    try {
        if (fs.existsSync(RANKING_FILE)) {
            const data = fs.readFileSync(RANKING_FILE);
            ranking = JSON.parse(data);
        }
    } catch (error) {
        console.error(chalk.red('Erro ao carregar o ranking:'), error);
        ranking = []; // Reseta o ranking em caso de erro
    }
}


// --- FUNÇÕES UTILITÁRIAS ---

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- FUNÇÕES DE EXIBIÇÃO ---

/**
 * Exibe o menu principal do jogo.
 */
function displayMainMenu() {
    console.clear();
    console.log(chalk.bold.yellow('========================================'));
    console.log(chalk.bold.yellow('       BEM-VINDO AO SHOW DO MILHÃO      '));
    console.log(chalk.bold.yellow('========================================'));
    console.log('\nEscolha uma opção:\n');
    console.log(`  ${chalk.cyan('1:')} Novo Jogo`);
    console.log(`  ${chalk.magenta('2:')} Ver Ranking`);
    console.log(`  ${chalk.red('3:')} Sair\n`);
}

/**
 * Exibe o ranking dos melhores jogadores.
 */
function displayRanking() {
    console.log(chalk.bold.magenta('\n========================================'));
    console.log(chalk.bold.magenta(' 🏆 RANKING DOS MELHORES JOGADORES 🏆 '));
    console.log(chalk.bold.magenta('========================================'));

    if (ranking.length === 0) {
        console.log(chalk.gray('\n   Ainda não há jogadores no ranking.\n'));
    } else {
        // Ordena o ranking pela pontuação (do maior para o menor) e pega os 5 melhores
        const topPlayers = ranking
            .sort((a, b) => b.prize - a.prize)
            .slice(0, 5);

        console.log('');
        topPlayers.forEach((player, index) => {
            const rank = `${index + 1}.`.padEnd(4);
            const name = player.name.padEnd(20);
            const score = formatCurrency(player.prize);
            console.log(chalk.white(`  ${rank}${name}${chalk.green(score)}`));
        });
        console.log('');
    }
    console.log(chalk.bold.magenta('========================================\n'));
}

function displayQuestion(question, round, playerName) {
    console.clear();
    const prizes = prizeLevels[round];
    console.log(chalk.yellow('=================================================='));
    console.log(chalk.yellow(`   SHOW DO MILHÃO - ${playerName.toUpperCase()}`));
    console.log(chalk.yellow('=================================================='));
    console.log(`\nRodada ${chalk.cyan(round + 1)} de ${prizeLevels.length}`);
    console.log(`Prêmios: ${chalk.green('Acertar:')} ${formatCurrency(prizes.correct)} | ${chalk.yellow('Parar:')} ${formatCurrency(prizes.stop)} | ${chalk.red('Errar:')} ${formatCurrency(prizes.wrong)}`);
    console.log(chalk.blue('\n--------------------------------------------------'));
    console.log(chalk.bold.white(`\n${question.question}\n`));
    const shuffledOptions = shuffleArray([...question.options]);
    shuffledOptions.forEach((option, index) => console.log(`${chalk.cyan(index + 1)}: ${option}`));
    console.log(chalk.yellow(`\nP: Parar o jogo`));
    return shuffledOptions;
}

// --- LÓGICA DO JOGO ---

async function startGame() {
    console.clear();
    console.log(chalk.bold.yellow('--- NOVO JOGO ---'));
    const playerName = prompt('Qual é o seu nome? ');
    let currentRound = 0;
    const gameQuestions = shuffleArray([...allQuestions]).slice(0, 5);

    while (currentRound < gameQuestions.length) {
        const question = gameQuestions[currentRound];
        const options = displayQuestion(question, currentRound, playerName);
        const answerInput = prompt(chalk.bold.white('Escolha uma opção (1, 2, 3) ou P para parar: ')).toUpperCase();

        if (answerInput === 'P') {
            return endGame('stop', currentRound, playerName);
        }

        const answerIndex = parseInt(answerInput, 10) - 1;
        if (isNaN(answerIndex) || answerIndex < 0 || answerIndex >= options.length) {
            console.log(chalk.red('Opção inválida! Tente novamente.'));
            await sleep(1500);
            continue;
        }

        const selectedOption = options[answerIndex];
        if (selectedOption === question.answer) {
            console.log(chalk.green('\nResposta Correta!'));
            await sleep(2000);
            currentRound++;
        } else {
            console.log(chalk.red('\nResposta Errada!'));
            await sleep(2000);
            return endGame('wrong', currentRound, playerName, question.answer);
        }
    }
    return endGame('win', currentRound, playerName);
}

function endGame(reason, round, playerName, correctAnswer = '') {
    console.clear();
    console.log(chalk.bold.yellow('================================'));
    console.log(chalk.bold.yellow('          FIM DE JOGO!'));
    console.log(chalk.bold.yellow('================================'));

    const outcomes = {
        win: {
            message: chalk.green(`\nPARABÉNS, ${playerName}! Você ganhou o prêmio máximo!`),
            prize: prizeLevels[prizeLevels.length - 1].correct
        },
        wrong: {
            message: chalk.red(`\nQue pena, ${playerName}. Você errou.`),
            prize: prizeLevels[round].wrong
        },
        stop: {
            message: chalk.yellow(`\nVocê parou, ${playerName}. Uma boa estratégia!`),
            prize: (round > 0) ? prizeLevels[round - 1].correct : 0
        }
    };
    
    const result = outcomes[reason];
    console.log(result.message);
    if (reason === 'wrong') {
        console.log(chalk.white(`A resposta correta era: ${chalk.green(correctAnswer)}`));
    }

    // Adiciona o resultado ao ranking se o prêmio for maior que zero e salva em arquivo
    if (result.prize > 0) {
        ranking.push({ name: playerName, prize: result.prize });
        saveRanking(); // Salva o ranking atualizado
    }

    
    const finalRound = reason === 'win' ? round : round + 1;
    console.log(`\nVocê chegou até a rodada: ${chalk.cyan(finalRound)}`);
    console.log(`Seu prêmio final é: ${chalk.bold.green(formatCurrency(result.prize))}`);
    console.log('\n--------------------------------\n');
}

/**
 * Função principal que controla o fluxo do jogo.
 */
async function main() {
    loadRanking(); // Carrega o ranking salvo ao iniciar

    while (true) {
        displayMainMenu();
        const choice = prompt(chalk.bold.white('Sua escolha: '));

        switch (choice) {
            case '1':
                await startGame();
                displayRanking(); // Mostra o ranking após o jogo
                break;
            case '2':
                console.clear();
                displayRanking();
                break;
            case '3':
                console.log(chalk.bold.blue('\nObrigado por jogar! Até a próxima!'));
                return; // Encerra a função e o programa
            default:
                console.log(chalk.red('Opção inválida! Tente novamente.'));
                await sleep(1500);
                continue; // Pula o prompt de pausa para opções inválidas
        }

        // Pausa para o usuário ver o ranking antes de voltar ao menu
        if (choice === '1' || choice === '2') {
            prompt(chalk.gray('Pressione ENTER para voltar ao menu...'));
        }
    }
}

main();
