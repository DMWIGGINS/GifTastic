$(document).ready(function () {

    // declare variable to use for looping through array
    var i = 0;

    // array with initial buttons and then to add buttons to
    var topics = ["Jimmy Fallon", "Tina Fey", "Ellen DeGeneres"];

    // function to create buttons by looping through array
    function topicsButton() {

        // start by emptying div so we don't have duplicate buttons
        $("#topics-chosen").empty();

        // looping through array
        for (i = 0; i < topics.length; i++) {

            // creating buttons labeled with each topic
            var newButton = $("<button>" + topics[i] + "</button>");

            // adding "data-category" to use in ajax call
            $(newButton).attr("data-category", topics[i]);

            // adding class "ready" to reference in click event
            $(newButton).addClass("ready");

            // adding button div with id topics-chosen
            $("#topics-chosen").append(newButton);
        }
    }

    // calling topicsButton to create initial buttons
    topicsButton();

    // function to display gifs when button is clicked
    function showYourChoice() {

        // take data-category from button clicked and assign it to variable subject
        var subject = $(this).attr("data-category");

        // add subject to queryURL which will return 10 gifs from giphy
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + subject +
            "&api_key=ZgU2TWQKAtE2HTR2oVmP9KunmtHO7hgr&limit=10";

        // ajax uses queryURL to return 10 gifs
        $.ajax({
            url: queryURL,
            method: "GET"

            // promise to return gifs as response
        }).done(function (response) {
            console.log("Clicked");

            // use var result to store all the data returned by response
            var result = response.data;

            // loop through and create the images for each gif
            for (var i = 0; i < result.length; i++) {

                // variable to store the rating of each gif
                var rating = result[i].rating;

                // variable to store the paragraph with the rating written inside
                var p = $("<p>").text("Rating: " + rating);

                // variable to store the image element 
                var topicImage = $("<img>");

                // assign the source attribute
                $(topicImage).attr("src", result[i].images.fixed_height_still.url);

                // assign the data-still attribute
                $(topicImage).attr("data-still", result[i].images.fixed_height_still.url);

                // assign the data-animate attribute
                $(topicImage).attr("data-animate", result[i].images.fixed_height.url);

                // assign the data-state attribute
                $(topicImage).attr("data-state", "still");

                // assign the class of gif to use with click event
                $(topicImage).addClass("gif");

                // create a variable box to hold both topicImage and p to make it easier to format
                // give box a class of box
                var box = $("<div>").addClass("box");

                // add p to the box
                $(box).prepend(p);

                // add topicImage to the box
                $(box).prepend(topicImage);

                // add box to the div with id topics-info
                $("#topics-info").prepend(box);

            };
        });
    };

    // "listen" for the on-click of an image with the class of gif which in this case is all of the images on the page
    $(document.body).on("click", ".gif", function () {

        // store the current data-state in a variable called state
        var state = $(this).attr("data-state");

        // check to see if state is equal to still
        if (state === "still") {

            // change source of clicked image to data-animate
            $(this).attr("src", $(this).attr("data-animate"));

            // change data-state to animate
            $(this).attr("data-state", "animate");

            // if state is not equal to still 
        } else {

            // change source of clicked image to data-still
            $(this).attr("src", $(this).attr("data-still"));

            // change data-state to still
            $(this).attr("data-state", "still");
        }
    });

    // listen for on click of button with id of celebrity
    $("#celebrity").on("click", function (event) {

        // keeps page from refreshing when celebrity button is clicked
        event.preventDefault();

        // This line grabs the input from the textbox
        var newCelebrity = $("#your-input").val().trim();

        // takes the value of new celebrity and adds it to the array
        topics.push(newCelebrity);

        // calls the function topicsButton
        topicsButton();

    });

    // listens for the click on any button with class of celebrity and runs the showYourChoice function
    $(document).on("click", ".ready", showYourChoice);

})