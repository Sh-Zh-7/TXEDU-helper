var file_content = "";

(function() {
  chrome.storage.sync.get(["file_path", "file_content"], function(items) {
    if (items.file_path && items.file_content) {
      $("#location").val(items.file_path);
      file_content = items.file_content;
    }
  });
})()

$("#fileUploader").on("change", function() {
  var show_file_path = $("#fileUploader").val();
  var split_file_path = show_file_path.split("\\");
  var show_path = split_file_path[split_file_path.length - 1];
  $("#location").val(show_path);

  // 把获得的文件路径和文件内容直接保存下来
  var input_files = document.querySelector("#fileUploader");
  var reader = new FileReader();
  reader.readAsText(input_files.files[0], "UTF-8");
  reader.onload = function(e) {
    file_content = e.target.result;
    chrome.storage.sync.set({"file_path": show_path, "file_content": file_content}, function() {
      console.log('保存成功！');
    });
  }
});

$("#location").on("click", function() {
  $('#fileUploader').click();
});

$("#check").on("click", function() {
  $('#fileUploader').click();
})

$("#compare").on("click", function() {
  if (file_content) {
    var target_name_array = csvToArray(file_content);
    sendMessageToContentScript(target_name_array, (response) => {
      console.log(response);
      var bg = chrome.extension.getBackgroundPage();  // background的windows对象
      var list_array = bg.returnNameList();
      DisplayNameList(getFormatNames(list_array[0]), getFormatNames(list_array[1]));
    });
  } else {
    alert("请选择您的文件！！");
  }
});

function DisplayNameList(name_in_class, name_in_course) {
  var current_height = $("#div-whole").height();
  var target_height = $("#div-whole").css("height", "auto").height() + "px";
  $("#div-whole").height(current_height).animate({height: target_height}, 300);
  updateTextArea([name_in_class, name_in_course]);
}

