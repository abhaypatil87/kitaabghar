import React from "react";
import { Row } from "simple-flexbox";

import styles from "./Header.module.css";

const Header = (props) => {
  const { ...otherProps } = props;
  return (
    <Row
      className={styles.container}
      vertical="center"
      horizontal="space-between"
      {...otherProps}
    >
      <span className={styles.title}>{props.title}</span>
      <Row vertical="center">
        <div className={styles.separator} />
        <Row vertical="center">
          <span className={`${styles.name} ${styles.cursorPointer}`}>
            Abhay Patil
          </span>
          <img
            src="https://avatars3.githubusercontent.com/u/8400709?s=460&v=4"
            alt="avatar"
            className={`${styles.avatar} ${styles.cursorPointer}`}
          />
        </Row>
      </Row>
    </Row>
  );
};

export default Header;
