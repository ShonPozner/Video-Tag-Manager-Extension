/* global chrome */

chrome.runtime.onMessage.addListener(function(request, sender) {
  main();
});

function main() {
  // Get the extensnsion origen url
  const extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
  if (!location.ancestorOrigins.contains(extensionOrigin)) {
    // Fetch the local React index.html page
    fetch(chrome.runtime.getURL('index.html') /*, options */)
      .then((response) => response.text())
      .then((html) => {
        // Create the html that inject to the web
        var styleStashHTML = html.replace(/\/static\//g, `${extensionOrigin}/static/`);
        styleStashHTML = '<div id="video-tag-manger-section">' + styleStashHTML + '</div>'
        var videoTagSection = document.getElementById("video-tag-manger-section");
        // Check if the editor desplay allredy
        if (videoTagSection != null) {
          // Remove the Editor from the page
          videoTagSection.remove()
        } else
          // Add the Editor to the page
          $(styleStashHTML).appendTo('body');
      })
      .catch((error) => {
        console.warn(error);
      });
  }
}

window.addEventListener("message", function(event) {
  if (event.source !== window) return;
  onDidReceiveMessage(event);
});

/**
 * Get time n seconds and return the time in H:M:S format
 * 
 * @param {int} timeInSec time in seconds format 
 * @returns {String}  
 */
function secToHoSecMinFormat(timeInSec) {
  let hours = Math.floor(timeInSec / 3600)
  let minutes = Math.floor(timeInSec / 60);   
  let seconds = Math.floor(timeInSec - minutes * 60)
  let x = hours < 10 ? "0" + hours : hours;
  let y = minutes < 10 ? "0" + minutes : minutes;
  let z = seconds < 10 ? "0" + seconds : seconds;
  return  x + ":" + y + ":" + z ;
}

/**
 * Waiting for GET_CURRENT_TIME request
 * Then רreturn a message of the current time in the video 
 * 
 * @param {Event Object} event 
 */
async function onDidReceiveMessage(event) {
  if (event.data.type && (event.data.type === "GET_CURRENT_TIME")) {
    var videoObject = document.getElementsByTagName("video")[0];
    let currentTimeFormated = secToHoSecMinFormat(videoObject.currentTime);
    // send the massge 
    window.postMessage({ type: "CURRENT_TIME_RESULT", videoCurrentTime: currentTimeFormated }, "*");
  }
}


