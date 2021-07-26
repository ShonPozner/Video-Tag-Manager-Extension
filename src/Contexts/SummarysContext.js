import React from 'react';


export default React.createContext({
	notes: [],
	summary: [],
	addNoteToSummary: note => { },
	removeNoteFromSummary: noteId => { }
});
