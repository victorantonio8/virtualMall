import React, { useEffect } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Avatar, Card, Collapse } from "antd";
import { useState } from "react";
import { getProductsByBusiness } from "../../api/productsApi";
import { Product } from "../Models/productModel";
import { useParams, useHistory } from "react-router-dom";

interface businessIdParams {
  businessId: string;
}

export default function ProductsByBusiness() {
  const [products, setProducts] = useState<any[] | null>();
  const { businessId } = useParams<businessIdParams>();
  const { Meta } = Card;
  const { Panel } = Collapse;
  const history = useHistory();

  useEffect(() => {
    getProductsByBusiness(businessId).then((data) => {
      setProducts(data as Product[]);
    });
  }, [businessId]);

  const handleClick = (param: any) => {
    if (param) {
      history.push(`/detailProductById/${param}`);
    }
  };

  return (
    <>
      {products && (
        <div>
          <div style={{display:"flex", justifyContent:"end"}}>
            <div style={{ display:"inline-flex", alignItems:"center" }}>
              <strong style={{ fontSize: 22 }}>5</strong>

              <span>
                <Avatar
                  size={64}
                  style={{
                    verticalAlign: "middle",
                    backgroundColor: "transparent",
                    color: "black",
                    height: "auto",
                    width: "auto",
                  }}
                  icon={<ShoppingCartOutlined />}
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
                            <strong>Add</strong>
                            <span>
                              <Avatar
                                shape="square"
                                size={64}
                                style={{
                                  verticalAlign: "middle",
                                  backgroundColor: "darkgrey",
                                  color: "black",
                                  height: "auto",
                                }}
                                icon={<ShoppingCartOutlined />}
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
