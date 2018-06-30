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
        $("form").trigger("reset");
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
        $("form").trigger("reset");
    });

    // Player added to database
    database.ref("roster/").orderByChild("lastName").on("child_added", function(snapshot){ 
        // Display team player
        $("#roster > tbody").append("<tr id="+snapshot.key+">"
        + "<td>" + snapshot.val().firstName + "</td>"
        + "<td>" + snapshot.val().lastName + "</td>"
        + "<td>" + parseInt(snapshot.val().grade) + "</td>"
        + "<td>" + snapshot.val().handle + "</td>"
        + "<td><i class='far fa-edit edit redit hover-outline' data-toggle='modal' data-target='#myModal' data-key="+snapshot.key+"></i></td></tr>")
    });

    // Match added to database
    database.ref("schedule/").orderByChild("date").on("child_added", function(snapshot){ 
        // convert ISO date to local date format
        let d = new Date(snapshot.val().date);
        var n = d.toLocaleDateString();
        // Display team schedule
        $("#schedule > tbody").append("<tr id="+snapshot.key+">"
        + "<td>" + n + "</td>"
        + "<td>" + snapshot.val().opponent + "</td>"
        + "<td>" + snapshot.val().time + "</td>"
        + "<td>" + snapshot.val().location + "</td>"
        + "<td>" + snapshot.val().notes + "</td>"
        + "<td>" + snapshot.val().score + "</td>"
        + "<td><i class='far fa-edit edit sedit hover-outline' data-toggle='modal' data-target='#myModal' data-key="+snapshot.key+"></i></td></tr>")
    });
    
    // Edit the team schedule
    $(document).on("click",".sedit", function(event) {
        event.preventDefault();
        let currKey = $(this).attr("data-key");
        let scheduleRef=database.ref("schedule/"+currKey);

        scheduleRef.once("value", function(data){
        // Display the modal form for editing matches
        $(".modal-title").text("Edit Player");
        $(".modal-body").html("<form>"
            +"<div class='form-group'>"
            +"<label for='date' class='col-form-label'>Date:</label>"
            +"<input type='date' class='form-control' id='date' value="+data.val().date+">"
            +"</div>"
            +"<div class='form-group'>"
            +"<label for='opponent' class='col-form-label'>Opponent:</label>"
            +"<input type='text' class='form-control' id='opponent' value="+data.val().opponent+">"
            +"</div>"
            +"<div class='form-group'>"
            +"<label for='time' class='col-form-label'>Time:</label>"
            +"<input type='time' class='form-control' id='time' value="+data.val().time+">"
            +"</div>"
            +"<div class='form-group'>"
            +"<label for='location' class='col-form-label'>Location:</label>"
            +"<input type='text' class='form-control' id='location' value="+data.val().location+">"
            +"</div>"
            +"<div class='form-group'>"
            +"<label for='notes' class='col-form-label'>Notes:</label>"
            +"<input type='text' class='form-control' id='notes' value="+data.val().notes+">"
            +"</div>"
            +"<div class='form-group'>"
            +"<label for='score' class='col-form-label'>Score:</label>"
            +"<input type='text' class='form-control' id='score' value="+data.val().score+">"
            +"</div></form>");
            // console.log("score: "+data.val().score)
        })

        $("#saveChanges").attr("data-key",currKey);
        $("#saveChanges").attr("data-tableType","schedule/");
        $("#delete").attr("data-key",currKey)
        $("#delete").attr("data-tableType","schedule/");
    });
    
    // Edit the team roster
    $(document).on("click",".redit", function(event) {
        event.preventDefault();
        let currKey = $(this).attr("data-key");
        let rosterRef=database.ref("roster/"+currKey);

        rosterRef.once("value", function(data){
        // Display the modal form for editing players
        $(".modal-title").text("Edit Match");
        $(".modal-body").html("<form>"
            +"<div class='form-group'>"
            +"<label for='firstName' class='col-form-label'>First Name:</label>"
            +"<input type='text' class='form-control' id='firstName' value="+data.val().firstName+">"
            +"</div>"
            +"<div class='form-group'>"
            +"<label for='lastName' class='col-form-label'>Last Name:</label>"
            +"<input type='text' class='form-control' id='lastName' value="+data.val().lastName+">"
            +"</div>"
            +"<div class='form-group'>"
            +"<label for='grade' class='col-form-label'>Grade:</label>"
            +"<input type='number' class='form-control' id='grade' value="+data.val().grade+">"
            +"</div>"
            +"<div class='form-group'>"
            +"<label for='handle' class='col-form-label'>Handle:</label>"
            +"<input type='text' class='form-control' id='handle' value="+data.val().handle+">"
            +"</div>");
        })

        $("#saveChanges").attr("data-key",currKey);
        $("#saveChanges").attr("data-tableType","roster/");
        $("#delete").attr("data-key",currKey)
        $("#delete").attr("data-tableType","roster/");
    });

    // Save changes from modal form
    $(document).on("click","#saveChanges", function(event){
        event.preventDefault();
        let currKey = $(this).attr("data-key");
        let tableType = $(this).attr("data-tableType");
        let itemRef=database.ref(tableType+currKey);

        if (tableType === "roster/"){

            // Get data from modal
            newPlayer.firstName = $("#firstName").val().trim();
            newPlayer.lastName = $("#lastName").val().trim();
            newPlayer.grade= $("#grade").val().trim();
            newPlayer.handle = $("#handle").val().trim();

            // Update entry in database
            itemRef.set({
                firstName: newPlayer.firstName,
                lastName: newPlayer.lastName,
                grade: newPlayer.grade,
                handle: newPlayer.handle
            })

            // Update entry on DOM
            $("#"+currKey).html("<td>" + newPlayer.firstName + "</td>" 
            + "<td>" + newPlayer.lastName + "</td>" 
            + "<td>" + newPlayer.grade + "</td>" 
            + "<td>" + newPlayer.handle + "</td>"
            + "<td><i class='far fa-edit edit redit hover-outline' data-toggle='modal' data-target='#myModal' data-key="+currKey+"></i></td>")        
        } else if (tableType === "schedule/"){
            // Get data from modal
            newMatch.date = $("#date").val().trim();
            newMatch.opponent = $("#opponent").val().trim();
            newMatch.time= $("#time").val().trim();
            newMatch.location = $("#location").val().trim();
            newMatch.notes = $("#notes").val().trim();
            newMatch.score = $("#score").val().trim();

            // Update entry in database
            itemRef.set({
                date: newMatch.date,
                opponent: newMatch.opponent,
                time: newMatch.time,
                location: newMatch.location,
                notes: newMatch.notes,
                score: newMatch.score
            })

            // Update entry on DOM
            $("#"+currKey).html("<td>" + newMatch.date + "</td>" 
            + "<td>" + newMatch.opponent + "</td>" 
            + "<td>" + newMatch.time + "</td>" 
            + "<td>" + newMatch.location + "</td>"
            + "<td>" + newMatch.notes + "</td>"
            + "<td>" + newMatch.score + "</td>"
            + "<td><i class='far fa-edit edit sedit hover-outline' data-toggle='modal' data-target='#myModal' data-key="+currKey+"></i></td>")        
        }
    });

    // Delete entry
    $(document).on("click","#delete", function(event){
        event.preventDefault();
        let currKey = $(this).attr("data-key");
        let tableType = $(this).attr("data-tableType");
        let itemRef=database.ref(tableType+currKey);
        itemRef.remove();
        $("#"+currKey).remove();
    })

    // hides video player and stops it on any click other than link
    $(document).mouseup(function(e) {
	    var hideItem = $(".vid_btn");

	    // if the target of the click isn't the container nor a descendant of the container
	    if (!hideItem.is(e.target) && hideItem.has(e.target).length === 0)
	    {
            $("iframe").hide(400);
            $("iframe").attr("src", "");
	    }
	});

