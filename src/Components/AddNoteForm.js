import React, {useState} from "react"


const AddNoteForm = (props) => {
    


    const [title, setTitle] = useState('');
    const [tag, setTag] = useState('');
    const [formatedTime, setFormatedTime] = useState('');
    const [timeSec, setTimeSec] = useState('');
    const [content, setContent] = useState('');


    const onSubmit = (e) => {
        e.preventDefault()

        let timeFormated = document.getElementById("time-input").value;

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
    }

    return(   
        <form className='add-form "form-style-9"' onSubmit={onSubmit}>
            <ul>
            <li>
                <input class="field-style field-split align-left" type='text' name="title" placeholder="Add Title" value={title}
                onChange= {(e)=> setTitle(e.target.value)}></input>
                <input class="field-style field-split align-left" type='text'  name="title" placeholder="Add Tag" value={tag}
                onChange= {(e)=> setTag(e.target.value)}></input>
            </li>
            <li>
                <input class="field-style field-split align-left" id="time-input" type='text' value={props.timeFormted}
                onChange= {(e)=> setFormatedTime(e.target.value)}></input> 
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