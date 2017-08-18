//imported external files to run programs
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var cards = require("./cardData.json");

//adding node package to improve user interface
var inquirer = require("inquirer");

//arrays to hold the cards for the game
var basicArray = [];
var clozeArray = [];

//variables to track progress of game
var current = 0;
var correct = 0;
var incorrect = 0;

//building the two types of cards
function basicCards() {
	for (var i = 0; i < cards.questions.length; i++) {
		newCard = new BasicCard(cards.questions[i].front, cards.questions[i].back);

		// console.log(newCard);

		basicArray.push(newCard);
	};
	
	// console.log(basicArray);
};



function clozeCards() {
	for (var i = 0; i < cards.questions.length; i++) {
		var newCard = new ClozeCard(cards.questions[i].fullText, cards.questions[i].back);

		newCard.checkCloze();

		clozeArray.push(newCard);
		clozeArray.push(newCard.partial());
	}
};

//starting the prompt to begin flashcards
function initialize() {
	inquirer.prompt([
		{
			type: "list",
			message: "Which version would you like to play?",
			choices: ["Basic", "Challenge"],
			name: "game"
		}
	]).then(function(answer) {
		if (answer.game === "Basic") {
			basicDisplay();
		} else {
			challengeDisplay();
		}
	})
};

//basic flashcard game
function basicDisplay() {
	if (current < basicArray.length) {
		inquirer.prompt([
			{
				type: "input",
				message: basicArray[current].front,
				name: "question"
			}
		]).then(function(inquirerResponse) {
			if(basicArray[current].back.toLowerCase() === inquirerResponse.question.toLowerCase()) {
				console.log("Correct!");
				console.log(basicArray[current].back.toLowerCase());
				current++;
				correct++;
				basicDisplay();
			} else {
				console.log("That is not correct.");
				current++;
				incorrect++;
				basicDisplay();
			};
		});
	} else {
		console.log("Correct: " + correct);
		console.log("Incorrect: " + incorrect);
		inquirer.prompt([
			{
				type: "confrim",
				message: "Play again?",
				name: "confirm",
				default: true
			}
		]).then(function(inquirerResponse) {
			if (inquirerResponse.confirm) {
				reset();
			} else {
				console.log("That's okay, come back when you are ready to play again.");
			};
		});
	};
};


//jeopardy version of the flashcard game
function challengeDisplay() {
	if (current < clozeArray.length) {
		inquirer.prompt([
			{
				type: "input",
				message: clozeArray[current].partialText,
				name: "question"
			}
		]).then(function(inquirerResponse) {
			if(clozeArray[current].cloze.toLowerCase() === inquirerResponse.question.toLowerCase()) {
				console.log("Correct!");
				current++;
				correct++;
				basicDisplay();
			} else {
				console.log("That is not correct.");
				current++;
				incorrect++;
				basicDisplay();
			};
		});
	} else {
		console.log("Correct: " + correct);
		console.log("Incorrect: " + incorrect);
		inquirer.prompt([
			{
				type: "confrim",
				message: "Play again?",
				name: "confirm",
				default: true
			}
		]).then(function(inquirerResponse) {
			if (inquirerResponse.confirm) {
				reset();
			} else {
				console.log("That's okay, come back when you are ready to play again.");
			};
		});
	};
};

//restarting the game
function reset() {
	current = 0;
	correct = 0;
	incorrect = 0;
	initialize();
};

basicCards();
clozeCards();

initialize();
