(function(){
  // 全局变量
  var body = document.body;
  var input_files = document.querySelector("#fileUploader");
  var location = document.querySelector("#location");
  var check = document.querySelector("#check");
  var compare = document.querySelector("#compare");

  var bg = chrome.extension.getBackgroundPage();

  // 函数区域
  function createNode(htmlStr) {
	  var div = document.createElement("div");
    div.innerHTML = htmlStr;
    return div.childNodes[0];
  }
  
  function createLastElements(name_in_class, name_in_course) {
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
    text_left.textContent = name_in_course;
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
    text_right.textContent = name_in_class;
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

  function csvToArray(csv_str){
    var csv_arry = csv_str.split("\r\n");
    var datas = [];
    for(let i = 0; i < csv_arry.length; ++i) {
      // var data = [];
      var temp = csv_arry[i].split(",");
      for (let j = 0; j < temp.length; ++j) {
        var target = temp[j].trim();
        // 处理每一行末尾的逗号
        if (target != "") {
          datas.push(target);
        }
      }
      // datas.push(data);
    }
    return datas;
  }

  // 获取当前选项卡ID
  function getCurrentTabId(callback) {
	  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  	if(callback) callback(tabs.length? tabs[0].id: null);
  	});
  }

  function sendMessageToContentScript(message, callback) {
	  getCurrentTabId((tabId) => {
		  chrome.tabs.sendMessage(tabId, message, function(response) {
		  	if(callback) callback(response);
	  	});
  	});
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  // 给各个元素绑定相应的事件
  input_files.onchange = function() {
    $("#location").val($("#fileUploader").val());
  };

  location.onclick = function() {
    $('#fileUploader').click();
  };

  check.onclick = function() {
    $('#fileUploader').click();
  };

  compare.onclick = function() {
    // createLastElements();
    var reader = new FileReader();
    reader.readAsText(input_files.files[0], "UTF-8");
    reader.onload = function(e) {
      var file_content = e.target.result;
      var target_name_array = csvToArray(file_content);
      // 得到的名单发送给content_script
      sendMessageToContentScript(target_name_array, (response) => {
        console.log(response);
        var list_array = bg.returnNameList();
        createLastElements(list_array[0], list_array[1]);
      });
    }
  }
})()