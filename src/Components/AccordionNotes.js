import React from 'react';
import AccordionNote from './AccordionNote';
import SummarysContext from "../Contexts/SummarysContext";




const AccordionNotes = () => {
    return (
        <SummarysContext.Consumer>
            {context=> (
                <div className="accordion-notes">
                {context.notes.length > 0 ? context.notes.map((note) => (
                    <AccordionNote key={note.id_note} removeFunction={context.removeNoteFromSummary}
                     id={note.id_note}  tag={note.tag} title={note.title} time={note.time}
                    content={note.content}/>
                )): <AccordionNote removeFunction={context.removeNoteFromSummary}
                    id={0} title="Start Your Summary (edit me)" time="00:00:00"/>
            }
            </div>
            )}

        </SummarysContext.Consumer>
        
    )
}

export default AccordionNotes
