$.ajax({
    url: 'https://api.instagram.com/v1/users/self/media/recent?access_token=2990260460.3146e20.78ee043027df4f24932d8eecb70e0316', // or /users/self/media/recent for Sandbox
    dataType: 'jsonp',
    type: 'GET',
    success: function(data){
         console.log("from the interval" + data.data.length);
        
    },
    error: function(data){
        console.log(err); // send the error notifications to console
    }
});


var count = $(".img_holder ul").children().length;
                            console.log("holder: " + count);
                            if(newImages > startImagesAvail) {
                                $("#instagram_feed").empty();
                                $("#instagram_feed").append(imageOutput(data.data));
                            }
                            if($(".img_holder ul").children().length > count) {
                                $(".img_holder ul").children().last().remove();
                            }