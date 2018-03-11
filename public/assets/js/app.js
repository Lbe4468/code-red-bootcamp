// when the document loads...
$(document).ready(function() {

// api key...
var config = {
  apiKey: "AIzaSyBYfKRi1L1Bx3HjDzdPSzm22XIOssPbh-Y",
  authDomain: "code-red-bootcamp.firebaseapp.com",
  databaseURL: "https://code-red-bootcamp.firebaseio.com",
  projectId: "code-red-bootcamp",
  storageBucket: "code-red-bootcamp.appspot.com",
  messagingSenderId: "926767366245"
};
// initialize firebase..
firebase.initializeApp(config);


//password username authentication ect.
function toggleSignIn() {
	if (firebase.auth().currentUser) {
		// [START signout]
		firebase.auth().signOut();
		// [END signout]
	} else {
		var email = document.getElementById('email').value;
		var password = document.getElementById('password').value;
		if (email.length < 4) {
			alert('Please enter an email address.');
			return;
		}
		if (password.length < 4) {
			alert('Please enter a password.');
			return;
		}
		// Sign in with email and pass.
		// [START authwithemail]
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// [START_EXCLUDE]
			if (errorCode === 'auth/wrong-password') {
				alert('Wrong password.');
			} else {
				alert(errorMessage);
			}
			console.log(error);
			document.getElementById('quickstart-sign-in').disabled = false;
			// [END_EXCLUDE]
		});
		// [END authwithemail]
	}
	document.getElementById('quickstart-sign-in').disabled = true;
}
/**
 * Handles the sign up button press.
 */
function handleSignUp() {
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	if (email.length < 4) {
		alert('Please enter an email address.');
		return;
	}
	if (password.length < 4) {
		alert('Please enter a password.');
		return;
	}
	// Sign in with email and pass.
	// [START createwithemail]
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// [START_EXCLUDE]
		if (errorCode == 'auth/weak-password') {
			alert('The password is too weak.');
		} else {
			alert(errorMessage);
		}
		console.log(error);
		// [END_EXCLUDE]
	});
	// [END createwithemail]
}
 function sendEmailVerification() {
	// [START sendemailverification]
	firebase.auth().currentUser.sendEmailVerification().then(function() {
		// Email Verification sent!
		// [START_EXCLUDE]
		alert('Email Verification Sent!');
		// [END_EXCLUDE]
	});
	// [END sendemailverification]
}
function sendPasswordReset() {
	var email = document.getElementById('email').value;
	// [START sendpasswordemail]
	firebase.auth().sendPasswordResetEmail(email).then(function() {
		// Password Reset Email Sent!
		// [START_EXCLUDE]
		alert('Password Reset Email Sent!');
		// [END_EXCLUDE]
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// [START_EXCLUDE]
		if (errorCode == 'auth/invalid-email') {
			alert(errorMessage);
		} else if (errorCode == 'auth/user-not-found') {
			alert(errorMessage);
		}
		console.log(error);
		// [END_EXCLUDE]
	});
	// [END sendpasswordemail];
}
/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
	// Listening for auth state changes.
	// [START authstatelistener]
	firebase.auth().onAuthStateChanged(function(user) {
		// [START_EXCLUDE silent]
		document.getElementById('quickstart-verify-email').disabled = true;
		// [END_EXCLUDE]
		if (user) {
			// User is signed in.
			var displayName = user.displayName;
			var email = user.email;
			var emailVerified = user.emailVerified;
			var photoURL = user.photoURL;
			var isAnonymous = user.isAnonymous;
			var uid = user.uid;
			var providerData = user.providerData;
			// [START_EXCLUDE]
			document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
			document.getElementById('quickstart-sign-in').textContent = 'Sign out';
			document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
			if (!emailVerified) {
				document.getElementById('quickstart-verify-email').disabled = false;
			}
			// [END_EXCLUDE]
		} else {
			// User is signed out.
			// [START_EXCLUDE]
			document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
			document.getElementById('quickstart-sign-in').textContent = 'Sign in';
			document.getElementById('quickstart-account-details').textContent = 'null';
			// [END_EXCLUDE]
		}
		// [START_EXCLUDE silent]
		document.getElementById('quickstart-sign-in').disabled = false;
		// [END_EXCLUDE]
	});
	// [END authstatelistener]
	document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
	document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
	document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
	document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
}
window.onload = function() {
	initApp();
};

//end authentication info.......


//variables for database reference.....
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

//ebent listener for question page info submitted
$("#submit2").on("click", function(event) {


  event.preventDefault();
  firstName = $("#first_name").val().trim();
  lastName = $("#last_name").val().trim();
  dateOfBirth = $("#date_of_birth").val().trim();
  userName = $("#username").val().trim();
  
  var newMember = {
    firstName:firstName,
    lastName:lastName,
    dateOfBirth:dateOfBirth,
    userName:userName,
    password: password
	}
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
			'<p><input name="group1" class="group1" value="0" question="questionTwo" type="radio" id="test1" /><label for="test1">I like where I\'m at, I just want to keep it that way!</label></p>',
      '<p><input name="group1" class="group1" value="1" question="questionTwo" type="radio" id="test2" /><label for="test2">I want to be the Incredible Hulk</label></p>',
      '<p><input name="group1" class="group1" value="2" question="questionTwo"type="radio" id="test3" /><label for="test3">I need to get my beach body back!</label></p>'
		]

  },
  {
    question: "How many days a week are you committing to achieve your goal?",
		choices: [
			'<p><input name="group1" class="group1" value="0" question="questionThree" type="radio" id="test1" /><label for="test1">2-3</label></p>',
      '<p><input name="group1" class="group1" value="1" question="questionThree" type="radio" id="test2" /><label for="test2">3-4</label></p>',
      '<p><input name="group1" class="group1" value="2" question="questionThree"type="radio" id="test3" /><label for="test3">5-6</label></p>'
	]
	},
	{
    question: "Describe your current level of activity.",
    choices: [
      '<p><input name="group1" class="group1" value="0" question="questionFour" type="radio" id="test1" /><label for="test1">Always on the go!</label></p>',
      '<p><input name="group1" class="group1" value="1" question="questionFour" type="radio" id="test2" /><label for="test2">I\'m active, but I do love my couch!</label></p>',
      '<p><input name="group1" class="group1" value="2" question="questionFour"type="radio" id="test3" /><label for="test3">Room for improvment</label></p>'
		]
  },
];
var memberAnswers = {
	questionOne: undefined,
	questionTwo: undefined,
	questionThree: undefined,
};

var currentQuestion = 0;
var quizOver = false;
var wgerURL ="https://wger.de/api/v2/workout/ \-H 'Authorization: Token fbb1fbba723e77e657f5c9c5db95bdae8444e136'";

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
		
    }

	}
	
///display questions



  displayCurrentQuestion();
  $(document).on("click", "#nextButton", function(e) {
		e.preventDefault();
		if (currentQuestion < questions.length-1)  {
				value = $("input[type='radio']:checked").val();
				var question = $("input[type='radio']:checked").attr("question")
				memberAnswers[question]=parseInt(value);
				currentQuestion++; // Since we have already displayed the first question on DOM ready
				displayCurrentQuestion();
        if (currentQuestion == questions.length-1) {
          $(document)
          .find("#nextButton").text("Submit");
        }
      } else {
				quizOver = true;
				console.log(memberAnswers);
        // quiz over send user to dashboard
			}
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
});
