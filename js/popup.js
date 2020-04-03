var bg = chrome.extension.getBackgroundPage();  // background的windows对象
var body = document.body;                       // popup.html的body节点对象
var div_whole;                                  // 待动态添加的div节点

$("#fileUploader").on("change", function() {
  var show_file_path = $("#fileUploader").val();
  var split_file_path = show_file_path.split("\\");
  $("#location").val(split_file_path[split_file_path.length - 1]);
});

$("#location").on("click", function() {
  $('#fileUploader').click();
});

$("#check").on("click", function() {
  $('#fileUploader').click();
})

$("#compare").on("click", function() {
  // 读取上传文件的字符串内容
  var reader = new FileReader();
  var input_files = document.querySelector("#fileUploader");
  // 判断是否有选择文件
  if (input_files.files[0]) {
    reader.readAsText(input_files.files[0], "UTF-8");
    reader.onload = function(e) {
      var file_content = e.target.result;
      var target_name_array = csvToArray(file_content);
      // 得到的名单发送给content_script
      // 获得background计算出来的缺勤名单并输出
      sendMessageToContentScript(target_name_array, (response) => {
        console.log(response);
        var list_array = bg.returnNameList();
        createLastElements(getFormatNames(list_array[0]), getFormatNames(list_array[1]));
      });
    }
  } else {
    alert("请选择您的文件！！");
  }
});

// 创造出缺勤名单的节点
function createLastElements(name_in_class, name_in_course) {
  // 判断当前页面是否存在节点了
  if (div_whole) {
    body.removeChild(div_whole);
  }
  div_whole = document.createElement("div");
  div_whole.appendChild(document.createElement("hr"));
  div_whole.style = "display: inline-block;";
  
  // 左侧的文本框区域
  var div_left = createDiv("div_of_list", "float:left");
  var p_left = createP("p_of_list", "未在选课名单中的");
  text_left = createTextArea(name_in_course);
  div_left.appendChild(p_left);
  div_left.appendChild(text_left);
  // 右侧的文本框区域
  var div_right = createDiv("div_of_list", "float:right");
  var p_right = createP("p_of_list", "未在上课名单中的：");
  text_right = createTextArea(name_in_class);
  div_right.appendChild(p_right);
  div_right.appendChild(text_right);
  // 底部提示的字符串
  var notify = "\
  <p class=\"notify\">\
    <span style=\"font-weight: bold;\">\
      温馨提示:\
    </span>\
     昵称和真名可能有对不上的情况，所以以上两个文本框中的内容请手动核对\
  </p>";
  var notify_element = createNode(notify);

  // 添加进DOM
  div_whole.appendChild(div_left);
  div_whole.appendChild(div_right);
  body.appendChild(div_whole);
  div_whole.appendChild(notify_element);
}

