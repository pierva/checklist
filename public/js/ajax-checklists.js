$(".checklist-new-form form").on('submit', function(event){
  event.preventDefault();
  const formData = $(this).serialize();
  const formAction = $(this).attr('action');
  $.post(formAction, formData, (data) =>{
    const route = `/api/categories/${data.category._id}/checklists/${data.checklist._id}`;
    $(this).closest(".checklist-new-form").siblings('.checklists-list').children('ul').append(
      `<li class="checklist-item">
        <div class="col-12 m-0">
          <div class="row">
            <span class="col-sm-6 col-12 checklist-code">${data.checklist.code}</span>
            <span class="col-sm-6 col-12 revision">Revision:&nbsp; ${moment(data.checklist.revision).format('MMM DD, YYYY')}</span>
          </div>
          <div class="row m-0">
            <span>${data.checklist.name}</span>
          </div>

          <div class="row m-0 mb-2 checklist-edit-form">
            <form action="${route}"
              class="form-inline col-12 p-0" method="POST">
              <div class="form-group col-lg-4 col-md-5 col-sm-12 p-0">
                <input placeholder="Name" name="checklist[name]" type="text"
                  class="form-control-sm w-100" value="${data.checklist.name}" required>
              </div>
              <div class="form-group col-lg-3 col-md-3 col-sm-6 p-0">
                <input placeholder="New Code" name="checklist[code]" type="text"
                class="form-control-sm w-100" value="${data.checklist.code}" required>
              </div>
              <div class="form-group col-lg-3 col-md-2 col-sm-6 p-0">
                <label class="col-12 revision-label" for="checklist[revision]">New Revision Date</label>
                <input placeholder="New Revision Date" name="checklist[revision]" type="date"
                class="form-control-sm w-100" value="${moment(data.checklist.revision).format('YYYY-MM-DD')}" required>
              </div>
              <div class="form-group col-lg-2 col-md-2 col-sm-12 p-0">
                <button type="submit" class="btn btn-primary form-control-sm w-100">Update</button>
              </div>
            </form>
          </div>

          <div class="row">
            <div class="col-md-6 p-0 edit-button">
              <button class="btn btn-sm btn-outline-warning w-100">Edit</button>
            </div>
            <div class="col-md-6 p-0">
              <form class="delete-form" action="${route}"
                method="POST">
                <input type="submit" class="btn btn-sm btn-outline-danger w-100" value="Delete">
              </form>
            </div>
          </div>
        </div>
      </li>`
    );
  });
  $(this).find('input').val('');
});

//Show the update form
$(document).ready(() => {
  $(".checklists-list").on("click", ".edit-button", function(event){
    event.preventDefault();
    $(this).closest(".checklist-item").find(".checklist-edit-form").toggle(500);
  });

  $(".checklists-list").on("submit", ".checklist-edit-form form", function(event){
    event.preventDefault();
    const formData = $(this).serialize();
    const formAction = $(this).attr('action');
    $originalItem = $(this).closest(".checklist-item");
    $.ajax({
      url: formAction,
      data: formData,
      type: "PUT",
      originalItem: $originalItem,
      success: function(data){
        const route = `/api/categories/${data.category._id}/checklists/${data.checklist._id}`;
        this.originalItem.html(
          `<div class="col-12 m-0">
              <div class="row">
                <span class="col-sm-6 col-12 checklist-code">${data.checklist.code}</span>
                <span class="col-sm-6 col-12 revision">Revision:&nbsp; ${moment(data.checklist.revision).format('MMM DD, YYYY')}</span>
              </div>
              <div class="row m-0">
                <span>${data.checklist.name}</span>
              </div>

              <div class="row m-0 mb-2 checklist-edit-form">
                <form action="${route}"
                  class="form-inline col-12 p-0" method="POST">
                  <div class="form-group col-lg-4 col-md-5 col-sm-12 p-0">
                    <input placeholder="Name" name="checklist[name]" type="text"
                      class="form-control-sm w-100" value="${data.checklist.name}" required>
                  </div>
                  <div class="form-group col-lg-3 col-md-3 col-sm-6 p-0">
                    <input placeholder="New Code" name="checklist[code]" type="text"
                    class="form-control-sm w-100" value="${data.checklist.code}" required>
                  </div>
                  <div class="form-group col-lg-3 col-md-2 col-sm-6 p-0">
                    <label class="col-12 revision-label" for="checklist[revision]">New Revision Date</label>
                    <input placeholder="New Revision Date" name="checklist[revision]" type="date"
                    class="form-control-sm w-100" value="${moment(data.checklist.revision).format('YYYY-MM-DD')}" required>
                  </div>
                  <div class="form-group col-lg-2 col-md-2 col-sm-12 p-0">
                    <button type="submit" class="btn btn-primary form-control-sm w-100">Update</button>
                  </div>
                </form>
              </div>

              <div class="row">
                <div class="col-md-6 p-0 edit-button">
                  <button class="btn btn-sm btn-outline-warning w-100">Edit</button>
                </div>
                <div class="col-md-6 p-0">
                  <form class="delete-form" action="${route}"
                    method="POST">
                    <input type="submit" class="btn btn-sm btn-outline-danger w-100" value="Delete">
                  </form>
                </div>
              </div>
            </div>`
        );
      }
    });
  });
});


//Delete the checklist
$(document).ready(()=> {
  $(".checklists-list").on('submit', '.delete-form', function(event){
    event.preventDefault();
    $itemToDelete = $(this);
    let checklistCode = $(this).closest('.checklist-item').find('.checklist-code').text();
    $.confirm({
      icon: 'fas fa-warning',
      boxWidth: "500px",
      backgroundDismissAnimation: 'glow',
      theme: 'dark',
      title: 'Attention!',
      content: `Are you sure you want to delete the <strong>${checklistCode}</strong> checklist?`,
      type: 'red',
      typeAnimated: true,
      buttons: {
        tryAgain: {
          text: 'YES',
          btnClass: 'btn-red',
          action: ()=>{
            utilityObj.removeItem($itemToDelete);
          }
        },
        close: ()=> {
          $itemToDelete.find('button').blur();
        }
      }
    });
  });
});
