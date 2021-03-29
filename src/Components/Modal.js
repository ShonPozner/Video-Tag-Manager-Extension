import React, { useState} from "react";
import { X } from 'react-feather';
import Draggable from 'react-draggable';
import { ModalContext } from '../Contexts/ModalProvider';
import AccordionNotes from './AccordionNotes';
import TitleAndDetails from './TitleAndDetails';
import SummarysContext from "../Contexts/SummarysContext";




const Modal = () => {
  
const [summaryState, setSummaryState] = useState(
  [
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
  ] 
);

const addNoteToSummary = note => {
  console.log("add....", note)
};

const removeNoteFromSummary = noteId => {
  console.log("Delete... ", noteId)

};

const closeVideoTagSection = () => {
  let videoTagSection = document.getElementById("video-tag-manger-section");
  console.log(videoTagSection)
  videoTagSection.remove();
};

  return (
    <ModalContext.Consumer>
      {({ windowPosition, hasDraggedWindowPosition, videoCurrentTime, getVideoCurrentTime }) => (
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
                addNoteToSummary: addNoteToSummary,
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
                
                  {/*TODO need to add button of new.. and create Footer component */}
                  <footer className="footer">
                    <div className="modal-content">
                      <h3 className="time-format" >{videoCurrentTime}</h3>
                      <button
                        onClick={getVideoCurrentTime}
                        className="modal-button"
                      >
                        Get Current Time
                      </button>
                    </div>
                  </footer>
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
