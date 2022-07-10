$(document).ready(function() {

// Массив для вывода в консоль id изображений перенесенных в редактируемую зону
let pictureList = [];

function editngRestriction(selected) {
  if (selected.prev().length == 0 && selected.next().length == 0) {
    $('#move-up').css("display", "none");
    $('#move-down').css("display", "none");
    $('#delete').css("display", "inline");
    return;
  }
  else if (selected.prev().length == 0) {
    $('#move-down').css("display", "inline");
    $('#move-up').css("display", "none");
    $('#delete').css("display", "inline");
    return;
  }
  else if (selected.next().length == 0) {
    $('#move-down').css("display", "none");
    $('#move-up').css("display", "inline");
    $('#delete').css("display", "inline");
    return;
  }
  $('#move-down').css("display", "inline");
  $('#move-up').css("display", "inline");
  $('#delete').css("display", "inline");
  return;
}

function selectedClickEvent() {
  //Добавление границы выбранному блоку
  $('.dropped-img').removeClass("selected-block");
  $(this).addClass("selected-block");
  // Переключение в раздел Content
  $('.templates').css("display", "none");
  $('.edit').css("display", "flex");
  $('#content').addClass("selected-partition");
  $('#blocks').removeClass("selected-partition");
  // Ограничение редактирования, если блок в самом верху или в самом низу
  editngRestriction($('.selected-block'));
}

// jquery-ui drag'n'drop
$('.template__img').draggable({
  helper: "clone"
});

$('.main-edit-area').droppable({
  activate: function (event, ui) {
    $(this).append(ui.draggable.clone().addClass("drag-img").removeClass("template__img").removeAttr("id"));
    ui.draggable.css("opacity", 0.5);
  },
  deactivate: function(event, ui) {
    $('.drag-img').remove();
    ui.draggable.css("opacity", 1);
  },
  drop: function(event, ui) {
    $('.dropped-img').removeClass("selected-block");
    $(this).append(ui.draggable.clone().css("opacity", 1).addClass("dropped-img selected-block").removeClass("template__img").click(selectedClickEvent));
    // if ($('.main-edit-area .dropped-img').length >= 5) {
    //   $(this).css("overflow-y", "scroll");
    // }
    // else {
    //   $(this).css("overflow-y", "auto");
    // }
    editngRestriction($('.selected-block'));
  },
  tolerance: "touch"
});

// Переключение между разделами Blocks и Content
$('#content').click(function() {
  $('.templates').css("display", "none");
  $('.edit').css("display", "flex");
  $(this).addClass("selected-partition");
  $('#blocks').removeClass("selected-partition");
  editngRestriction($('.selected-block'));
});

$('#blocks').click(function() {
  $('.edit').css("display", "none");
  $('.templates').css("display", "flex");
  $(this).addClass("selected-partition");
  $('#content').removeClass("selected-partition");
});

// События для кнопок в разделе Content
$('#move-up').click(function(e) {
  e.preventDefault();
  let movedBlock = $('.selected-block').clone().addClass("moved-block").removeClass("selected-block").click(selectedClickEvent);
  movedBlock.insertBefore($('.selected-block').prev());
  $('.selected-block').remove();
  $('.moved-block').addClass("selected-block").removeClass("moved-block");
  editngRestriction($('.selected-block'));
})

$('#move-down').click(function(e) {
  e.preventDefault();
  let movedBlock = $('.selected-block').clone().addClass("moved-block").removeClass("selected-block").click(selectedClickEvent);
  movedBlock.insertAfter($('.selected-block').next());
  $('.selected-block').remove();
  $('.moved-block').addClass("selected-block").removeClass("moved-block");
  editngRestriction($('.selected-block'));
})

$('#delete').click(function(e) {
  e.preventDefault();
  $('.selected-block').remove();
  $(this).css("display", "none");
  $('#move-up').css("display", "none");
  $('#move-down').css("display", "none");
})

// Вывод в консоль массива с картинками
$('#test').click(function(e) {
  e.preventDefault();
  $('.dropped-img').each(function(elem) {
    pictureList.push($(this).attr("id"));
  })
  console.log(pictureList);
  pictureList = [];
})

});
