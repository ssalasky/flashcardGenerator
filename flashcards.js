var basic = require("./BasicCard.js");
var cloze = require("./ClozeCard.js");

var inquirer = require("inquirer");

var questions = [
	{
		question: "Who was the first president of the United States of America?",
		answer: "George Washington was the first president of the United States of America.",
		cloze: "George Washington"
	},
	{
		question: "Who is the current president of the United States of America?",
		answer: "Donald Trump is the current president of the United States of America",
		cloze: "Donald Trump"
	}
];

var current = 0;
var correct = 0;
var incorrect = 0;

function initialize() {
	inquirer.prompt([
		{
			type: "list",
			message: "Which version would you like to play?",
			choices: ["Basic", "Challenge"],
			name: "game"
		}
	]).then(function(answer) {
		if (answer.choice === "Basic") {
			basicDisplay();
		} else {
			challengeDisplay();
		}
	})
}

function basicDisplay() {
	if (current < questions.length) {
		inquirer.prompt([
			{
				type: "input",
				message: quetions[current].question,
				name: "question"
			}
		]).then(function(inquirerResponse) {
			if(questions[current].cloze.toLowerCase === inquirerResponse.question.toLowerCase) {
				console.log(questions[current].answer);
				current++;
				correct++;
				basicDisplay();
			} else {
				console.log(questions[current].answer);
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

function reset() {
	current = 0;
	correct = 0;
	incorrect = 0;
	initialize();
};