import styles from "../../App.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Column, Row } from "simple-flexbox";
import { Header } from "../../components/Header";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const LibraryLayout = () => {
  const [selectedItem, setSelectedItem] = useState("Books");

  return (
    <>
      <Row className={styles.container}>
        <Sidebar
          selectedItem={selectedItem}
          onChange={(selectedItem) => setSelectedItem(selectedItem)}
        />
        <Column flexGrow={1} className={styles.mainBlock}>
          <Header title={selectedItem} />
          <div className={styles.content}>
            <Outlet />
          </div>
        </Column>
      </Row>
    </>
  );
};

export default LibraryLayout;
