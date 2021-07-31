import Amplify, { API } from 'aws-amplify';

// TODO no user -> logout, homepage
// FIXME
const awsmobile = {
	"aws_project_region": "eu-central-1",
	"aws_cognito_identity_pool_id": "eu-central-1:37578e1c-c060-4359-9096-d7a534c07a84",
	"aws_cognito_region": "eu-central-1",
	"aws_user_pools_id": "eu-central-1_gxX97wEqr",
	"aws_user_pools_web_client_id": "fe7d5qhf1c1difm5mqq9j279o",
	"aws_cloud_logic_custom": [
		{
			"name": "SummaryAPI",
			"endpoint": "https://smzqyqgrt0.execute-api.eu-central-1.amazonaws.com/staging",
			"region": "eu-central-1"
		}
	]
};
Amplify.configure(awsmobile)

//TODO move out all params to calling components (!)
const SummaryApi = () => {
	const apiName = 'SummaryAPI';
	const summaryPath = '/summary';
	const accessPath = summaryPath + '/access';
	const publicSummariesPath = summaryPath + "/public";
	const sharedWithMePath = summaryPath + "/sharedwithme";
	const libraryPath = '/library';
	const myLibrariesPath = libraryPath + '/mylibraries';

	const summaryIdKeyName = 'sid';
	const editTimeKeyName = "editTime";
	const createTimeKeyName = "createTime";
	const authorKeyName = "authorName";
	const favoriteKeyName = "favorite";
	const accessKeyName = "access";
	const friendsKeyName = "allowFriends";

	const likeValue = 1;
	const dislikeValue = -1;

	const getPublicSummariesFromUrlRemote = (url) => {
		console.log('getSummariesFromUrlRemote, url:', `${url}`); //DELETEME

		const myInit = {
			queryStringParameters: {
				url: url
			}
		}

		return API.get(apiName, `${publicSummariesPath}?url=${url}`, myInit);
	}

	const getSummaryRemote = (sid) => {
		console.log('getSummary, sid:', sid); //DELETEME

		const myInit = {
			queryStringParameters: {
				[summaryIdKeyName]: JSON.stringify(sid)
			}
		}

		return API.get(apiName, summaryPath, myInit)
	}

	const addSummaryRemote = (summary) => {
		console.log('addSummary:', summary); //DELETEME

		//TODO lid (summary.lid)
		return API.post(apiName, summaryPath, { body: summary })
	}

	const updateSummaryRemote = async (summary) => {
		console.log('updateSummary') //DELETEME
		const newSummary = {...summary}

		newSummary[summaryIdKeyName] = JSON.stringify(summary[summaryIdKeyName]);
		newSummary[editTimeKeyName] = new Date().getTime();

		return API.patch(apiName, summaryPath, { body: newSummary })

	}

	const deleteSummaryRemote = (sid) => {
		console.log('delete summary sid: ', sid); //DELETEME

		const queryParams = {
			queryStringParameters: {
				sid: JSON.stringify(sid)
			}
		}

		return API.del(apiName, summaryPath, queryParams)
	}

	const toggleFavoriteRemote = (summary) => {
		console.log(`toggleFavorite`, summary); //DELETEME

		summary[summaryIdKeyName] = JSON.stringify(summary[summaryIdKeyName]);
		return API.patch(apiName, summaryPath, { body: summary });
	}

	const toggleLikeRemote = async (sid, likes) => {
		console.log(`toggle like ->  `, sid); //DELETEME

		const toUpdate = {
			[summaryIdKeyName]: JSON.stringify(toUpdate[summaryIdKeyName]),
			likes: likes
		}

		return API.patch(apiName, summaryPath, { body: toUpdate })

	};

	const getMyLibrariesRemote = () => {
		console.log('getMyLibraries'); //DELETEME

		return API.get(apiName, myLibrariesPath);
	}

	const editAccessRemote = (sid, access) => {
		console.log('editAcces, access:', access); //DELETEME

		access[summaryIdKeyName] = JSON.stringify(sid);

		return API.patch(apiName, accessPath, { body: access })
	}

	const getAccessRemote = (sid) => {
		console.log('getSummaryAccess, sid:', sid); //DELETEME

		const params = {
			queryStringParameters: {
				[summaryIdKeyName]: JSON.stringify(sid)
			}
		}

		return API.get(apiName, accessPath, params);
	}

	const getPublicSummariesRemote = () => {
		console.log(`getPublicSummaries, path:`, publicSummariesPath); //DELETEME
		// setLoading(true);
		return API.get(apiName, publicSummariesPath);
	}

	const getSummariesSharedWithRemote = (username) => {
		console.log('getSummariesSharedWithMe, username:', username); //DELETEME
		const queryParams = {
			queryStringParameters: {
				username: username
			}
		}

		console.log(`params:`, queryParams);//DELETEME
		return API.get(apiName, sharedWithMePath, queryParams);
	}

	//TODO
	const shareSummaryRemote = (sid) => { }
	const getLibraryRemote = async (lid) => { }

	return {
		getSummaryRemote,
		deleteSummaryRemote,
		updateSummaryRemote,
		shareSummaryRemote,
		toggleFavoriteRemote,
		addSummaryRemote,
		editAccessRemote,
		toggleLikeRemote,
		getPublicSummariesRemote,
		getSummariesSharedWithRemote,
		getAccessRemote,
		getMyLibrariesRemote, // NOT IN USE
		getPublicSummariesFromUrlRemote
	}
}

export default SummaryApi;


