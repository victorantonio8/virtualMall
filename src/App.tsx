import React, { useState } from "react";
//import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Usuarios from "./Clients/Pages/main";
import { Session } from "@supabase/supabase-js";

function App() {
  const user = localStorage.getItem("myUser");

  return (
    <div>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Dashboard>
              <Route exact path="/">
                <Usuarios />
              </Route>
            </Dashboard>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
