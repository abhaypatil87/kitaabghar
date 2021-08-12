import React, { useState } from "react";
import { Link } from "@material-ui/core";
import { MAXIMUM_VISIBLE_DESCRIPTION_LENGTH } from "../../utils/crud";

const BookDescription: React.FC<{ description: string }> = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [text, setText] = useState("...view more");

  const toggleText = () => {
    setExpanded((oldValue) => !oldValue);
    setText(expanded ? "...view more" : "...view less");
  };

  return (
    <>
      {props.description.length > MAXIMUM_VISIBLE_DESCRIPTION_LENGTH ? (
        <p>
          {props.description.substr(0, MAXIMUM_VISIBLE_DESCRIPTION_LENGTH)}
          {expanded &&
            props.description.substr(MAXIMUM_VISIBLE_DESCRIPTION_LENGTH)}
          <Link
            component={"button"}
            variant={"body1"}
            underline={"none"}
            sx={{ fontWeight: "bold" }}
            onClick={toggleText}
            aria-label={text}
          >
            {text}
          </Link>
        </p>
      ) : (
        <p>{props.description}</p>
      )}
    </>
  );
};

export default BookDescription;
