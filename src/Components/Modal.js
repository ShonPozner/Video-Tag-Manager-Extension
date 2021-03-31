import React, {useState, useEffect} from "react";
import { X } from 'react-feather';
import Draggable from 'react-draggable';
import { ModalContext } from '../Contexts/ModalProvider';
import AccordionNotes from './AccordionNotes';
import TitleAndDetails from './TitleAndDetails';
import SummarysContext from "../Contexts/SummarysContext";
import FooterAddButton from './FooterAddButton';



const Modal = () => {
  
// Default empty
const [summaryState, setSummaryState] = useState(
  [
    // {
    //     id: 1,
    //     title: "What is your return policy?",
    //     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." ,
    //     time:"0:45:03",
    //     tag: "definition",
    //     timeSec: 2261.864352
    // }, 
    // {
    //     id:2,
    //     title: "Which languages does you support?,",
    //     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //     time:"0:45:03",
    //     tag: "summary",
    //     timeSec: 2262.864352
    // },
    // {
    //     id:3,
    //     title: "Can I use a custom domain?",
    //     content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></br><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>",
    //     time:"0:45:03",
    //     tag: "important",
    //     timeSec: 2263.864352
    // },
    // {
    //     id:4,
    //     title: "Which languages does you support?",
    //     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //     time:"0:45:03",
    //     tag: "summary",
    //     timeSec: 2264.864352
    // },
    // {
    //     id:5,
    //     title: "",
    //     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //     time:"0:45:03",
    //     tag: "summary",
    //     timeSec: 2265.864352
    // },
    // {
    //     id:6,
    //     title: "da",
    //     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //     time:"0:45:03",
    //     tag: "important",
    //     timeSec: 2266.864352
    // }
]
);

//in 
useEffect(() => { 
  const getNotes = async () => {
    const notesFromServer = await fetchNotes();
    setSummaryState(notesFromServer)
  }
  getNotes();
}, [])

// Fetch requset: ask from some url the notes (async) 
const fetchNotes = async () => {
  let url = 'http://localhost:5000/notes';
  const response = await  fetch(url);
  const data = await response.json();
  console.log("fatch data from "+ url + "->>>>>  ",data);
  return data;
}



/**
 * Remove note with that "noteId" from SummarysContext
 * 
 * @param {int} noteId 
 */
const removeNoteFromSummary = noteId => {
  console.log("Delete... ", noteId);
  setSummaryState(summaryState.filter((note) => note.id_note !== noteId))
};


/**
 * Create unique id and than add note to the summary
 * 
 * @param {} note 
 */
const addNoteToSummary = note => {
  // 
  var isUniqueId = function() {
    return summaryState.some(item => item.id_note === id_note);
  }  
  do {
    // Get random id
    var id_note = Math.floor(Math.random() * 10000) + 1;
    var found = isUniqueId();
    console.log("id -> ", id_note, "found -> ", found); 
  } while(found)
  const newNote = {id_note, ...note};
  console.log("add... ", newNote);
  setSummaryState([...summaryState, newNote]);
}


 //close the Editor section (extension)
const closeVideoTagSection = () => {
  let videoTagSection = document.getElementById("video-tag-manger-section");
  console.log(videoTagSection)
  videoTagSection.remove();
};

  return (
    <ModalContext.Consumer>
      {({ windowPosition, hasDraggedWindowPosition, currentTimeSec, currentTimeFormated, getVideoCurrentTime}) => (
        <Draggable
          handle=".modal-handle"
          defaultPosition={{x: windowPosition.x, y: windowPosition.y}}
          position={hasDraggedWindowPosition ? { x: windowPosition.x, y: windowPosition.y } : null}
        >
          <div id="modal" className="modal-window" style={{
            transform: windowPosition,
        }}>
            <div className="modal-window-inner-border">

              {/* save the all static (global) in this file */}
              <SummarysContext.Provider value={{
                notes: summaryState,
                removeNoteFromSummary: removeNoteFromSummary
              }} >
                  <div className="modal-body">
                    {/*TODO need to add someting? and make Top component */}
                    <div className="modal-handle">
                      <div className="modal-close-button">
                        <X color="#5d6484" size="14" onClick={closeVideoTagSection} />
                      </div>
                    </div>

                    <TitleAndDetails></TitleAndDetails>

                    <AccordionNotes></AccordionNotes>

                    <FooterAddButton 
                     currentTimeFormated={currentTimeFormated}
                     getVideoCurrentTime={getVideoCurrentTime}
                     currentTimeSec={currentTimeSec}
                     addNoteToSummary ={addNoteToSummary}
                    ></FooterAddButton>     
                  </div>
                </SummarysContext.Provider>
              </div>

          </div>
        </Draggable>
      )}
    </ModalContext.Consumer>
  );
};

export default Modal;
