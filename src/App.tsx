import React, { useState } from "react";
//import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Main from "./Clients/Pages/main";
import ProductsByBusiness from "./Clients/Pages/productsByBusiness";
import DetailProductById from "./Clients/Pages/detailProductById";
import { Session } from "@supabase/supabase-js";

function App() {
  const user = localStorage.getItem("myUser");

  return (
    <div>
      {!user ? (
        <Login />
      ) : (
        <Router>
          <Dashboard>
            <Switch>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/">
                <Main />
              </Route>
              <Route exact path="/productsByBusiness/:businessId/">
                <ProductsByBusiness />
              </Route>
              <Route exact path="/detailProductById/:productId/">
                <DetailProductById />
              </Route>
            </Switch>
          </Dashboard>
        </Router>
      )}
    </div>
  );
}

export default App;
