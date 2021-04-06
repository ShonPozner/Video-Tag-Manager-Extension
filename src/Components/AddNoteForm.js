import React, {useState} from "react"
// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { EditorState, convertToRaw } from 'draft-js';
import "./addNoteForm.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddNoteForm = (props) => {
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState('');
    // const [formatedTime, setFormatedTime] = useState(props.timeFormted);
    const [formatedTime, setFormatedTime] = useState("00:00:00");
    // const [timeSec, setTimeSec] = useState('');
    const [content, setContent] = useState('');


    const onSubmit = (e) => {

        e.preventDefault();
        
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
            timeSec: getSecTime(),
        }

        console.log("try" ,newNote)
        props.addNote(newNote)
        props.setShowFromState(false)
    }

    const getSecTime = () => {
        let tempSecTime = formatedTime.split(':'); 
        // minutes are worth 60 seconds. Hours are worth 60 minutes.
        let timeSecFormat = (+tempSecTime[0]) * 60 * 60 + (+tempSecTime[1]) * 60 + (+tempSecTime[2]); 
        return(timeSecFormat)
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
                    <option>Repeat</option>
                    </datalist>
            </li>
            <li>
                {/* <textarea name="content" className="field-style" placeholder="Add Content" value={content}
                    onChange= {(e)=> setContent(e.target.value)}></textarea> */}
                <div className="Editor">
                    <CKEditor
                        editor={ ClassicEditor}
                        data={content}

                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
                            setContent(data)
                        } }
                    />
                </div>
            </li>
            <li>
                <input type='submit' value='Save Note'/>
            </li>
            </ul>
        </form>
     )
    
}

export default AddNoteForm; 