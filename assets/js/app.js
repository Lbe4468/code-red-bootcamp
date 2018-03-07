var questions = [{
	question: "Describe your current level of activity.",
	choices: ["Always on the go!", "I'm active, but I do love my couch!", "Room for improvment."],
}, {
	question: "How many days a week do you hit the gym?",
	choices: ["0-1", "2-4", "5-7"],
}, {
	question: "What results do you want to acheive?",
	choices: ["I like where I'm at, I just want to keep it that way!", "I want to be the Incredible Hulk", "I need to get my beach body back!"],
}, {
	question: "How many days a week are you committing to achieve your goal?",
	choice: ["2-3", "3-4", "5-6"]
}];

var currentQuestion = 0;
var totalQuestions = 0;
var quizOver = false;
var wgerURL = "https://wger.de/api/v2/workout/ \
-H 'Authorization: Token fbb1fbba723e77e657f5c9c5db95bdae8444e136'"
// when the document loads...
$(document).ready(function () {


	
	// Displaying questions on the question page.
	function displayCurrentQuestion() {


		var question = questions[currentQuestion].question;
		var questionClass = $(document).find(".quizContainer > .question");
		var choiceList = $(document).find(".quizContainer > .choiceList");
		var numChoices = questions[currentQuestion].choices.length;
	
		// Set the questionClass text to the current question
		$('.question').text(question);
	
		// Remove all current <li> elements (if any)
		$('.choiceList').find("li").remove();
	
		var choice;
		for (i = 0; i < numChoices; i++) {
			choice = questions[currentQuestion].choices[i];
			$('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo('.choiceList');
		}
	}
	
displayCurrentQuestion();
$(this).find('nextButton').on('click', function(){
	if (!quizOver) {
		value = $("input[type='radio']:checked").val();
				console.log('value: ', value);
	}
})
});