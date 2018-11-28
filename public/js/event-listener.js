$( document ).ready(function(){
  $('.categories-list').on('click', ".open-list", function() {
    $(this).toggleClass('rotate180');
    $(this).closest('li').children('.checklist-new-form').toggle(200, function(){
      $(this).siblings('.checklists-list').toggle(200);
    });
  });
});
