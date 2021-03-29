import React from 'react';

export default React.createContext({
    notes: [
        {
            id: 1,
            title: "What is your return policy?",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." ,
            time:"0:45:03",
            tag: "definition",
        }, 
        {
            id:2,
            title: "Which languages does you support?,",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            time:"0:45:03",
            tag: "summary"
        },
        {
            id:3,
            title: "Can I use a custom domain?",
            content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></br><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>",
            time:"0:45:03",
            tag: "important",
        },
        {
            id:4,
            title: "Which languages does you support?",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            time:"0:45:03",
            tag: "summary"
        },
        {
            id:5,
            title: "",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            time:"0:45:03",
            tag: "summary"
        },
        {
            id:6,
            title: "da",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            time:"0:45:03",
            tag: "important"
    
        }
    ],
    addNoteToSummary: note => {}, 

    removeNoteFromSummary: noteId => {}
});
