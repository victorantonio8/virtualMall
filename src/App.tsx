import "./App.css";
import "antd/dist/antd.css";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Clients/Pages/main";
import ProductsByBusiness from "./Clients/Pages/productsByBusiness";
import DetailProductById from "./Clients/Pages/detailProductById";
import NewsByBusiness from "./Clients/Pages/newsByBusiness";
import ProductsToBuy from "./Clients/Pages/productsToBuy";
import PrivateRoute from "./Clients/Pages/PrivateRoute";
import ListProducts from "./Clients/Pages/ListProducts";
import AddProduct from "./Clients/Pages/AddProduct";
import ListSellsByBusiness from "./Clients/Pages/ListSellsByBusiness";
import EditProduct from "./Clients/Pages/EditProduct";
import SignUp from "./Clients/Pages/SignUp";
import ListNews from "./Clients/Pages/ListNews";
import AddNews from "./Clients/Pages/AddNews";
import ListPurchasedProductsByUser from "./Clients/Pages/ListPurchasedProductsByUser";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path={"/login"}>
            <Login />
          </Route>
          <Route exact path="/registro">
            <SignUp />
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
          <PrivateRoute exact path="/products">
            <ListProducts />
          </PrivateRoute>
          <PrivateRoute exact path="/news">
            <ListNews />
          </PrivateRoute>
          <PrivateRoute exact path="/addNews">
            <AddNews />
          </PrivateRoute>
          <PrivateRoute exact path="/addProduct">
            <AddProduct />
          </PrivateRoute>
          <PrivateRoute exact path="/editProduct/:id">
            <EditProduct />
          </PrivateRoute>
          <PrivateRoute exact path="/sellsProducts">
            <ListSellsByBusiness />
          </PrivateRoute>
          <PrivateRoute exact path="/purchasedProducts">
            <ListPurchasedProductsByUser />
          </PrivateRoute>
        </Switch>
      </Router>
    </>
  );
}

export default App;
