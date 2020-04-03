
// (function(){
//   // 创建一个所有人员的名单
//   var names_element = document.getElementsByClassName("member-item-inner-fullline");
//   var names = new Array();
//   for (let i = 0; i < names_element.length; ++i) {
//     names[i] = names_element[i].innerText;
//   }
// })();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // 创建一个所有人员的名单
  var names_element = document.getElementsByClassName("member-item-inner-fullline");
  var names = new Array();
  for (let i = 0; i < names_element.length; ++i) {
    names[i] = names_element[i].innerText;
  }
  // 在获得所有人员的名单以后，把这个发送给background
  chrome.runtime.sendMessage(
    {in_class: names, in_course: request},
    function(response) {
      console.log(response);
      sendResponse("content_script收到popup消息");
    }
  )
});
