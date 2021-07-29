import React, { useState, useEffect } from "react"
import { BsInfoCircle } from 'react-icons/bs'
import { CgAdd } from 'react-icons/cg'
import SummarysContext from "../Contexts/SummarysContext";
import { FormatedTime } from "../Hooks/constants";


function TitleAndDetails(props) {
	const [title, setTitle] = useState('');
	const [tags, setTags] = useState({});



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
			editTime: Date()
		}), 2000);
		return () => clearTimeout(timeoutId);
	}, [title]);


	return (
		<SummarysContext.Consumer>
			{context => (
				<div className="modal-header">
					{context.summary.length > 0 ?
						context.summary.map((summary) => (
							<>
								<input id="summary-title" type='text' name="title" defaultValue={summary.title}
									placeholder="Add Title" autocomplete="off" onChange={handleOnChange}></input>
								
								<ul className="list-tags">
									{summary.tags.map(tag => (
										<li className="item-tag">
											<input id="summary-tag" type='text' name="title" defaultValue={tag}
											placeholder="Add Tag" autocomplete="off" onChange={handleOnChange}></input>
										</li>
									))}
									<li className="li-icon-add">
										<CgAdd className='add-icon' onClick={handleAdd}></CgAdd>
									</li>
									<li className="li-icon-info">
										{/* TODO ADD PARAMTERS? */}
										<span>Author: {summary.authorName}<br></br>
											Created: {FormatedTime(summary.createTime)} <br></br>
											Modified: {FormatedTime(summary.editTime)} <br></br>
										</span>

										<BsInfoCircle className='info-icon'></BsInfoCircle>
									</li>
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
