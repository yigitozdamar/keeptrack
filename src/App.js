import ProjectsPage from "./projects/ProjectsPage";
import React from "react";
import HomePage from "./home/HomePage";
import ProjectPage from "./projects/ProjectPage";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { NavLink, useLocation, Route, Switch } from "react-router-dom";

function App() {
  let location = useLocation();

  return (
    <>
      <header className="sticky">
        <span className="logo">
          <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
        </span>
        <NavLink to="/" exact className="button rounded">
          <span className="icon-home"></span>
          Home
        </NavLink>
        <NavLink to="/projects/" className="button rounded">
          Projects
        </NavLink>
      </header>
      <div className="container">
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            classNames="fade"
            timeout={{ enter: 400, exit: 200 }}
          >
            <Switch location={location}>
              <Route path="/" exact component={HomePage} />
              <Route path="/projects" exact component={ProjectsPage} />
              <Route path="/projects/:id" component={ProjectPage} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </>
  );
}

export default App;
