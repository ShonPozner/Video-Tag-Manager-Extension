import React from "react";
import AddNoteForm from './AddNoteForm';

const FooterAddButton = (props) => {
  return (
    <footer className="">
      <div className="modal-content">
        <button onClick={props.getVideoCurrentTime} className="modal-button">
            Add Note
        </button>
        <AddNoteForm timeSec={props.currentTimeSec} timeFormted={props.currentTimeFormated} addNote={props.addNoteToSummary}/>

      </div>
    </footer>
  );
};

export default FooterAddButton;
