import React, { useEffect } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Avatar, Card, Collapse } from "antd";
import { useState } from "react";
import { getProducts } from "../../api/productsApi";
import { products } from "../Models/productsModel";
import { useParams } from "react-router-dom";

interface businessIdParams {
  businessId: string;
}

export default function ProductsByBusiness() {
  const [products, setProducts] = useState<any[] | null>();
  const { businessId } = useParams<businessIdParams>();
  const { Meta } = Card;
  const { Panel } = Collapse;

  useEffect(() => {
    getProducts(businessId).then((data) => {
      setProducts(data as products[]);
    });
  }, [businessId]);

  return (
    <>
      {products && (
        
        <div>
      
          {products.map((category) => (
            <Collapse bordered={false} key={category.id} defaultActiveKey={[0]}>
              <Panel header={category.name} style={{fontWeight:"bold"}} key={category.id}>
                <div
                  style={{
                    display: "flex",
                    maxWidth: "1400px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  {category.products.map((data:products) => (
                    <Card
                      style={{
                        width: 300,
                        margin: "10px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      className="product-card"
                      key={data.id}
                      cover={<img alt="example" src={data.urlPicture} />}
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
                            <strong>in Stock</strong>
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
