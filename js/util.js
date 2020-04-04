// 根据html字符串创造节点
function createNode(html_str) {
  var div = document.createElement("div");
  div.innerHTML = html_str;
  return div.childNodes[0];
}

// 将csv文件中读取的字符串转化为数组
function csvToArray(csv_str){
  var csv_arry = csv_str.split("\r\n");
  var datas = [];
  for(let i = 0; i < csv_arry.length; ++i) {
    var temp = csv_arry[i].split(",");
    for (let j = 0; j < temp.length; ++j) {
      // 注意处理空白字符
      var target = temp[j].trim();
      if (target != "") {
        datas.push(target);
      }
    }
  }
  return datas;
}

// 将Array的字符串转化为更好的格式并输出
function getFormatNames(name_list) {
  var result = "";
  for (let i = 0; i < name_list.length; ++i) {
    if (i != name_list.length - 1) {
      result += (name_list[i] + "\n");
    } else {
      result += name_list[i];
    }
  }
  return result;
}

// 获取当前选项卡ID
function getCurrentTabId(callback) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if(callback) callback(tabs.length? tabs[0].id: null);
  });
}

// 与content_script交互
function sendMessageToContentScript(message, callback) {
  getCurrentTabId((tabId) => {
    chrome.tabs.sendMessage(tabId, message, function(response) {
      if(callback) callback(response);
    });
  });
}

function updateTextArea(contents) {
  var text_area_list = document.querySelectorAll("textarea");
  for (let i = 0; i < text_area_list.length; ++i) {
    text_area_list[i].textContent = contents[i];
  }
}

///////////////////////////////////////废弃，现以从动态生成节点变为修改父元素高度/////////////////////////////////
function createTextArea(content) {
  // 设置各种必要的属性
  var text_area = document.createElement("textarea");
  text_area.classList.add("form-control");
  text_area.classList.add("textarea_of_list");
  text_area.style = "height: 160px";
  text_area.textContent = content;
  text_area.readOnly = true;
  return text_area;
}

function createP(classname, content) {
  var p =document.createElement("p");
  p.className = classname;
  p.innerText = content;
  return p;
}

function createDiv(className, style) {
  var div = document.createElement("div");
  div.className = className;
  div.style = style;
  return div;
}