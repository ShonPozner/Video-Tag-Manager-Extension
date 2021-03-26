import React from 'react';
import { X } from 'react-feather';
import Draggable from 'react-draggable';
import { ModalContext } from '../Contexts/ModalProvider';
import { get } from 'jquery';

const hiddeVideoTagSection = () => {
  let videoTagSection = document.getElementById("video-tag-manger-section");
  console.log(videoTagSection)
  videoTagSection.hidden=true;
}

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
                  <div className="modal-handle">
                    <div className="modal-close-button">
                      <X color="#5d6484" size="14" onClick={closeVideoTagSection} />
                    </div>
                  </div>
                  <div className="modal-content">
                    <h3 className="time-format" >{videoCurrentTime}</h3>
                    <button
                      onClick={getVideoCurrentTime}
                      className="modal-button"
                    >
                      Get Current Time
                    </button>
                  </div>
                </div>
              </div>
          </div>
        </Draggable>
      )}
    </ModalContext.Consumer>
  );
};

export default Modal;
