import React from 'react';
import "./ListPublicsummaries.css";
import { FaHeart } from 'react-icons/fa'



function EmptyDiscover({createNewSummary}) {

    const newSummary = () =>{
        console.log(`dassa`);
        createNewSummary();
    }

    return (
        <div className="accordion-notes1">
            <h2 className="title1">No public summaries found</h2>
            <div className="accordion_section1">
                <button className="accordion1" onClick={() => newSummary()}>
                    <p className="accordion_title1">Create new summary!</p>
                </button>

            </div>
            
        </div>
    )
}

export default EmptyDiscover
