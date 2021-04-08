import React, {useState, useEffect, useRef} from "react";
import { X } from 'react-feather';
import Draggable from 'react-draggable';
import { ModalContext } from '../Contexts/ModalProvider';
import AccordionNotes from './AccordionNotes';
import TitleAndDetails from './TitleAndDetails';
import SummarysContext from "../Contexts/SummarysContext";
import FooterAddButton from './FooterAddButton';
import Resizable from '../Hooks/Resizable';

import { Direction , Url, CreateNewSummaryForm, GetRandomId, HashPageUrl} from '../Hooks/constants';

const Modal = () => {

//**************** Consts and useStates ****************//

// Const : useState and useRef
const modalRef = useRef(null);
const [summaryState, setSummaryState] = useState([]);
const [notes, setNotes] = useState([]);

/**
 * Try to find the summary according to url,  
 * if any I will initialize it,
 * otherwise build a new summary and upload it to the server
 */
useEffect(() => { 
  const getSummary = async () => {
    const summaryFromServer = await fetchSummary();
    console.log("summary that app finded ->", summaryFromServer);

    summaryFromServer.length > 0 ? setSummaryState(summaryFromServer) : createNewSummary()
  }
  getSummary();
}, [])

/**
 * Updates the state of notes to match the selected summary
 */
useEffect(() => {
  const getNotes = async () => {
    const notesFromServer = await fetchNotes();
    console.log("notes ->", notesFromServer);
    setNotes(notesFromServer.sort((a, b) => 
      a.timeSec > b.timeSec ? 1 : -1));
  }
  console.log("test-> ", summaryState);
  summaryState.length > 0 ? getNotes() : setNotes([]) 

},[summaryState])


//**************** Summary ****************//

// Fetch - get all requset (async) 
const fetchSummary = async () => {
  const response = await  fetch(Url + "summarys?hashUrl=" + HashPageUrl);
  const data = await response.json();
  console.log("fatch data from "+ Url + "summarys?hashUrl=" + HashPageUrl + "  ->>>>>  ",data);
  return data;
}

// Create New summary, build new summary , add to state and post to setrver
const createNewSummary = () => {
  let newSummary =  CreateNewSummaryForm();
  console.log("add new Summary...  ", newSummary);
  setSummaryState([newSummary]);
  postNewSummary(newSummary);
}

// Post the new summary to server (async)
const postNewSummary = async (summary) => {
  // send post to server
  const response = await fetch(Url + "summarys",
    {
      method: "POST",
      headers: {'Content-type': 'application/json',
    },
    body: JSON.stringify(summary)
    })
  
    const notesFromServer = await fetchSummary();
    setSummaryState(notesFromServer)
}


//**************** Notes ****************//


// Fetch - get all notes of this summary (async) 
const fetchNotes = async () => {
  console.log(`summaryState`, summaryState)
  const id = summaryState[0].id;
  console.log("fetchNotes, my summary is: ", summaryState[0].id)
  const response = await  fetch(Url + `summarys/${id}/notes`);
  const data = await response.json();
  console.log("fatch data from "+ Url + `summarys/${id}/notes` + "  ->>>>>  ",data);
  return data;
}


// Fetch - get some specific note requset (async) 
const fetchNote = async (noteId) => {
  const response = await  fetch(Url+`notes/${noteId}`);
  const data = await response.json();
  // return data.find(({id}) => id === noteId);
  return data;
}

/**
 * Remove note - first delete loacl (state),  
 * and than send delete http command
 * @param {int} noteId 
 */
const removeNoteFromSummary = async (noteId) => {
  console.log("Delete... ", noteId);
  setNotes(notes.filter((note) => note.id !== noteId))
  await fetch(Url+`notes/${noteId}`, {
    method: 'DELETE'
  })
};

/**
 * Create unique id and than add note to the summary
 * add local to state and than fetch post
 * @param {} note 
 */
const addNoteToSummary = async (note) => {
  // console.log("add note to summary , summaryState", summaryState);
  var isNoteIdUnique = function(id) {
    return notes.some(item => item.id === id);
  }  
  do {
    // Get random id
    var id = GetRandomId();
    var found = isNoteIdUnique(id);
    console.log("id -> ", id, "found -> ", found); 
  } while(found)

  const summaryId = summaryState[0].id;
  const newNote = {id, summaryId, ...note};
  console.log("add... ", newNote);
  const newStateNotes = [...notes, newNote].sort((a, b) => {
    return a.timeSec > b.timeSec ? 1 : -1;
  });
  
  setNotes(newStateNotes);

  // send post to server
  const response = await fetch(Url+ "notes",
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
  
  const response = await fetch(Url +`notes/${noteId}`, {
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

  const resizeTop = () => {
    modalSection.style.height = `${height - movementY}px`;
    modalSection.style.top = `${y + movementY}px`;
  };

  const resizeRight = () => {
    modalSection.style.width = `${width + movementX}px`;
  };

  const resizeBottom = () => {
    modalSection.style.height = `${height + movementY}px`;
  };

  const resizeLeft = () => {
    modalSection.style.width = `${width - movementX}px`;
    console.log();
    modalSection.style.left = `${x + movementX}px`;
  };

  switch (direction) {
    case Direction.TopLeft:
      resizeTop();
      resizeLeft();
      break;

    case Direction.Top:
      resizeTop();
      break;

    case Direction.TopRight:
      resizeTop();
      resizeRight();
      break;

    case Direction.Right:
      resizeRight();
      break;

    case Direction.BottomRight:
      resizeBottom();
      resizeRight();
      break;

    case Direction.Bottom:
      resizeBottom();
      break;

    case Direction.BottomLeft:
      resizeBottom();
      resizeLeft();
      break;

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
          <div id="modal" className="modal-window custom-scrollba" style={{
            transform: windowPosition,
        }}>
            <div className="modal-window-inner-border" ref={modalRef}>

              {/* save the all static (global) in this file */}
              <SummarysContext.Provider value={{
                summary: summaryState,
                notes: notes,
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
