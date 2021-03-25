/* global chrome */

chrome.browserAction.onClicked.addListener(function(tab) {

  //Show Popup window: 1. View the summary 2. Displays the Add New Tag butto



  console.log("1. backGround: tab - ",  tab)
  console.log("2. backGround: tab.id - "+  tab.id)
  // chrome.tabs.sendMessage(tab.id, { message: 'load' });
});
