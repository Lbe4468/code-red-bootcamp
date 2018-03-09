//
$.ajax({
  method: "GET",
  url: "assets/json/loseWeight.json"
}).then(function(response) {
  console.log(response);
});

// var loseWeightWorkouts = new XMLHttpRequest();

// loseWeightWorkouts.open("GET", "assets/json/loseWeight.json");

// loseWeightWorkouts.onload = function() {
//   var loseData = JSON.parse(loseWeightWorkouts.responseText);
//   console.log(loseData[0]);
// };

// loseWeightWorkouts.send();
