$(function () {

    $("#translate-button").click(function () {
        if($("#search-term").val() == "") {
            return;
        }
        $.getJSON(
            "http://api.giphy.com/v1/gifs/translate",

            {
                s: $("#search-term").val(),
                api_key: "dc6zaTOxFJmzC"
            }
        ).done(function (result) {
            console.log(result);
            var img = $("<img/>").attr({
                src: result.data.images.original.url,
                alt: "search result"
            });

            $("#forImages").append(img);
            $("#forImages").append("<p> id: " + result.data.id + "</p>") 
            $("img").click(function(){
                $(this).hide();
            });
        });
    });   
    $("#search-button").click(function () {
        $.getJSON(
            "http://api.giphy.com/v1/gifs/search",

            {
                q: $("#search-term").val(),
                api_key: "dc6zaTOxFJmzC"
            }
        ).done(function (result) {
            var img = $("<img/>").attr({
                src: result.data[0].images.original.url,
                alt: "search result"
            });

            $("#forImages").append(img);
            $("#forImages").append("<p> id: " + result.data[0].id + "</p>") 
            $("img").click(function(){
                $(this).hide();
            });
        });      
    });  
    $("#endpoint-button").click(function () {
        $.getJSON(
            "http://api.giphy.com/v1/gifs/" + $("#search-term").val(),

            {
                api_key: "dc6zaTOxFJmzC"
            }
        ).done(function (result) {
            console.log(result);
            var img = $("<img/>").attr({
                src: result.data.images.original.url,
                alt: "search result"
            });

            $("#forImages").append(img);
            $("#forImages").append("<p> id: " + result.data.id + "</p>") 
            $("img").click(function(){
                $(this).hide();
            });
        });
    });
    $("#random-button").click(function () {
        $.getJSON(
            "http://api.giphy.com/v1/gifs/random",

            {
                api_key: "dc6zaTOxFJmzC"
            }
        ).done(function (result) {
            //console.log(result);
            var img = $("<img/>").attr({
                alt: "search result",
                src: result.data.image_url
            });
            $("#forImages").append(img);
            $("#forImages").append("<p> id: " + result.data.id + "</p>");
            $("img").click(function(){
                $(this).hide();
            });
            $("api_key").click(function(){
                $(this).hide();
            });
        });
    });
    $("#sticksearch-button").click(function () {
        if($("#search-term").val() == "") {
            return;
        }
        $.getJSON(
            "http://api.giphy.com/v1/stickers/search",

            {
                q: $("#search-term").val(),
                api_key: "dc6zaTOxFJmzC"
            }
        ).done(function (result) {
            var img = $("<img/>").attr({
                src: result.data[0].images.original.url,
                alt: "search result"
            });

            $("#forImages").append(img);
            $("#forImages").append("<p> id: " + result.data[0].id + "</p>") 
            $("img").click(function(){
                $(this).hide();
            });
        });
    });
    $("#trend-button").click(function () {
        $.getJSON(
            "http://api.giphy.com/v1/stickers/trending",

            {
                //q: $("#search-term").val(),
                api_key: "dc6zaTOxFJmzC"
            }
        ).done(function (result) {
            
            result.data.forEach(function(imgObj, index) {
                if(index > 4) {
                    return;
                }
                $("<img/>").attr({
                    src: imgObj.images.original.url,
                    alt: "search result",
                    id: "imgObj" + index
                }).click(function(){
                    $(this).hide();
                }).appendTo($("#forImages"));
                $("#forImages").append("<p> id: " + imgObj.id + "</p>") 
            });
        });
    });
    $("#clear-button").click(function() {
        $("#forImages").empty();
    });
});