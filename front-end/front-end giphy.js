$(function () {
    remove = function() {
        $(this).remove(); 
    }; 
    var x = [];
    var key = "dc6zaTOxFJmzC" 
    var term = ($("#search-term").val())
    $("#translate-button").click(function () {
        if(!$("#search-term").val()) { // JD: 7, 8, 9
            alert("Enter a valid search term!");
        } // JD: 10
        $(this).error(function() {
            alert('Image does not exist !!');
        });
        alert($("#search-term"));
        $.getJSON(
            "http://api.giphy.com/v1/gifs/translate",
            {
                s: $("#search-term").val(),
                api_key: key // JD: 11
            }
        ).done(function (result) {
           // if(result.length === undefined && result.)
            alert(result.length)
            x.push(result.data.images.original.url)
            alert('hi')
            alert(x)
            if( $('result.data.images.original.url').is(':empty')){
                alert(result.data.images.original.url)
            } //doesn't work
            var img = $("<img/>").attr({
                src: result.data.images.original.url,
                alt: "search result"
            });
            alert("img".length)
            $("#forImages").prepend(img);
            $("#forImages").prepend("<p> Translated term " + ($("#search-term").val()) + " id: " + result.data.id + "</p>") 
            $("img").click(remove);
        });
    }); // JD: 10

    $("#search-button").click(function () {
        $.getJSON(
            "http://api.giphy.com/v1/gifs/search",

            {
                q: $("#search-term").val(),
                api_key: key // JD: 15
            }
        ).done(function (result) {
            var img = $("<img/>").attr({
                src: result.data[0].images.original.url,
                alt: "search result"
            });

            $("#forImages").prepend(img);
            $("#forImages").prepend("<p> Searched term " + ($("#search-term").val()) + " id: " + result.data[0].id + "</p>") 
            $("img").click(remove);
        });      
    }); // JD: 10
    
    $("#endpoint-button").click(function () {
        $.getJSON(
            "http://api.giphy.com/v1/gifs/" + $("#search-term").val(),

            {
                api_key: key // JD: 15
            }
        ).done(function (result) {
            console.log(result);
            var img = $("<img/>").attr({
                src: result.data.images.original.url,
                alt: "search result"
            });

            $("#forImages").prepend(img);
            $("#forImages").prepend("<p> Endpoint id: " + result.data.id + "</p>") 
            $("img").click(remove);
        });
    });

    $("#random-button").click(function () {
        $.getJSON(
            "http://api.giphy.com/v1/gifs/random",

            {
                api_key: key // JD: 15
            }
        ).done(function (result) {
            var img = $("<img/>").attr({
                alt: "search result",
                src: result.data.image_url
            });
            $("#forImages").prepend(img);
            $("#forImages").prepend("<p> Random Image id: " + result.data.id + "</p>");
            $("img").click(remove);
        });
    }); // JD: 10

    $("#sticksearch-button").click(function () {
        if($("#search-term").val() == "") { // JD: 7, 8, 9
            return;
        } // JD: 10

        $.getJSON(
            "http://api.giphy.com/v1/stickers/search",

            {
                q: $("#search-term").val(),
                api_key: key // JD: 15
            }
        ).done(function (result) {
            var img = $("<img/>").attr({
                src: result.data[0].images.original.url,
                alt: "search result"
            });

            $("#forImages").prepend(img);
            $("#forImages").prepend("<p> Sticker Search " + ($("#search-term").val()) + " id: " + result.data[0].id + "</p>") 
            $("img").click(remove);
        });
    }); // JD: 10

    $("#trend-button").click(function () {
        $.getJSON(
            "http://api.giphy.com/v1/stickers/trending",

            {
                api_key: key // JD: 15
            }
        ).done(function (result) {
            // JD: 18
            result.data.forEach( function( imgObj, index ) { // JD: 12
                if( index > 4 ) { // JD: 7
                    return;
                } // JD: 10

                $("<img/>").attr({
                    src: imgObj.images.original.url,
                    alt: "search result",
                    id: "imgObj" + index
                }).click( function() { // JD: 12, 13
                    $(this).remove();
                }).appendTo($("#forImages")); // JD: 19
                $("#forImages").append("<p> Trending Images id: " + imgObj.id + "</p>") 
            });
        });
    }); // JD: 10

    $("#clear-button").click( function() { // JD: 12
        $("#forImages").empty(); // JD: 20
    });
});