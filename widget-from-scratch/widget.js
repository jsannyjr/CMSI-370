(function($){
	var dragging;
	var target;
	var img = $('<img />', { 
  		id: "Trash",
 	 	  src: "http://sweetclipart.com/multisite/sweetclipart/files/imagecache/middle/trash_can.png" ,
    	alt: "Trash-can",
  		width: "100",
  		height: "150"
    });
	img.appendTo($("#placehere")); // JD: 2
	var handler = function(event){ // JD: 3
  		dragging.offset({left:event.pageX, top:event.pageY}); // JD: 4
	};
  	var cleanUp = function(event){
  		var pos = $("#Trash").offset();
  		var offset = $(this).offset();
          // JD: 5
  		 if (($("#Trash").width()) >= Math.abs(pos.left-offset.left) && 200 >= Math.abs(pos.top-offset.top)){
  			target.remove();
  			dragging.remove()
  		 }else{
  			dragging.remove()
  			//$("body").unbind("mousemove", handler);
  		}
  	}
  	// var drop = function(event){
  	// 	dragging.remove();
  	// }
  $.fn.widget= function(){
    console.log("dragging");
  	this.mousedown(function (event){
  		target = event.target;
  		dragging = $(target).clone()
  			.addClass("dragging-image")
  			.offset({left: event.pageX, top:event.pageY}); // JD: 4

  		$("body")
  			.append(dragging)
  			.mousemove(handler);

  		dragging.mouseup(cleanUp);
  	});
  };
  $(".examples").widget(); // JD: 6
} (jQuery));
