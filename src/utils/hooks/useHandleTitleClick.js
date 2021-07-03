const { useState } = require("react");

const useHandleTitleClick = () => {
  const [listStyleMode, setListStyleMode] = useState(false);

  const titleClickHandler = (event) => {
    if (
      event.type === "click" ||
      (event.type === "keydown" && event.which === 13)
    ) {
      setListStyleMode((oldValue) => !oldValue);
    }
  };
  return [listStyleMode, titleClickHandler];
};

export default useHandleTitleClick;
