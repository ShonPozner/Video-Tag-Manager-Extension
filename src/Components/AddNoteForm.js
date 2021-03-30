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
            id: 10,
            title: title,
            content: content,
            time: timeFormated,
            tag: tag,
            timeSec: props.timeSec,
        }
        props.addNote(newNote)
    }

    return(   
        <form className='add-form' onSubmit={onSubmit}>
            <div className="form-control">
                <label>Title</label>
                <input type='text' placeholder="Add Title" value={title}
                onChange= {(e)=> setTitle(e.target.value)}
                ></input>
            </div>
            <div className="form-control">
                <label>Tag</label>
                <input type='text' placeholder="Add Tag" value={tag}
                onChange= {(e)=> setTag(e.target.value)}></input>
            </div>
            <div className="form-control">
                <label>Content</label>
                <input type='text' placeholder="Add Content"  value={content}
                onChange= {(e)=> setContent(e.target.value)}></input>
            </div>
            <div className="form-control">
                <label>Time</label>
                <input id="time-input" type='text' value={props.timeFormted}
                onChange= {(e)=> setFormatedTime(e.target.value)}></input> 
            </div>
            <input type='submit' value='Save Note'/>
        </form>
     )
    
}

export default AddNoteForm; 