import React from 'react';
import { X } from 'react-feather';
import Draggable from 'react-draggable';
import { ModalContext } from '../Contexts/ModalProvider';
import AccordionNotes from './AccordionNotes';
import DemoNotes from './DemoNotes';
import TitleAndDetails from './TitleAndDetails';

const closeVideoTagSection = () => {
  let videoTagSection = document.getElementById("video-tag-manger-section");
  console.log(videoTagSection)
  videoTagSection.remove();
}

const Modal = () => {
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
                <div className="modal-body">
                  {/*TODO need to add someting? and make Top component */}
                  <div className="modal-handle">
                    <div className="modal-close-button">
                      <X color="#5d6484" size="14" onClick={closeVideoTagSection} />
                    </div>
                  </div>

                  {/*TODO need to add Name, deatil and tags.. a and make title component */}
                  <TitleAndDetails></TitleAndDetails>
                  
                  <div className="accordion-notes">
                    {DemoNotes.map((note) => (
                      <AccordionNotes key={note.id} tag={note.tag} title={note.title} time={note.time} content={note.content}></AccordionNotes>
                    ))}
                  </div>      
                
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
              </div>
          </div>
        </Draggable>
      )}
    </ModalContext.Consumer>
  );
};

export default Modal;
