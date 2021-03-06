
$(function() {
  // api key...
  var bmi = {
    apiKey: "AIzaSyBYfKRi1L1Bx3HjDzdPSzm22XIOssPbh-Y",
    authDomain: "code-red-bootcamp.firebaseapp.com",
    databaseURL: "https://code-red-bootcamp.firebaseio.com",
    projectId: "code-red-bootcamp",
    storageBucket: "code-red-bootcamp.appspot.com",
    messagingSenderId: "926767366245"
  };

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
  var currentUser = firebase.auth().currentUser;

  function clearField() {
    $("#first_name").val("");
    $("#last_name").val("");
    $("#date_of_birth").val("");
    $("#signUpEmail").val("");
    $("#username").val("");
    $("#signUpPassword").val("");
    $("#loginEmail").val("");
    $("#loginPassword").val("");
  }

  // event listener for question page info submitted
  $("#quick-start-sign-up").on("click", function(event) {
    event.preventDefault();
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
    firebase.auth().onAuthStateChanged(function(user) {
      window.user = user; // user is undefined if no user signed in
      console.log(user);
    });
    // alert("Account Created!");
    setWait();
    clearField();
  });
  function setWait() {
    //Redirects
    window.location.href = "question.html";
    40000;
    // return false;
  }

  const signUp = document.getElementById("quick-start-sign-up");
  const login = document.getElementById("quick-start-sign-in");
  const logout = document.getElementById("quick-start-log-out");
  //when sign in button is clicked this event function happens
  // $("#quick-start-sign-up").on("click", e => {
  // const signEmail = document.getElementById("signEmail");
  // const signPassword = document.getElementById("signPassword");
  // //get email and password from user
  // //TODO: Check for real emails
  // const email = signEmail.value;
  // console.log(email);
  // const password = signPassword.value;
  // console.log(password);
  // //authenticate from firebase
  // const auth = firebase.auth();
  // //create user and log in
  // const promise = auth.createUserWithEmailAndPassword(email, password);
  // // will console log error
  // promise.catch(e => console.log(e.message));
  // clearField();
  // });
  // const auth = firebase.auth();
  // //add authentication listener
  // auth.onAuthStateChanged(firebaseUser => {});
  //logout
  $("#quick-start-log-out").on("click", e => {
    firebase.auth().signOut();
  });
  //if the state of login is changed console log either user or not loggid in
  // firebase.auth().onAuthStateChanged(firebaseUser => {
  //   if (firebaseUser) {
  //     console.log(firebaseUser);
  //   } else {
  //     console.log("Not logged in");
  //   }
  // });

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
    var url = "dashboard.html";
    //Redirects
    window.location.href = url;
    return false;
  });

  //get info onto dashboard//
  database.ref().on("child_added", function(snapShot) {
    var data = snapShot.val();
    var userName = $("<td>").text(data.userName);
  });

  //search for demos.....
  //search for demos.....
  $("#search-button").on("click", function() {
    var videoQuery = $("#video-query").val();
    $("#search-container").empty();
    // var url = 'http://youtube.com/feeds/api/videos?q=' + encodeURIComponent(videoQuery) + '&format=5&max-results=1&v=2&alt=jsonc';
    var key = "AIzaSyB8BIrxlYTGOzYv-anjVJHLL8pH1CSSE6g";
    var tubeUrl =
      "https://content.googleapis.com/youtube/v3/search?q=" +
      videoQuery +
      "&maxResults=3&part=snippet&key=" +
      key;
    $.ajax({
      method: "GET",
      url: tubeUrl
    }).then(function(response) {
      console.log("response: ", response);
      // console.log(this);
      $(".demosContainer").empty();
      var responseData = response.items;
      if (responseData) {
        // var videos = responseData.data.items;
        // videoid = videos[0].id;
        // alert(videoid);
        // return videoid;
        for (i = 0; i < responseData.length; i++) {
          var img = response.items[0].snippet.thumbnails.medium.url;
          var link = response.items[0].id;
          console.log(img);
          console.log(link);
          var imageContainer = '<img src="' + img + '" />';
        }
        $(".demosContainer").append(imageContainer);
        $(".demosContainer").append(link);
      }
    });
  });
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
      var url = "dashboard.html";
      //Redirects
      window.location.href = url;
      return false;
    }
  });
  /// json calls for dashboard

  // if (questionTwo == choices[0]) {
  //   var $workoutsLoseWeight = $("#workoutsLoseWeight");
  //   $.ajax({
  //     method: "GET",
  //     url: "assets/json/maintainweight.json",
  //     success: function(data) {
  //       var results = data;
  //       console.log(data);
  //       for (var i = 0; i < results.length; i++) {
  //         var beginner = results[i].Beginner;
  //         var intermediate = results[i].Intermediate;
  //         var advanced = results[i].Advanced;
  //         var workoutName = results[i].name;

  //         var paraName = $("<h3 class='para-workout'>").text(workoutName);
  //         var groups = results[i].muscleGroups;
  //         var paraMuscleGroups = $("<h4 class='para-muscleGroups'>").text(
  //           groups
  //         );
  //         var workoutInstructions = results[i].instructions;
  //         var paraWorkoutInstructions = $("<p>").text(workoutInstructions);
  //         var workOut = {
  //           paraName: paraName,
  //           paraMuscleGroups: paraMuscleGroups,
  //           workoutInstructions: workoutInstructions
  //         };

  //         $(results).each(function() {
  //           if (results[i].value == questionOne) {
  //             $(".workoutsRow").addClass("selected");
  //             console.log(results[i].value);
  //             console.log(questionOne);
  //             console.log(selected);
  //           }
  //         });
  //         // $workoutsmaintainweight
  //         // 	.append(paraName)
  //         // 	.append(paraMuscleGroups)
  //         // 	.append(paraWorkoutInstructions);
  //       }
  //     }
  //   });
  // }

  // ajax call to pull workouts to page....
  var $begWorkoutsRow = $("#beginnerWorkouts");
  var $interWorkoutsRow = $("#intermediateWorkouts");
  var $advWorkouts = $("advancedWorkouts");
  $.ajax({
    method: "GET",
    url: "assets/json/loseWeight.json",
    success: function(data) {
      var results = data;
      // console.log(data);
      for (var i = 0; i < results.length; i++) {
        if (results[i].level === "beg") {
          var workoutName = results[i].name;
          var paraName = $("<h5 class='text center'>").text(workoutName);
          var groups = results[i].muscleGroups;
          var paraMuscleGroups = $("<li>").text("Muscle Groups: " + groups);
          var exercises = results[i].exercises;
          var paraExercises = $("<li>").text("Exercises: " + exercises);
          var workoutInstructions = results[i].instructions;
          var paraWorkoutInstructions = $("<li>").text(
            "Instructions: " + workoutInstructions
          );
          $begWorkoutsRow
            .append(paraName)
            .append(paraMuscleGroups)
            .append(paraExercises)
            .append(paraWorkoutInstructions);
        } else if (results[i].level === "inter") {
          var workoutName = results[i].name;
          var paraName = $("<h5 class='text center'>").text(workoutName);
          var groups = results[i].muscleGroups;
          var paraMuscleGroups = $("<li>").text("Muscle Groups: " + groups);
          var exercises = results[i].exercises;
          var paraExercises = $("<li>").text("Exercises: " + exercises);
          var workoutInstructions = results[i].instructions;
          var paraWorkoutInstructions = $("<li>").text(
            "Instructions: " + workoutInstructions
          );
          $interWorkoutsRow
            .append(paraName)
            .append(paraMuscleGroups)
            .append(paraExercises)
            .append(paraWorkoutInstructions);
        }
      }
    }
  });

  //creating variables for call to JSON

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
      var userDob = childData.dateOfBirth;

      $("#displayUserName").text("Username:  " + userUserName);
      $("#displayUserFirstLastName").text(
        "Name:  " + userFirstName + " " + userLastName
      );
      $("#displayUserDOB").text("Birthday:  " + userDob);
      $("#displayUserEmail").text("Email:  " + userEmail);
    });
  });


  // var uploader = $("#uploader");
  // var fileButton = $("#file-input");
  // // Event to trigger file select to upload profile picture to firebase
  // $("#profile-image").on("click", function() {
  //   // event to activate/show image file selection/upload
  //   $("#file-input").trigger("click");
  //   // Upon file being selected...
  //   $("input:file").change(function(e) {
  //     // above line might should be "#file-input" instead of "input:file"
  //     var file = e.target.files[0];
  //     // Get current username from Firebase
  //     user = firebase.auth().currentUser;
  //     // Create a Storage Ref w/ username
  //     var storageRef = firebase
  //       .storage()
  //       .ref(user + "/profilePicture/" + file.name);
  //     // Upload file to Firebase
  //     var task = storageRef.put(file);
  //     var name = file.name;
  //     var size = file.size;
  //     var type = file.type;
  //     task.on(
  //       "state_changed",
  //       function progress(snapshot) {
  //         var percentage =
  //           snapshot.bytesTransferred / snapshot.totalBytes * 100;
  //         uploader.value = percentage;
  //       },
  //       function error(err) {},
  //       function complete() {}
  //     );
  //     // changes rules in storage section in Firebase to allow anyone to upload. Needs to be changed back to "allow read, write: if request.auth != null;"
  //     console.log(file);
  //     console.log(name);
  //     console.log(size);
  //     console.log(type);
  //   });
  // });


  // Event to trigger file select to upload profile picture to firebase
  // $("#profile-image").on("click", function() {
  //   // event to activate/show image file selection/upload
  //   $("#file-input").trigger("click");
  //   // Upon file being selected...
  //   $("input:file").change(function(e) {
  //     var file = e.target.files[0];
  //     // Get current username from Firebase
  //     var user = firebase.auth().currentUser;
  //     // Create a Storage Ref w/ username
  //     var storageRef = firebase
  //       .storage()
  //       .ref(user + "/profilePicture/" + file.name);
  //     // Upload file to Firebase
  //     var task = storageRef.put(file);
  //     var name = file.name;
  //     var size = file.size;
  //     var type = file.type;
  //     console.log(file);
  //     console.log(name);
  //     console.log(size);
  //     console.log(type);
  //   });
  // });
});

