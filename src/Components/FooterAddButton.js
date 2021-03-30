import React from "react";
import AddNoteForm from './AddNoteForm';

const FooterAddButton = (props) => {
  return (
    <footer className="">
      <div className="modal-content">
        <button onClick={props.getVideoCurrentTime} className="modal-button">
            Add Note
        </button>
        <AddNoteForm time={props.videoCurrentTime} addNote={props.addNoteToSummary}/>

      </div>
    </footer>
  );
};

export default FooterAddButton;
