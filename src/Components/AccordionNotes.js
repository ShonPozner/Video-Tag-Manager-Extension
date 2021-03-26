import React, {useState} from 'react'
import Chevron from "./Chevron";

import "./AccordionNotes.css";

const AccordionNotes = (props) => {
  const [setActive, setActiveState] = useState("");

  // Checking if was active (clicked on button) and flip the state
  function toggleAccordion(){
    setActiveState(setActive === "" ? "active" : "");
  }

  return (
    <div className="accordion_section">
    <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
      <p className="accordion_title">{props.title}</p>
      <Chevron className={"accordion_icon"} width={10} fill={"#777"} />
    </button>
    <div className="accordion_content">
      <div
        className="accordion_text"
        dangerouslySetInnerHTML={{ __html: props.content }}
      />
    </div>
  </div>
  )
}

export default AccordionNotes
