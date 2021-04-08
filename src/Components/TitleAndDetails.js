import React from 'react'
import{BsInfoCircle} from 'react-icons/bs'
import SummarysContext from "../Contexts/SummarysContext";


// TODO add props or state of tag and title name
// TODO add icon of info.. that show date, author and so on?
// TODO  EDIT button show all detalis??  
function TitleAndDetails() {
    return (
        <SummarysContext.Consumer>
            {context=> (
                <div className="modal-header">
                {context.summary.length > 0 ? 
                    context.summary.map((summary)=> (
                        <>
                            <h2>{summary.title}</h2>
                            <ul className="list-tags">
                                {summary.tags.map(tag=> (
                                    <li className="item-tag">{tag}</li>
                                ))}
                                <li><BsInfoCircle className='info-icon'></BsInfoCircle></li>
                            </ul>
                        </>
                    ))
                 : 
                <>
                    <h2>Loading...</h2>
                    <ul className="list-tags">
                        <li className="item-tag">tag 1</li>
                        <li><BsInfoCircle className='info-icon'></BsInfoCircle></li>
                    </ul>
                </>
                }
                </div>
            )}
        </SummarysContext.Consumer>
    );
}

export default TitleAndDetails