// Action.com api
//------------------------------------------------------------------------------


    var currentDate = formatDate(new Date());
    var originalURL = "https://api.amp.active.com/v2/search/?near=minneapolis&query=usta+tournament+boy&per_page=3&sort=distance&start_date=" + currentDate + "..&exclude_children=true&api_key=ja8qanb9v23rmxsqpb26ad93";
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
      //console.log('CORS anywhere response', response);
      $("#event_container").append(eventOutput(response));
    }).fail(function(jqXHR, textStatus) {
      console.error(textStatus);
    })

// Youtube api
//------------------------------------------------------------------------------

    var vidRequest;
    var searchObj = {
        part: 'snippet',
        maxResults: 10,
        q: ""
    }
    // $("iframe").hide();
    $(".vid_btn").click(function(){
        searchObj.q = $(this).attr("data-term");
        keyWordsearch();
    });


// instagram api
//-------------------------------------------------------------------------------

        var newImages = 0;
    
        $.ajax({
            url: 'https://api.instagram.com/v1/users/self/media/recent?access_token=2990260460.3146e20.78ee043027df4f24932d8eecb70e0316', // or /users/self/media/recent for Sandbox
            dataType: 'jsonp',
            type: 'GET',
            success: refreshImg,
            error: function(data){
                console.log(err); // send the error notifications to console
            }
        });


   function keyWordsearch(){
       var queryURL = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyAr_9T1FB9rcmFjmGFVQHobhyNUxyKFswE"

       // Creates AJAX call for the specific gif theme button being clicked
       $.ajax({
       url: queryURL,
       method: "GET",
       data: searchObj
       }).then(function(response) {
       //console.log('runs')
       //console.log(response);
       var randomVid = Math.floor(Math.random() * 10);
       var randomVidId = response.items[randomVid].id.videoId;
       var vidSrc = `https://www.youtube.com/embed/${randomVidId}?autoplay=1`;
    //    debugger
       $("#video").html("<iframe class='py-2' width='100%' src="+vidSrc+"></iframe>");
    //    $("#video").text("Stuff!")
       console.log("video: "+$('#video'))
    //    $("iframe").attr("src", vidSrc);
    //    $("iframe").show();
       }).catch(function(err) {
       console.log(err)
       })
   }


