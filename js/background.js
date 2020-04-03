var name_in_class;
var name_in_course;

function deleteSame(arr1, arr2) {
  for (let i = arr1.length - 1; i >= 0; --i) {
    let index_arr2 = arr2.indexOf(arr1[i]);
    if (index_arr2 > -1) {
      arr1.splice(i, 1);
      arr2.splice(index_arr2, 1);
    }
  }
} 

function returnNameList() {
  return [name_in_class, name_in_course];
}

chrome.runtime.onInstalled.addListener(function(){
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
		chrome.declarativeContent.onPageChanged.addRules([
			{
				conditions: [
					// 只有特定网页才显示pageAction
					new chrome.declarativeContent.PageStateMatcher({pageUrl: {urlContains: 'baidu.com'}})
				],
				actions: [new chrome.declarativeContent.ShowPageAction()]
			}
		]);
	});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  name_in_class = request.in_class;
  name_in_course = request.in_course;
  deleteSame(name_in_class, name_in_course);
  // 一定要在最后处理完了才发送请求
  sendResponse("background接收到content-script的消息");
});

