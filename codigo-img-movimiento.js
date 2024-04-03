



$(document).ready(function() {
  // Guardar las posiciones originales de las imágenes
  $(".display__card img").each(function() {
    $(this).data("original-position", $(this).position());
    $(this).data("original-size", $(this).width());
  });

  // Añadir evento al hacer clic sobre una imagen para cambiar su posición y tamaño
  $(".display__card img").click(function() {
    // Obtener el tamaño del contenedor de la imagen
    var containerWidth = $(this).parent().width();

    // Cambiar el tamaño de la imagen si es la primera imagen (imagen más grande)
    var newSize = $(this).data("original-size") === containerWidth ? "50%" : "100%";

    // Calcular una posición aleatoria dentro del contenedor
    var newPositionLeft = Math.floor(Math.random() * (containerWidth - $(this).width()));
    var newPositionTop = Math.floor(Math.random() * ($(this).parent().height() - $(this).height()));

    // Aplicar cambios de tamaño y posición
    $(this).css({
      width: newSize,
      left: newPositionLeft + "px",
      top: newPositionTop + "px"
    });
  });

  // Añadir evento al salir de la galería para restaurar las imágenes a su posición original
  $(".display__container").mouseleave(function() {
    $(".display__card img").each(function() {
      $(this).css({
        width: $(this).data("original-size"),
        left: $(this).data("original-position").left + "px",
        top: $(this).data("original-position").top + "px"
      });
    });
  });
});