/* global chrome */

chrome.browserAction.onClicked.addListener(function (tab) {
	//Show Popup window: 1. View the summary 2. Displays the Add New Tag butto

	console.log("1. backGround: tab - ", tab)
	console.log("2. backGround: tab.id - " + tab.id)
	// chrome.tabs.sendMessage(tab.id, { message: 'load' });
});

// Listen for incoming external messages.
chrome.runtime.onMessageExternal.addListener(async function (request, sender, sendResponse) {
	console.log(request);

	if (request) {
		chrome.tabs.query({}, function (tabs) {
			for (var i = 0; i < tabs.length; ++i) {
				chrome.tabs.sendMessage(tabs[i].id, request);
			}
		});
		// authenticateUser(request);
		// Auth.currentAuthenticatedUser()
		// .then(response => {
		// 	console.log('auth user:', response)
		// })
	} else {

	}
	window.localStorage.setItem("shon", "gever");
	sendResponse("OK");
});
