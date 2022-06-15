import React from "react";
import { Redirect, Route } from "react-router-dom";
import Dashboard from "../../Dashboard";

const PrivateRoute = ({ children, path }: any) => {
  const user = localStorage.getItem("myUser");

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <Route exact path={path}>
      <Dashboard>{children}</Dashboard>
    </Route>
  );
};

export default PrivateRoute;
