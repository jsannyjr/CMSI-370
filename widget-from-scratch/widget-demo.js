(function($){
	var dragging;
	var offset;
	var target;
	var pos = $("#trash").position();
	var handler = function(event){
  		dragging.offset({left:event.pageX, top:event.pageY});
	};
  	var cleanUp = function(event){
  		var offset = $(this).offset();
  		 console.log(offset.left);
  		// console.log(pos.left);
  		 console.log(offset.top);
  		// console.log(pos.top);
  		 if ((200 >= offset.left && 88 <= offset.left) && (290 >= offset.top && 130 <= offset.top)){
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
  	//var trash = function() {
   		//$(".example").dragging();

    	//$("#trash").droppable({
        	//over: function(event, ui) {
            	//ui.dragging.remove();
        //	}
    	//});
	//}	

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
