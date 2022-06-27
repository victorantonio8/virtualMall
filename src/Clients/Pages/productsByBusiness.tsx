import { useEffect } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import {
  Avatar,
  Card,
  Collapse,
  InputNumber,
  message,
  Select,
  Checkbox,
  Button,
  Modal,
  Input,
  Rate,
} from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useState } from "react";
import {
  addProductsToCart,
  getProductInCartByUser,
  getProductsByBusiness,
} from "../../api/productsApi";
import { Product } from "../Models/productModel";
import { useParams, useHistory } from "react-router-dom";
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

  const [quantity, setQuantity] = useState<number>(0);
  const [personalizacion, setPersonalizacion] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const history = useHistory();
  const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [personalize, setPersonalize] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [legend, setLegend] = useState<String>("");
  const fivePoints = "86eff8ab-ce82-4bd5-bf16-4b540d24d166";
  const sweetPoint504 = "b26a47be-fdad-42fd-81f6-c56a561d7596";

  useEffect(() => {
    setLegend("");
    if (businessId === fivePoints) {
      setLegend(
        "Aviso: para las tallas XL, 2XL Y 3XL hay un incremento del 10% al precio del producto."
      );
    } else if (businessId === sweetPoint504) {
      setLegend(
        "Aviso: para los tamaños de 16prs y 20prs hay un incremento del 10% al precio del producto."
      );
    }
  });

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

  const onChangeQuantity = (value: number) => {
    setQuantity(value);
  };

  const onChangeInputPersonalizar = (value: any) => {
    setPersonalizacion(value.target.value);
  };

  const onChangeSize = (value: string) => {
    setSize(value);
  };

  const onChangePersonalizar = (e: CheckboxChangeEvent) => {
    setPersonalize(e.target.checked);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onclickAddCart = (id: string, price: number) => {
    let _price = 0;
    let amountTenPercent = price * 0.1 + price;
    if (quantity === undefined || quantity === 0) {
      message.info("la cantidad debe ser mayor a 0");
      return;
    }

    if (size === undefined || size === "") {
      message.info("debe seleccionar la talla");
      return;
    }

    if (
      size === "XL" ||
      size === "2XL" ||
      size === "3XL" ||
      size === "16prs" ||
      size === "20prs"
    ) {
      _price = amountTenPercent;
    } else {
      _price = price;
    }

    const _cars = {
      quantity: quantity,
      price: _price,
      idProduct: id,
      usuarioId: _usuarioId,
      size: size,
      observations: personalizacion,
    } as cars;

    addProductsToCart(_cars as any).then((result: any) => {
      message.success("Producto agregado al carrito");
      setIsModalVisible(false);
      setCarProduct(carproduct + quantity);
      setPersonalizacion("");
      setPersonalize(false);
    });
  };

  const onClickBuy = () => {
    history.push("/productsToBuy");
  };
  return (
    <>
      {products && (
        <div>
          <div style={{ width: "100%" }}>
            <div
              style={{
                display: "inline-block",
                float: "left",
                paddingTop: "15px",
              }}
            >
              {legend}
            </div>
            <div
              style={{
                display: "block",
                float: "right",
                height: "60px",
                width:"60px",
                paddingLeft:"8px",
                backgroundColor: "lightGreen",
              }}
            >
              <strong style={{ fontSize: 22 }}>{carproduct}</strong>

              <span style={{paddingBottom:"10px"}}>
                <Avatar
                  size={64}
                  shape="square"
                  style={{
                    backgroundColor: "transparent",
                    color: "black",
                    height: "70px",
                    width: "35px",
                  }}
                  icon={<ShoppingCartOutlined onClick={onClickBuy} />}
                />
              </span>
            </div>
          </div>

          <div style={{ height: "60px" }}></div>

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
                  {category.products.map((product: Product) => (
                    <Card
                      style={{
                        width: 300,
                        margin: "10px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      className="product-card"
                      key={product.id}
                      cover={
                        <img
                          alt="example"
                          onClick={(event) => handleClick(product.id)}
                          src={product.urlPicture}
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
                          title={product.name}
                          description={product.shortDescription}
                        />

                        <div className="card-footer">
                          <div>
                            <strong>Price</strong>
                            <span>{product.price}</span>
                          </div>
                          <div>
                            <strong>Stock</strong>
                            <span>{product.stock}</span>
                          </div>
                          <div>
                            <strong>Size</strong>
                            <span style={{ display: "block" }}>
                              <Select
                                showSearch
                                optionFilterProp="children"
                                onChange={onChangeSize}
                                style={{ width: "70px" }}
                              >
                                {Array.isArray(product.sizes) &&
                                  product.sizes.map((sizes, index: number) => (
                                    <Option key={index} value={sizes}>
                                      {sizes}
                                    </Option>
                                  ))}
                              </Select>
                            </span>
                          </div>
                        </div>
                        <div>
                          <span>
                            <Checkbox onChange={onChangePersonalizar}>
                              Personalizar
                            </Checkbox>
                          </span>
                          <span style={{ paddingLeft: "15px" }}>
                            <InputNumber
                              style={{ width: "65px" }}
                              min={0}
                              max={product.stock}
                              defaultValue={0}
                              id={"inputQuantity"}
                              onChange={onChangeQuantity}
                            />
                          </span>
                          <span style={{ paddingLeft: "5px" }}>
                            <Button
                              type="primary"
                              style={{ width: "40px", height: "36px" }}
                              icon={
                                <ShoppingCartOutlined
                                  onClick={() => {
                                    setSelectedProductId(product.id);
                                    if (personalize) {
                                      showModal();
                                    } else {
                                      onclickAddCart(product.id, product.price);
                                    }
                                  }}
                                />
                              }
                            ></Button>
                          </span>
                          <div style={{ textAlign: "center" }}>
                            <Rate
                              disabled
                              allowHalf
                              defaultValue={
                                product?.rates && product.rates.length > 0
                                  ? product.rates.reduce(
                                      (prev, current) => current.stars + prev,
                                      0
                                    ) / product.rates.length
                                  : 0
                              }
                            />
                          </div>

                          <Modal
                            title="Personalización Gratis"
                            visible={isModalVisible}
                            onOk={() =>
                              onclickAddCart(selectedProductId, product.price)
                            }
                            onCancel={handleCancel}
                          >
                            <p>
                              Ejemplo en Camisa: Real Madrid - Talla S - Victor
                              Mendez #10
                            </p>
                            <p>Ejemplo en Pastel: Feliz cumpleaños Margarita</p>
                            <Input
                              onChange={onChangeInputPersonalizar}
                              id={"inputPersonalizar"}
                              placeholder="ingrese su personalización totalmente gratis"
                            />
                          </Modal>
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
