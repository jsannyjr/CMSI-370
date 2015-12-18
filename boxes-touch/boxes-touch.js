(function ($) {
    var veloX; 
    var veloY;
    var gravX = 0;
    var gravY = 0; 
    var prevT;
    var nextT;
    var posX;
    var posY;
    var lasttimeStamp = 0;
    var frameRate = 120; 
    var MILLI_SECONDS_BETWEEN_FRAMES = 1000/frameRate;
    var boxes = [];
    /**
     * Tracks a box as it is rubberbanded or moved across the drawing area.
     */
    var trackDrag = function (event) {
        $.each(event.changedTouches, function (index, touch) {
            // Don't bother if we aren't tracking anything.
            if (touch.target.movingBox) {
                // Reposition the object.
                touch.target.movingBox.offset({
                    left: touch.pageX - touch.target.deltaX,
                    top: touch.pageY - touch.target.deltaY
                });

                touch.target.velocity.x = touch.pageX - touch.target.lastX;
                touch.target.velocity.y = touch.pageY - touch.target.lastY;
                touch.target.lastX = touch.pageX;
                touch.target.lastY = touch.pageY;
                // posX = location.left;
                // posY = location.right;
                // console.log(posX);
              //  console.log(touch.pageX);
                //console.log(touch.target.movingBox.height());
               // console.log("Top" + top);
            }
        });

        // Don't do any touch scrolling.
        event.preventDefault();
    };

    /**
     * Concludes a drawing or moving sequence.
     */
    var endDrag = function (event) {
        $.each(event.changedTouches, function (index, touch) {
            if (touch.target.movingBox) {
                // Change state to "not-moving-anything" by clearing out
                // touch.target.movingBox.
                touch.target.movingBox = null;
            }
        });
    };

    /**
     * Indicates that an element is unhighlighted.
     */
    var unhighlight = function () {
        $(this).removeClass("box-highlight");
    };

    /**
     * Begins a box move sequence.
     */
    var startMove = function (event) {
        $.each(event.changedTouches, function (index, touch) {
            // Highlight the element.
            $(touch.target).addClass("box-highlight");

            // Take note of the box's current (global) location.
            var jThis = $(touch.target),
                startOffset = jThis.offset();

            // Set the drawing area's state to indicate that it is
            // in the middle of a move.
            touch.target.movingBox = jThis;
            touch.target.deltaX = touch.pageX - startOffset.left;
            touch.target.deltaY = touch.pageY - startOffset.top;
            touch.target.startX = startOffset.left;
            touch.target.startY = startOffset.top;
            touch.target.lastX = touch.pageX;
            touch.target.lastY = touch.pageY;
        });

        // Eat up the event so that the drawing area does not
        // deal with it.
        event.stopPropagation();
    };
       var updateBoxes = function (timestamp){
        var deltaT = timestamp - lasttimeStamp;
        //console.log(boxes);

        boxes.forEach(function (element){
           // console.log($(element));
            if(element.movingBox == null || element.movingBox == undefined) {
                var off = $(element).offset();
                off.left += element.velocity.x * deltaT/20;
                off.top += element.velocity.y * deltaT/20;
                element.velocity.x += element.acceleration.x * deltaT/10;
                element.velocity.y += element.acceleration.y * deltaT/10;
               // console.log(off.top);
                $(element).offset(off);
                
            }
        });
        lasttimeStamp = timestamp;
      //  console.log(deltaT);
        window.requestAnimationFrame(updateBoxes);
    };
    /**
     * Sets up the given jQuery collection as the drawing area(s).
     */
    var setDrawingArea = function (jQueryElements) {
        // Set up any pre-existing box elements for touch behavior.
        jQueryElements
            .addClass("drawing-area")
            
            // Event handler setup must be low-level because jQuery
            // doesn't relay touch-specific event properties.
            .each(function (index, element) {
                element.addEventListener("touchmove", trackDrag, false);
                element.addEventListener("touchend", endDrag, false);
            })


            .find("div.box").each(function (index, element) {
                boxes.push(element);
                element.addEventListener("touchstart", startMove, false);
                element.addEventListener("touchend", unhighlight, false);
                element.velocity = {x : 0, y : 0};
                element.acceleration = {x : 0, y : 0};
            });
    };

    $.fn.boxesTouch = function () {
        var element = $("#drawing-area");
        var elementOffset = element.offset();
        setDrawingArea(this);
        window.requestAnimationFrame(updateBoxes);

        window.addEventListener('devicemotion', function (event){
            boxes.forEach(function (element){
                element.acceleration.x = event.accelerationIncludingGravity.x  /1000; 
                element.acceleration.y = -(event.accelerationIncludingGravity.y /1000);
            });
        });

    };
       // window.addEventListener("motion", )
}(jQuery));
