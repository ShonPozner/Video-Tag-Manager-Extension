/**
 * Define all the EventLisners 
 */
document.addEventListener('DOMContentLoaded', function(){
    var pageButton = document.getElementById("page-button");
    var editButton = document.getElementById("edit-button");
    var summryButton = document.getElementById("summary-button");
    pageButton.addEventListener('click', openVideoTagWeb);
    editButton.addEventListener('click', displayEditButton);
    summryButton.addEventListener('click', openSummarySection);

});

/**
 * Open Video tag mannager webside in home page of the user  
 * // TODO fix to Video tag mannager webside
 */
function openVideoTagWeb() {
    console.log("open -> www.google.com..." )
    let OpnenEditorUrl = "https://www.google.com";
    // todo add a srcUrl and more parameters is need to...
    chrome.tabs.create({
        url: OpnenEditorUrl
    });
}

/**
 * Display Edit button that popup c form to add a tag!  
 * // TODO Create it
 */
function displayEditButton(){
    console.log("displayEditButton" )
}

/**
 * Send a message to the active tab that summary must be loaded  
 */
function openSummarySection() {
    self.close()
    chrome.tabs.query({ currentWindow:true, active: true}, function(tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { message: 'Open Summary' });
    })
}