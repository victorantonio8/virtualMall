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
import PrivateRoute from "./Clients/Pages/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path={"/login"}>
            <Login />
          </Route>
          <PrivateRoute exact path="/">
            <Main />
          </PrivateRoute>
          <PrivateRoute exact path="/productsByBusiness/:businessId/">
            <ProductsByBusiness />
          </PrivateRoute>
          <PrivateRoute exact path="/detailProductById/:productId/">
            <DetailProductById />
          </PrivateRoute>
          <PrivateRoute exact path="/newsByBusiness">
            <NewsByBusiness />
          </PrivateRoute>
          <PrivateRoute exact path="/productsToBuy">
            <ProductsToBuy />
          </PrivateRoute>
        </Switch>
      </Router>
    </>
  );
}

export default App;
