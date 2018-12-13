//initialize firebase
var config = {
  apiKey: "AIzaSyCu-eDj3tppmq9jdGjM-3zbOoypiscTyHc",
  authDomain: "my-first-project-a3d9d.firebaseapp.com",
  databaseURL: "https://my-first-project-a3d9d.firebaseio.com",
  projectId: "my-first-project-a3d9d",
  storageBucket: "my-first-project-a3d9d.appspot.com",
  messagingSenderId: "266624313440"
};
firebase.initializeApp(config);

var trainData = firebase.database();

//Button from form that populates firebase
$("#addTrainBtn").on("click", function() {
  event.preventDefault();
  //grabs info entered by user into input form
  var trainName = $("#trainNameInput")
    .val()
    .trim();
  var destination = $("#destinationInput")
    .val()
    .trim();
  var firstTrain = moment(
    $("#firstTrainInput")
      .val()
      .trim(),
    "HH:mm"
  )
    .subtract(10, "years")
    .format("x");
  var frequency = $("#frequencyInput")
    .val()
    .trim();

  //Creates temp object for holding user info from input form
  var addNewTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  //uploads info to firebase database
  trainData.ref().push(addNewTrain);

  //alert info added
  alert("All aboard, new train added!");

  //reset/clear text boxes on input form
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainInput").val("");
  $("#frequencyInput").val("");

  // return false;
});

trainData.ref().off;
trainData.ref().on("child_added", function(snapshot) {
  var name = snapshot.val().name;
  var destination = snapshot.val().destination;
  var frequency = snapshot.val().frequency;
  var firstTrain = snapshot.val().firstTrain;

  var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
  var minutes = frequency - remainder;
  var arrival = moment()
    .add(minutes, "m")
    .format("hh:mm A");

  console.log(remainder);
  console.log(minutes);
  console.log(arrival);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(name),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(arrival),
    $("<td>").text(minutes)
  );

  // Append the new row to the table
  $("#dynamicRows > tbody").append(newRow);
});
