import React, { useEffect, useState } from 'react';
import UseWindowPosition from '../Hooks/useWindowPosition';

export const ModalContext = React.createContext({});

const ModalProvider = ({ children }) => {
	const { windowPosition } = UseWindowPosition();
	const [currentTimeFormated, setCurrentTimeFormated] = useState(undefined);
	const [currentTimeSec, setCurrentTimeSec] = useState(undefined);

	function getVideoCurrentTime() {
		window.postMessage({ type: "GET_CURRENT_TIME" }, "*");
	}

	useEffect(() => {
		// Set up event listeners from Content script
		window.addEventListener("message", function (event) {
			console.log(event.data)
			console.log(event)
			if (event.source !== window) return;
			if (event.data.type && (event.data.type === "CURRENT_TIME_RESULT")) {
				setCurrentTimeFormated(event.data.currentTimeFormated);
				setCurrentTimeSec(event.data.currentTimeSec);
			}
			else {
				console.log(event.data);
			}
		});
	}, []);

	return (
		<ModalContext.Provider
			value={{
				currentTimeSec,
				currentTimeFormated,
				getVideoCurrentTime,
				windowPosition,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
};

export default ModalProvider;
