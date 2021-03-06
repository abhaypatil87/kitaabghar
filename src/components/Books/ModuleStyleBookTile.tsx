import { Box } from "@material-ui/core";

import { ListStyleBookTile } from "./index";
import bookTitleStyles from "./BookTile.module.css";
import useHandleTitleClick from "../../utils/hooks/useHandleTitleClick";
import { BookTileProps } from "../../declarations";

const ModuleStyleBookTile = (props: BookTileProps) => {
  const [listStyleMode, titleClickHandler] = useHandleTitleClick();

  return listStyleMode ? (
    <ListStyleBookTile {...props} />
  ) : (
    <Box
      component={"article"}
      role={"article"}
      tabIndex={0}
      className={bookTitleStyles.cover}
      onClick={titleClickHandler}
      onKeyDown={titleClickHandler}
      aria-label={`${props.title} by ${props.author}`}
      sx={{ mt: 2 }}
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
