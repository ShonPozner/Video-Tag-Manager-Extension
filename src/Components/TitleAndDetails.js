import React, { useState, useEffect } from "react"
import { BsInfoCircle } from 'react-icons/bs'
import SummarysContext from "../Contexts/SummarysContext";
import { FormatedTime } from "../Hooks/constants";


function TitleAndDetails(props) {
	const [title, setTitle] = useState('');


	const handleOnChange = (event) => {
		setTitle(event.target.value);
	};

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
								{/* <h2>{summary.title }</h2> */}
								<ul className="list-tags">
									{summary.tags.map(tag => (
										<li className="item-tag">{tag}</li>
									))}
									<li className="li-icon-info">
										{/* TODO ADD PARAMTERS? */}
										<span>Autor: {summary.autorName}<br></br>
											Created date: {FormatedTime(summary.createdTime)} <br></br>
											Last Edit : {FormatedTime(summary.editTime)} <br></br>
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
