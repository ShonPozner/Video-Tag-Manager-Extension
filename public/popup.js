
document.addEventListener('DOMContentLoaded', function(){
    var pageButton = document.getElementById("summry-button");
    pageButton.addEventListener('click', openSummrySection);
});


function openSummrySection() {
    chrome.tabs.query({ currentWindow:true, active: true}, function(tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { message: 'load' });

    })
}