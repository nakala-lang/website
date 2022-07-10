import React, { useState, useEffect } from "react";
import Home from "./containers/Home";
import About from "./containers/About";
import Docs from "./containers/Docs";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";

export function App() {
  return (
    <BrowserRouter>
      <div className="w-screen pb-32">
        <NavBar />
        <div className="max-w-2xl flex mx-auto">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/website/docs">
              <Docs />
            </Route>
            <Route path="/website/about">
              <About />
            </Route>
            <Route path="*">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}
