function init_draggable() {
  $( ".draggable" ).draggable({
    revert: "invalid",
    helper: "clone"
  });
}

var next_id;

$(function() {
  init_draggable();

  $( ".trash" ).droppable({
    drop: function( event, ui ) {
      $("#" + ui.draggable.attr("id")).remove();
    }
  });

  $( ".drop_log_emp_project" ).droppable({
    drop: function( event, ui ) {
      $(ui.helper).clone().appendTo($(this));
    }
  });
});

$(".btn_emp_new").on("click", function() {
  if( $(".txt_emp_new").val() === "" ) {
    alert("Enter the EMPLOYEE");
  } else {
    next_id = $( "#emp0" ).attr("data-next");
    $( "#emp0" ).clone().attr("id", "emp" + next_id).removeClass("hidden").appendTo( ".emp_list" );
    $( "#emp" + next_id + " .emp_label" ).text($(".txt_emp_new").val());
    $(".txt_emp_new").val("");
    $( "#emp0" ).attr("data-next", +next_id + 1);
    init_draggable();
  }
});

$(".btn_project_new").on("click", function() {
  if( $(".txt_project_new").val() === "" ) {
    alert("Enter the PROJECT");
  } else {
    next_id = $( "#project0" ).attr("data-next");
    $( "#project0" ).clone().attr("id", "project" + next_id).removeClass("hidden").text($(".txt_project_new").val()).appendTo( ".project_list" );
    $(".txt_project_new").val("");
    $( "#project0" ).attr("data-next", +next_id + 1);
    init_draggable();
  }
});

$(".btn_log_new").on("click", function() {
  if( $(".txt_log_time").val() === "") {
    alert("Enter TIME and select EMPLOYEE + PROJECT");
  } else {
  }
});