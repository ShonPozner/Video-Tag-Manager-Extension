import React, {useState, useEffect, useRef} from "react";
import { X } from 'react-feather';
import Draggable from 'react-draggable';
import { ModalContext } from '../Contexts/ModalProvider';
import AccordionNotes from './AccordionNotes';
import TitleAndDetails from './TitleAndDetails';
import SummarysContext from "../Contexts/SummarysContext";
import FooterAddButton from './FooterAddButton';
import Resizable from '../Hooks/Resizable';

import { Direction } from '../Hooks/constants';



const Modal = () => {
// TODO change to real backend server
var url = 'http://localhost:5000/notes';

const modalRef = useRef(null);

  
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

// in setup fetch to get all notes
useEffect(() => { 
  const getNotes = async () => {
    const notesFromServer = await fetchNotes();
    setSummaryState(notesFromServer)
  }
  getNotes();
}, [])


// Fetch - get all requset (async) 
const fetchNotes = async () => {
  const response = await  fetch(url);
  const data = await response.json();
  console.log("fatch data from "+ url + "->>>>>  ",data);
  return data;
}

// Fetch - get some specific note requset (async) 
const fetchNote = async (noteId) => {
  const response = await  fetch(url+ `/${noteId}`);
  const data = await response.json();
  console.log("fatch data from "+ url + "->>>>>  ",data);
  return data;
}

/**
 * Remove note - first delet loact at the state,  
 * and than send delete http command
 * @param {int} noteId 
 */
const removeNoteFromSummary = async (noteId) => {
  console.log("Delete... ", noteId);
  setSummaryState(summaryState.filter((note) => note.id !== noteId))

  await fetch(url + `/${noteId}`, {
    method: 'DELETE'
  })
};

/**
 * Create unique id and than add note to the summary
 * add local to state and than fetch post
 * @param {} note 
 */
const addNoteToSummary = async (note) => {
  // 
  var isUniqueId = function() {
    return summaryState.some(item => item.id === id);
  }  
  do {
    // Get random id
    var id = Math.floor(Math.random() * 10000) + 1;
    var found = isUniqueId();
    console.log("id -> ", id, "found -> ", found); 
  } while(found)
  const newNote = {id, ...note};
  console.log("add... ", newNote);
  setSummaryState([...summaryState, newNote]);

  // send post to server
  const response = await fetch(url,
    {
      method: "POST",
      headers: {'Content-type': 'application/json',
    },
    body: JSON.stringify(newNote)
    }) 
}

// TODO need to coding update method...
const updateNote = async (noteId) => {
  const noteThatUpdating = await fetchNote(noteId);
  console.log("befor update - ", noteThatUpdating);

  // add updade function local and create change to newNote
  const newNote = {...noteThatUpdating, } //todo
  
  const response = await fetch(url +`/${noteId}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(newNote)
  })
  const data = await response.json()
}

 //close the Editor section (extension)
const closeVideoTagSection = () => {
  let videoTagSection = document.getElementById("video-tag-manger-section");
  console.log(videoTagSection)
  videoTagSection.remove();
};

const handleResize = (direction, movementX, movementY) => {
  const modalSection = modalRef
  .current;
  if (!modalSection) return;

  const { width, height, x, y } = modalSection.getBoundingClientRect();

  // const resizeTop = () => {
  //   modalSection.style.height = `${height - movementY}px`;
  //   modalSection.style.top = `${y + movementY}px`;
  // };

  // const resizeRight = () => {
  //   modalSection.style.width = `${width + movementX}px`;
  // };

  // const resizeBottom = () => {
  //   modalSection.style.height = `${height + movementY}px`;
  // };

  const resizeLeft = () => {
    modalSection.style.width = `${Math.max(Math.min(width - movementX,600),250)}px`;
    console.log();
    // modalSection.style.left = `${x + movementX}px`;
  };

  switch (direction) {
    // case Direction.TopLeft:
    //   resizeTop();
    //   resizeLeft();
    //   break;

    // case Direction.Top:
    //   resizeTop();
    //   break;

    // case Direction.TopRight:
    //   resizeTop();
    //   resizeRight();
    //   break;

    // case Direction.Right:
    //   resizeRight();
    //   break;

    // case Direction.BottomRight:
    //   resizeBottom();
    //   resizeRight();
    //   break;

    // case Direction.Bottom:
    //   resizeBottom();
    //   break;

    // case Direction.BottomLeft:
    //   resizeBottom();
    //   resizeLeft();
    //   break;

    case Direction.Left:
      resizeLeft();
      break;

    default:
      break;
    }
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
            <div className="modal-window-inner-border" ref={modalRef}>

              {/* save the all static (global) in this file */}
              <SummarysContext.Provider value={{
                notes: summaryState,
                removeNoteFromSummary: removeNoteFromSummary
              }} >
                <Resizable onResize={handleResize} ></Resizable>
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
