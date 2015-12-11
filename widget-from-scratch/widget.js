(function($){
  $.fn.trashcan = function(){
    this.text("Sample")
    .addClass("trashcan-main");
  };
  $(".trashcan-container").trashcan();
}); //(jQuery);
