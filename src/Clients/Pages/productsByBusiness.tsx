import React, { useEffect, useInsertionEffect } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Avatar, Card, Collapse, InputNumber, message } from "antd";
import { useState } from "react";
import {
  addProductsToCart,
  getProductInCartByUser,
  getProductsByBusiness,
} from "../../api/productsApi";
import { Product } from "../Models/productModel";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { cars } from "../Models/carsModel";

interface businessIdParams {
  businessId: string;
}

export default function ProductsByBusiness() {
  const [products, setProducts] = useState<any[] | null>();
  const [carproduct, setCarProduct] = useState<number>(0);
  const { businessId } = useParams<businessIdParams>();
  const { Meta } = Card;
  const { Panel } = Collapse;
  const _usuarioId = localStorage.getItem("myUser");
  let _quantity = 0;
  const history = useHistory();

  useEffect(() => {
    getProductsByBusiness(businessId).then((data) => {
      setProducts(data as Product[]);
    });
  }, [businessId]);

  useEffect(() => {
    getProductInCartByUser(_usuarioId as string).then((data: number) => {
      setCarProduct(data);
    });
  }, [carproduct]);

  const handleClick = (param: any) => {
    if (param) {
      history.push(`/detailProductById/${param}`);
    }
  };

  const onChange = (value: number) => {
    _quantity = value;
  };

  const onclickAddCart = async (values: any) => {
    if (_quantity === undefined || _quantity === 0) {
      message.info("la cantidad debe ser mayor a 0");
      return;
    }

    const _cars = {
      quantity: _quantity,
      idProduct: values["id"],
      usuarioId: _usuarioId,
    } as cars;

    addProductsToCart(_cars as any).then((result: any) => {
      message.success("Producto agregado al carrito");
      setCarProduct(carproduct + _quantity);
    });
  };

  const onClickBuy = async () => {
    history.push("/productsToBuy");
  };
  return (
    <>
      {products && (
        <div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: "50px",
                backgroundColor: "deepSkyBlue",
              }}
            >
              <strong style={{ fontSize: 22 }}>{carproduct}</strong>

              <span>
                <Avatar
                  size={64}
                  shape="square"
                  style={{
                    verticalAlign: "middle",
                    backgroundColor: "transparent",
                    color: "black",
                    height: "60px",
                    width: "35px",
                  }}
                  icon={<ShoppingCartOutlined onClick={onClickBuy} />}
                />
              </span>
            </div>
          </div>

          {products.map((category, index) => (
            <Collapse bordered={false} key={category.id} defaultActiveKey={[0]}>
              <Panel
                header={category.name}
                style={{ fontWeight: "bold" }}
                key={index}
              >
                <div
                  style={{
                    display: "flex",
                    maxWidth: "1400px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  {category.products.map((data: Product) => (
                    <Card
                      style={{
                        width: 300,
                        margin: "10px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      className="product-card"
                      key={data.id}
                      cover={
                        <img
                          alt="example"
                          onClick={(event) => handleClick(data.id)}
                          src={data.urlPicture}
                        />
                      }
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          height: "100%",
                        }}
                      >
                        <Meta
                          title={data.name}
                          description={data.shortDescription}
                        />
                        <div className="card-footer">
                          <div>
                            <strong>Price</strong>
                            <span>{data.price}</span>
                          </div>
                          <div>
                            <strong>Stock</strong>
                            <span>{data.stock}</span>
                          </div>
                          <div>
                            <strong>
                              <InputNumber
                                style={{ width: "65px" }}
                                min={0}
                                max={data.stock}
                                defaultValue={0}
                                id={"inputQuantity"}
                                onChange={onChange}
                              />
                            </strong>

                            <span>
                              <Avatar
                                shape="square"
                                size={64}
                                style={{
                                  verticalAlign: "middle",
                                  backgroundColor: "deepskyblue",
                                  color: "black",
                                  width: "65px",
                                  height: "auto",
                                }}
                                icon={
                                  <ShoppingCartOutlined
                                    onClick={(event) => onclickAddCart(data)}
                                  />
                                }
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Panel>
            </Collapse>
          ))}
        </div>
      )}
    </>
  );
}
