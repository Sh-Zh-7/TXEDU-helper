(function(){
  // 全局变量
  var body = document.body;

  // 函数区域
  function createNode(htmlStr) {
	  var div = document.createElement("div");
    div.innerHTML = htmlStr;
    return div.childNodes[0];
  }

  // 给各个元素绑定相应的事件
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
    body.appendChild(document.createElement("hr"));
    var div_whole = document.createElement("div");
    div_whole.style = "display: inline-block;";
    // 左侧的文本框区域
    var div_left = document.createElement("div");
    div_left.className = "div_of_list";
    div_left.style = "float:left;";
    var p_left =document.createElement("p");
    p_left.className = "p_of_list";
    p_left.innerText = "未在选课名单中的："
    var text_left = document.createElement("textarea");
    text_left.classList.add("textarea_of_list");
    text_left.classList.add("form-control");
    text_left.readOnly = true;
    div_left.appendChild(p_left);
    div_left.appendChild(text_left);
    // 右侧的文本框区域
    var div_right = document.createElement("div");
    div_right.className = "div_of_list";
    div_right.style = "float:right;";
    var p_right = document.createElement("p");
    p_right.className = "p_of_list";
    p_right.innerText = "未在上课名单中的: "
    var text_right = document.createElement("textarea");
    text_right.classList.add("textarea_of_list");
    text_right.classList.add("form-control");
    text_right.readOnly = true;
    div_right.appendChild(p_right);
    div_right.appendChild(text_right);
    // 添加进DOM
    div_whole.appendChild(div_left);
    div_whole.appendChild(div_right);
    body.appendChild(div_whole);

    // 最后温馨提示的dom字符串
    var notify = "<p class=\"notify\">\
    <span style=\"font-weight: bold;\">\
    温馨提示:\
    </span>\
    昵称和真名可能有对不上的情况，所以以上两个文本框中的内容请手动核对\
    </p>";
    var notify_element = createNode(notify);
    body.appendChild(notify_element);
  }
})()