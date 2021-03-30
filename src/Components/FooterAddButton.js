import React, {useState} from "react";
import AddNoteForm from './AddNoteForm';

const FooterAddButton = (props) => {
  const [showForm, setShowForm] = useState(false);


  const begin = () => {
    console.log(props)
    props.getVideoCurrentTime();
    setShowForm(!showForm);
  }


  
  return (
    <footer className="">
      <div className="modal-content">
        <button onClick={() => begin(props)} className="modal-button">
            Add Note
        </button>
        {showForm && <AddNoteForm timeSec={props.currentTimeSec} timeFormted={props.currentTimeFormated} addNote={props.addNoteToSummary}/>}
        
      </div>
    </footer>
  );
};

export default FooterAddButton;
