/**
 * Define all the EventLisners 
 */
document.addEventListener('DOMContentLoaded', function () {
	var pageButton = document.getElementById("page-button");
	var mySummary = document.getElementById("my-summary");
	var discover = document.getElementById("discover-button");
	pageButton.addEventListener('click', openVideoTagWeb);
	mySummary.addEventListener('click', displaymySummary);
	discover.addEventListener('click', openDiscoverSection);

});

/**
 * Open Video tag mannager webside in home page of the user  
 * // TODO fix to Video tag mannager webside
 */
function openVideoTagWeb() {
	let OpnenEditorUrl = "http://localhost:3000";
	chrome.tabs.create({
		url: OpnenEditorUrl
	});
}

/**
 * Display Edit button that popup c form to add a tag!  
 * // TODO Create it
 */
function displaymySummary() {
	self.close()
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, { message: 'Open Summary' });
	})
}

/**
 * Send a message to the active tab that summary must be loaded  
 */
function openDiscoverSection() {
	self.close()
	alert("Not ready yet");
}