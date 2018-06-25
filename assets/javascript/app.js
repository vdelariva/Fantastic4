// Initialize Firebase
var config = {
    apiKey: "AIzaSyAkvK8XfeQaHEImGp3wYcofEOvluC43oQY",
    authDomain: "sportmanager-f587f.firebaseapp.com",
    databaseURL: "https://sportmanager-f587f.firebaseio.com",
    projectId: "sportmanager-f587f",
    storageBucket: "sportmanager-f587f.appspot.com",
    messagingSenderId: "361080289579"
    };
    firebase.initializeApp(config);
    
    // Variable to reference the database
    const database = firebase.database();
    
    // Player object
    var newPlayer = {
        firstName: "",
        lastName: "",
        grade: "",
        handle:""
    }
    
    // Match object
    var newMatch = {
        date: "",
        opponent: "",
        time: "",
        location: "",
        notes: "",
        score: ""
    }
    
    // Capture Add Player Button Click
    $("#player").on("click", function(event) {
        event.preventDefault();
        newPlayer.firstName = $("#firstName").val().trim();
        newPlayer.lastName = $("#lastName").val().trim();
        newPlayer.grade= $("#grade").val().trim();
        newPlayer.handle = $("#handle").val().trim();
     
        database.ref("roster/").push({
            firstName: newPlayer.firstName,
            lastName: newPlayer.lastName,
            grade: newPlayer.grade,
            handle: newPlayer.handle
        })
    });
    
    // Capture Add Match Button Click
    $("#match").on("click", function(event) {
        event.preventDefault();
        newMatch.date = $("#date").val().trim();
        newMatch.opponent = $("#opponent").val().trim();
        newMatch.time= $("#time").val().trim();
        newMatch.location = $("#location").val().trim();
        newMatch.notes = $("#notes").val().trim();
        newMatch.score = $("#score").val().trim();
     
        database.ref("schedule/").push({
            date: newMatch.date,
            opponent: newMatch.opponent,
            time: newMatch.time,
            location: newMatch.location,
            notes: newMatch.notes,
            score: newMatch.score
        })
    });
    
    // Player added to database
    database.ref("roster/").on("child_added", function(snapshot){ 
        console.log("roster: "+JSON.stringify(snapshot))
        console.log("first name:"+ snapshot.val().firstName)  
    
        // Display team player
        $("#roster > tbody").append("<tr>" 
        + "<td>" + snapshot.val().firstName + "</td>" 
        + "<td>" + snapshot.val().lastName + "</td>" 
        + "<td>" + parseInt(snapshot.val().grade) + "</td>" 
        + "<td>" + snapshot.val().handle + "</td>")
    });
    
    // Match added to database
    database.ref("schedule/").on("child_added", function(snapshot){ 
        console.log("schedule: "+JSON.stringify(snapshot))
        console.log("opponent:"+ snapshot.val().opponent)  
    
        // Display team schedule
        $("#schedule > tbody").append("<tr>" 
        + "<td>" + snapshot.val().date + "</td>" 
        + "<td>" + snapshot.val().opponent + "</td>" 
        + "<td>" + snapshot.val().time + "</td>" 
        + "<td>" + snapshot.val().location + "</td>"
        + "<td>" + snapshot.val().notes + "</td>"
        + "<td>" + snapshot.val().score + "</td>")
    });
    
    
    // Action.com api
    var originalURL = "https://api.amp.active.com/v2/search/?city=minneapolis&query=tennis&current_page=1&per_page=10&sort=distance&exclude_children=true&api_key=ja8qanb9v23rmxsqpb26ad93";
    var queryURL = "https://cors-anywhere.herokuapp.com/" + originalURL
    
    $.ajax({
      url: queryURL,
      method: "GET",
      dataType: "json",
      // this headers section is necessary for CORS-anywhere
      headers: {
        "x-requested-with": "xhr",
      }
    }).done(function(response) {
      console.log('CORS anywhere response', response);
    }).fail(function(jqXHR, textStatus) {
      console.error(textStatus)
    })