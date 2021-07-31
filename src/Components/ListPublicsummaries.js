import React from 'react';
import "./ListPublicsummaries.css";
import { FaHeart } from 'react-icons/fa'



function ListPublicsummaries({setPublicSummaryState, publicSummaryState}) {
    return (
        <div className="accordion-notes1">
            <h2 className="title1">Select summary</h2>
            <div className="accordion_section1">
            {publicSummaryState.map((summary) =>
                <button className="accordion1" onClick={() =>setPublicSummaryState([summary])}>
                    <p className="accordion_tag1"> {summary.authorName}</p>
                    <p className="accordion_title1">{summary.title}</p>
                    <div className="user-actions-icon1">
                        <FaHeart className="hart-icon"></FaHeart>
                        {summary.likes.size? summary.likes.size : 0}

                    </div>
                    
                </button>
            )}

            </div>
            
        </div>
    )
}

export default ListPublicsummaries
