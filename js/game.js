var firstcard   = "",
    secondcard  = "";

// randomize plugin
(function($) {

$.fn.randomize = function(childElem) {
  return this.each(function() {
      var $this = $(this);
      var elems = $this.children(childElem);

      elems.sort(function() { return (Math.round(Math.random())-0.5); });  

      $this.detach(childElem);  

      for(var i=0; i < elems.length; i++)
        $this.append(elems[i]);      

  });    
}
})(jQuery);

// randomize cards
$(".cell").randomize(".card");

// insert paragraph separators
$("<p></p>").insertAfter( $(".card")[3] );
$("<p></p>").insertAfter( $(".card")[7] );

// card click function
$(".card").click(function() {
  // do not run operation while resetting cards
  if ($(this).hasClass("cardreset")) {
    return false;
  }
  
  // that card was already flipped
  if ($(this).hasClass("flipped") || $(this).hasClass("locked")) {
    alert("card already flipped");
    return false;
  }
  
  if ($(this).hasClass("front")) {
    $(this).addClass("flipped");
    $(this).removeClass("front");
    $(this).find("img").attr("src", $(this).attr("data-src"));
    if (!firstcard) {
      firstcard = $(this).attr("data-call");
    }
  }
  
  // Detect if two cards are flipped
  if ($(".flipped").length === 2) {
    secondcard = $(this).attr("data-call");
    
    // compare the two cards
    if (firstcard === secondcard) {
      // cards match
      $(".flipped").removeClass("flipped")
                   .addClass("locked");
      firstcard = "";
      secondcard = "";

      // all cards match, thus reset
      if (!$(".card.front").is(":visible")) {
        setTimeout(function() {
          $(".card").find("img").attr("src", "imgs/card-cover.svg");
          $(".card").removeClass("locked")
                     .addClass("front");

          $("p").remove();
          $(".cell").randomize(".card");
          $("<p></p>").insertAfter( $(".card")[3] );
          $("<p></p>").insertAfter( $(".card")[7] );
        }, 1000);
      }
    } else {
      // cards do not match thus reset
      firstcard = "";
      secondcard = "";
      $(".card").addClass("cardreset");
      
      setTimeout(function() {
        $(".flipped").find("img").attr("src", "imgs/card-cover.svg");
        $(".flipped").removeClass("flipped")
                   .addClass("front");
        $(".cardreset").removeClass("cardreset");
      }, 1000);
    }
  }
  
  return false;
});