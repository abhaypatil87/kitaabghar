import bookTitleStyles from "./BookTile.module.css";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import React, { useState } from "react";
import { onFocusOut, onInputChange } from "../../utils/formUtil";
import TextField from "@material-ui/core/TextField";
import { Button, Fade, Grid, makeStyles, Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "10px",
    maxWidth: "100%",
  },
  image: {
    width: 128,
    height: 128,
  },
  hover: {
    cursor: "pointer",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  bookTitle: {
    "&:hover": {
      color: "#2158d0",
    },
  },
  iconButton: {
    "&:hover": {
      color: "#2158d0",
    },
  },
}));

const ExpandedBookTile = (props) => {
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);
  const editBook = () => {
    setEditMode(true);
  };
  const confirmDeleteBook = () => {};
  const deleteBook = () => {};

  const cancelEdit = () => {
    setEditMode(false);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <img src={props.thumbnailUrl} alt="" />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs>
              {!editMode && (
                <Typography
                  className={`${classes.bookTitle} ${classes.hover}`}
                  gutterBottom
                  variant="h5"
                  onClick={props.onClick}
                >
                  {props.title}
                </Typography>
              )}
              <Fade in={editMode} timeout={300} unmountOnExit>
                <TextField
                  autoFocus={true}
                  margin="dense"
                  label="Title"
                  variant="outlined"
                  type="text"
                  name="title"
                  id="title"
                  value={props.title}
                  onChange={(event) => {}}
                  onBlur={(event) => {}}
                />
              </Fade>
              <Typography variant="h6" gutterBottom>
                {props.subtitle}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {props.author}
              </Typography>

              <Typography variant="body2" color="textSecondary">
                {props.pageCount} Pages
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>ISBN 13:</strong> {props.isbn13}{" "}
                <strong>ISBN 10:</strong> {props.isbn10}
              </Typography>

              <Box component="div" marginTop={2}>
                {!editMode && (
                  <Typography
                    variant="body1"
                    className={bookTitleStyles.bookDescription}
                  >
                    {props.description}
                  </Typography>
                )}
                <Fade in={editMode} timeout={300} unmountOnExit>
                  <TextField
                    style={{ width: "80%" }}
                    autoFocus={true}
                    margin="dense"
                    label="Description"
                    variant="outlined"
                    type="text"
                    multiline={true}
                    name="description"
                    id="description"
                    value={props.description}
                    onChange={(event) => {}}
                    onBlur={(event) => {}}
                  />
                </Fade>
              </Box>
              <Grid item hidden={!editMode}>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  disabled={false}
                  aria-disabled={false}
                  type="button"
                  value="Edit"
                  size="small"
                >
                  Edit
                </Button>
                <Button
                  style={{ marginLeft: "6px" }}
                  size="small"
                  variant="outlined"
                  onClick={cancelEdit}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                <EditRoundedIcon
                  onClick={editBook}
                  className={`${classes.iconButton} ${classes.hover}`}
                />
              </Typography>
              <Typography variant="subtitle1">
                <DeleteOutlineRoundedIcon
                  className={`${classes.iconButton} ${classes.hover}`}
                  onClick={confirmDeleteBook}
                />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ExpandedBookTile;
