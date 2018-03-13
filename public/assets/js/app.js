// api key...
$(function() {
  var config = {
    apiKey: "AIzaSyBYfKRi1L1Bx3HjDzdPSzm22XIOssPbh-Y",
    authDomain: "code-red-bootcamp.firebaseapp.com",
    databaseURL: "https://code-red-bootcamp.firebaseio.com",
    projectId: "code-red-bootcamp",
    storageBucket: "code-red-bootcamp.appspot.com",
    messagingSenderId: "926767366245"
  };
  firebase.initializeApp(config);
	
// when the document loads...
$(document).ready(function () {
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
      question: "What results do you want to achieve?",
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
    }
  ];

  //variables for database reference.....
  var database = firebase.database();
  var firstName;
  var lastName;
  var dateOfBirth;
  var userName;
  var signUpEmail;
  var signUpPassword;


  function clearField() {
    $("#first_name").val("");
    $("#last_name").val("");
    $("#date_of_birth").val("");
    $("#signUpEmail").val("");
    $("#username").val("");
    $("#signUpPassword").val("");
  }


  // event listener for question page info submitted
  $("#quick-start-sign-up").on("click", function(event) {
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
    userName = $("#username")
      .val()
      .trim();
    signUpEmail = $("#signEmail")
      .val()
      .trim();
    signUpPassword = $("#signPassword")
      .val()
      .trim();

    var newMember = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      userName: userName,
      email: signUpEmail,
      password: signUpPassword
    };
    database.ref().push(newMember);
    console.log(newMember);
    clearField();
  });

  const signUp = document.getElementById("quick-start-sign-up");
  const login = document.getElementById("quick-start-sign-in");
  const logout = document.getElementById("quick-start-log-out");
  //when sign in button is clicked this event function happens
  $("#quick-start-sign-up").on("click", e => {
    const signEmail = document.getElementById("signEmail");
    const signPassword = document.getElementById("signPassword");
    //get email and password from user
    //TODO: Check for real emails
    const email = signEmail.value;
    console.log(email);
    const password = signPassword.value;
    console.log(password);
    //authenticate from firebase
    const auth = firebase.auth();
    //create user and log in
    const promise = auth.createUserWithEmailAndPassword(email, password);
    // will console log error
    promise.catch(e => console.log(e.message));
  });
  const auth = firebase.auth();
  //add authentication listener
  auth.onAuthStateChanged(firebaseUser => {});
  //logout
  $("#quick-start-log-out").on("click", e => {
    firebase.auth().signOut();
  });
  //if the state of login is changed console log either user or not loggid in
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser);
    } else {
      console.log("Not logged in");
    }
  });

  $("#quick-start-sign-in").on("click", e => {
    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");
    //get email and password from user
    const email = loginEmail.value;
    const password = loginPassword.value;
    //authenticate from firebase
    const auth = firebase.auth();
    //if user will log in
    const promise = auth.signInWithEmailAndPassword(email, password);
    //if not user will console log error
    promise.catch(e => console.log(e.message));
  });

  //get info onto dashboard//
  database.ref().on("child_added", function(snapShot) {
    var data = snapShot.val();
    var userName = $("<td>").text(data.userName);
  });

  //creating variables for call to JSON
  var memberAnswers = {
    questionOne: undefined,
    questionTwo: undefined,
    questionThree: undefined
  };

  var currentQuestion = 0;
  var quizOver = false;
  var wgerURL =
    "https://wger.de/api/v2/workout/ -H 'Authorization: Token fbb1fbba723e77e657f5c9c5db95bdae8444e136'";

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

  ///display questions on page
  displayCurrentQuestion();
  $(document).on("click", "#nextButton", function(e) {
    e.preventDefault();
    if (currentQuestion < questions.length - 1) {
      value = $("input[type='radio']:checked").val();
      var question = $("input[type='radio']:checked").attr("question");
      memberAnswers[question] = parseInt(value);
      currentQuestion++; // Since we have already displayed the first question on DOM ready
      displayCurrentQuestion();
      if (currentQuestion == questions.length - 1) {
        $(document)
          .find("#nextButton")
          .text("Submit");
      }
    } else {
      quizOver = true;
      console.log(memberAnswers);
      // quiz over send user to dashboard
    }
  });

