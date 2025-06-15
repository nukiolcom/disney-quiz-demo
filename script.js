
let questions = [
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
    },
    {
        question: "シンデレラのガラスの靴を届けたのは誰？",
        answers: ["王子", "ネズミたち", "魔法使い", "王家の使者"],
        correct: 3
    },
    {
        question: "『リトル・マーメイド』の主人公の名前は？",
        answers: ["アリエル", "ベル", "エルサ", "ジャスミン"],
        correct: 0
    },
    {
        question: "『トイ・ストーリー』のカウボーイの名前は？",
        answers: ["ウッディ", "バズ", "ジェシー", "レックス"],
        correct: 0
    },
    {
        question: "ミッキーの犬の名前は？",
        answers: ["グーフィー", "プルート", "マックス", "チップ"],
        correct: 1
    },
    {
        question: "美女と野獣の主人公の名前は？",
        answers: ["ベル", "ジャスミン", "アナ", "オーロラ"],
        correct: 0
    },
    {
        question: "『ズートピア』のうさぎの警察官の名前は？",
        answers: ["ジュディ", "ニック", "クロウハウザー", "ボゴ"],
        correct: 0
    },
    {
        question: "『モアナ』で海を渡る主人公の名前は？",
        answers: ["モアナ", "マウイ", "テ・フィティ", "タマトア"],
        correct: 0
    },
    {
        question: "『ライオン・キング』の主人公は？",
        answers: ["シンバ", "ムファサ", "スカー", "ナラ"],
        correct: 0
    },
    {
        question: "『塔の上のラプンツェル』のヒロインの特徴は？",
        answers: ["長い髪", "翼", "透明になる", "氷を操る"],
        correct: 0
    },
    {
        question: "『ベイマックス』はどんなキャラ？",
        answers: ["ケアロボット", "犬", "車", "ぬいぐるみ"],
        correct: 0
    },
    {
        question: "ミッキーの仲間で、口笛を吹くアヒルは？",
        answers: ["ドナルド", "デイジー", "グーフィー", "プルート"],
        correct: 0
    },
    {
        question: "『101匹わんちゃん』に登場する犬種は？",
        answers: ["ダルメシアン", "チワワ", "柴犬", "ラブラドール"],
        correct: 0
    },
    {
        question: "『リメンバー・ミー』のテーマは？",
        answers: ["死者の日", "海の冒険", "お菓子作り", "未来の世界"],
        correct: 0
    },
    {
        question: "『シュガー・ラッシュ』でゲームの世界を旅するのは？",
        answers: ["ラルフ", "ヴァネロペ", "ソニック", "ピーチ姫"],
        correct: 0
    },
    {
        question: "『カーズ』の主人公の車の名前は？",
        answers: ["ライトニング・マックィーン", "メーター", "サリー", "ルイジ"],
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
const scoreTracker = document.createElement("div");
scoreTracker.id = "score-tracker";
scoreTracker.style.margin = "10px 0";
scoreTracker.style.fontWeight = "bold";
document.querySelector(".quiz-container").insertBefore(scoreTracker, questionContainer);

function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionContainer.innerText = `Q${currentQuestionIndex + 1} / ${questions.length}: ${question.question}`;
    answerButtons.innerHTML = "";
    result.innerText = "";
updateScore();

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

function updateScore() {
    scoreTracker.innerText = `正解数：${score} 問`;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        updateScore();
        shuffleQuestions();
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

shuffleQuestions();
showQuestion();


function shuffleQuestions() {
    questions = questions.sort(() => Math.random() - 0.5);
}
