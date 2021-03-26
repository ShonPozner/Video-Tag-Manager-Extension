import React, { useEffect, useState } from 'react';
import UseWindowPosition from '../Hooks/UseWindowPosition';

export const ModalContext = React.createContext({});

const ModalProvider = ({ children }) => {
  const { windowPosition } = UseWindowPosition();
  const [videoCurrentTime, setVideoCurrentTime] = useState(undefined);

  function getVideoCurrentTime() {
    window.postMessage({ type: "GET_CURRENT_TIME" }, "*");
  }

  useEffect(() => {
    // Set up event listeners from Content script
    window.addEventListener("message", function(event) {
      if (event.source !== window) return;
      if (event.data.type && (event.data.type === "CURRENT_TIME_RESULT")) {
        setVideoCurrentTime(event.data.videoCurrentTime);
      }
    });
  }, []);

  return (
    <ModalContext.Provider
      value={{
        videoCurrentTime,
        getVideoCurrentTime,
        windowPosition,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
