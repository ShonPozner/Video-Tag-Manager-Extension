import React from 'react';

// TODO clear the notes defult
export default React.createContext({
    notes: [],
    summary: [],
    
    addNoteToSummary: note => {}, 
    removeNoteFromSummary: noteId => {}
});
