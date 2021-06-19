import React from "react";
import { Column, Row } from "simple-flexbox";
import Sidebar from "./components/Sidebar/Sidebar";
import { Header } from "./components/Header";
import styles from "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthorsView from "./Views/AuthorsView";
import BooksView from "./Views/BooksView";
import TimelineView from "./Views/TimelineView";
import AddBooksView from "./Views/AddBooksView";

const routes = [
  {
    path: "/authors",
    Component: AuthorsView,
  },
  {
    path: "/books",
    Component: BooksView,
  },
  { path: "/timeline", Component: TimelineView },
  {
    path: "/add-books",
    Component: AddBooksView,
  },
];
class App extends React.Component {
  state = { selectedItem: "Timeline" };

  componentDidMount() {
    window.addEventListener("resize", this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  resize = () => this.forceUpdate();

  render() {
    const { selectedItem } = this.state;
    return (
      <Router>
        <Row className={styles.container}>
          <Sidebar
            selectedItem={selectedItem}
            onChange={(selectedItem) => this.setState({ selectedItem })}
          />
          <Column flexGrow={1} className={styles.mainBlock}>
            <Header title={selectedItem} />
            <div className={styles.content}>
              {routes.map(({ path, Component }) => (
                <Route key={path} path={path} children={<Component />} />
              ))}
            </div>
          </Column>
        </Row>
      </Router>
    );
  }
}

export default App;
