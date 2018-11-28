function updateModalContent(){
  const currentUser = $("#currentUser").text().trim();
  $.get("/settings/users", function(data){
  var ul = $('<ul id="user-list" class="col-12 mb-2">');
    $.each(data, function(index, user){
      ul.append($("<li class='col-12 list-group-item'>").append($("<div>")
          .append($("<span class='col-2'>" + (index + 1) + ". </span>"))
          .append($("<span class='col-5'>" + user.username + "</span>"))
          .append($("<span class='col-5'> Admin: " + user.isAdmin + "</span>"))
          .append($("<div>").addClass("form-group row")
          .append($('<form class="admin-user col-md-5 col-sm-6" method="POST" action="/settings/users/' + user._id +'">')
            .append($("<button class='btn btn-sm btn-success w-100'" + (user.username === currentUser ? "disabled" : "") + ">" +
                      (user.isAdmin ? "Remove Admin</button>" : "Add to Admin</button>"))))
          .append($('<form class="delete-user col-md-5 col-sm-6" method="POST" action="/settings/users/' + user._id +'">')
            .append($("<button type='submit' class='btn btn-sm btn-danger w-100'" +
                    (user.username === currentUser ? "disabled" : "") + " id='" + user._id+ "'>" +
                      "Delete User</button>"))))
          .append($("<div class='clearfix'>"))
        )
      );
    })
    utilityObj.callModal("List of all the registered users", ul);
  });
}

$(document).ready(function(){
  $('#manage-users').click(function(e){
    e.preventDefault();
    updateModalContent();
  });
});

//Update user admin rights
$(document).ready(function(){
  $(".modal-content__inner").on('submit', '.admin-user', function(event){
    event.preventDefault();
    var actionUrl = $(this).attr("action");
    $.ajax({
      url: actionUrl,
      type: "PUT",
      success: function(data){
        updateModalContent()
      }
    });
  });
});

//DELETE Request >>> destroy the user
$(document).ready(function(){
  $('.modal-content__inner').on('submit', '.delete-user', function(event){
      event.preventDefault();
      $itemToDelete = $(this).parents("li");
      const formAction = $(this).attr('action');
      let content = "Are you sure you want to delete " +
            "<strong>" + $(this).parents('div').children('span')[1].innerText + "</strong>";
      $.confirm({
        icon: 'fa fa-warning',
        boxWidth: "500px",
        backgroundDismissAnimation: 'glow',
        theme: 'dark',
        title: 'Attention!',
        content: content,
        type: 'red',
        typeAnimated: true,
        buttons: {
          tryAgain: {
            text: 'YES',
            btnClass: 'btn-red',
            action: function(){
              $.ajax({
                url: formAction,
                type: 'DELETE',
                itemToDelete: $itemToDelete,
                success: function(data){
                  this.itemToDelete.remove();
                }
              });
            }
          },
          close: function () {
            $itemToDelete.find('button').blur();
          }
        }
      });
  });
});
