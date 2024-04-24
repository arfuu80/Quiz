

let questions = [
    {
        prompt: "What is the main ingredient in chocolate?",
        options: [
            "Sugar",
            "Cocoa",
            "Flour",
            "Butter"
        ],
        answer: "Cocoa"
    },

	{
		prompt: "Which type of chocolate contains the highest percentage of cocoa?",
		options: [
			" Milk chocolate",
			"Dark chocolate",
			"White chocolate",
			"Ruby chocolate"
		],
		answer: "Dark chocolate"
	},
	{
		prompt: "Which famous chocolate bar was introduced by Cadbury in 1905?",
		options: [
			"Mars",
			"Snickers",
			"He	rshey's",
			"Dairy milk"
		],
		answer: "Dairy milk"
	},
	
	{
		prompt: "Which country is the largest producer of cocoa beans?",
		options: [
			" Switzerland",
			" Belgium",
			"Ivory Coast",
			"Brazil"
		],
		answer: "Ivory Coast"
	},
	
	{
		prompt: "What is the name of the small pieces of chocolate typically used in baking, which are often sold in the form of small, flat, teardrop-shaped discs?",
		options: [
			" Chocolate chips",
			"Chocolate chunks",
			"Chocolate buttons",
			"Chocolate shavings"
		],
		answer: "Chocolate chips"
	},
    {
        prompt: "Which chocolate brand uses the slogan Melts in your mouth, not in your hand?",
        options: [
            " Nestlé",
            "Hershey's",
            "Mars",
            "Lindt"
        ],
        answer: "Mars"
    },

    {
        prompt: "What is the name of the Swiss chocolatier known for its smooth, creamy milk chocolate and gold foil packaging?",
        options: [
            "Toblerone",
            "Lindt",
            "Ferrero Rocher",
            "Godiva"
        ],
        answer: "Lindt"
    },

    {
        prompt: "In which year was the chocolate bar first invented?",
        options: [
            "1800",
            "1850",
            "1900",
            "1920"
        ],
        answer: "1850"
    },

    {
        prompt: "Which type of chocolate is made from cocoa butter, sugar, and milk solids, but does not contain any cocoa solids?",
        options: [
            " Milk chocolate",
            "Dark chocolate",
            "White chocolate",
            "Ruby chocolate"
        ],
        answer: "White chocolate"
    },









	

];



let questionsEl = 
	document.querySelector( 
		"#questions"
	); 
let timerEl = 
	document.querySelector("#timer"); 
let choicesEl = 
	document.querySelector("#options"); 
let submitBtn = document.querySelector( 
	"#submit-score"
); 
let startBtn = 
	document.querySelector("#start"); 
let nameEl = 
	document.querySelector("#name"); 
let feedbackEl = document.querySelector( 
	"#feedback"
); 
let reStartBtn = 
	document.querySelector("#restart"); 

let currentQuestionIndex = 0; 
let time = questions.length * 15; 
let timerId; 


function quizStart() { 
	timerId = setInterval( 
		clockTick, 
		1000 
	); 
	timerEl.textContent = time; 
	let landingScreenEl = 
		document.getElementById( 
			"start-screen"
		); 
	landingScreenEl.setAttribute( 
		"class", 
		"hide"
	); 
	questionsEl.removeAttribute( 
		"class"
	); 
	getQuestion(); 
} 

function getQuestion() { 
	let currentQuestion = 
		questions[currentQuestionIndex]; 
	let promptEl = 
		document.getElementById( 
			"question-words"
		); 
	promptEl.textContent = 
		currentQuestion.prompt; 
	choicesEl.innerHTML = ""; 
	currentQuestion.options.forEach( 
		function (choice, i) { 
			let choiceBtn = 
				document.createElement( 
					"button"
				); 
			choiceBtn.setAttribute( 
				"value", 
				choice 
			); 
			choiceBtn.textContent = 
				i + 1 + ". " + choice; 
			choiceBtn.onclick = 
				questionClick; 
			choicesEl.appendChild( 
				choiceBtn 
			); 
		} 
	); 
} 


function questionClick() { 
	if ( 
		this.value !== 
		questions[currentQuestionIndex] 
			.answer 
	) { 
		time -= 10; 
		if (time < 0) { 
			time = 0; 
		} 
		timerEl.textContent = time; 
		feedbackEl.textContent = `Wrong! The correct answer was 
		${questions[currentQuestionIndex].answer}.`; 
		feedbackEl.style.color = "red"; 
	} else { 
		feedbackEl.textContent = 
			"Correct!"; 
		feedbackEl.style.color = 
			"green"; 
	} 
	feedbackEl.setAttribute( 
		"class", 
		"feedback"
	); 
	setTimeout(function () { 
		feedbackEl.setAttribute( 
			"class", 
			"feedback hide"
		); 
	}, 2000); 
	currentQuestionIndex++; 
	if ( 
		currentQuestionIndex === 
		questions.length 
	) { 
		quizEnd(); 
	} else { 
		getQuestion(); 
	} 
} 


function quizEnd() { 
	clearInterval(timerId); 
	let endScreenEl = 
		document.getElementById( 
			"quiz-end"
		); 
	endScreenEl.removeAttribute( 
		"class"
	); 
	let finalScoreEl = 
		document.getElementById( 
			"score-final"
		); 
	finalScoreEl.textContent = time; 
	questionsEl.setAttribute( 
		"class", 
		"hide"
	); 
} 


function clockTick() { 
	time--; 
	timerEl.textContent = time; 
	if (time <= 0) { 
		quizEnd(); 
	} 
} 


function saveHighscore() { 
	let name = nameEl.value.trim(); 
	if (name !== "") { 
		let highscores = 
			JSON.parse( 
				window.localStorage.getItem( 
					"highscores"
				) 
			) || []; 
		let newScore = { 
			score: time, 
			name: name, 
		}; 
		highscores.push(newScore); 
		window.localStorage.setItem( 
			"highscores", 
			JSON.stringify(highscores) 
		); 
		alert( 
			"Your Score has been Submitted"
		); 
	} 
} 


function checkForEnter(event) { 
	if (event.key === "Enter") { 
		saveHighscore(); 
		alert( 
			"Your Score has been Submitted"
		); 
	} 
} 
nameEl.onkeyup = checkForEnter; 


submitBtn.onclick = saveHighscore; 


startBtn.onclick = quizStart;
