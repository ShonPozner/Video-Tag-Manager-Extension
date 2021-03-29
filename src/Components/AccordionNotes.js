import React from 'react';
import AccordionNote from './AccordionNote';
import DemoNotes from './DemoNotes';



const AccordionNotes = () => {
    return (
        <div className="accordion-notes">
            {DemoNotes.map((note) => (
                <AccordionNote key={note.id} tag={note.tag} title={note.title} time={note.time} content={note.content}></AccordionNote>
            ))}
        </div>
    )
}

export default AccordionNotes
