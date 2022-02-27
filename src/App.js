import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import UserCreate from "./components/UserCreate/UserCreate";
import UserList from "./components/UserList/UserList";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={UserList} />
        <Route exact path="/create" component={UserCreate} />
      </Switch>
    </Router>
  );
}
