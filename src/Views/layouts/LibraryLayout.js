import Sidebar from "../../components/Sidebar/Sidebar";
import { Column, Row } from "simple-flexbox";
import { Header } from "../../components/Header";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const LibraryLayout = () => {
  const [selectedItem, setSelectedItem] = useState("Books");

  return (
    <Row>
      <Sidebar
        selectedItem={selectedItem}
        onChange={(selectedItem) => setSelectedItem(selectedItem)}
      />
      <Column flexGrow={1} style={{ padding: "20px" }}>
        <Header title={selectedItem} />
        <Outlet />
      </Column>
    </Row>
  );
};

export default LibraryLayout;
