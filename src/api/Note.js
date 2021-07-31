import Amplify, { API } from 'aws-amplify';

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

// notes, setNotes, setLoading
const NoteApi = () => {
	const apiName = "SummaryAPI";
	const notesPath = "/note";
	const summaryIdKeyName = "sid";
	const createdKeyName = "createTime";

	const getNotes = (sid) => {
		// console.log(`getNotes`, sid); //DELETEME

		const queryParams = {
			queryStringParameters: {
				sid: JSON.stringify(sid)
			}
		}

		return API.get(apiName, notesPath, queryParams)
	};

	const addNote = (note) => {
		console.log(`addNote`, note);

		return API.post(apiName, notesPath, { body: note });
	};

	const deleteNote = (note) => {
		// console.log(`deleteNote`, note); //DELETEME
		// console.log(`delete test!`, JSON.stringify(note[summaryIdKeyName]))

		const queryParams = {
			queryStringParameters: {
				[summaryIdKeyName]: JSON.stringify(note[summaryIdKeyName]),
				[createdKeyName]: JSON.stringify(note[createdKeyName])
			}
		}

		console.log(`queryParams:`, queryParams); //DELETEME
		return API.del(apiName, notesPath, queryParams);

	};

	const updateNote = (note) => {
		// console.log(`updateNote`, note); //DELETEME

		if (!note[summaryIdKeyName] || typeof (note[createdKeyName]) !== typeof (1)) {
			console.log('invalid note object', note); //DELETEME
			return 'error'; //TODO rename error handle
		}

		return API.patch(apiName, notesPath, { body: note });


	};

	return {
		getNotes, updateNote, addNote, deleteNote
	}
}

export default NoteApi
