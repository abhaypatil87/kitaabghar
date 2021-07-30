const { useState } = require("react");

const useHandleTitleClick = () => {
  const [listStyleMode, setListStyleMode] = useState(false);

  const titleClickHandler = (event: MouseEvent | KeyboardEvent) => {
    if (
      event.type === "click" ||
      (event.type === "keydown" && event.which === 13)
    ) {
      setListStyleMode((oldValue: boolean) => !oldValue);
    }
  };
  return [listStyleMode, titleClickHandler];
};

export default useHandleTitleClick;
