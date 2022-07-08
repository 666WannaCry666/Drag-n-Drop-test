// Массив для вывода в консоль id изображений 
let pictureList = [];

// jquery-ui drag'n'drop
$('.template__img').draggable({
  helper: "clone"
});

$('.main-edit-area').droppable({
  activate: function (event, ui) {
    $(this).append(ui.draggable.clone().css({left: 0, top: 0, opacity: 0.5, margin: "2.5px 0"}).addClass("drag-img").removeClass("template__img").removeAttr("id"));
    ui.draggable.css("opacity", 0.5);
  },
  deactivate: function(event, ui) {
    $('.drag-img').remove();
    ui.draggable.css("opacity", 1);
  },
  drop: function(event, ui) {
    let drag = ui.draggable;
    $(this).append(ui.draggable.clone().css({left: 0, top: 0, opacity: 1, cursor: 'default', margin: "2.5px 0"}).addClass("dropped-img").removeClass("template__img").removeAttr("id"));
    pictureList.push(ui.draggable.attr("id"));
  },
  tolerance: "touch"
});
  
