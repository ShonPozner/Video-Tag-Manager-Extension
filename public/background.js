/* global chrome */

chrome.browserAction.onClicked.addListener(function(tab) {
  console.log("1. backGround: tab - ",  tab)
  console.log("2. backGround: tab.id - "+  tab.id)
  chrome.tabs.sendMessage(tab.id, { message: 'load' });
});
