/* global chrome */

import { handleSessionRequest } from "./backgroundJS/main";

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
		console.log(request);
		handleSessionRequest(request);
		// Auth.currentAuthenticatedUser()
		// .then(response => {
		// 	console.log('auth user:', response)
		// })
	} else {
		console.log(request);
	}
	window.localStorage.setItem("shon", "gever");
	sendResponse("OK");
});

// // Re-build the session and authenticate the user
// export const authenticateUser = async (session) => {
// 	console.log(`session:`, session);
// 	let idToken = new CognitoIdToken({
// 	IdToken: session.idToken.jwtToken
// 	});
// 	let accessToken = new CognitoAccessToken({
// 		AccessToken: session.accessToken.jwtToken
// 	});
// 	let refreshToken = new CognitoRefreshToken({
// 		RefreshToken: session.refreshToken.token
// 	});
// 	let clockDrift = session.clockDrift;
// 	const sessionData = {
// 	IdToken: idToken,
// 	AccessToken: accessToken,
// 	RefreshToken: refreshToken,
// 	ClockDrift: clockDrift
// 	}
// 	// Create the session
// 	let userSession  = new CognitoUserSession(sessionData);
// 	const userData = {
// 	Username: userSession.getIdToken().payload['cognito:username'],
// 	Pool: new CognitoUserPool({UserPoolId: YOUR_USER_POOL_ID, ClientId: YOUR_APP_CLIENT_ID})
// 	}

// 	// Make a new cognito user
// 	const cognitoUser = new CognitoUser(userData);
// 	// Attach the session to the user
// 	cognitoUser.setSignInUserSession(userSession);
// 	// Check to make sure it works
// 	cognitoUser.getSession(function(err, session) {
// 	if(session){
// 		//Do whatever you want here
// 	} else {
// 		console.error("Error", err);
// 	}

// 	})
// 	// The session is now stored and the amplify library can access it to do
// 	// whatever it needs to.
// }

