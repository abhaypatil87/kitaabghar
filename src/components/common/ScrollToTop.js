import React, { useState, useEffect } from "react";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import IconButton from "@material-ui/core/IconButton";
import { experimentalStyled as styled } from "@material-ui/core/styles";

const ScrollToTopIconButton = styled(IconButton)(({ theme }) => ({
  zIndex: 2,
  position: "fixed",
  bottom: "2vh",
  backgroundColor: "#998c8c",
  color: "black",
  "&:hover, &.Mui-focusVisible": {
    transition: "0.3s",
    color: "#397BA6",
    backgroundColor: "#998c8c",
  },
  cursor: "pointer",
  [theme.breakpoints.up("xs")]: {
    right: "3%",
    backgroundColor: "rgba(180,168,168,0.7)",
  },
  [theme.breakpoints.up("lg")]: {
    right: "4%",
  },
}));

const ScrollToTop = ({ showBelow }) => {
  const [show, setShow] = useState(!showBelow);

  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  };

  const handleClick = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` });
  };

  useEffect(() => {
    if (showBelow) {
      window.addEventListener(`scroll`, handleScroll);
      return () => window.removeEventListener(`scroll`, handleScroll);
    }
  });

  return (
    <>
      {show && (
        <ScrollToTopIconButton
          onClick={handleClick}
          aria-label="Back To Top"
          component="span"
        >
          <ExpandLessIcon />
        </ScrollToTopIconButton>
      )}
    </>
  );
};
export default ScrollToTop;
