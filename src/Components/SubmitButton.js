import React from 'react';

const InputAddTag = {
    display: "block",
    position:"absolute",
    fontWeight: "700",
    right: "80px",
    bottom: "1px",

}

// const InputContainer = {}
//     visibility: ${({ visibility }) => visibility ? visibility : 'visible'};
// ;
const SubmitInput = {
    display: "block",
    position:"absolute",
    background: "#578457",
    color: "white",
    border: "0",
    // -webkitAppearance: none,
    cursor :"pointer",    
}


export const SubmitButton = React.forwardRef(({ visibility,
	submitFun, submitValue, placeHolder }, ref) => {
	return (
		<div style={{ visibility: visibility}} >
			<input style={InputAddTag} ref={ref} type="text" placeholder={placeHolder}></input>
			<input id="submit-input" value={submitValue} type="submit" onClick={submitFun}></input>
		</div>
	)
})


