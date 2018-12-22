const utilityObj = {}

utilityObj.removeItem = (item) =>{
  var formAction = item.attr('action');
  $itemToDelete = item.closest(".checklist-item");
  $.ajax({
    url: formAction,
    type: 'DELETE',
    itemToDelete: $itemToDelete,
    success: function(data){
      this.itemToDelete.remove();
    }
  });
}

utilityObj.callModal = (title, content, empty) => {
  //empty is optional and is used to clear the content. Default is true
  empty = (typeof empty === 'undefined') ? true: empty
  $("#modal-description").text(title);
  if(empty){
    $(".modal-content__inner").empty().append(content);
  }
  $("#myModal").fadeIn(500);
}

$(".close").on("click", function(){
  $("#myModal").fadeOut(500);
});
