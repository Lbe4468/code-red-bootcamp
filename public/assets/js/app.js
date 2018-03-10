// api key...
var config = {
  apiKey: "AIzaSyBYfKRi1L1Bx3HjDzdPSzm22XIOssPbh-Y",
  authDomain: "code-red-bootcamp.firebaseapp.com",
  databaseURL: "https://code-red-bootcamp.firebaseio.com",
  projectId: "code-red-bootcamp",
  storageBucket: "code-red-bootcamp.appspot.com",
  messagingSenderId: "926767366245"
};
// initialize firebase...
firebase.initializeApp(config);
var database = firebase.database();
var firstName;
var lastName;
var dateOfBirth;
var email;
var userName;
var password;

//clear index fields

function clearField() {
  $("#first_name").val("");
  $("#last_name").val("");
  $("#date_of_birth").val("");
  $("#email").val("");
  $("#username").val("");
  $("#password").val("");
}


$("#submit2").on("click", function(event) {


  event.preventDefault();
  firstName = $("#first_name")
    .val()
    .trim();
  lastName = $("#last_name")
    .val()
    .trim();
  dateOfBirth = $("#date_of_birth")
    .val()
    .trim();
  email = $("#email")
    .val()
    .trim();  
  userName = $("#username")
    .val()
    .trim();
  password = $("#password")
    .val()
    .trim();
  var newMember = {
    firstName: firstName,
    lastName: lastName,
    dateOfBirth: dateOfBirth,
    email: email,
    userName: userName,
    password: assword
  };
  database.ref().push(newMember);
  console.log(newMember);
  clearField();
});
//get info onto dashboard//

database.ref().on("child_added", function(snapShot) {
  var data = snapShot.val();
  var userName = $("<td>").text(data.userName);
});
var questions = [
  {
    question: "Describe your current level of activity.",
    choices: [
      '<p><input name="group1" class="group1" value="0" question="questionOne" type="radio" id="test1" /><label for="test1">Always on the go!</label></p>',
      '<p><input name="group1" class="group1" value="1" question="questionOne" type="radio" id="test2" /><label for="test2">I\'m active, but I do love my couch!</label></p>',
      '<p><input name="group1" class="group1" value="2" question="questionOne"type="radio" id="test3" /><label for="test3">Room for improvment</label></p>'
		]
  },
  {
    question: "How many days a week do you hit the gym?",
		choices: [
			'<p><input name="group1" class="group1" value="0" question="questionOne" type="radio" id="test1" /><label for="test1">0-1</label></p>',
      '<p><input name="group1" class="group1" value="1" question="questionOne" type="radio" id="test2" /><label for="test2">2-4</label></p>',
      '<p><input name="group1" class="group1" value="2" question="questionOne"type="radio" id="test3" /><label for="test3">5-7</label></p>'
			]
  },
  {
    question: "What results do you want to acheive?",
    choices: [
			'<p><input name="group1" class="group1" value="0" question="questionOne" type="radio" id="test1" /><label for="test1">I like where I\'m at, I just want to keep it that way!</label></p>',
      '<p><input name="group1" class="group1" value="1" question="questionOne" type="radio" id="test2" /><label for="test2">I want to be the Incredible Hulk</label></p>',
      '<p><input name="group1" class="group1" value="2" question="questionOne"type="radio" id="test3" /><label for="test3">I need to get my beach body back!</label></p>'
		]

  },
  {
    question: "How many days a week are you committing to achieve your goal?",
		choice: [
			'<p><input name="group1" class="group1" value="0" question="questionOne" type="radio" id="test1" /><label for="test1">2-3</label></p>',
      '<p><input name="group1" class="group1" value="1" question="questionOne" type="radio" id="test2" /><label for="test2">3-4</label></p>',
      '<p><input name="group1" class="group1" value="2" question="questionOne"type="radio" id="test3" /><label for="test3">5-6</label></p>'
	]
  }
];
var memberAnswers = {
	questionOne: undefined,
	questionTwo: undefined,
	questionThree: undefined,
	questionFour: undefined,
};

var currentQuestion = 0;
var quizOver = false;
var wgerURL =
  "https://wger.de/api/v2/workout/ \
-H 'Authorization: Token fbb1fbba723e77e657f5c9c5db95bdae8444e136'";
// when the document loads...
$(document).ready(function() {
  // Displaying questions on the question page.
  function displayCurrentQuestion() {
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .group1");
    var numChoices = questions[currentQuestion].choices.length;
    // Set the questionClass text to the current question
    $(".question").text(question);
    // Remove all current <li> elements (if any)
    $(".group1")
      .find("li")
      .remove();
    var choice;
    for (i = 0; i < numChoices; i++) {
      choice = questions[currentQuestion].choices[i];
      $(choice).appendTo(".question");
			console.log(choice);
    }

	}
	
///display questions

  }

  displayCurrentQuestion();
  $(document).on("click", "#nextButton", function(e) {
		e.preventDefault();
		if (currentQuestion > questions.length)  {
				value = $("input[type='radio']:checked").val();
				var question = $("input[type='radio']:checked").attr("question")
				console.log("value: ", value);
				console.log(question);
				memberAnswers[question]=parseInt(value);
				 console.log(memberAnswers);
        currentQuestion++; // Since we have already displayed the first question on DOM ready
        if (currentQuestion < questions.length) {
          displayCurrentQuestion();
        }
      } else {
        $(document)
          .find(".nextButton");
        quizOver = true;
        // quiz over send user to dashboard
			}
		});
		
});

//
var $workoutsLoseWeight = $("#workoutsLoseWeight");

$.ajax({
  method: "GET",
  url: "assets/json/loseWeight.json",
  success: function(data) {
    var results = data;
    console.log(data);
    for (var i = 0; i < results.length; i++) {
      var workoutName = results[i].name;
			var paraName = $("<h3 class='para-workout'>").text(workoutName);
			var groups = results[i].muscleGroups;
      var paraMuscleGroups = $("<h4 class='para-muscleGroups'>").text(groups);
      var workoutInstructions = results[i].instructions;
      var paraWorkoutInstructions = $("<p>").text(workoutInstructions);
      $workoutsLoseWeight
        .append(paraName)
        .append(paraMuscleGroups)
        .append(paraWorkoutInstructions);
    }
  }
});

