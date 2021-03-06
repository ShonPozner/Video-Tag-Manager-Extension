import React, { useState, useEffect, useRef } from "react";
import { Chrome, X } from 'react-feather';
import Draggable from 'react-draggable';
import { ModalContext } from '../Contexts/ModalProvider';
import AccordionNotes from './AccordionNotes';
import TitleAndDetails from './TitleAndDetails';
import SummarysContext from "../Contexts/SummarysContext";
import ListPublicsummaries from './ListPublicsummaries';
import EmptyDiscover from './EmptyDiscover';
// import FooterAddButton from './FooterAddButton';
import Resizable from '../Hooks/Resizable';

import { Direction, Url, CreateNewSummaryForm, GetRandomId, HashPageUrl, PageUrl, GetImageFromUrl } from '../Hooks/constants';

import SummaryApi from "../api/Summary";
import NoteApi from "../api/Note";
import {
	CognitoIdToken,
	CognitoAccessToken,
	CognitoRefreshToken,
	CognitoUserSession,
	CognitoUser,
	CognitoUserPool
} from "amazon-cognito-identity-js";
import { Auth } from "aws-amplify";

const Modal2 = () => {

	//**************** Consts and useStates ****************//

	// Const : useState and useRef
	const modalRef = useRef(null);
	const [summaryState, setSummaryState] = useState([]);
	const [publicSummaryState, setPublicSummaryState] = useState([]);
	const [notes, setNotes] = useState([]);
	const [ready, setReady] = useState(-1);
	

	const { getMyLibrariesRemote, addSummaryRemote, updateSummaryRemote, getSummaryRemote, getPublicSummariesFromUrlRemote } = SummaryApi();
	const { getNotes, updateNote, addNote, deleteNote } = NoteApi();
	
	/**
	 * Try to find the summary according to url,  
	 * if any I will initialize it,
	 * otherwise build a new summary and upload it to the server
	 */
	useEffect(() => {
		authenticateUser();
		const getSummary = async () => {
			await getPublicSummariesFromUrl(window.location.href);
		}
		getSummary();
	}, [])

	useEffect(() => {
		// console.log(`summaryFromServer`, publicSummaryState);

		if(ready === -1) {
			return;
		}
		else if (publicSummaryState === undefined || publicSummaryState.length === 0) {
			setReady(2);
		} else {
			setReady(0);
		}
	}, [publicSummaryState])

	/**
	 * Updates the state of notes to match the selected summary
	 */
	useEffect(() => {
		const getNotes = async () => {
			const notesFromServer = await fetchNotes();
			console.log("notes:", notesFromServer);
			setNotes(notesFromServer.sort((a, b) =>
				a.timeSec > b.timeSec ? 1 : -1));
		}
		summaryState.length > 0 ? getNotes() : setNotes([])

	}, [summaryState])

	// Re-build the session and authenticate the user
	const authenticateUser = () => {
		const session = JSON.parse(window.localStorage["vtm-session"]);

		let idToken = new CognitoIdToken({
			IdToken: session.idToken.jwtToken
		});
		let accessToken = new CognitoAccessToken({
			AccessToken: session.accessToken.jwtToken
		});
		let refreshToken = new CognitoRefreshToken({
			RefreshToken: session.refreshToken.token
		});
		let clockDrift = session.clockDrift;
		const sessionData = {
			IdToken: idToken,
			AccessToken: accessToken,
			RefreshToken: refreshToken,
			ClockDrift: clockDrift
		}
		// Create the session
		let userSession = new CognitoUserSession(sessionData);
		const userData = {
			Username: userSession.getIdToken().payload['cognito:username'],
			Pool: new CognitoUserPool({ UserPoolId: "eu-central-1_gxX97wEqr", ClientId: "fe7d5qhf1c1difm5mqq9j279o" })
		}

		// Make a new cognito user
		const cognitoUser = new CognitoUser(userData);
		// Attach the session to the user
		cognitoUser.setSignInUserSession(userSession);
		// Check to make sure it works
		cognitoUser.getSession(function (err, session) {
			if (session) {
				//Do whatever you want here
			} else {
				console.error("Error", err);
			}
		});
		// The session is now stored and the amplify library can access it to do
		// whatever it needs to.
	}

	//**************** Summary ****************//


	// Create New summary, build new summary , add to state and post to setrver
	const createNewSummary = () => {
		// console.log("createNewSummary");//DELETEME

		let newSummary = CreateNewSummaryForm();
		// console.log("newSummary:", newSummary);

		newSummary["authorName"] = JSON.parse(window.localStorage["vtm-session"]).accessToken.payload.username;
		newSummary["imgUrl"] = GetImageFromUrl(window.location.hostname);

		console.log("newSummary:", newSummary); //DELETEME
		postNewSummary(newSummary);
	}

	// Post the new summary to server (async)
	const postNewSummary = async (summary) => {
		// console.log("postNewSummary", summary); //DELETEME
		addSummaryRemote(summary)
		.then(response => {
			console.log("server's response:", response); //DELETEME
			summary.sid = response.data.sid;
			summary.createTime = response.data.createTime;
			summary.editTime = response.data.editTime;
			setSummaryState([summary]);
			setReady(1);
		})
		.catch(error => {
			console.log(error);
		});
	}

	// Update Summary put (async)
	const UpdateSummary = async (newParamtersSummarys) => {
		// console.log("UpdateSummary, summaryState:", summaryState);

		let newSummary = summaryState[0];
		newSummary.title = newParamtersSummarys.title;
		newSummary.tags = newParamtersSummarys.tags;
		newSummary.editTime = newParamtersSummarys.editTime;

		// console.log("befor update summary - ", newSummary);

		// setState (loacl)
		updateSummaryRemote(newSummary)
		.then(response => {
			// console.log(response); //DELETEME
			setSummaryState([newSummary]);
			console.log(`summaryState`, summaryState);
		})
		.catch(error => {
			console.log(error); //DELETEME
		});
	}

	const getPublicSummariesFromUrl = (url) => {
		getPublicSummariesFromUrlRemote(url)
		.then(summaries => {
			console.log(`summaries`, summaries);
			setReady(10);
			setPublicSummaryState(summaries.sort((a, b) =>
				a.likes.length > b.likes.length ? 1 : -1));

			console.log(`publicSummaryState`, publicSummaryState);

		})
		.catch(error => {
			console.log(`error:`, error);
		});
	}

	//**************** Notes ****************//
	// Fetch - get all notes of this summary (async) 
	const fetchNotes = async () => {
		// console.log(`fetchNotes, summaryState`, summaryState);

		try {
			let notes = await getNotes(summaryState[0].sid);
			return notes;
		} catch (error) {
			console.log(error); //DELETEME
			return undefined;
		}
		
		// const response = await fetch(Url + `summarys/${id}/notes`);
		// const data = await response.json();
		// console.log("fatch data from " + Url + `summarys/${id}/notes` + "  ->>>>>  ", data);
		// return data;
	}

	// Fetch - get some specific note requset (async)
	const fetchNote = async (noteId) => {
		const response = await fetch(Url + `notes/${noteId}`);
		const data = await response.json();
		// return data.find(({id}) => id === noteId);
		return data;
	}

	/**
	 * Remove note - first delete loacl (state),  
	 * and than send delete http command
	 * @param {int} noteId 
	 */
	const removeNoteFromSummary = async (note) => {
		// console.log("removeNoteFromSummary, note: ", note); //DELETEME
		let response = await deleteNote(note);
		
		// console.log(`response:`, response);
		setNotes(notes.filter((curNote) => curNote.nid !== note.nid))
	};

	/**
	 * Create unique id and than add note to the summary
	 * add local to state and than fetch post
	 * @param {} note 
	 */
	const addNoteToSummary = async (note) => {
		console.log(`note1`, note);
		note.sid= summaryState[0].sid;

        addNote(note)
			.then(response => {
				// console.log("response: ", response);
				note["nid"] = response.data["nid"];
				note["createTime"] = response.data["createTime"];
				note["editTime"] = response.data["editTime"];
				const newStateNotes = [...notes, note].sort((a, b) => {
					return a.timeSec > b.timeSec ? 1 : -1;
				});
				setNotes(newStateNotes);
			})
			.catch(error => {
				console.log(error) // DELETEME
			});            
    }
	

	const updateNoteIn = (note) => {
		if (!note.sid || typeof(note.createTime) !== typeof (1)) {
			console.log('invalid note object', note); //DELETEME
			return;
		}

        updateNote(note)
			.then(response => {
				// console.log(`update note response:`, response); //DELETEME
				setNotes(prev => prev.map(item => (item.nid === note.nid ? note : item)));
			})
			.catch(error => {
				console.log(error);
			})
    }


	const closeVideoTagSection = () => {
		let videoTagSection = document.getElementById("video-tag-manger-section");
		// console.log(videoTagSection)
		videoTagSection.remove();
	};

	const handleResize = (direction, movementX, movementY) => {
		const modalSection = modalRef
			.current;
		if (!modalSection) return;

		const { width, height, x, y } = modalSection.getBoundingClientRect();

		const resizeTop = () => {
			modalSection.style.height = `${height - movementY}px`;
			modalSection.style.top = `${y + movementY}px`;
		};

		const resizeRight = () => {
			modalSection.style.width = `${width + movementX}px`;
		};

		const resizeBottom = () => {
			modalSection.style.height = `${height + movementY}px`;
		};

		const resizeLeft = () => {
			modalSection.style.width = `${width - movementX}px`;
			modalSection.style.left = `${x + movementX}px`;
		};

		switch (direction) {
			case Direction.TopLeft:
				resizeTop();
				resizeLeft();
				break;

			case Direction.Top:
				resizeTop();
				break;

			case Direction.TopRight:
				resizeTop();
				resizeRight();
				break;

			case Direction.Right:
				resizeRight();
				break;

			case Direction.BottomRight:
				resizeBottom();
				resizeRight();
				break;

			case Direction.Bottom:
				resizeBottom();
				break;

			case Direction.BottomLeft:
				resizeBottom();
				resizeLeft();
				break;

			case Direction.Left:
				resizeLeft();
				break;

			default:
				break;
		}
	};


	return (
		<ModalContext.Consumer>
			{({ windowPosition, hasDraggedWindowPosition, currentTimeSec, currentTimeFormated, getVideoCurrentTime }) => (
				<Draggable
					handle=".modal-handle"
					defaultPosition={{ x: windowPosition.x, y: windowPosition.y }}
					position={hasDraggedWindowPosition ? { x: windowPosition.x, y: windowPosition.y } : null}
				>
					<div id="modal" className="modal-window custom-scrollba" style={{
						transform: windowPosition,
					}}>
						<div className="modal-window-inner-border" ref={modalRef}>
							{
								ready  === -1 || ready === 10 ? <h2>Loading...</h2>:
								ready === 2 ? <EmptyDiscover createNewSummary={createNewSummary}></EmptyDiscover>:
								ready === 0 ? <ListPublicsummaries setSummaryState={setSummaryState} setReady={setReady} publicSummaryState={publicSummaryState}></ListPublicsummaries> :
								<SummarysContext.Provider value={{
									summary: summaryState,
									notes: notes,
									removeNoteFromSummary: removeNoteFromSummary,
									editNoteFun: updateNoteIn
								}} >
									<Resizable onResize={handleResize} ></Resizable>
									<div className="modal-body">
										{/*TODO need to add someting? and make Top component */}
										<div className="modal-handle">
											<div className="modal-close-button">
												<X color="#5d6484" size="14" onClick={closeVideoTagSection} />
											</div>
										</div>

										<TitleAndDetails
											updateSummary={UpdateSummary}
											summary={summaryState}

										></TitleAndDetails>

										<AccordionNotes
											currentTimeFormated={currentTimeFormated}
											getVideoCurrentTime={getVideoCurrentTime}
											currentTimeSec={currentTimeSec}
											addNoteToSummary={addNoteToSummary}
										/>

									</div>
								</SummarysContext.Provider>

							}
						</div>

					</div>
				</Draggable>
			)}
		</ModalContext.Consumer>
	);
};

export default Modal2;
