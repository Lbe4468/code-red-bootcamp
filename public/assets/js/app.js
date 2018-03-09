var config = {
  apiKey: "AIzaSyBYfKRi1L1Bx3HjDzdPSzm22XIOssPbh-Y",
  authDomain: "code-red-bootcamp.firebaseapp.com",
  databaseURL: "https://code-red-bootcamp.firebaseio.com",
  projectId: "code-red-bootcamp",
  storageBucket: "code-red-bootcamp.appspot.com",
  messagingSenderId: "926767366245"
};

firebase.initializeApp(config);

var database = firebase.database();

var firstName;
var lastName;
var dateOfBirth;
var userName;
var password;

function clearField() {
  $("#first_name").val("");
  $("#last_name").val("");
  $("#date_of_birth").val("");
  $("#username").val("");
  $("#password").val("");
}

$("#submitbutton").on("click", function(event) {
  event.preventDefault();
  firstName = $("#first_name").val().trim();
  lastName = $("#last_name").val().trim();
  dateOfBirth = $("#date_of_birth").val().trim();
  userName = $("#username").val().trim();
  password = $("#password").val().trim();

  var newMember = {
    firstName:firstName,
    lastName:lastName,
    dateOfBirth:dateOfBirth,
    userName:userName,
    password: assword
  };
  database.ref().push(newMember);
  console.log(newMember);
  clearField();
});

database.ref().on('child_added', function(snapShot){
	var data = snapshot.val();
	var userName = $('<td>').text(data.userName);
});

var questions = [
  {
    question: "Describe your current level of activity.",
    choices: [
      "Always on the go!",
      "I'm active, but I do love my couch!",
      "Room for improvment."
    ]
  },
  {
    question: "How many days a week do you hit the gym?",
    choices: ["0-1", "2-4", "5-7"]
  },
  {
    question: "What results do you want to acheive?",
    choices: [
      "I like where I'm at, I just want to keep it that way!",
      "I want to be the Incredible Hulk",
      "I need to get my beach body back!"
    ]
  },
  {
    question: "How many days a week are you committing to achieve your goal?",
    choice: ["2-3", "3-4", "5-6"]
  }
];

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
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(".question").text(question);

    // Remove all current <li> elements (if any)
    $(".choiceList")
      .find("li")
      .remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
      choice = questions[currentQuestion].choices[i];
      $(
        '<li><input type="radio" value=' +
          i +
          ' name="dynradio" />' +
          choice +
          "</li>"
      ).appendTo(".choiceList");
    }
  }

  displayCurrentQuestion();
  $(this)
    .find("nextButton")
    .on("click", function() {
      if (!quizOver) {
        value = $("input[type='radio']:checked").val();
        console.log("value: ", value);
        currentQuestion++; // Since we have already displayed the first question on DOM ready
        if (currentQuestion < questions.length) {
          displayCurrentQuestion();
        }
      } else {
        $(document)
          .find(".nextButton")
          .text("Show results");
        quizOver = true;
        // quiz over send user to dashboard
      }
    });
});

//
$.ajax({
  method: "GET",
  url: "assets/json/loseWeight.json"
}).then(function(response) {
  console.log(response);
});
