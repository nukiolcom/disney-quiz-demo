
const questions = [
    {
        question: "ミッキーマウスの恋人は？",
        answers: ["ミニー", "デイジー", "クラリス", "アリエル"],
        correct: 0
    },
    {
        question: "アナと雪の女王の主人公は？",
        answers: ["エルサ", "アナ", "ラプンツェル", "モアナ"],
        correct: 1
    },
    {
        question: "ディズニーランドが最初に開園した国は？",
        answers: ["アメリカ", "日本", "フランス", "中国"],
        correct: 0
    },
    {
        question: "プーさんの親友の名前は？",
        answers: ["ピグレット", "ティガー", "イーヨー", "ラビット"],
        correct: 0
    },
    {
        question: "アラジンのペットの猿の名前は？",
        answers: ["アブー", "ラジャー", "ジーニー", "サルタン"],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');
const result = document.getElementById('result');

function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionContainer.innerText = question.question;
    answerButtons.innerHTML = "";

    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.addEventListener('click', () => selectAnswer(index));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(index) {
    const correct = questions[currentQuestionIndex].correct;
    if (index === correct) {
        score++;
    }
    nextBtn.style.display = "block";
}

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    nextBtn.style.display = "none";
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    questionContainer.innerText = "";
    answerButtons.innerHTML = "";
    result.innerText = `正解数：${score} / ${questions.length}`;
}

showQuestion();
