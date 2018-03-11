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
var userName;
var password;
//clear index fields
function clearField() {
  $("#first_name").val("");
  $("#last_name").val("");
  $("#date_of_birth").val("");
  $("#username").val("");
  $("#password").val("");
}
// submit button on click sent to database..
$("#submitbutton").on("click", function(event) {
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
  password = $("#password")
    .val()
    .trim();
  var newMember = {
    firstName: firstName,
    lastName: lastName,
    dateOfBirth: dateOfBirth,
    userName: userName,
    password: password
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

// PULLING WORKOUT DATA FROM JSON TO DISPLAY ON USER DASHBOARD
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

// PULLING FIREBASE USER DATA TO DISPLAY IN DASHBOARD - VERSION 1
// var userDataRef = firebase
//   .database()
//   .ref()
//   .orderByKey();
// userDataRef.once("value").then(function(snapshot) {
//   snapshot.forEach(function(childSnapshot) {
//     var key = childSnapshot.key;
// 		var childData = childSnapshot.val();
// 		console.log(childData);
// 		var name_val = childSnapshot.val().firstName;
//     var id_val = childSnapshot.val().userName;
//     $("#userInfo").append("<li>" + name_val);
//   });
// });

// PULLING FIREBASE USER DATA TO DISPLAY IN DASHBOARD - VERSION 2
database.ref().on("value", function(snapshot) {
  // console.log(snapshot.val());
  snapshot.forEach(function(childSnapshot) {
    // console.log(childSnapshot);
    var childData = childSnapshot.val();
    // console.log(childData);
    var username = childSnapshot.val().userName;
    console.log(username);
    $("#displayUserName").append(username);
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
