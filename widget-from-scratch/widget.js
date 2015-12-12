(function($){
	var dragging;
  $.fn.widget= function(){
  	this.mousedown(function (event){
  		dragging = $(event.target).clone();
  		$("body").append(dragging);
  		$("body").mousemove(function(event){
  			dragging.offset({left:event.pageX, top:event.pageY});
  		});
  		dragging.mouseup(function(event){
  			dragging.remove();
  		});
  	});
  };
  $(".example").widget();
} (jQuery));
