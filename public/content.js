/* global chrome */

chrome.runtime.onMessage.addListener(function(request, sender) {
  console.log("0. paramters that we get in content fun.. - ", request , sender)
  main();
});

function main() {
  console.log("1. content.js: chrome.runtime.id- ", chrome.runtime.id)
  // eslint-disable-next-line no-undef
  const extensionOrigin = 'chrome-extension://' + chrome.runtime.id;

  console.log("2. content.js: extensionOrigin- " , extensionOrigin)

  // eslint-disable-next-line no-restricted-globals

  console.log("3. content.js:location.ancestorOrigins.contains(extensionOrigin) -", location.ancestorOrigins.contains(extensionOrigin))

  if (!location.ancestorOrigins.contains(extensionOrigin)) {
    // Fetch the local React index.html page
    // eslint-disable-next-line no-undef
    fetch(chrome.runtime.getURL('index.html') /*, options */)
      .then((response) => response.text())
      .then((html) => {
        const styleStashHTML = html.replace(/\/static\//g, `${extensionOrigin}/static/`);
        // eslint-disable-next-line no-undef
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

function formtSecToMinSec(timeInSec) {
  let minutes = Math.floor(timeInSec / 60);   
  let seconds = Math.floor(timeInSec - minutes * 60)
  let x = minutes < 10 ? "0" + minutes : minutes;
  let y = seconds < 10 ? "0" + seconds : seconds;
  return x + ":" + y ;
}

async function onDidReceiveMessage(event) {
  if (event.data.type && (event.data.type === "GET_EXTENSION_ID")) {
    var vid = document.getElementsByTagName("video")[0];
    let currentTimeFormatMinSec = formtSecToMinSec(vid.currentTime);

    window.postMessage({ type: "EXTENSION_ID_RESULT", videoCurrentTime: currentTimeFormatMinSec }, "*");
  }
}


