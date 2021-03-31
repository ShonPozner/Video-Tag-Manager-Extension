import React, {useState} from "react"

import "./addNoteForm.css";

const AddNoteForm = (props) => {
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState('');
    const [formatedTime, setFormatedTime] = useState(props.timeFormted);
    // const [formatedTime, setFormatedTime] = useState("00:00:00");
    const [timeSec, setTimeSec] = useState('');
    const [content, setContent] = useState('');


    const onSubmit = (e) => {

        e.preventDefault();
        let tempSecTime = formatedTime.split(':'); 
        // minutes are worth 60 seconds. Hours are worth 60 minutes.
        let timeSecFormat = (+tempSecTime[0]) * 60 * 60 + (+tempSecTime[1]) * 60 + (+tempSecTime[2]); 
        setTimeSec(timeSecFormat);
        
        if (!content) {
            alert('please add Content')
            return
        }
        // can add more cheacking format time or get default tag and so on...

        const newNote = { 
            title: title,
            content: content,
            time: formatedTime,
            tag: tag,
            timeSec: timeSec,
        }
        props.addNote(newNote)
        props.setShowFromState(false)
    }

    return(   
        <form className="form-style-9" onSubmit={onSubmit}>
            <ul>
            <li>
                <input className="field-style field-full" type='text' name="title" placeholder="Add Title" value={title}
                onChange= {(e)=> setTitle(e.target.value)}></input>
            </li>
            <li>
                <input className="field-style field-split align-left" defaultValue="00:00:00" value={formatedTime} step="2" id="time-input" type='time'
                onChange= {(e)=> setFormatedTime(e.target.value)}></input>
                <input className="field-style field-split align-right" type='text'  name="tag" placeholder="Add Tag" value={tag}
                onChange= {(e)=> setTag(e.target.value)} list="tags"></input> 
                    <datalist id="tags">
                        {/* TODO add tags... */}
                    <option>Summary</option>
                    <option>Important</option>
                    <option>Def</option>
                    <option>Back</option>
                    </datalist>
            </li>
            <li>
                <textarea name="content" className="field-style" placeholder="Add Content" value={content}
                onChange= {(e)=> setContent(e.target.value)}></textarea>
            </li>
            <li>
                <input type='submit' value='Save Note'/>
            </li>
            </ul>
        </form>
     )
    
}

export default AddNoteForm; 