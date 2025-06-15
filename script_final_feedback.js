
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
let userAnswers = [];

const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');
const result = document.getElementById('result');

function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionContainer.innerText = question.question;
    answerButtons.innerHTML = "";
    result.innerText = "";

    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add("answer-btn");
        button.addEventListener('click', () => {
            userAnswers.push(index);
            nextQuestion();
        });
        answerButtons.appendChild(button);
    });
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionContainer.innerText = "";
    answerButtons.innerHTML = "";
    result.innerHTML = `<h2>結果</h2>`;
    let summary = "";
    questions.forEach((q, i) => {
        const userAnswer = userAnswers[i];
        const isCorrect = userAnswer === q.correct;
        if (isCorrect) score++;
        summary += `
            <div style="margin-bottom: 10px;">
                <strong>Q${i + 1}: ${q.question}</strong><br>
                あなたの答え：${q.answers[userAnswer] || "未回答"}<br>
                正解：${q.answers[q.correct]}<br>
                <span style="color: ${isCorrect ? 'green' : 'red'};">${isCorrect ? "◎ 正解" : "× 不正解"}</span>
            </div>
        `;
    });

    summary += `<p><strong>正解数：${score} / ${questions.length}</strong></p>`;
    result.innerHTML += summary;
}

showQuestion();
