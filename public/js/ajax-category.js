//Delete the category
$(document).ready(()=> {
  $(".categories-list").on('submit', '.delete-category-form', function(event){
    event.preventDefault();
    $itemToDelete = $(this).parents("li");
    let categoryName = $(this).parent().siblings(".category-name").text();
    let actionUrl = $(this).attr('action');
    $.confirm({
      icon: 'fas fa-warning',
      boxWidth: "500px",
      backgroundDismissAnimation: 'glow',
      theme: 'dark',
      title: 'Attention!',
      content: `Are you sure you want to delete the <strong>${categoryName}</strong> category and all its checklists?`,
      type: 'red',
      typeAnimated: true,
      buttons: {
        tryAgain: {
          text: 'YES',
          btnClass: 'btn-red',
          action: ()=>{
            $.ajax({
              url: actionUrl,
              type: "DELETE",
              itemToDelete : $itemToDelete,
              success: function(data){
                this.itemToDelete.remove();
              }
            });
          }
        },
        close: ()=> {
          $itemToDelete.find('button').blur();
        }
      }
    });
  });
});
