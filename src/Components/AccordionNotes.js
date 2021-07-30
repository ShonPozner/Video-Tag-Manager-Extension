import React,{useState} from 'react';
import AccordionNote from './AccordionNote';
import SummarysContext from "../Contexts/SummarysContext";
import FooterAddButton from './FooterAddButton';



const emptyNote = {
	sid: "",
	createTime: 0,
	content: "Enter note",
	nid: "",
	tag: "tag",
	time: "00:00:00",
	timeSec: 0,
	title: "Enter title"
}

const AccordionNotes = (props) => {
	const [showEditNoteNumber, setShowEditNoteNumber] = useState(null);


	return (
		<>
			<SummarysContext.Consumer>
					{context => (
						<div className="accordion-notes">
							{context.notes.length > 0 ?
							context.notes.map((curNote) => 
							(<AccordionNote key={curNote.nid} removeFunction={context.removeNoteFromSummary} note={curNote} setShowEditNoteNumber = {setShowEditNoteNumber}/>))
							: <AccordionNote removeFunction={context.removeNoteFromSummary} note={emptyNote} setShowEditNoteNumber = {setShowEditNoteNumber}/>
							}
						</div>
					)}
			</SummarysContext.Consumer>
			<FooterAddButton
				currentTimeFormated={props.currentTimeFormated}
				getVideoCurrentTime={props.getVideoCurrentTime}
				currentTimeSec={props.currentTimeSec}
				addNoteToSummary={props.addNoteToSummary}
				setShowEditNoteNumber={setShowEditNoteNumber}
				showEditNoteNumber={showEditNoteNumber}
			></FooterAddButton>
		</>
	)
}

export default AccordionNotes
