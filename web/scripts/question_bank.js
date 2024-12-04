//加载动画
const loading ={
    container: document.querySelector('.loading'),
    in(page){
        this.container.classList.remove('loading_out');
        setTimeout(()=>{
            window.location.href = page;
        },1000);
    },
    out(){
        this.container.classList.add('loading_out'); 
    }
}
window.addEventListener('load',()=>{
        loading.out();
})

//选择题json
let questions = [
    { "question": "What is the capital of France?", "options": ["Paris", "London", "Berlin", "Madrid"], "answer": "Paris" }
];

// 从 localStorage 加载题目
function loadQuestionsFromLocalStorage() {
    const storedQuestions = localStorage.getItem('questions');
    if (storedQuestions) {
        return JSON.parse(storedQuestions);
    }
    return [];
}

// 查看 localStorage 中的题目
function viewStorage() {
    const storedQuestions = localStorage.getItem('questions');
    alert(storedQuestions);
}
// 清空 localStorage
function clearStorage() {
    localStorage.removeItem('questions');
    questions = questions.slice(0, 3); // 保留实例题目
    loadQuestions();
}
// 绑定查看和清空 localStorage 按钮事件
document.getElementById('view-storage-btn').addEventListener('click', viewStorage);
document.getElementById('clear-storage-btn').addEventListener('click', clearStorage);

// 将题目保存到 localStorage
function saveQuestionsToLocalStorage() {
    localStorage.setItem('questions', JSON.stringify(questions));
}

// 合并存储的题目到实例题目中
const storedQuestions = loadQuestionsFromLocalStorage();
if (Array.isArray(storedQuestions)) {
    questions = questions.concat(storedQuestions);
} else {
    console.error("Stored questions are not in a valid array format.");
}

//自然语言转换json
function convertToJSON() {
    const text = document.getElementById('question-text').value;
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);

    if (lines.length < 6) {
        alert("Please enter a valid question with at least 4 options and an answer.");
        return;
    }

    const question = lines[0];
    const options = lines.slice(1, 5).map(option => option.replace(/^\d+\.\s*/, ''));
    const answer = lines[5].replace('Answer: ', '');

    const questionObject = {
        question: question,
        options: options,
        answer: answer
    };

    const output = document.getElementById('output');
    output.textContent = JSON.stringify(questionObject, null, 2);
}
//绑定转换按钮事件
document.getElementById('convert-btn').addEventListener('click', convertToJSON);

// 获取相关元素
const toggleEnglishButton = document.getElementById('toggleEnglish');
const toggleChineseButton = document.getElementById('toggleChinese');
const wordList = document.getElementById('wordList');

// 英文和中文的显示状态
let isEnglishHidden = false;
let isChineseHidden = false;

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


// 添加题目
function addQuestion() {
    const questionsJson = prompt("Enter the questions JSON string (multiple JSON objects separated by commas):");
    try {
        const newQuestions = JSON.parse(`[${questionsJson}]`);
        newQuestions.forEach(newQuestion => {
            if (newQuestion.question && newQuestion.options && newQuestion.answer) {
                questions.push(newQuestion);
            } else {
                alert("Invalid question format. Please ensure each question includes 'question', 'options', and 'answer'.");
            }
        });
        saveQuestionsToLocalStorage();
        loadQuestions();
    } catch (e) {
        alert("Invalid JSON format. Please enter valid JSON strings.");
    }
}
// 绑定添加题目按钮事件
document.getElementById('add-question-btn').addEventListener('click', addQuestion);

// 初始化加载题目
loadQuestions();
