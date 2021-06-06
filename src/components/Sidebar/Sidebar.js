import React, { useState } from "react";
import { Column, Row } from "simple-flexbox";
import sideBarStyles from "./Sidebar.module.css";
import Logo from "../Logo/Logo";
import MenuItem from "../MenuItem/MenuItem";
import TimelineIcon from "@material-ui/icons/Timeline";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import QueueOutlinedIcon from "@material-ui/icons/QueueOutlined";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  const [expanded, setExpanded] = useState(true);

  const isMobile = () => window.innerWidth <= 768;

  const toggleMenu = () => {
    setExpanded((prevState) => {
      return !prevState;
    });
  };

  const onItemClicked = (item) => {
    setExpanded(false);
    return props.onChange(item);
  };

  const renderBurger = () => {
    return (
      <div onClick={toggleMenu} className={sideBarStyles.burgerIcon}>
        <MenuIcon />
      </div>
    );
  };
  return (
    <div style={{ position: "relative" }}>
      <Row
        className={sideBarStyles.mainContainer}
        breakpoints={{
          768: `${sideBarStyles.mainContainerMobile} ${
            expanded && sideBarStyles.mainContainerExpanded
          }`,
        }}
      >
        {isMobile() && !expanded && renderBurger()}
        <Column
          className={sideBarStyles.container}
          breakpoints={{
            768: `${sideBarStyles.containerMobile} ${
              expanded ? sideBarStyles.show : sideBarStyles.hide
            }`,
          }}
        >
          <Logo />
          <Column className={sideBarStyles.menuItemList}>
            <Link to="/timeline" className={sideBarStyles.link}>
              <MenuItem
                title="Timeline"
                testid="sidebar-menu-item"
                icon={TimelineIcon}
                onClick={() => onItemClicked("Timeline")}
                active={props.selectedItem === "Timeline"}
              />
            </Link>
            <Link to="/books" className={sideBarStyles.link}>
              <MenuItem
                title="Books"
                testid="sidebar-menu-item"
                icon={LocalLibraryIcon}
                onClick={() => onItemClicked("Books")}
                active={props.selectedItem === "Books"}
              />
            </Link>
            <Link to="/add-books" className={sideBarStyles.link}>
              <MenuItem
                title="Add Books"
                testid="sidebar-menu-item"
                icon={QueueOutlinedIcon}
                onClick={() => onItemClicked("Add Books")}
                active={props.selectedItem === "Add Books"}
              />
            </Link>
            <Link to="/authors" className={sideBarStyles.link}>
              <MenuItem
                title="Authors"
                testid="sidebar-menu-item"
                icon={PeopleAltIcon}
                onClick={() => onItemClicked("Authors")}
                active={props.selectedItem === "Authors"}
              />
            </Link>
            <div className={sideBarStyles.separator} />
          </Column>
        </Column>
        {isMobile() && expanded && (
          <div className={sideBarStyles.outsideLayer} onClick={toggleMenu} />
        )}
      </Row>
    </div>
  );
};

export default Sidebar;
