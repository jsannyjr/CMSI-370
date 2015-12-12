(function($){
	var dragging;
	var handler = function(event){
  			dragging.offset({left:event.pageX, top:event.pageY});
  		};
  	var cleanUp = function(event){
  			dragging.remove();
  			$("body").unbind("mousemove", handler);
  		}
  $.fn.widget= function(){
  	this.mousedown(function (event){
  		dragging = $(event.target).clone()
  			.addClass("dragging-image")
  			.offset({left: event.pageX, top:event.pageY});

  		$("body")
  			.append(dragging)
  			.mousemove(handler);

  		dragging.mouseup(cleanUp);
  	});
  };
  $(".example").widget();
} (jQuery));
