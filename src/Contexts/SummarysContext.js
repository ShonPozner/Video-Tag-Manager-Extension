import React from 'react';

// TODO clear the notes defult
export default React.createContext({
    notes:   [
        {
            id: 1,
            title: "What is your return policy?",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." ,
            time:"0:45:03",
            tag: "definition",
            timeSec: 2261.864352
        }, 
        {
            id:2,
            title: "Which languages does you support?,",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            time:"0:45:03",
            tag: "summary",
            timeSec: 2262.864352
        },
        {
            id:3,
            title: "Can I use a custom domain?",
            content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></br><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>",
            time:"0:45:03",
            tag: "important",
            timeSec: 2263.864352
        },
        {
            id:4,
            title: "Which languages does you support?",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            time:"0:45:03",
            tag: "summary",
            timeSec: 2264.864352
        },
        {
            id:5,
            title: "",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            time:"0:45:03",
            tag: "summary",
            timeSec: 2265.864352
        },
        {
            id:6,
            title: "da",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            time:"0:45:03",
            tag: "important",
            timeSec: 2266.864352
        }
    ],
    addNoteToSummary: note => {}, 

    removeNoteFromSummary: noteId => {}
});
