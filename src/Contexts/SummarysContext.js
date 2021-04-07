import React from 'react';

// TODO clear the notes defult
export default React.createContext({
    notes:   [
    ],
    
    addNoteToSummary: note => {}, 

    removeNoteFromSummary: noteId => {}
});
