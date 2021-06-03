import bookTitleStyles from "./BookTile.module.css";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import React, { useState } from "react";
import { onFocusOut, onInputChange } from "../../utils/formUtil";
import TextField from "@material-ui/core/TextField";
import { Button, Fade, Grid, Link } from "@material-ui/core";

const ExpandedBookTile = (props) => {
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
    <div className={bookTitleStyles.detail}>
      <div className={bookTitleStyles.bookExpandedControls}>
        <div className="controls_wrapper">
          <div className={bookTitleStyles.actionItems}>
            <EditRoundedIcon onClick={editBook} />
          </div>
          <div className={bookTitleStyles.actionItems}>
            <DeleteOutlineRoundedIcon onClick={confirmDeleteBook} />
          </div>
        </div>
      </div>

      <div className={bookTitleStyles.bookFinds}>
        <div className={bookTitleStyles.bookImage}>
          <div>
            <img src={props.thumbnailUrl} alt="" />
          </div>
        </div>
        <div className={bookTitleStyles.bookInfo}>
          {!editMode && (
            <p
              className={bookTitleStyles.expandedBookTitle}
              onClick={props.onClick}
            >
              {props.title}
            </p>
          )}
          <Fade in={editMode} timeout={500} unmountOnExit>
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
          <p className={bookTitleStyles.bookData}>{props.subtitle}</p>
          <p className={bookTitleStyles.bookAuthors}>{props.author}</p>
          <p className={bookTitleStyles.bookData}>{props.pageCount} Pages</p>
          <p className={bookTitleStyles.bookData}>
            <strong>ISBN 13:</strong> {props.isbn13} <strong>ISBN 10:</strong>{" "}
            {props.isbn10}
          </p>
          <div className="clearfix" />
          {!editMode && (
            <p className={bookTitleStyles.bookDescription}>
              {props.description}
            </p>
          )}
          <Fade in={editMode} timeout={500} unmountOnExit>
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
          <br />

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              disabled={false}
              aria-disabled={false}
              type="button"
              value="Add"
            >
              Edit
            </Button>
            <Button variant="outlined" onClick={cancelEdit}>
              Cancel
            </Button>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default ExpandedBookTile;
