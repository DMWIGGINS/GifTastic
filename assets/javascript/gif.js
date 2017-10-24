$(document).ready(function () {

    var i = 0;

    var topics = ["Jimmy Fallon", "mosaics", "African Drumming"];

    function topicsButton() {

        $("#topics-chosen").empty();

        for (i = 0; i < topics.length; i++) {

            var newButton = $("<button>" + topics[i] + "</button>");
            $(newButton).attr("data-category", topics[i]);
            $("#topics-chosen").append(newButton);

        }

    }
    topicsButton();

    $("button").on("click", function () {

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
                topicImage.attr("src", result[i].images.fixed_height.url);

                $("#topics-info").prepend(p);
                $("#topics-info").prepend(topicImage);


            };


        });

    });
})