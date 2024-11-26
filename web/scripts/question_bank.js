//选择题json
const questions = [
    { "question": "What is the capital of France?", "options": ["Paris", "London", "Berlin", "Madrid"], "answer": "Paris" },
    { "question": "What is the largest planet in our solar system?", "options": ["Earth", "Mars", "Jupiter", "Saturn"], "answer": "Jupiter" },
    { "question": "What is the chemical symbol for water?", "options": ["H2O", "O2", "CO2", "NaCl"], "answer": "H2O" }
];

//填空题json
const words = [
    { "english": "Medical Informatics", "chinese": "医学信息学" },
    { "english": "wearable medical devices", "chinese": "可穿戴医疗设备" },
];

// 获取相关元素
const toggleEnglishButton = document.getElementById('toggleEnglish');
const toggleChineseButton = document.getElementById('toggleChinese');
const wordList = document.getElementById('wordList');

// 英文和中文的显示状态
let isEnglishHidden = false;
let isChineseHidden = false;


// 动态加载选择题
questions.forEach(question => {
    const questionItem = document.createElement('div');
    questionItem.classList.add('question-item');
    questionItem.innerHTML = `
        <div class="question">${question.question}</div>
        <div class="options">
            ${question.options.map((option, index) => `
                <label class="option">
                    <input type="radio" name="question-${question.question}" value="${option}">
                    ${index + 1}. ${option}
                </label>
            `).join('')}
        </div>
    `;
    document.querySelector('#question-list').appendChild(questionItem);

    // 获取所有单选按钮
    const radioButtons = questionItem.querySelectorAll('input[type="radio"]');
    const questionDiv = questionItem.querySelector('.question');

    // 监听单选按钮的变化事件
    radioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === question.answer) {
                questionDiv.style.backgroundColor = '#00FF7F';
            } else {
                questionDiv.style.backgroundColor = '#FF4500';
            }
        });
    });
});



// 动态加载选择题
function loadQuestions() {
    const questionList = document.getElementById('question-list');
    questionList.innerHTML = ''; // 清空现有的题目
    questions.forEach(question => {
        const questionItem = document.createElement('div');
        questionItem.classList.add('question-item');
        questionItem.innerHTML = `
            <div class="question">${question.question}</div>
            <div class="options">
                ${question.options.map((option, index) => `
                    <label class="option">
                        <input type="radio" name="question-${question.question}" value="${option}">
                        ${index + 1}. ${option}
                    </label>
                `).join('')}
            </div>
        `;
        questionList.appendChild(questionItem);

        // 获取所有单选按钮
        const radioButtons = questionItem.querySelectorAll('input[type="radio"]');
        const questionDiv = questionItem.querySelector('.question');

        // 监听单选按钮的变化事件
        radioButtons.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.value === question.answer) {
                    questionDiv.style.backgroundColor = '#00FF7F';
                } else {
                    questionDiv.style.backgroundColor = '#FF4500';
                }
            });
        });
    });
}

// 隐藏或显示英文单词
toggleEnglishButton.addEventListener('click', () => {
    isEnglishHidden = !isEnglishHidden;
    const englishSpans = document.querySelectorAll('.english');
    englishSpans.forEach(span => {
        span.style.display = isEnglishHidden ? 'none' : 'inline';
    });
    toggleEnglishButton.textContent = isEnglishHidden ? '显示英文' : '隐藏英文';
});

// 隐藏或显示中文翻译
toggleChineseButton.addEventListener('click', () => {
    isChineseHidden = !isChineseHidden;
    const chineseSpans = document.querySelectorAll('.chinese');
    chineseSpans.forEach(span => {
        span.style.display = isChineseHidden ? 'none' : 'inline';
    });
    toggleChineseButton.textContent = isChineseHidden ? '显示中文' : '隐藏中文';
});

// 添加题目
function addQuestion() {
    const questionJson = prompt("Enter the question JSON string:");
    try {
        const newQuestion = JSON.parse(questionJson);
        if (newQuestion.question && newQuestion.options && newQuestion.answer) {
            questions.push(newQuestion);
            loadQuestions();
        } else {
            alert("Invalid question format. Please ensure it includes 'question', 'options', and 'answer'.");
        }
    } catch (e) {
        alert("Invalid JSON format. Please enter a valid JSON string.");
    }
}

// 初始化加载题目
loadQuestions();

// 绑定添加题目按钮事件
document.getElementById('add-question-btn').addEventListener('click', addQuestion);