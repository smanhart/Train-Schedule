$(document).ready(function(){
    $('.parallax').parallax();
  });

$(document).ready(function() {
    M.updateTextFields();
});


//add firebase
var config = {
    apiKey: "AIzaSyCWSJPQJod1w_HyMuQuNvMVbb_-WHptlmI",
    authDomain: "train-schedules-18435.firebaseapp.com",
    databaseURL: "https://train-schedules-18435.firebaseio.com",
    projectId: "train-schedules-18435",
    storageBucket: "train-schedules-18435.appspot.com",
    messagingSenderId: "608609684396"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

//grab info from input fields
$("form").on("submit", function(event){
    event.preventDefault();

    var trainName = $("#trainName").val().trim();
    var trainDest = $("#destination").val().trim();
    var trainTime = $("#trainTime").val().trim();
    var trainFreq = $("#frequency").val().trim()

    var newTrain = {
        name: trainName,
        dest: trainDest,
        time: trainTime,
        frequency: trainFreq
    };

    //store user info in database
    database.ref().push(newTrain);

    // console.log(newTrain.name);
    // console.log(newTrain.dest);
    // console.log(newTrain.time);
    // console.log(newTrain.frequency);

    $("#trainName").val("");
    $("#destination").val("");
    $("#trainTime").val("");
    $("#frequency").val("");


})

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

    //pull info from database
    var tName = childSnapshot.val().name;
    var tDest = childSnapshot.val().dest;
    var tTime = childSnapshot.val().time;
    var tFreq = childSnapshot.val().frequency;

    console.log(tName);
    console.log(tDest);
    console.log(tTime);
    console.log(tFreq);



    // calculate minutes away
    var timeConverted = moment(tTime, "HH:mm").subtract(1, "years");
    console.log(timeConverted);

    var timeDiff = moment().diff(moment(timeConverted), "minutes");
    console.log(timeDiff);

    var timeRemainder = timeDiff % tFreq;
    console.log(timeRemainder);

    var minAway = tFreq - timeRemainder;
    console.log(minAway);

    // calculate next arrival time
    var nextTrain = moment().add(minAway, "minutes");
    console.log(moment(nextTrain).format("hh:mm"));


    // add to html
    var trainRow = $("<tr>").append(
        $("<td>").text(tName),
        $("<td>").text(tDest),
        $("<td>").text(tFreq),
        $("<td>").text(moment(nextTrain).format("hh:mm")),
        $("<td>").text(minAway)
    );

    $("#trainTableRow").append(trainRow);


});






