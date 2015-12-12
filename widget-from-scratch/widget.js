(function($){
	var dragging;
	var offset;
	var target;
	var img = $('<img />', { 
  		id: "Trash",
 	 	src: "http://sweetclipart.com/multisite/sweetclipart/files/imagecache/middle/trash_can.png" ,
  		alt: "Trash-can",
  		width: "100",
  		height: "150"
    });
	img.appendTo($("#placehere"));
	var handler = function(event){
  		dragging.offset({left:event.pageX, top:event.pageY});
	};
  	var cleanUp = function(event){
  		var pos = $("#Trash").offset();
  		var offset = $(this).offset();
  		console.log(Math.abs(pos.left-offset.left));
  		console.log(Math.abs(pos.top-offset.top));
  		console.log("Position" + pos.top);
  		 if ((100 >= Math.abs(pos.left-offset.left) && 200 >= Math.abs(pos.top-offset.top))){
  			target.remove();
  			dragging.remove()
  		 }else{
  		dragging.remove()
  		$("body").unbind("mousemove", handler);
  		}
  	}
  	var drop = function(event){
  		dragging.remove();
  	}
  $.fn.widget= function(){
  	this.mousedown(function (event){
  		target = event.target;
  		dragging = $(event.target).clone()
  			.addClass("dragging-image")
  			.offset({left: event.pageX, top:event.pageY});

  		$("body")
  			.append(dragging)
  			.mousemove(handler);

  		 	dragging.mouseup(cleanUp);
  	});
  };
  $(".examples").widget();
} (jQuery));
