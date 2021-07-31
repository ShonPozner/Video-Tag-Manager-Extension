import React, { useState, useEffect, useRef } from "react"
import { BsInfoCircle } from 'react-icons/bs'
import { CgAdd } from 'react-icons/cg'
import { TiMinus } from 'react-icons/ti'
import SummarysContext from "../Contexts/SummarysContext";
import { FormatedTime } from "../Hooks/constants";
import {SubmitButton} from './SubmitButton';


function TitleAndDetails(props) {
	const [title, setTitle] = useState('');
	const [tags, setTags] = useState([]);
	const [showAddTagInput, setShowAddTagInput] = useState('hidden');

	const addTagInputRef = useRef();


	useEffect(() => {
		if (props.summary[0] && props.summary[0].tags !=  tags) {
			setTags(props.summary[0].tags);
		}

	});

	const addTag = () => {
		// console.log(`addTag`, addTagInputRef.current.value); //DELETEME

		const newTag = addTagInputRef.current.value;
		if (!tags.includes(newTag) && newTag !== '') {
			const newTags = [...tags, newTag];
			const copySummary = { ...props.summary };
			copySummary.tags = newTags;
			props.updateSummary({
				title: title,
				editTime: Date(),
				tags : newTags
			});
			setTags(newTags);
		}
		setShowAddTagInput('hidden');
	};


	const deleteTag = (sid, myTag) => {
		const newTags = tags.filter(tag => tag !== myTag);
		const copySummary = { ...props.summary[0] };
		copySummary.tags = newTags;
		// console.log("affter update copySummary", copySummary); //DELETEME
		props.updateSummary(copySummary);
		setTags(newTags);
	};



	const toggleShowAddTagInput = () => {
		setShowAddTagInput(showAddTagInput === 'hidden' ? 'visible' : 'hidden');
	}



	const handleOnChange = (event) => {
		setTitle(event.target.value);
	};
	const handleOnChangeTag = (event) => {
		setTitle(event.target.value);
	};

	const handleAdd = () => {
		const newTag = "New Tag";

	}

	useEffect(() => {
		if (title === '') return
		const timeoutId = setTimeout(() => props.updateSummary({
			title: title,
			editTime: Date(),
			tags: tags
		}), 2000);
		return () => clearTimeout(timeoutId);
	}, [title]);


	return (
		<SummarysContext.Consumer>
			{context => (
				<div className="modal-header">
					{context.summary.length > 0 ?
						context.summary.map((summary, index) => (
							<>
								<input id="summary-title" type='text' name="title" defaultValue={summary.title}
									placeholder="Add Title" autocomplete="off" onChange={handleOnChange}></input>
								
								<ul className="my-list-tags">
									{summary.tags.map( (tag, index) => (
										<li className="li-item-tag" key={index}>
											<button key={index} className="tag-button">{tag}
												<p key={index} className="p-tag" onClick={() =>{ deleteTag(summary.sid, tag)}}>X</p>
											</button>
										</li>
									))}
									<li className="li-add-tag">
									{
										showAddTagInput === 'visible' ? 
										<TiMinus className='add-icon' onClick={toggleShowAddTagInput}></TiMinus>:
										<CgAdd className='add-icon' onClick={toggleShowAddTagInput}></CgAdd>
									}
									</li>
								</ul>
								<ul className="list-tags">
									<li className="li-icon-info">
										<BsInfoCircle id="info-icon-svg" className='info-icon'></BsInfoCircle>
										{/* TODO ADD PARAMTERS? */}
										<span id="span-info">Author: {summary.authorName}<br></br>
											Created: {FormatedTime(summary.createTime)} <br></br>
											Modified: {FormatedTime(summary.editTime)} <br></br>
										</span>
										<SubmitButton visibility={showAddTagInput} ref={addTagInputRef}
									placeHolder='Enter new tag' submitValue='Add' submitFun={() => addTag()}></SubmitButton>	
									</li>

										
								</ul>
									
							</>
						))
						:
						<>
							<h2>Loading...</h2>
							<ul className="my-list-tags">
								<li className="li-item-tag">
									<button className="tag-button">tag1
										<p className="p-tag" >X</p>
									</button>
								</li>
								<li className="li-add-tag">
									<CgAdd className='add-icon' ></CgAdd>
								</li>
							</ul>
							<ul className="list-tags">
									<li className="li-icon-info">
									<BsInfoCircle className='info-icon'></BsInfoCircle>

									</li>
							</ul>
						</>
					}
				</div>
			)}
		</SummarysContext.Consumer>
	);
}

export default TitleAndDetails
