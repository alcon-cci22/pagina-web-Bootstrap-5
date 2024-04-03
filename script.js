$(document).ready(function() {
  // Guardar el tamaño original de las imágenes
  $(".display__card img").each(function() {
    $(this).data("original-size", {
      width: $(this).width(),
      height: $(this).height()
    });
  });

  // Al hacer clic en una imagen, se hace más pequeña y viceversa
  $(".display__card").click(function() {
    var $img = $(this).find("img");
    var originalSize = $img.data("original-size");
    if ($img.width() === originalSize.width) {
      $img.width(originalSize.width * 0.5);
    } else {
      $img.width(originalSize.width);
    }
  });

  // Al hacer doble clic en una imagen, intercambia su posición con otra imagen entre las imágenes que están más pequeñas
  $(".display__card").on("dblclick", function() {
    var $clickedCard = $(this);
    var $otherCards = $(".display__card").not($clickedCard).filter(function() {
      return $(this).find("img").width() === $(this).find("img").data("original-size").width * 0.5; // Filtrar solo las imágenes que están más pequeñas
    });

    if ($otherCards.length > 0) {
      var randomIndex = Math.floor(Math.random() * $otherCards.length);
      var $randomCard = $otherCards.eq(randomIndex);

      var tempPosition = $randomCard.position();
      var containerWidth = $randomCard.parent().width();
      $randomCard.css("position", "absolute").css($clickedCard.position()).css("left", Math.min(tempPosition.left, containerWidth - $randomCard.width()));
      $clickedCard.css("position", "absolute").css(tempPosition).css("left", Math.min(tempPosition.left, containerWidth - $clickedCard.width()));
    }
  });
	
	  // Al hacer clic fuera del contenedor de imágenes, se restauran las imágenes a su tamaño original
  $(document).click(function(event) {
    if (!$(event.target).closest('.display__container').length) {
      $(".display__card img").each(function() {
        var originalSize = $(this).data("original-size");
        $(this).width(originalSize.width);
      });
    }
  });


  // Al salir del contenedor de imágenes, se restauran las imágenes a su tamaño original y dentro del contenedor
   $(".display__container").mouseleave(function() {
    $(".display__card img").each(function() {
      var originalSize = $(this).data("original-size");
      var containerWidth = $(this).parent().width();
      $(this).width(originalSize.width <= containerWidth ? originalSize.width : containerWidth);
    });
  });
});