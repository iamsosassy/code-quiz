var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
let shuffledQuestions, currentQuestionIndex
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')

var correctAnswers = 0
var wrongAnswers = 0

var sec = 15;
var currentSelectionCorrect = false
var time

function myTimer() {
    document.getElementById('timer').innerHTML = sec + "sec left";
    sec--;
    if (sec == -1) {
        clearInterval(time);
        alert("Time out!! :(");
        currentQuestionIndex++
        sec = 15
        document.getElementById('timer').innerHTML = sec + "sec left";
        wrongAnswers++
        setNextQuestion()
    }
}

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    clearInterval(time)
    if (currentSelectionCorrect === true) {
        correctAnswers++
        alert('Word!! On the money!')
    } else {
        wrongAnswers++
        alert('Nope, you are going to learn today!')
    }
    sec = 15
    document.getElementById('timer').innerHTML = sec + "sec left";

    setNextQuestion()
})


function startGame() {
    correctAnswers = 0
    wrongAnswers = 0
    startButton.classList.add('hidden')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hidden')
    setNextQuestion()
}


function setNextQuestion() {
    document.getElementById('timer').innerHTML = sec + "sec left";
    time = setInterval(myTimer, 1000)
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}
function showQuestion(question) {
    console.log('Wins:', correctAnswers, 'Losses: ', wrongAnswers);
    questionElement.innerHTML = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    console.log('net button ?', nextButton.classList);
    nextButton.classList.add('hidden')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
            (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    if (correct) {
        currentSelectionCorrect = true
    } else {
        currentSelectionCorrect = false
    }
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hidden')
    } else {
        alert('You got' + correctAnswers + 'right, and ' + wrongAnswers + ' wrong!!!');

        localStorage.setItem('highScoreCorrect', correctAnswers);

        startButton.innerText = 'Restart'
        startButton.classList.remove('hidden')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {

        element.classList.add('correct')
    } else {

        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
var questions = [
    {
        question: 'Which of the below is NOT one of the four fundamental elements of hip-hop?',
        answers: [

            { text: 'Trap', correct: true },
            { text: 'DJing', correct: false },
            { text: 'Graffiti', correct: false },
            { text: 'B-boying', correct: false },
        ]
    },
    {
        question: 'What year did Tupac release his iconic song "California Love?',
        answers: [

            { text: '1995', correct: true },
            { text: '1994', correct: false },
            { text: '1996', correct: false },
            { text: '1993', correct: false },
        ]
    },
    {
        question: 'Who sings the hook on Jay Z\'s, Can\'t Knock the Hustle?',
        answers: [

            { text: 'Mary J Blige', correct: true },
            { text: 'Beyonce', correct: false },
            { text: 'Foxy Brown', correct: false },
            { text: 'Lauren Hill', correct: false },
        ]
    },
    {

        question: 'NWA came out in the late 80\'s, but made their mark in the early 90\'s! Can you name all of the original members?',
        answers: [

            { text: 'Dr. Dre, Ice Cube, Easy-E, DJ Yella, and MC Ren', correct: true },
            { text: 'Dr. Dre, Ice Cube, and Easy-E', correct: false },
            { text: 'Dr. Dre, Ice Cube, DJ Yella, and Jerry Heller', correct: false },
            { text: 'Snoop Dog, Suge Knight, Dr. Dre, and Easy-E', correct: false },
        ]
    },
    {
        question: 'In 1994, Nas released his first studio album called ______',
        answers: [

            { text: 'Illmatic', correct: true },
            { text: 'The World is Yours', correct: false },
            { text: 'It was Written', correct: false },
            { text: 'If I Rule the World', correct: false },
        ]
    },
    {
        question: 'When did the Hip-Hop movement start?',
        answers: [

            { text: '1960s', correct: false },
            { text: '1970s', correct: true },
            { text: '1980s', correct: false },
            { text: '1990s', correct: false },

        ]

    },

    {
        question: 'Where did Hip-Hop originate?',
        answers: [

            { text: 'Brooklyn, NY', correct: false },
            { text: 'Staten Island', correct: false },
            { text: 'Queens', correct: false },
            { text: 'Bronx, NY', correct: true },

        ]

    },

    {
        question: 'Who is the founding Father of Hip-Hop?',
        answers: [

            { text: 'Kool Herc', correct: true },
            { text: 'Afrika Bambaataa', correct: false },
            { text: 'Grand Wizard Theodore', correct: false },
            { text: 'Grand Master Flash', correct: false },

        ]

    },

    {
        question: 'Who was the first Female to release a solo rap album?',
        answers: [

            { text: 'Queen Latifah', correct: false },
            { text: 'Mc Lyte', correct: true },
            { text: 'Cardi B', correct: false },
            { text: 'Lil Kim', correct: false },

        ]

    },

    {
        question: 'Who was the original founder of Def Jam Records?',
        answers: [

            { text: 'Rick Rubin', correct: true },
            { text: 'Russell Simmons', correct: false },
            { text: 'Suge Knight', correct: false },
            { text: 'Jay-Z', correct: false },

        ]

    },


]
