import React from 'react'

// TODO add props or state of tag and title name
// TODO add icom of info.. that show date, author and so on?
// TODO ADD EDIT BOTOON??  
function TitleAndDetails() {
    return (
        <div className="modal-header"> 
            <h2>Title Of The Summary</h2>
            <ul className="list-tags">
                <li className="item-tag">tag 1</li>
                <li className="item-tag">tag 2</li>
                <li className="item-tag">tag 3</li>
            </ul>
        </div>
    );
}

export default TitleAndDetails
