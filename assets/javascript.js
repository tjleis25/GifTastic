$(document).ready(function() {
       
    // Initial Variables
    //===============================================
    
    var topics = ["blues-music", "rock-music", "hip-hop-music", "jazz-music", "bossa-nova-music","country-music", "classical-music", "folk-music", "alternative-music", "disco-music"];
    
    // Topic Buttons
    //===============================================
    function createButtons() {

        // deletes gifs prior to adding new gifs so there are no repeats
        $("#music-buttons").empty(); 
        // Can't figure out why the above code does not work..i've tried putting it in the function, out of the function..changing to $("#music-gifs").empty()
            
        // Loop through the array of topics
        for (var i = 0; i < topics.length; i++){
            var a = $("<button>"); 
            a.addClass("topic"); 
            a.attr("data-name", topics[i]);
            a.text(topics[i]); 
            $("#music-buttons").append(a);

    }    
}
        

// Add another genre of music
//==================================================

$("#submit-btn").on("click", function(){
    // alert("hello"); 
   
    
    //take user input
    var topic = $("#music-input").val().trim();

    // add new topic to the array of topics
    topics.push(topic);

    // call the function
    createButtons(); 

    // hit enter instead of press submit button
    return false; 
});


// Show Gifs
//==================================================

function makeGifs() {

    // Grab and store the data-music property value from the button
    var topic = $(this).attr("data-name");
        
    // Constructing a queryURL using the genre of music
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    topic + "&limit=10&api_key=2ujwvdl91Hj8wkhVxzlx1KXB8P33QYUN";

    //Perform an AJAX request with the queryURL
    $.ajax({
        url: queryURL, 
        method: "GET"
    })

    .then(function(response){
        console.log(queryURL);
        console.log(response);
    
        //Store the data from the AJAX request in the results variable
        var results = response.data; 

        // create a loop through each gif
        for(var j = 0; j < results.length; j++) {

            // Creating and storing a div tag
            var topicDiv = $("<div>");
                          
            // Creating and storing an image tag
            var topicImage = $("<img>");

            var p = $("<p>").text("Rating: " + results[j].rating);
            
            // Setting the src attribute of the image to a property pulled off the result item

            topicImage.attr("src", results[j].images.fixed_height_still.url);

            topicImage.attr("data-animate", results[j].images.fixed_height.url);

            topicImage.attr("data-still", results[j].images.fixed_height.url); 

            topicImage.attr("data-state", "still");
            
            topicImage.addClass("gif"); 

            var stillImage = (results[j].images.fixed_height_still.url);

            var animatedImage = (results[j].images.fixed_height.url);

            topicImage.attr("data-still", stillImage);
            topicImage.attr("data-animate", animatedImage);
           
          
            // Prepend the topicDiv to the HTML page in the "music-gifs" div
            
            $("#music-gifs").prepend(topicDiv);

            topicDiv.append(topicImage);

        } 
    })
}

// Creating the logic for data still/animation
$(document).on("click", ".gif", function() {
   
    var state = $(this).attr("data-state");
    
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        }    
        
});
  

// Call functions; 
//=====================================================
createButtons(); 

$(document).on("click", ".topic", makeGifs);




}) 

