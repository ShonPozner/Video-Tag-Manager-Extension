//https://medium.com/skillthrive/build-a-react-accordion-component-from-scratch-using-react-hooks-a71d3d91324b

import PropTypes from 'prop-types';
import React, { useState, useRef } from "react";
import Chevron from "./Chevron";
import {ButtonNote} from  "./ButtonNote"
import {FaRegEdit, FaTrash} from 'react-icons/fa'

import "./AccordionNotes.css";

// Hooks...
const AccordionNotes = (props) => {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion_icon");

  const content = useRef(null);

  // Checks if the button is pressed (should or should not display the note)
  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    // Adjusts the size of the note display according to whether it is closed or resolved (clicked or not)
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    // Change the direction of the arrow as needed, open or closed
    setRotateState(
      setActive === "active" ? "accordion_icon" : "accordion_icon rotate"
    );

  }

  return (
    <div className="accordion_section">
      <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
        <p className="accordion_tag">{props.tag}</p>
        <p className="accordion_title">{props.title}</p>
        <div className="user-actions-icon">
          <FaRegEdit className="actions-icon"></FaRegEdit>
          <FaTrash className="actions-icon" ></FaTrash>
          <Chevron className={`${setRotate}`} width={10} fill={"#777"} />
        </div>
        
      </button>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className="accordion_content"
      >
        <div className="accordion_content">
          <h3 className="accordion_time">{props.time}</h3>
          <div
            className="accordion_text"
            dangerouslySetInnerHTML={{ __html: props.content }}
          />
        </div>
      </div>
    </div>
  );
};

// To make sure the type of prop is appropriate (if not warning in console)
AccordionNotes.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string
}


export default AccordionNotes;
