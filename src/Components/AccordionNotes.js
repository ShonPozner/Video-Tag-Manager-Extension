import React from 'react';
import AccordionNote from './AccordionNote';
import SummarysContext from "../Contexts/SummarysContext";


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

const AccordionNotes = () => {
	return (
		<SummarysContext.Consumer>
			{context => (
				<div className="accordion-notes">
					{context.notes.length > 0 ?
					context.notes.map((curNote) => 
					(<AccordionNote key={curNote.nid} removeFunction={context.removeNoteFromSummary} note={curNote} />))
					: <AccordionNote removeFunction={context.removeNoteFromSummary} note={emptyNote}/>
					}
				</div>
			)}
		</SummarysContext.Consumer>
	)
}

export default AccordionNotes