<<<<<<< HEAD
	// initialize firebase..
 	firebase.initializeApp(config);


	// //password username authentication ect.
const txtEmail = document.getElementById ("email");
const txtPassword = document.getElementById("password");
const signUp = document.getElementById("quickstart-sign-up");
const login = document.getElementById("quickstart-sign-in")
const logout = document.getElementById("quickstart-log-out")
//when sign in button is clicked this event function happens
$("#quickstart-sign-in").on("click", e =>{
	//get email and password from user
const email = txtEmail.value;
const password = txtPassword.value;
//authenticate from firebase
const auth = firebase.auth();
//if user will log in
const promise = auth.signInWithEmailAndPassword(email, password);
$('	<a href="dashboard.html"></a>')
//if not user will console log error
promise.catch(e => console.log(e.message));

});
//add signup event
//when sign up button is clicked this event function happens
$("#quickstart-sign-up").on("click", e =>{
	//get email and password from user
	//TODO: Check for real emails
const email = txtEmail.value;
const password = txtPassword.value;
//authenticate from firebase
const auth = firebase.auth();
//create user and log in
const promise = auth.creatUserWithEmailAndPassword(email, password);
// will console log error
promise.catch(e => console.log(e.message));
$('	<a href="question.html"></a>')
});
//add authentication listener
firebase.auth.onAuthStateChanged(firebaseUser => {});
//logout
$("#quickstart-log-out").on("click", e=> {
	firebase.auth().signOut();
});
//if the state of login is changed console log either user or not loggid in
auth.onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
		console.log(firebaseUser);
	}else{
		console.log('Not logged in');
	}
});
=======
  // ajax call to pull workouts to page....
  // var $workoutsLoseWeight = $("#workoutsLoseWeight");
  // $.ajax({
  //   method: "GET",
  //   url: "assets/json/loseWeight.json",
  //   success: function(data) {
  //     var results = data;
  //     console.log(data);
  //     for (var i = 0; i < results.length; i++) {
  //       var workoutName = results[i].name;
  //       var paraName = $("<h3 class='para-workout'>").text(workoutName);
  //       var groups = results[i].muscleGroups;
  //       var paraMuscleGroups = $("<h4 class='para-muscleGroups'>").text(groups);
  //       var workoutInstructions = results[i].instructions;
  //       var paraWorkoutInstructions = $("<p>").text(workoutInstructions);
  //       $workoutsLoseWeight
  //         .append(paraName)
  //         .append(paraMuscleGroups)
  //         .append(paraWorkoutInstructions);
  //     }
  //   }
  // });

  // PULLING FIREBASE USER DATA TO DISPLAY IN DASHBOARD
	var user = firebase.auth().currentUser;
  var userDataRef = firebase
    .database()
    .ref()
    .orderByKey();
  userDataRef.once("value").then(function(snapshot) {
    snapshot.forEach(function(user) {
      var key = user.key;
      var childData = user.val();
      // console.log(childData);
      var userEmail = childData.email;
      var userFirstName = childData.firstName;
      var userLastName = childData.lastName;
      var userUserName = childData.userName;
      var userDOB = childData.dateOfBirth;

      $("#displayUserName").text("Username:  " + userUserName);
      $("#displayUserFirstLastName").text(
        "Name:  " + userFirstName + " " + userLastName
      );
      $("#displayUserDOB").text("Birthday:  " + userDOB);
      $("#displayUserEmail").text("Email:  " + userEmail);
    });
  });

  var uploader = $("#uploader");
  var fileButton = $("#file-input");
  // Event to trigger file select to upload profile picture to firebase
  $("#profile-image").on("click", function() {
    // event to activate/show image file selection/upload
    $("#file-input").trigger("click");
    // Upon file being selected...
    $("input:file").change(function(e) {
      // above line might should be "#file-input" instead of "input:file"
      var file = e.target.files[0];
      // Get current username from Firebase
      user = firebase.auth().currentUser;
      // Create a Storage Ref w/ username
      var storageRef = firebase
        .storage()
        .ref(user + "/profilePicture/" + file.name);
      // Upload file to Firebase
      var task = storageRef.put(file);
      var name = file.name;
      var size = file.size;
      var type = file.type;
      task.on(
        "state_changed",
        function progress(snapshot) {
          var percentage =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						uploader.value = percentage;
        },
        function error(err) {},
        function complete() {}
			);
			// changes rules in storage section in Firebase to allow anyone to upload. Needs to be changed back to "allow read, write: if request.auth != null;"
      console.log(file);
      console.log(name);
      console.log(size);
      console.log(type);
    });
  });
