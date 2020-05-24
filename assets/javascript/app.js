// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAHzxMn7ujIj17PFiJEqA1giiA6OrY4xyA",
    authDomain: "traintimes-53ae1.firebaseapp.com",
    databaseURL: "https://traintimes-53ae1.firebaseio.com",
    projectId: "traintimes-53ae1",
    storageBucket: "traintimes-53ae1.appspot.com",
    messagingSenderId: "824307777509",
    appId: "1:824307777509:web:d7911db22818707151390c",
    measurementId: "G-9VRQTR6HDC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Create a variable to reference the database.
var database = firebase.database();

// Initial Values
var trainname = "";
var destination = "";
var firsttime = "";
var freqeuncy = "";

// Capture Button Click
$("#submit-btn").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text boxes
    name = $("#trainName").val().trim();
    dest = $("#dest").val().trim();
    fTime = $("#first-time").val().trim();
    freq = $("#freq").val().trim();

    // Code for handling the push
    database.ref().push({
        trainName: name,
        Destination: dest,
        firstTime: fTime,
        Frequency: freq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});

// Firebase watcher .on("child_added"
database.ref().on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();
    var ampmTime = "";
    var ap = "";

    // Console.loging the last user's data
    console.log(sv.tainName);
    console.log(sv.Destination);
    console.log(sv.firstTime);
    console.log(sv.Frequency);

    if(parseInt(sv.firstTime.slice(0,-3))>12){
        amppmTime = toString(parseInt(toString(sv.firstTime).slice(0,-3)) - 12) + toString(nextArrival).slice(-2) + " PM";
        ap = "P";
    }else{
        ampmTime = sv.firstTime + " AM"
        ap = "A";
    }
    console.log(ampmTime);
    

    var nextArrival = "10:30 PM"; //how to do this???
    var nxtArriveMin = moment(nextArrival, "HH:mm " + ap).fromNow().slice(3,-8);
    console.log(nextArrival);
    console.log(nxtArriveMin);

    var key = 0;
    // Change the HTML to reflect
    var train = $("<tr id='"+ sv.dateAdded+1 +"'>").append($("<td>" + sv.trainName + 
        "</td>")).append($("<td>" + sv.Destination + 
        "</td>")).append($("<td>" + sv.Frequency + 
        "</td>")).append($("<td>" + nextArrival + 
        "</td>")).append($("<td>" + nxtArriveMin + 
        "</td>")).append("<button id='" + sv.dateAdded + "'>x</button>");
    $("tbody").append(train);

    $("#"+sv.dateAdded).on("click", function(){
        $("#"+sv.dateAdded).remove();
        $("#"+sv.dateAdded+1).remove();
        // database.ref().child(database.ref().key).remove();

    });


// Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});