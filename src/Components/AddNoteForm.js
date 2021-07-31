import React, {useState} from "react"
import "./addNoteForm.css";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import EditorComponent from "./StyleEditor";
import {PageUrl} from '../Hooks/constants';

const YoutubeDisableHotkeys = () => {
    // console.log(`Focuse new disable_hotkeys`);
    var hotkey_manager = document.getElementsByTagName('yt-Hotkey-Manager')[0];
    if (hotkey_manager) {
        hotkey_manager.parentNode.removeChild(hotkey_manager);
    }
}
const AddNoteForm = (props) => {
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState('');
    //TODO FIX TO PROPS ONLY
    const [formatedTime, setFormatedTime] = useState(PageUrl.includes("http://localhost") ? "00:00:00":  props.timeFormted);
    // const [formatedTime, setFormatedTime] = useState("00:00:00");
    const [content, setContent] = useState('<p>Add note content 😀</p>');


    const onSubmit = (e) => {

        e.preventDefault();
        
        // if (!content) {
        //     alert('please add Content')
        //     return
        // }
        // can add more cheacking format time or get default tag and so on...

        const newNote = { 
            title: title,
            content: content,
            time: formatedTime,
            tag: tag,
            timeSec: getSecTime(),
        }

        props.addNote(newNote);
        props.setShowEditNoteNumber(null);
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
                <div className="Editor" onClick= {() => YoutubeDisableHotkeys()}>
                    <EditorComponent content={content} setContent = {setContent} ></EditorComponent>

                </div>
            <li>
                <input type='submit' value='Save Note'/>
            </li>
            </ul>
        </form>
     )
    
}

export default AddNoteForm; 