>>>>>>> 84c261012d9e79c0a04905f022a4e02fed20e50e


// f1267f980e7340bc6c3c88af57222deea7b14854
	// buildApiRequest('GET',
	// '/youtube/v3/search',
	// {'maxResults': '5',
	//  'part': 'snippet',
	//  'q': 'surfing',
	//  'type': ''});


// //google api information
// var google = {
// 	apiKey: "53c434b55c046b2715268b5b2c9b75505fefb822",
// 	authDomain: "code-red-bootcamp@project-670e0.iam.gserviceaccount.com",
// 	databaseURL: "https://console.developers.google.com/iam-admin/serviceaccounts/project?project=project-670e0",
// 	projectId: "project-670e0",
// 	storageBucket: "",
// 	messagingSenderId: ""
// };



// 	//get demonstrations on demo page...
// 		// call api to page
// 		function search() {
// 	var gapiClient = $.ajax({
// 		method: "GET",
// 		url:"code-red-bootcamp@project-670e0.iam.gserviceaccount.com"
// 	});
//   var q = $('#query').val();
//   var request = gapiClient.youtube.search.list({
//     q: q,
//     part: 'snippet'
//   });



// // After the API loads, call a function to enable the search box.
// function handleAPILoaded() {
// 	console.log("hi")
//   $('#search-button').attr('disabled', false);
// }
// function makeRequest() {
// 	var request = gapi.client.urlshortener.url.get({
// 		'shortUrl': 'code-red-bootcamp@project-670e0.iam.gserviceaccount.com'
// 	});
// 	request.then(function(response) {
// 		appendResults(response.result.longUrl);
// 	}, function(reason) {
// 		console.log('Error: ' + reason.result.error.message);
// 	});
// }

// function init() {
// 	gapi.client.setApiKey('53c434b55c046b2715268b5b2c9b75505fefb822');
// 	gapi.client.load('urlshortener', 'v1').then(makeRequest);
// }

// $('<iframe />', {
// 	src: url,
// 	id:  'receiver',
// 	frameborder: 1,
// 	load:function(){

// 		request.execute(function(response) {
		
// 			var str = JSON.stringify(response.result);
// 			$('#search-container').html('<pre>' + str + '</pre>');
// 		});
// // 	}
// ).appendTo('body');

});

});

// Event to trigger file select to upload profile picture to firebase
$("#profile-image").on("click", function() {
	// event to activate/show image file selection/upload
	$("#file-input").trigger("click");
	// Upon file being selected...
  $("input:file").change(function(e) {
    var file = e.target.files[0];
    // Get current username from Firebase
    var user = firebase.auth().currentUser;
    // Create a Storage Ref w/ username
    var storageRef = firebase
      .storage()
      .ref(user + "/profilePicture/" + file.name);
    // Upload file to Firebase 
    var task = storageRef.put(file);
    var name = file.name;
    var size = file.size;
    var type = file.type;
    console.log(file);
    console.log(name);
    console.log(size);
    console.log(type);
  });
});

