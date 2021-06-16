import React from "react";
import { Row } from "simple-flexbox";
import styles from "./Logo.module.css";

const Logo = () => (
  <Row horizontal="center" vertical="center">
    <span className={styles.title}>My Library</span>
  </Row>
);

export default Logo;