//output the event data to a ul to hold the info
    function eventOutput(data) {
        var output = $('#resources');
        data.results.forEach(function(item){
            var startDate = item.activityStartDate.split('T')[0];
            var prettyDate = moment(startDate).format("MMM Do, YYYY");
            var liTitle = $('<li class="event_title">');
            var liLink = $('<a>');
            liLink.attr("class", "event_link");
            liLink.attr("href", item.homePageUrlAdr);
            liLink.attr('target','_blank');
            liLink.text(item.assetName);
            liTitle.append(liLink);
            var liPlace = $('<li class="event_place">').text(item.place.cityName + ", " + item.place.stateProvinceCode);
            var liDate = $('<li class="event_date">').text(prettyDate);
            output.append(liTitle);
            output.append(liPlace);
            output.append(liDate);
        });
        return output;
    }
//need to pass in the query todays date
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    function imageOutput(data) {
        var output = $('<ul class="img_holder d-flex justify-content-center">');
        data.forEach(function(item){
            //console.log(item.images.standard_resolution.url);
            var liImage = $('<li>');
            var liImg = $('<img class="insta_image">');
            liImg.attr("src", item.images.standard_resolution.url);
            liImage.prepend(liImg);
            output.prepend(liImage);
        });
        return output;
    }

    function refreshImg(data) {
            console.log(data.data.length);
           var startImagesAvail = data.data.length;
           $("#instagram_feed").append(imageOutput(data.data));
           setInterval(function() {
               $.ajax({
                   url: 'https://api.instagram.com/v1/users/self/media/recent?access_token=2990260460.3146e20.78ee043027df4f24932d8eecb70e0316', // or /users/self/media/recent for Sandbox
                   dataType: 'jsonp',
                   type: 'GET',
                   success: function(data){
                        console.log("from the interval" + data.data.length);
                        
                       console.log("start img: " + startImagesAvail);
                       console.log(newImages);
                           $("#instagram_feed").empty();
                           $("#instagram_feed").append(imageOutput(data.data));
                   },
                   error: function(data){
                       console.log(err); // send the error notifications to console
                   }
               });
               
           }, 10000);
       }
    
//Anime.js library

//$(document).on('click','#CSStransforms',function(event){
// added on ready to fire on page load, remove comment from line above yo use on click and comment out on ready
$(document).ready(function(){
    moveBall();

$("#CSStransforms").on('click', function(event){
    moveBall();
  });

});

    //instagram token = 2990260460.3146e20.78ee043027df4f24932d8eecb70e0316
function moveBall() {
    var CSStransforms = anime({
        targets: '.tennisball',
        translateX: [
       { value: 400, duration: 1000, delay: 500, elasticity: 0 },
       { value: 0, duration: 1000, delay: 500, elasticity: 0}
     ],
     translateY: [
       { value: -150, duration: 500, elasticity: 100 },
       { value: 100, duration: 500, delay: 1000, elasticity: 100 },
       { value: 0, duration: 500, delay: 1000, elasticity: 100 }
     ],
     scaleX: [
       { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
       { value: 1, duration: 900, elasticity: 300 },
       { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
       { value: 1, duration: 900, elasticity: 300 }
     ],
     scaleY: [
       { value: [1.75, 1], duration: 500 },
       { value: 2, duration: 50, delay: 1000, easing: 'easeOutExpo' },
       { value: 1, duration: 450 },
       { value: 1.75, duration: 50, delay: 1000, easing: 'easeOutExpo' },
       { value: 1, duration: 450 }
     ],
     // loop: true
    })
}