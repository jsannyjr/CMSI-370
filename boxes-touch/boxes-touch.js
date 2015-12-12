(function ($) {
    $(function () {
        $("#drawing-area").boxesTouch();
    });
    var box = function (property, index){
        property["index"] = index;
        property["startX"] = 0; //starting values
        property["startY"] = 0;
        property["endX"] = 0;
        property["endY"] = 0; //shows the ending 
        property["dirX"] = 0;
        property["dirY"] = 0;
        property["startTime"] = 0;
        property["endTime"] = 0;
        property["magX"] = 0; //acceleration
        property["magY"] = 0;
    }
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
    var drawAreaOffset = $("#drawing-area").offset();
    var accelX = 0;
    var accelY = 0;
    var motion = function(event){
        var info, xyz = "[X, Y, Z]";

        // Grab the acceleration including gravity from the results
        accel = data.accelerationIncludingGravity;
        info = xyz.replace("X", Math.round(accel.x));
        info = info.replace("Y", Math.round(accel.y));
        info = info.replace("Z", Math.round(accel.z));


        accelX = Math.round(acceleration.x);
        accelY = Math.round(acceleration.y) * -1;

        info = data.interval;

    } 
    /**
     * Indicates that an element is unhighlighted.
     */
    var unhighlight = function () {
        $(this).removeClass("box-highlight");
    };

     updateBoxes : function (timeStamp) {
       if(element.movingBox === null) {
            //console.log(I++);
            var pos = $(element).offset();
            var PosX = pos.left;
            var PosY = pos.top;
            var dt = Math.max(BoxesTouch.dT, 0.01);
            element["dX"]*=0.999;
            element["dY"]*=0.999;
            element["dX"]+= dt*BoxesTouch.accelX/2;
            element["dY"]+= dt*BoxesTouch.accelY/2;
            var oldY = y + 1/dt*element["dY"];
            var oldX = x + 1/dt*element["dX"];

            var newX = Math.max(Math.min(oldX, $(".drawing-area").width()-$(element).width()), 0);
            var newY = Math.max(Math.min(oldY, $(".drawing-area").height()-$(element).height()), 0);
            //console.log(pos);
            if (oldX !== newX){
                element.dX = element.dX * -1;

            }
            if (oldY !== newY){
                element.dY = element.dY * -1;
                //console.log("hi");
            }

            
            

            //console.log(element.dX, element.dY);

            $(element).offset({

                "left": newX, 
                "top": newY
            });
        }
    },
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