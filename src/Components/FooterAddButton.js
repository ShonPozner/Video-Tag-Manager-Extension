import React, {useState} from "react";
import AddNoteForm from './AddNoteForm';

const FooterAddButton = (props) => {
  const [showForm, setShowForm] = useState(false);

  // get the currant time and show the form (fip the state)
  const clickedOnAddNote = () => {
    props.getVideoCurrentTime();

    setTimeout(() => {
      setShowForm(!showForm);

    }, 500);
  }
  
  // TODO add Draggable...
  return (
    <footer className="footer">
      <div className="modal-content">
        {showForm && <AddNoteForm timeSec={props.currentTimeSec} timeFormted={props.currentTimeFormated}
         addNote={props.addNoteToSummary} setShowFromState={setShowForm} />}
         {/* TODO style buttton to icon in the botoom? and hiide affter clicked */}
        <button onClick={() => clickedOnAddNote(props)} className="modal-button">
            Add Note
        </button>

      </div>
    </footer>
  );
};

export default FooterAddButton;
