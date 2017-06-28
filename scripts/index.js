var next_id, emp_hour;

$(function() {
  // To clear the localStorage Cache
  // localStorage.clear();

  load_default()

  init_draggable();

  $( ".trash" ).droppable({
    drop: function( event, ui ) {
      $("#" + ui.draggable.attr("id")).remove();
    }
  });

  $( ".drop_emp" ).droppable({
    accept: ".employee",
    drop: function( event, ui ) {
      $( this ).text("");
      $(ui.helper).clone().attr("id", "emp_selected").css({"position": "initial", "margin": "0 auto", "text-align": "center"}).appendTo($(this));
      init_draggable();
    }
  });

  $( ".drop_project" ).droppable({
    accept: ".project",
    drop: function( event, ui ) {
      $( this ).text("");
      $(ui.helper).clone().attr("id", "project_selected").css({"position": "initial", "margin": "0 auto"}).appendTo($(this));
      init_draggable();
    }
  });
});

$(".btn_emp_new").on("click", function() {
  if( $(".txt_emp_new").val() === "" ) {
    alert("Enter the EMPLOYEE");
  } else {
    next_id = $( "#emp0" ).attr("data-next");
    $( "#emp0" ).clone().attr({"id": "emp" + next_id, "data-id": "emp" + next_id}).removeClass("hidden").appendTo( ".emp_list" );
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
    $( "#project0" ).clone().attr({"id": "project" + next_id, "data-id": "project" + next_id}).removeClass("hidden").text($(".txt_project_new").val()).appendTo( ".project_list" );
    $(".txt_project_new").val("");
    $( "#project0" ).attr("data-next", +next_id + 1);
    init_draggable();
  }
});

$(".btn_log_new").on("click", function() {
  if( $(".txt_log_time").val() === "" || $(".drop_emp").find(".employee").length === 0 || $(".drop_project").find(".project").length === 0) {
    alert("Enter TIME and select EMPLOYEE + PROJECT");
  } else {
    next_id = $( "#log0" ).attr("data-next");
    $( "#log0" ).clone().attr({"id": "log" + next_id}).removeClass("hidden").appendTo( ".log_list table" );
    $( "#log0" ).attr("data-next", +next_id + 1);

    $("#log" + next_id + " .log_emp").text($("#emp_selected").text());
    $("#log" + next_id + " .log_project").text($("#project_selected").text());
    $("#log" + next_id + " .log_time").text($(".txt_log_time").val());

    emp_hour = $("#" + $("#emp_selected").attr("data-id") + " .emp_hour").text();
    $("#" + $("#emp_selected").attr("data-id") + " .emp_hour").text(+emp_hour - +$(".txt_log_time").val());

    $(".drop_emp").html("EMPLOYEE");
    $(".drop_project").html("PROJECT");
    $(".txt_log_time").val("");
    init_draggable();
  }
});

$(".btn_emp_save").on("click", function() {
  $("li").each(function() {
    var el = $.fn[ev];
    $.fn[ev] = function () {
      this.trigger(ev);
      return el.apply(this, arguments);
    };
  });
  var emp_list = [{"label": "Emp1", "hour": 10}, {"label": "Emp 2", "hour": 7}, {"label": "Emp3", "hour": 5}, {"label": "Emp4", "hour": 8}];
  localStorage.setItem("emp_list", JSON.stringify(emp_list));
});

function load_default() {
  var emp_list = JSON.parse(localStorage.getItem("emp_list"));
  for(var emp in emp_list) {
    next_id = $( "#emp0" ).attr("data-next");
    $( "#emp0" ).clone().attr({"id": "emp" + next_id, "data-id": "emp" + next_id}).removeClass("hidden").appendTo( ".emp_list" );
    $( "#emp" + next_id + " .emp_label" ).text(emp_list[emp].label);
    $( "#emp" + next_id + " .emp_hour" ).text(emp_list[emp].hour);
    $( "#emp0" ).attr("data-next", +next_id + 1);
  }
}

function init_draggable() {
  $( ".draggable" ).draggable({
    revert: "invalid",
    helper: "clone",
    start: function(event, ui) {
      ui.helper.css("width", "140px");
      ui.helper.find(".emp_hour").remove();
    }
  });
}