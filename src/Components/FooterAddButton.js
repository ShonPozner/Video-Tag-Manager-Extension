import React from "react";
import AddNoteForm from './AddNoteForm';
import SummarysContext from "../Contexts/SummarysContext";
import EditNoteForm from './EditNoteForm';


const FooterAddButton = (props) => {

	// get the currant time and show the form (fip the state)
	const clickedOnAddNote = () => {
		props.getVideoCurrentTime();
		setTimeout(() => {
			props.setShowEditNoteNumber(props.showEditNoteNumber === null ? "NEW SUMMARY": null)
		}, 400);
	}

	// TODO add Draggable...
	return (
		<SummarysContext.Consumer>
			{ context => (
				<footer className="footer">
				<div className="modal-content">
					{/* TODO style buttton to icon in the botoom? and hiide affter clicked */}
					<input type="button" onClick={() => clickedOnAddNote(props)} className={`modal-button ${!props.showEditNoteNumber  ? '' : "btn-close"}`}
						value={props.showEditNoteNumber != null ? 'Close' : 'Add Note'} />
					{
						props.showEditNoteNumber ===  "NEW SUMMARY" || props.showEditNoteNumber === ""?
							<AddNoteForm timeSec={props.currentTimeSec} timeFormted={props.currentTimeFormated}
							addNote={props.addNoteToSummary} setShowEditNoteNumber={props.setShowEditNoteNumber} showEditNoteNumber={props.showEditNoteNumber} />:
						<></>
					}
					{
							props.showEditNoteNumber ===  null || props.showEditNoteNumber ===  "NEW SUMMARY" ? <></>:
							<EditNoteForm setShowEditNoteNumber={props.setShowEditNoteNumber} note={context.notes.find(item => item.nid === props.showEditNoteNumber)}
							editNoteFun={context.editNoteFun} ></EditNoteForm>

					}
							{/* // <addNote note={notes.find(item => item.nid === showEditNoteNumber)}
							// 	updateNote={showEditNoteNumber === "NEW_NOTE" ? addNote : updateNote} sid={sid}
							// 	open={showEditNoteNumber} onClose={() => setShowEditNoteNumber(null)}> </addNote> */}


				</div>
				</footer>	
			)
		}
				
		</SummarysContext.Consumer>

		
	);
};

export default FooterAddButton;
