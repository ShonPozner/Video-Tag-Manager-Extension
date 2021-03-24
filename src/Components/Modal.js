import React from 'react';
import { X } from 'react-feather';
import Draggable from 'react-draggable';
import { ModalContext } from '../Contexts/ModalProvider';
import { get } from 'jquery';

const closeBlock = () => {
  let block = document.getElementsByClassName("modal-window")[0];
  console.log(block)

  block.hidden=true;
  console.log(block)

}

const Modal = () => {
  return (
    <ModalContext.Consumer>
      {({ windowPosition, hasDraggedWindowPosition, extensionId: currentTime, getExtensionId }) => (
        <Draggable
          handle=".modal-handle"
          defaultPosition={{x: windowPosition.x, y: windowPosition.y}}
          position={hasDraggedWindowPosition ? { x: windowPosition.x, y: windowPosition.y } : null}
        >
          <div id="modal" className="modal-window" style={{
            transform: windowPosition,
        }}>
            <div className="modal-window-inner-border">
                <>
                  <div className="modal-body">
                    <div className="modal-handle">
                      <div className="modal-close-button">
                        <X color="#5d6484" size="14" onClick={closeBlock} />
                      </div>
                    </div>
                    <div className="modal-content">
                      <h3 className="time-format" >{currentTime}</h3>
                      <button
                        onClick={getExtensionId}
                        className="modal-button"
                      >
                        Get Current Time
                      </button>
                    </div>
                  </div>
                </>
              </div>
          </div>
        </Draggable>
      )}
    </ModalContext.Consumer>
  );
};

export default Modal;
