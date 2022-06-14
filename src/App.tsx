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
import NewsByBusiness from "./Clients/Pages/newsByBusiness";
import ProductsToBuy from "./Clients/Pages/productsToBuy";

function App() {
  const user = localStorage.getItem("myUser");

  return (
    <>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <Dashboard>
            <Switch>
              <Route exact path="/">
                <Main />
              </Route>
              <Route exact path="/productsByBusiness/:businessId/">
                <ProductsByBusiness />
              </Route>
              <Route exact path="/detailProductById/:productId/">
                <DetailProductById />
              </Route>
              <Route exact path="/newsByBusiness">
                <NewsByBusiness />
              </Route>
              <Route exact path="/productsToBuy">
                <ProductsToBuy />
              </Route>
            </Switch>
          </Dashboard>
        )}
      </Router>
    </>
  );
}

export default App;
