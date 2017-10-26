$(document).ready(function () {

    var i = 0;

    var topics = ["Jimmy Fallon", "Tina Fey", "Ellen DeGeneres"];


    function topicsButton() {

        $("#topics-chosen").empty();

        for (i = 0; i < topics.length; i++) {

            var newButton = $("<button>" + topics[i] + "</button>");
            $(newButton).attr("data-category", topics[i]);
            $(newButton).addClass("ready");
            $("#topics-chosen").append(newButton);

        }

    }
    topicsButton();

    function showYourChoice() {

        var subject = $(this).attr("data-category");
        console.log(this);
        console.log(subject);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + subject +
            "&api_key=ZgU2TWQKAtE2HTR2oVmP9KunmtHO7hgr&limit=10";


        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            console.log(response);
            var result = response.data;

            for (var i = 0; i < result.length; i++) {



                var rating = result[i].rating;
                var p = $("<p>").text("Rating: " + rating);

                var topicImage = $("<img>");
                topicImage.attr("src", result[i].images.fixed_height_still.url);
                topicImage.addClass("gif");
                topicImage.attr("data-state", "still");
                console.log(topicImage.attr);
                console.log(result);
                $("#topics-info").prepend(p);
                $("#topics-info").prepend(topicImage);


            };



        });


    };


    // console.log("data-state");
    // $(".gif").on("click", function () {

    //     var state = $(this).attr("data-state");
    //     console.log(state);
    //     if (state === "still") {
    //         $(this).attr("src", $(this).images.fixed_height.url);
    //         $(this).attr("data-state", "animate");

    //     } else {
    //         $(this).attr("src", $(this).images.fixed_height_still.url);
    //         $(this).attr("data-state", "still");
    //     }



    // });

    $("#celebrity").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var newCelebrity = $("#your-input").val().trim();


        topics.push(newCelebrity);
        topicsButton();

    });


    $(document).on("click", ".ready", showYourChoice);
    



})