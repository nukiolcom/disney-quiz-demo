
let allQuestions = {};
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const questionContainer = document.getElementById("question-container");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const result = document.getElementById("result");

fetch("disney_quiz_3levels_real.json")
  .then((res) => res.json())
  .then((data) => {
    allQuestions = data;
  });

function startQuiz(level) {
  questions = shuffle([...allQuestions[level]]);
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];

  startScreen.style.display = "none";
  quizScreen.style.display = "block";
  showQuestion();
}

function showQuestion() {
  const question = questions[currentQuestionIndex];
  questionContainer.innerText = `Q${currentQuestionIndex + 1} / ${questions.length}: ${question.question}`;
  answerButtons.innerHTML = "";
  result.innerText = "";

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.innerText = answer;
    button.classList.add("answer-btn");
    button.addEventListener("click", () => {
      userAnswers.push(index);
      nextQuestion();
    });
    answerButtons.appendChild(button);
  });
}

nextBtn.addEventListener("click", () => {
  nextQuestion();
});

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

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
