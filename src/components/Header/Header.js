import React from "react";
import { Row } from "simple-flexbox";

import styles from "./Header.module.css";
import AccountPopover from "../../Views/AccountPopover";

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
        <AccountPopover />
      </Row>
    </Row>
  );
};

export default Header;
