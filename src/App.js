import React, {useEffect, useState} from 'react';
import './App.css';
import Modal from './Components/Modal';
import Modal2 from './Components/Modal2';
import ModalProvider from './Contexts/ModalProvider';

/**
 * @return {null}
 */
function App() {
	const [runMode, setRunMode] = useState(-1);

	useEffect(() => {

		const discover = document.getElementById('GetSummayFromDiscover');
		if (discover) {
			setRunMode(0);
			console.log(`set disc.. mode`);

		}else {
			console.log(`set mysummary mode`);
			setRunMode(1);
		}
		

	}, [])


	return (
		<ModalProvider> 
			{ runMode  === 1 ? <Modal /> :
			runMode === 0 ? <Modal2></Modal2>:
			<></>
			}
		</ModalProvider>
	);
}

export default App;
