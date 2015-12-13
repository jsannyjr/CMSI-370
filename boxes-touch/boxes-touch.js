(function ($) {
    $(function () {
        $("#drawing-area").boxesTouch();
    });
    var offset;
    var accX;
    var accY;
    var movement;

    // window.ondevicemotion = function(event) {

    //     accX = event.accelerationIncludingGravity.x / 10;  
    //     accY = event.accelerationIncludingGravity.y / 10;  
            
    //     movement = 10;
            
    //     xA = -(accX / 10) * movement;
    //     yA = -(accY / 10) * movement;
    // }
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
            if ( touch.target.movingBox ) {
                touch.target.movingBox.offset({
                    left: touch.pageX - touch.target.deltaX,
                    top: touch.pageY - touch.target.deltaY
                });
                //velocity += 1;
                // Reposition the object
                if ( checkY(touch.target.deltaX, touch.pageX, touch.target.movingBox.width( ) ) ) {
                    touch.target.movingBox.offset({
                        left: touch.pageX - touch.target.deltaX
                    });
                }
                if ( checkY(touch.target.deltaX, touch.pageX, touch.target.movingBox.width( ) ) ) {
                    touch.target.movingBox.offset( { 
                        top: touch.pageY - touch.target.deltaY
                    } );
                }
                 if ( touch.target["endTime"] - touch.target["startTime"] > 150) {
                    touch.target["startTime"] = lastTimestamp;  
                    touch.target["startX"] = touch.target.movingBox.offset( ).left;
                    touch.target["startY"] = touch.target.movingBox.offset( ).top;
                }

                touch.target["endTime"] = lastTimestamp;
                touch.target["endX"] = touch.target.movingBox.offset( ).left;
                touch.target["endY"] = touch.target.movingBox.offset( ).top;
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
                var moveX = touch.target["endX"] - touch.target["startX"];
                var moveY = touch.target["endY"] - touch.target["startY"];
               // if (moveX/10 == moveY/10){
                touch.target["magX"] = Math.abs(moveX/10);
                touch.target["magY"] = Math.abs(moveY/10);
                //}
                touch.target["dirX"] = moveX > 0 ? 1 : -1;
                touch.target["dirY"] = moveY> 0 ? 1 : -1;
                //swipeLength = Math.round(Math.sqrt(Math.pow(curX - startX,2) + Math.pow(curY - startY,2)));
                // Change state to "not-moving-anything" by clearing out
                // touch.target.movingBox.
                touch.target.movingBox = null;
            }
        });
    };
    var drawAreaOffset = $("#drawing-area").offset();

    // var motion = function(event){

    //   // Grab the acceleration including gravity from the results
    //     accel = event.accelerationIncludingGravity;
    //     accX = Math.round(accel.x);
    //     accY = Math.round(accel.y);

    //     info = event.interval;

    // } 
    /**
     * Indicates that an element is unhighlighted.
     */
    var unhighlight = function () {
        $(this).removeClass("box-highlight");
    };

    var FRAME_RATE = 250;
    var MS_PER_FRAME =1000;
    var iter = MS_PER_FRAME/FRAME_RATE;
    var lastTimestamp = 0; 
    var updateBoxes = function (time) {
        var tpast = time - lastTimestamp;
        if(tpast > iter){
        $("div.box").each(function (index, box) {
            var $box = $(box);
            var off = $box.offset();
            var offTop = box.magY * box.dirY;
            var offLeft = box.magX * box.dirX;
            off.left += box.velocity.x * tpast;
            off.top += box.velocity.y * tpast;
            box.velocity.x += box.acceleration.accX * tpast; 
            box.velocity.y += box.acceleration.accY * tpast;
            //var grav = time;
            //console.log(pos);
            // if ( checkY(offLeft, offset.left, $box.width( ) ) ) {
            //     offset.left += element.velocity.x * tpast;
            //     offset.top += element.velocity.y * tpast;
            //     element.velocity.x += element.acceleration.accX * tpast; 
            //     element.velocity.y += element.acceleration.accY * tpast;
            // }
            // else{
            //     box.magX *= .5; //im not goign to ask about the physics for my dad. 
            //     box.dirX = -box.dirX;
            // }
            // if( checkX(offTop, offset.left, $box.height( ) ) ) {
            //     offset.top += offTop;
            // }
            // else{
            //     box.magY *=.5; 
            //     box.dirY = -box.dirY;
            // }
           // $box.offset( off);
            }); 
        lastTimestamp = time; 
        }
        window.requestAnimationFrame(updateBoxes);
    };

            //console.log(element.dX, element.dY);

           // $(element).offset({

             //   "left": newX, 
               // "top": newY
            //});
   //     }
    /**
     * Begins a box move sequence.
     */
    var startMove = function (event) {
        $.each(event.changedTouches, function (index, touch) {
            touch.target["startX"] = 0; //starting values
            touch.target["startY"] = 0;
            touch.target["endX"] = 0;
            touch.target["endY"] = 0; //shows the ending 
            touch.target["mag"] = 0;
            touch.target["dirX"] = 0;
            touch.target["dirY"] = 0;
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
                element.velocity = {x : 0, y : 0};
                element.acceleration = {accX : 0, accY : 0};
                //box(element, index);
            });
            window.addEventListener("devicemotion", function (event) {
                gravity(jQueryElements.find("div.box"), event); }, true);
    };
    var gravity = function(element, event){
        element.each(function (index, element){
            var grav = event.accelerationIncludingGravity;
            var gravOffset = element.movingBox.offset();
            var left = gravOffset.left + element.velocity.y;
            var top = gravOffset.top + element.velocity.x;
            element.movingBox.offset({
                left: left,
                top: top
            })
            console.log("hi");
            element.velocity.x += grav.x * .02;
            element.velocity.y += grav.y * 02;
        });
    }
    $.fn.boxesTouch = function () {
        var element = $("#drawing-area");
        var elemntOffset = element.offset();
        setDrawingArea(this);
        window.requestAnimationFrame(updateBoxes);
        window.addEventListener('devicemotion', function ( event ){
            $("div.box").each( function ( index, element){
                element.acceleration.accX = event.accelerationIncludingGravity.x / 10000;
                element.acceleration.accY = -(event.accelerationIncludingGravity.y / 10000);
            });
        });
    };

}(jQuery));