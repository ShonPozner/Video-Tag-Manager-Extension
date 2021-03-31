import React, {useState} from "react";
import AddNoteForm from './AddNoteForm';

const FooterAddButton = (props) => {
  const [showAddNoteForm, setShowAddNoteForm] = useState(false);

  // get the currant time and show the form (fip the state)
  const clickedOnAddNote = () => {
    props.getVideoCurrentTime();

    setTimeout(() => {
      setShowAddNoteForm(!showAddNoteForm);
    }, 200);
  }
  
  // TODO add Draggable...
  return (
    <footer className="footer">
      <div className="modal-content">
         {/* TODO style buttton to icon in the botoom? and hiide affter clicked */}
        <input type="button" onClick={() => clickedOnAddNote(props)} className={`modal-button ${!showAddNoteForm ? '' : "btn-close"}`}
        value ={!showAddNoteForm ? 'Add Note': 'Close'}/>
                {showAddNoteForm && <AddNoteForm timeSec={props.currentTimeSec} timeFormted={props.currentTimeFormated}
         addNote={props.addNoteToSummary} setShowFromState={setShowAddNoteForm} />}


      </div>
    </footer>
  );
};

export default FooterAddButton;
