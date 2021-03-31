import React, {useState} from "react"

import "./addNoteForm.css";

const AddNoteForm = (props) => {
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState('');
    const [formatedTime, setFormatedTime] = useState(props.timeFormted);
    const [timeSec, setTimeSec] = useState('');
    const [content, setContent] = useState('');

    const onTodoChange = (value) => {
        console.log("formatedTime", formatedTime);
        console.log("change to : ",value);
        setFormatedTime(value)
        console.log("formatedTime affter set", formatedTime);
        document.getElementById("time-input").value = value;

    }

    const onSubmit = (e) => {
        e.preventDefault()

        let timeFormated = document.getElementById("time-input").value;
        console.log("now value is ", timeFormated);
        console.log("now state is ", formatedTime);


        //TODO need update time sec too...
    


        if (!content) {
            alert('please add Content')
            return
        }
        // can add more cheacking format time or get default tag and so on...

        const newNote = {
            id: 1,
            title: title,
            content: content,
            time: timeFormated,
            tag: tag,
            timeSec: props.timeSec,
        }
        props.addNote(newNote)
        props.setShowFromState(false)
    }

    return(   
        <form className="form-style-9" onSubmit={onSubmit}>
            <ul>
            <li>
                <input class="field-style field-full" type='text' name="title" placeholder="Add Title" value={title}
                onChange= {(e)=> setTitle(e.target.value)}></input>
            </li>
            <li>
                <input class="field-style field-split align-left" value={formatedTime} step="2" id="time-input" type='time'
                onChange= {(e)=> onTodoChange(e.target.value)}></input>
                <input class="field-style field-split align-right" type='text'  name="tag" placeholder="Add Tag" value={tag}
                onChange= {(e)=> setTag(e.target.value)} list="tags"></input> 
                    <datalist id="tags">
                        {/* TODO add tags... */}
                    <option>Summary</option>
                    <option>Important</option>
                    <option>Def</option>
                    <option>Back</option>
                    </datalist>
                {/* TODO add + and - time and buttom this time */}
            </li>
            <li>
                <textarea name="content" class="field-style" placeholder="Add Content" value={content}
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