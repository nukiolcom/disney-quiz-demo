
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
  result.innerHTML = "";

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.innerText = answer;
    button.classList.add("answer-btn");
    button.disabled = false;
    button.addEventListener("click", () => handleAnswer(index, button));
    answerButtons.appendChild(button);
  });

  nextBtn.style.display = "none";
}

function handleAnswer(selectedIndex, button) {
  const current = questions[currentQuestionIndex];
  const correctIndex = current.correct;

  userAnswers.push(selectedIndex);

  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIndex) {
      btn.style.backgroundColor = "#4CAF50"; // 正解 → 緑
    } else if (i === selectedIndex) {
      btn.style.backgroundColor = "#f44336"; // 不正解 → 赤
    } else {
      btn.style.backgroundColor = "#ddd";
    }
  });

  const isCorrect = selectedIndex === correctIndex;
  if (isCorrect) score++;

  result.innerHTML = isCorrect
    ? "<p style='color:green; font-size:24px;'>◯ 正解！</p>"
    : `<p style='color:red; font-size:24px;'>× 不正解</p><p>正解：${current.answers[correctIndex]}</p>`;

  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionContainer.innerText = "";
  answerButtons.innerHTML = "";
  result.innerHTML = `<h2>結果</h2>`;
  let summary = "";
  questions.forEach((q, i) => {
    const userAnswer = userAnswers[i];
    const isCorrect = userAnswer === q.correct;
    summary += `
      <div style="margin-bottom: 10px;">
        <strong>Q${i + 1}: ${q.question}</strong><br>
        あなたの答え：${q.answers[userAnswer] || "未回答"}<br>
        正解：${q.answers[q.correct]}<br>
        <span style="color: ${isCorrect ? 'green' : 'red'};'>${isCorrect ? "◎ 正解" : "× 不正解"}</span>
      </div>
    `;
  });
  summary += `<p><strong>正解数：${score} / ${questions.length}</strong></p>`;
  result.innerHTML += summary;
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
