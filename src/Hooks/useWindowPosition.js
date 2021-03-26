
const useWindowPosition = () => {
  console.log("width-> ",window.screen.width);
  console.log("high-> ",window.screen.height);
  console.log("w-> ",window.screenX);

  return {
    windowPosition:  { x: 0, y: 0 },
  }

};

export default useWindowPosition;
