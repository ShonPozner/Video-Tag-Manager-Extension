/* global chrome */
import Amplify, { Auth } from 'aws-amplify';
import { ObjectStr } from '../utils/function/Strings';

Amplify.configure({
	"aws_userPools_id": "eu-central-1_gxX97wEqr",
	"aws_userPools_web_client_id": "fe7d5qhf1c1difm5mqq9j279o"
})

const UserApi = (userAttributes, setUserAttributes, history) => {
	const mySummariesPath = "/myHome/mySummaries";
	const loginPath = "/access/login";
	const homePath = "/home";
	const OK = false;

	/**
	 * 
	 * @param {*} data expecting userName, password and email fields (these names)
	 * @returns true if error, false if not
	 */
	const Signup = async (data) => {
		console.log('sign up:', data); //DELETEME

		const invalidResponse = validateData(data);
		if (invalidResponse) {
			console.log(invalidResponse);
			return;
		}

		const params = {
			username: data.userName,
			password: data.password,
			attributes: {
				email: data.email,
			}
		}

		try {
			var user = await Auth.signUp(params);
			console.log('signup response:', user); // DELETEME
		}
		catch (error) {
			console.log('error signup:', error); // DELETEME
			alert('error:', error.message);
			return !OK;
		}

		if (user.challengeName) return handleChallenge(user, data);

		return OK;
	}

	const Login = async (data) => {
		console.log('request data:', data);  // DELETEME

		try {
			//FIXME username (not email), other files ("useLoginSchema")
			var user = await Auth.signIn(data.email, data.password);
		} catch (error) {
			alert('Error:' + error.message);
			console.log(error); //DELETEME
			return handleError(error);
		}

		alert("Logged in"); //DELETEME
		console.log('response data:', user); //DELETEME

		const attributes = user.attributes;
		attributes.username = user.username; // Add username to attrs
		delete attributes.sub; // Remove UID
		delete attributes.email_verified; // Remove bool

		setUserAttributes(attributes);
		// https://stackoverflow.com/questions/60244048/login-to-chrome-extension-via-website-with-aws-amplify
		//Get the current session from aws amplify
		const session = await Auth.currentSession();
		const extensionId = 'keohhbpcjlkoohpjpbeojdakdjlneebn';

		console.log('sending message to ext1:', extensionId);
		console.log('chrome:', chrome);
		chrome.runtime.sendMessage(extensionId, session,
			function (response) {
				console.log('sending message to ext2:', response);
			});

		history.push(mySummariesPath); //FIXME should be done from front if result was OK?

		if (user.challengeName)
			return handleChallenge(user, data);
		return OK;
	}

	const Logout = () => {
		if (Auth.currentUserInfo == undefined)
			console.log('error: you must login first');

		Auth.signOut()
			.then(_ => {
				alert("Logged out successfully"); //DELETEME
				history.push(homePath);
			})
			.catch(e => {
				alert('Logout Error:\n' + e.message); //DELETEME
			})
	}

	const ConfirmSignUpSubmit = (data) => { //FIXME username ?
		console.log('ConfirmSignup: data:', data)

		Auth.confirmSignUp(data.username, data.code) // FIXME ?
			.then(response => {
				console.log('confirm sign up response:', response) //DELETEME
				history.push(loginPath)
			})
			.catch(error => {
				console.log(`error confirm signup:`, error); //DELETEME
				if (error.code === "ExpiredCodeException") {
					alert('Verification code resent to your username')
					Auth.resendSignUp(data.username)
				}
			});
	}

	const ResetPassword = async (username) => {
		console.log(`ResetPassword, username:`, username)
		let success = false;

		try {
			var response = await Auth.forgotPassword(username);
			success = true;
		} catch (error) {
			console.log(error); //DELETEME
		}

		console.log(`response:`, response);
		return success;
	}

	const ConfirmResetPassword = async (username, code, newPassword) => {
		console.log(`ConfirmResetPassword, username: ${username}, code: ${code}, newPassword: ${newPassword}`); //DELETEME

		try {
			let response = await Auth.forgotPasswordSubmit(username, code, newPassword);
			history.push(loginPath);
		} catch (error) {
			console.log(error);
			alert(error.message); //DELETEME
		}
	}

	// FIXME Complete -> Confirm
	const CompleteNewPassword = async (user, username, newPassword) => {
		console.log('CompleteNewPassword'); //DELETEME

		try {
			var user = await Auth.completeNewPassword(user, newPassword, { username: username });
		} catch (error) {
			console.log(error); //DELETEME
			return !OK;
		}

		console.log(user); //DELETEME
		return OK;
	}

	const RefreshUserSession = () => {
		Auth.currentSession()
			.then(data => console.log(data)) //DELETEME
			.catch(err => console.log(err)); //DELETEME
	}

	const IsLoggedIn = () => {
		Auth.currentAuthenticatedUser()
			.then(response => true)
			.catch(error => false);
	};

	const ResendConfirmSignUp = async (username) => {
		console.log(`ResendConfirmSignUp, username:`, username);

		try {
			let response = await Auth.resendSignUp(username);
			console.log(`resend confirm signup response:`, response);
			return true;
		} catch (error) {
			console.log(`error resending confirmation code:`, error); //DELETEME
			return true;
		}
	};

	const EditProfile = async (data) => {
		console.log(`EditProfile, data:`, data); //DELETEME

		try {
			var curUser = await Auth.currentAuthenticatedUser();
		} catch (error) {
			console.log(error); //DELETEME
			return !OK;
		}

		delete data.username;
		delete data.email;

		try {
			var response = await Auth.updateUserAttributes(curUser, data);
		} catch (error) {
			console.log(error); //DELETEME
			return !OK;
		}
		setUserAttributes(data);
		console.log(`response:`, response); //DELETEME

		return OK;
	}

	const ChangePassword = async (data) => {
		console.log(`ChangePassword, data:`, data); //DELETEME

		if (data.newPassword !== data.confirm) {
			console.log("Password confirmation mismatch!"); //DELETEME
			return !OK;
		}

		try {
			var user = await Auth.currentAuthenticatedUser();
		} catch (error) {
			console.log(error); //DELETEME
			return handleError(error);
		}

		try {
			var response = await Auth.changePassword(user, data.password, data.newPassword);
		} catch (error) {
			console.log(error); //DELETEME
			return handleError(error);
		}

		console.log(`response:`, response); //DELETEME
		return OK;
	};

	const GetCurrentSession = () => {
		return Auth.currentSession();
	}

	// TODO
	const ResendResetPassword = (data) => { };

	// ========== HELPER FUNCTIONS ==========
	const handleError = (error) => {
		switch (error.code) {
			case "UserNotConfirmedException":
				// TODO
				// history.push(confirmSignupPath)
				break;
		}
		return error.message;
	}

	const handleChallenge = (user, data) => {
		console.log(`handleChallenge, user: ${ObjectStr(user)}, data: ${ObjectStr(data)}`) //DELETEME
		try {
			switch (user.challenge) {
				case "NEW_PASSWORD_REQUIRED":
					// history.push(changePasswordPath)
					// break;
					CompleteNewPassword(user, data.username, data.password); //FIXME change password page (no confirmation code)
					return OK;
					break;
				// case "SELECT_MFA_TYPE":
				// 	break;
				// case "PASSWORD_VERIFIER":
				// 	break;
				// case "SMS_MFA":
				// 	break;
				// default:
				// 	break;
			}
		} catch (error) {
			console.log(error);
			return !OK;
		}

		return !OK;
	}

	const validateData = (data) => {
		const usernameRx = /^[a-zA-Z0-9]+(_[a-zA-Z0-9]+)?$/;;

		if (data.password !== data.confirmPassword) {
			return 'Password confirmation must match';
		} else if (!usernameRx.test(data.username)) {
			return "Invalid username, must contain alphabet, numbers and underscore only";
		}
		return OK;
	}

	return {
		Signup,
		Login,
		Logout,
		ConfirmSignUpSubmit,
		ResetPassword,
		ConfirmResetPassword,
		ResendConfirmSignUp,
		ResendResetPassword,
		ChangePassword,
		IsLoggedIn,
		EditProfile,
		userAttributes,
		setUserAttributes,
		GetCurrentSession
	};
}

export default UserApi;
