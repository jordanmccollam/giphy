$(document).ready(function() {

    var topics = ["trampoline", "pool", "bicycle"];

    renderButtons();
    function renderButtons() {
        for (var i = 0; i < topics.length; i++) {
            var btn = $("<button class='btn btn-outline-danger gif-btn mr-2'>");
            $(btn).attr("data-topic", topics[i]);
            btn.html(topics[i]);
            $("#gif-list").append(btn);
        }
        displayGifs();
    };

    function displayGifs() {
        $(".gif-btn").on('click', function() {
            var topic = $(this).attr("data-topic");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "+fails&api_key=GfT1wbBJMOtOLITH09TXDsK2DfYPE7CD&limit=4";
    
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                var results = response.data;
                console.log(response.data);
    
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class='col-lg-6 m-0 gif-div'>");
                    var rating = results[i].rating;
                    var p = $("<p>").html("Rating: " + rating);
                    var image = $("<img>");
                    image.attr("src", results[i].images.fixed_height_still.url);
                    image.attr("data-still", results[i].images.fixed_height_still.url);
                    image.attr("data-animate", results[i].images.fixed_height.url);
                    image.attr("data-state", "still");
                    image.addClass("gif");
                    gifDiv.prepend(p);
                    gifDiv.append(image);
                    $("#gif-display").prepend(gifDiv);
                }
                gifAnimate();
            });
        })
    };

    function gifAnimate() {
        $(".gif").on('click', function() {
            var state = $(this).attr("data-state");

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        })
    };

    function searchgif() {
        var search = $("#add-gif").val().trim();
        topics = [];
        topics.push(search);
        renderButtons();
        $("#add-gif").val("");
    };

    $("#add-btn").on('click', function() {
        event.preventDefault();
        searchgif();
    });


// END of JS
});