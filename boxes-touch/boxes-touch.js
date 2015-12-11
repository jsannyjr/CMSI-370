(function ($) {
    var velocityY = 0;
    var friction = -1;
    var min = 70;
    var curX = 0;
    var curY = 0;
    var initialX = 0;
    var initialY = 0;
    $(function () {
        $("#drawing-area").boxesTouch();
    });
    var checkX = function (dist, offset, width) {
        var right = $("#drawing-area").width() + drawAreaOffset.left - width;
        var left = drawAreaOffset.left;
        var delta = offset - dist;
        return (delta >= left && delta <= right);
    };
    var checkY = function (dist, offset, height) {
        var top = $("#drawing-area").height() + drawAreaOffset.top - height;
        var bot = drawAreaOffset.top;
        var delta = offset - dist;
        return (delta >= bot && delta <= top);
    };

    /**
     * Tracks a box as it is rubberbanded or moved across the drawing area.
     */
     /*var AccelRom = function(event){
        accerleration = data.
     }*/
    var trackDrag = function (event) {
        $.each(event.changedTouches, function (index, touch) {
            // Don't bother if we aren't tracking anything.
            if (touch.target.movingBox) {
                //velocity += 1;
                // Reposition the object
                if (checkY(touch.target.deltaX, touch.pageX, touch.target.movingBox.width())){
                    touch.target.movingBox.offset({
                        left: touch.pageX - touch.target.deltaX
                    });
                }
                if (checkY(touch.target.deltaX, touch.pageX, touch.target.movingBox.width())){
                    touch.target.movingBox.offset({
                        top: touch.pageY - touch.target.deltaY
                    });
                }
         //       curX = event.touch.pageX;
           //     curY = event.touch.pageY;
            }
        });
        // Don't do any touch scrolling.
        event.preventDefault();
        //    curX = event.touch.pageX;
        //    curY = event.touch.pageY;
    };

    /**
     * Concludes a drawing or moving sequence.
     */
    var endDrag = function (event) {
        $.each(event.changedTouches, function (index, touch) {
            if (touch.target.movingBox) {
                //swipeLength = Math.round(Math.sqrt(Math.pow(curX - startX,2) + Math.pow(curY - startY,2)));
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
            $("movingX").html(touch.pageX);
            touch.target.deltaY = touch.pageY - startOffset.top;
            $("movingY").html(touch.pageY);
            //alert(touch.target.deltaX);
            //alert(deltaY + "ho");
        //}
        });
        // Eat up the event so that the drawing area does not
        // deal with it.
        event.stopPropagation();
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
                element.addEventListener("touchstart", startMove, false);
                element.addEventListener("touchend", unhighlight, false);
            });
    };

    $.fn.boxesTouch = function () {
        setDrawingArea(this);
    };

}(jQuery));
