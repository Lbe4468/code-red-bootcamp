var questions = [{
	question: "describe your current level of activity.", 
	choices: ["Always on the go!", "I'm active, but i do love my couch!", "Room for improvment."],
},{
	question: "How many days a week do you hit the gym?",
	choices: ["0-1", "2-4", "5-7"],
},{
	question: "What results do you want to see?",
	choices: ["I like where i'm at, i just want to keep it that way!", "I want to be the Incredible Hulk", "I need to get my bikini body back!.."],
},{
	question: "How many days a week are you committing to achieve your goal?",
	choice: ["2-3", "3-4", "5-6"]
}];

var wgerURL = "https://wger.de/api/v2/workout/ \
-H 'Authorization: Token fbb1fbba723e77e657f5c9c5db95bdae8444e136'"
// when the document loads...
$(document).ready(function(){

// Displaying questions on the question page.
	function displayQuestion(){
			var question = questions[currentQuestion].question;
			var choices = questions[currentQuestion].choices.length;
			var questionClass = $(document).find(".section > .question");
			var numChoices = $(document).find(".section > .question");
	}
	//put questions on page.
	$(questionClass).text(question);
	$(numChoices).find("li").remove();
	var choice; 
	for(i = 0; i < numChoices; i++){
	choice = question[currentQuestion].choices[i];
	}

});