import React from 'react';
import "./ListPublicsummaries.css";
import { FaHeart } from 'react-icons/fa'



function ListPublicsummaries({setSummaryState, setReady, publicSummaryState, }) {

    const setSummary = (summary) => {
        setSummaryState([summary]);
        setReady(1);
    } 
    return (
        <div className="accordion-notes1">
            <h2 className="title1">Select summary</h2>
            <div className="accordion_section1">
            {publicSummaryState.map((summary) =>
                <button className="accordion1" onClick={() => setSummary(summary)}>
                    <p className="accordion_tag1"> {summary.authorName}</p>
                    <p className="accordion_title1">{summary.title}</p>
                    <div className="user-actions-icon1">
                        <FaHeart className="hart-icon"></FaHeart>
                        {summary.likes.length}

                    </div>
                    
                </button>
            )}

            </div>
            
        </div>
    )
}

export default ListPublicsummaries
