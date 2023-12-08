const choices = document.querySelectorAll('.choice input');

choices.forEach(choice => {
    choice.addEventListener('change', () => {
        if (choice.checked) {
            document.getElementById('css').href = choice.id;
        }
    });
});

const questions = [
    { question: "Quelle est la principale cause du réchauffement climatique?", options: ["Les éruptions volcaniques", "L'activité humaine", "Les variations naturelles"], correctAnswer: 1 },
    { question: "Quelle est la principale source d'émissions de gaz à effet de serre?", options: ["Industrie", "Transport", "Agriculture", "Toutes les réponses ci-dessus"], correctAnswer: 3 },
    { question: "Quelle action contribue le plus à la réduction de l'empreinte carbone?", options: ["Réduire la consommation d'énergie", "Utiliser des énergies renouvelables", "Recycler", "Manger moins de viande"], correctAnswer: 3 },
    { question: "Quel est l'effet du déboisement sur le climat?", options: ["Refroidissement de la planète", "Augmentation des émissions de CO2", "Aucun effet"], correctAnswer: 1 },
    { question: "Qu'est-ce que l'effet de serre?", options: ["Un phénomène météorologique", "Une augmentation de la chaleur due à des gaz dans l'atmosphère", "Un refroidissement de la planète"], correctAnswer: 1 },
    { question: "Quelle est la principale menace pour les récifs coralliens liée au changement climatique?", options: ["La pollution plastique", "L'acidification des océans", "La surpêche"], correctAnswer: 2 },
    { question: "Quelle est la principale source d'énergie renouvelable utilisée pour produire de l'électricité?", options: ["Énergie solaire", "Énergie éolienne", "Énergie hydraulique", "Toutes les réponses ci-dessus"], correctAnswer: 3 },
    { question: "Qu'est-ce que la neutralité carbone?", options: ["Absence totale d'émissions de carbone", "Équilibre entre les émissions et les absorptions de carbone", "Réduction de la consommation de carburant"], correctAnswer: 2 },
    { question: "Quel est l'impact du changement climatique sur la biodiversité?", options: ["Aucun impact", "Diminution de la biodiversité", "Augmentation de la biodiversité"], correctAnswer: 1 },
    { question: "Quel gaz à effet de serre est principalement émis par l'agriculture?", options: ["Dioxyde de carbone (CO2)", "Méthane (CH4)", "Protoxyde d'azote (N2O)"], correctAnswer: 1 }
];

const explanations = [
    "L'activité humaine, en particulier les émissions de gaz à effet de serre, est la principale cause du réchauffement climatique. C'est pourquoi il est crucial de réduire notre empreinte carbone.",
    "La réponse est correcte ! L'agriculture, l'industrie et le transport contribuent tous aux émissions de gaz à effet de serre, ce qui affecte le climat. Réduire ces émissions est essentiel pour lutter contre le changement climatique.",
    "Excellent choix ! La consommation de viande a un impact significatif sur l'environnement. En mangeant moins de viande, nous pouvons réduire la pression sur les ressources naturelles et diminuer notre empreinte carbone.",
    "Le déboisement a un impact négatif sur le climat en augmentant les émissions de CO2. Les arbres absorbent le CO2, et leur abattage contribue au changement climatique.",
    "Exact ! L'effet de serre est un phénomène naturel qui retient la chaleur dans l'atmosphère. Cependant, les activités humaines ont augmenté la concentration de gaz à effet de serre, intensifiant cet effet.",
    "Bien joué ! L'acidification des océans est une menace majeure pour les récifs coralliens. Elle résulte de l'absorption par les océans du CO2 émis par les activités humaines.",
    "Bonne réponse ! Les énergies solaire, éolienne et hydraulique sont des sources d'énergie renouvelable. Elles contribuent à réduire la dépendance aux combustibles fossiles.",
    "Correct ! La neutralité carbone signifie équilibrer les émissions de carbone avec les absorptions. Cela peut être atteint par des pratiques durables et des projets de reboisement.",
    "C'est exact ! Le changement climatique peut entraîner une diminution de la biodiversité en perturbant les écosystèmes et en modifiant les conditions environnementales.",
    "Bonne réponse ! L'agriculture émet principalement du dioxyde de carbone (CO2), notamment par la déforestation et la combustion de résidus agricoles."
];

let currentQuestionIndex = 0;
let score = 0;

const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const explanationElement = document.getElementById('explanation');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');

function startQuiz() {
    questionContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    loadQuestion(currentQuestionIndex);
}

function loadQuestion(index) {
    explanationElement.innerHTML = ""; // Efface l'explication
    const currentQuestion = questions[index];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option, i) => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.textContent = option;
        button.addEventListener('click', () => selectOption(i));
        optionsContainer.appendChild(button);
    });
}

function selectOption(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedButton = optionsContainer.children[selectedIndex];

    if (selectedIndex === currentQuestion.correctAnswer) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('incorrect');
    }

    explanationElement.innerHTML = `<p>${explanations[currentQuestionIndex]}</p>`;
}

function updateScore() {
    scoreElement.textContent = `Score: ${score} / ${currentQuestionIndex}`;
}

function showResult() {
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    resultElement.textContent = `Votre score final est de ${score} / ${questions.length}.`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    updateScore();
    startQuiz();
}

startQuiz();

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;

    optionsContainer.childNodes.forEach(button => {
        button.classList.remove('correct', 'incorrect');
    });

    if (currentQuestionIndex < questions.length) {
        explanationElement.innerHTML = ""; // Efface l'explication pour la nouvelle question
        updateScore();
        loadQuestion(currentQuestionIndex);
    } else {
        showResult();
    }
});

restartButton.addEventListener('click', restartQuiz);
