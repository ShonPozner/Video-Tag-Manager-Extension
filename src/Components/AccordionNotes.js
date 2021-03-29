import React from 'react';
import AccordionNote from './AccordionNote';
import DemoNotes from './DemoNotes';
import SummarysContext from "../Contexts/SummarysContext";




const AccordionNotes = () => {
    return (
        <SummarysContext.Consumer>
            {context=> (
                <div className="accordion-notes">
                {context.notes.map((note) => (
                    <AccordionNote key={note.id} removeFunction={context.removeNoteFromSummary} id={note.id}  tag={note.tag} title={note.title} time={note.time} content={note.content}></AccordionNote>
                ))}
            </div>
            )}

        </SummarysContext.Consumer>
        
    )
}

export default AccordionNotes
