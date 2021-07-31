/* global chrome */

const homepage = "https://main.d2eyfouotrtjmo.amplifyapp.com/access/login";

chrome.browserAction.onClicked.addListener(function (tab) {
	//Show Popup window: 1. View the summary 2. Displays the Add New Tag butto

	console.log("1. backGround: tab - ", tab)
	console.log("2. backGround: tab.id - " + tab.id)
	// chrome.tabs.sendMessage(tab.id, { message: 'load' });
});

// Listen for incoming external messages.
chrome.runtime.onMessageExternal.addListener(async function (request, sender, sendResponse) {
	// console.log("background, onMessageExternal, request:", request);

	if (request) {
		const session = JSON.stringify(request);
		window.localStorage.setItem("vtm-session", session);
		chrome.runtime.sendMessage({message: "vtm-session", session: session});
	}
});

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
	// console.log("background, onMessage, request:", request);

	if (request.message && request.message === "vtm-session-request") {
		if (window.localStorage["vtm-session"]) {
			// console.log("received vtm-session request, replying with:", window.localStorage["vtm-session"]); //DELETEME
			sendResponse(window.localStorage["vtm-session"]);
		} else {
			sendResponse(undefined);
			chrome.tabs.create({
				url: homepage
			});
		}
	}
})
