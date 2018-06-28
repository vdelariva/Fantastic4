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
        // console.log("roster: "+JSON.stringify(snapshot))
        // console.log("first name:"+ snapshot.val().firstName)  
    
        // Display team player
        $("#roster > tbody").append("<tr id="+snapshot.key+">" 
        + "<td>" + snapshot.val().firstName + "</td>" 
        + "<td>" + snapshot.val().lastName + "</td>" 
        + "<td>" + parseInt(snapshot.val().grade) + "</td>" 
        + "<td>" + snapshot.val().handle + "</td>"
        + "<td><i class='far fa-trash-alt rtrash' data-key="+snapshot.key+"></i></tr>")
    });
    
    // Match added to database
    database.ref("schedule/").on("child_added", function(snapshot){ 
        // console.log("schedule: "+JSON.stringify(snapshot))
        // console.log("opponent:"+ snapshot.val().opponent)  
    
        // Display team schedule
        $("#schedule > tbody").append("<tr id="+snapshot.key+">" 
        + "<td>" + snapshot.val().date + "</td>" 
        + "<td>" + snapshot.val().opponent + "</td>" 
        + "<td>" + snapshot.val().time + "</td>" 
        + "<td>" + snapshot.val().location + "</td>"
        + "<td>" + snapshot.val().notes + "</td>"
        + "<td>" + snapshot.val().score + "</td>"
        + "<td><i class='far fa-trash-alt strash' data-key="+snapshot.key+"></i></tr>")
    });
    
    $(document).on("click",".strash", function(event) {
        let currKey = $(this).attr("data-key");
        let scheduleRef=database.ref("schedule/"+currKey);
        scheduleRef.remove();
        $("#"+currKey).remove();
    });
    
    $(document).on("click",".rtrash", function(event) {
        let currKey = $(this).attr("data-key");
        let rosterRef=database.ref("roster/"+currKey);
        rosterRef.remove();
        $("#"+currKey).remove();
    });

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
    $("iframe").hide();
    $(".vid_btn").click(function(){
        searchObj.q = $(this).attr("data-term");
        keyWordsearch();
    });


// instagram api
//-------------------------------------------------------------------------------


    
        $.ajax({
            url: 'https://api.instagram.com/v1/users/self/media/recent?access_token=2990260460.3146e20.78ee043027df4f24932d8eecb70e0316', // or /users/self/media/recent for Sandbox
            dataType: 'jsonp',
            type: 'GET',
            success: function(data){
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
                             var newImages = data.data.length;
                            console.log("start img: " + startImagesAvail);
                            console.log(newImages);
                            
                            
                        },
                        error: function(data){
                            console.log(err); // send the error notifications to console
                        }
                    });
                    
                }, 10000);
            },
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
       $("iframe").attr("src", vidSrc);
       $("iframe").show();
       }).catch(function(err) {
       console.log(err)
       })
   }


//output the event data to a ul to hold the info
    function eventOutput(data) {
        var output = $('<ul> class="event_holder"');
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
        var output = $('<ul class="img_holder">');
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


    //instagram token = 2990260460.3146e20.78ee043027df4f24932d8eecb70e0316