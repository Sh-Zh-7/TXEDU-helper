// 给各个元素绑定相应的事件
(function(){
  // 全局变量
  var body = document.body;

  var fileUploader = document.querySelector("#fileUploader");
  fileUploader.onchange = function() {
    $("#location").val($("#fileUploader").val());
  };

  var location = document.querySelector("#location");
  location.onclick = function() {
    $('#fileUploader').click();
  };

  var check = document.querySelector("#check");
  check.onclick = function() {
    $('#fileUploader').click();
  };

  var compare = document.querySelector("#compare");
  compare.onclick = function() {
    // 未在选课名单中的
    var div_left = document.createElement("div");

    var not_in_course_list_label = document.createElement("p");
    not_in_course_list_label.innerText = "未在选课名单中的";
    body.appendChild(not_in_course_list_label);

    var not_in_course_list = document.createElement("input");
    not_in_course_list.type = "text";
    not_in_course_list.value = "沈之豪";

    div_left.appendChild(not_in_course_list_label);
    div_left.appendChild(not_in_course_list);
    body.appendChild(not_in_course_list);

    // 未在上课名单中的
    var not_in_class_list_label = document.createElement("p");
    not_in_class_list_label.innerText = "未在上课名单中的";
    body.appendChild(not_in_class_list_label);

    var not_in_class_list = document.createElement("input");
    not_in_class_list.type = "text";
    not_in_class_list.value = "shzh";
    body.appendChild(not_in_class_list);
  }
})()