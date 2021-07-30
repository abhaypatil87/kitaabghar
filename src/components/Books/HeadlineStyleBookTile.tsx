import { Box, Grid, Typography } from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";

import bookTitleStyles from "./BookTile.module.css";
import { ListStyleBookTile } from "./index";
import useHandleTitleClick from "../../utils/hooks/useHandleTitleClick";
import { BookTileProps } from "../../declarations";

const HeadlineBox = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  marginTop: `${theme.spacing(2)}`,
}));

const HeadlineStyleBookTile = (props: BookTileProps) => {
  const [listStyleMode, titleClickHandler] = useHandleTitleClick();

  return listStyleMode ? (
    <ListStyleBookTile {...props} />
  ) : (
    <HeadlineBox
      onClick={titleClickHandler}
      onKeyDown={titleClickHandler}
      aria-label={`${props.title} by ${props.author}`}
    >
      <Grid item xs={12} sm container>
        <Grid item xs>
          <Typography variant="body1">{props.title}</Typography>
          <Typography
            variant="subtitle2"
            className={bookTitleStyles.secondaryDetail}
          >
            {props.author}
          </Typography>
        </Grid>
      </Grid>
    </HeadlineBox>
  );
};

export default HeadlineStyleBookTile;
