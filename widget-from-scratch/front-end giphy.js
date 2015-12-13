$(function () {
    remove = function() {
        $(this).remove(); 
    }; 
    valid = function(term){
        if(! $(term).val()){
            alert("Enter a valid search term!");
            return;
        }
    }
    var key = "dc6zaTOxFJmzC" 
    $("#translate-button").click(function () {
        valid("#search-term");

        $.getJSON(
            "http://api.giphy.com/v1/gifs/translate",
            {
                s: $("#search-term").val(),
                api_key: key
            }
        ).done(function (result) {
            var img = $("<img/>").attr({
                src: result.data.images.original.url,
                alt: "search result"
            });
            $("#forImages").prepend(img);
            $("#forImages").prepend("<p> Translated term " + ($("#search-term").val()) + " id: " + result.data.id + "</p>") 
            //$("img").click(remove);
        });
    }); 

    $("#search-button").click(function () {
        valid("#search-term");
        $.getJSON(
            "http://api.giphy.com/v1/gifs/search",

            {
                q: $("#search-term").val(),
                api_key: key 
            }
        ).done(function (result) {
            var img = $("<img/>").attr({
                src: result.data[0].images.original.url,
                alt: "search result"
            });

            $("#forImages").prepend(img);
            $("#forImages").prepend("<p> Searched term " + ($("#search-term").val()) + " id: " + result.data[0].id + "</p>") 
            //$("img").click(remove);
        });      
    }); 
    
    $("#endpoint-button").click(function () {
        valid("#search-term");
        $.getJSON(
            "http://api.giphy.com/v1/gifs/" + $("#search-term").val(),

            {
                api_key: key
            }
        ).done(function (result) {
            console.log(result);
            var img = $("<img/>").attr({
                src: result.data.images.original.url,
                alt: "search result"
            });

            $("#forImages").prepend(img);
            $("#forImages").prepend("<p> Endpoint id: " + result.data.id + "</p>") 
          //  $("img").click(remove);
        });
    });

    $("#random-button").click(function () {
        $.getJSON(
            "http://api.giphy.com/v1/gifs/random",

            {
                api_key: key 
            }
        ).done(function (result) {
            var img = $("<img/>").attr({
                alt: "search result",
                src: result.data.image_url
            });
            $("#forImages").prepend(img);
            $("#forImages").prepend("<p> Random Image id: " + result.data.id + "</p>");
          //  $("img").click(remove);
        });
    }); 

    $("#sticksearch-button").click(function () {
        valid("#search-term");

        $.getJSON(
            "http://api.giphy.com/v1/stickers/search",

            {
                q: $("#search-term").val(),
                api_key: key 
            }
        ).done(function (result) {
            var img = $("<img/>").attr({
                src: result.data[0].images.original.url,
                alt: "search result"
            });

            $("#forImages").prepend(img);
            $("#forImages").prepend("<p> Sticker Search " + ($("#search-term").val()) + " id: " + result.data[0].id + "</p>") 
           // $("img").click(remove);
        });
    }); // JD: 10

    $("#trend-button").click(function () {
        $.getJSON(
            "http://api.giphy.com/v1/stickers/trending",

            {
                api_key: key
            }
        ).done(function (result) {
           
            result.data.forEach( function( imgObj, index ) { 
                if( index > 4 ) { 
                    return;
                }

                $("<img/>").attr({
                    src: imgObj.images.original.url,
                    alt: "search result",
                    id: "imgObj" + index
                }).click( function() { 
                    $(this).remove();
                }).prependTo($("#forImages"));
                $("#forImages").prepend("<p> Trending Images id: " + imgObj.id + "</p>") 
            });
        });
    });

    $("#clear-button").click( function() { 
        $("#forImages").empty(); 
    });
});