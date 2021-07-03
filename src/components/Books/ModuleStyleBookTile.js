import { Box } from "@material-ui/core";

import { ListStyleBookTile } from "./index";
import bookTitleStyles from "./BookTile.module.css";
import useHandleTitleClick from "../../utils/hooks/useHandleTitleClick";

const ModuleStyleBookTile = (props) => {
  const [listStyleMode, titleClickHandler] = useHandleTitleClick();

  return listStyleMode ? (
    <ListStyleBookTile {...props} />
  ) : (
    <Box
      component="div"
      marginTop={2}
      className={bookTitleStyles.cover}
      onClick={titleClickHandler}
      onKeyDown={titleClickHandler}
      tabIndex={0}
      aria-label={`${props.title} by ${props.author}`}
    >
      <img
        src={props.thumbnail_url}
        alt={props.title}
        className={bookTitleStyles.coverImage}
      />
      <div className={bookTitleStyles.coverTitle}>{props.title}</div>
    </Box>
  );
};

export default ModuleStyleBookTile;
