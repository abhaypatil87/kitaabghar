import React from "react";
import { Row } from "simple-flexbox";
import styles from "./MenuIteam.module.css";

const MenuItem = (props) => {
  const { active, icon, title, ...otherProps } = props;
  const Icon = icon;
  return (
    <Row
      className={`${styles.container} ${active && styles.activeContainer}`}
      vertical="center"
      {...otherProps}
    >
      {active && <div className={styles.activeBar} />}
      <Icon />
      <span
        data-testid={props.testid}
        className={`${styles.title} ${active && styles.activeTitle}`}
      >
        {title}
      </span>
    </Row>
  );
};

export default MenuItem;
