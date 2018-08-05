$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDqAAwt-QVjGZ71TPde0F54h9tavijTBkw",
    authDomain: "project4-trains.firebaseapp.com",
    databaseURL: "https://project4-trains.firebaseio.com",
    projectId: "project4-trains",
    storageBucket: "project4-trains.appspot.com",
    messagingSenderId: "1024425731514"
  };
  firebase.initializeApp(config);
 

  var database = firebase.database();

 var trainName = "";
 var destination = "";
 var firstTrain = 0;
 var frequency = 0; 


$("#start").on("click", function(event){
    event.preventDefault();
   trainName = $("#get-train").val().trim();
    destination = $("#get-destination").val().trim();
    firstTrain = $("#get-first-train").val().trim();
   frequency = $("#get-frequency").val().trim();

    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

   


    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        //dateAdded: firebase.database.Servervalue.TIMESTAMP,

    });
    trainName = $("#get-train").val("");
    destination = $("#get-destination").val("");
    firstTrain = $("#get-first-train").val("");
   frequency = $("#get-frequency").val("");
});


database.ref().on("child_added", function(snapshot){
    var sv = snapshot.val();

        
    //Console.log las user's data

    console.log(sv.trainName);
    console.log(sv.destination);
    console.log(sv.firstTrain);
    console.log(sv.frequency);

    //Time Variables And Functions
    var currentTime = moment();
    console.log(moment(currentTime).format("HH:mm"));
    
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1,"years");
    console.log(firstTimeConverted);

    var differenceTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log(differenceTime);

    var timeForNext = differenceTime % sv.frequency;
    console.log(timeForNext);

    var minutesForNextTrain = sv.frequency - timeForNext;
    console.log(minutesForNextTrain);

    var nextTrain = moment().add(minutesForNextTrain, "minutes").format("hh:mm");
    console.log(nextTrain);


    $("tbody").append("<tr class=''><th class='train-name'>" + sv.trainName + 
    "</th><th class='destination'>" + sv.destination + 
    "</th><th class='frequency'>" + sv.frequency + "</td><td class=''next-train>" + nextTrain + "</td><td class='minutes-for-next'>" + minutesForNextTrain + "</td></tr>")


})



    
})



















