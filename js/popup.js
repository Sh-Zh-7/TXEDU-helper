// var bg = chrome.extension.getBackgroundPage();  // background的windows对象

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
        var bg = chrome.extension.getBackgroundPage();  // background的windows对象
        var list_array = bg.returnNameList();
        DisplayNameList(getFormatNames(list_array[0]), getFormatNames(list_array[1]));
      });
    }
  } else {
    alert("请选择您的文件！！");
  }
});

function DisplayNameList(name_in_class, name_in_course) {
  // var div_whole = document.querySelector("#div-whole");
  // div_whole.style = "height: auto"; // 262.2px
  var current_height = $("#div-whole").height();
  var target_height = $("#div-whole").css("height", "auto").height() + "px";
  $("#div-whole").height(current_height).animate({height: target_height}, 300);
  updateTextArea([name_in_class, name_in_course]);
}

