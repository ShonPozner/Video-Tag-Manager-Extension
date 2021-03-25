import React, { useEffect, useState } from 'react';
import useWindowPosition from '../Hooks/useWindowPosition';

export const ModalContext = React.createContext({});

const ModalProvider = ({ children }) => {
  const { windowPosition } = useWindowPosition();
  const [extensionId, setExtensionId] = useState(undefined);

  function getExtensionId() {
    window.postMessage({ type: "GET_CURRENT_TIME" }, "*");
  }

  useEffect(() => {
    // Set up event listeners from Content script
    window.addEventListener("message", function(event) {
      if (event.source !== window) return;
      if (event.data.type && (event.data.type === "CURRENT_TIME_RESULT")) {
        setExtensionId(event.data.videoCurrentTime);
      }
    });
  }, []);

  return (
    <ModalContext.Provider
      value={{
        extensionId,
        getExtensionId,
        windowPosition,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
