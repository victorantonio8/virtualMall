import { useState, useEffect } from "react";
import {
  addSellByUser,
  deleteProductsInCart,
  getProductToBuy,
  getRowId,
  getTicketId,
} from "../../api/productsApi";
import {
  Image,
  Descriptions,
  Modal,
  Form,
  Comment,
  Row,
  Col,
  Input,
  Button,
  message,
  Card,
} from "antd";
import { useHistory } from "react-router-dom";

import {
  DeleteOutlined,
  CheckCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { sells } from "../Models/sellsModel";
import { getUserAndEmail } from "../../api/userApi";



export default function ProductsToBuy() {
  const _usuarioId = localStorage.getItem("myUser");
  const [products, setProducts] = useState<any | null>();
  const [pagar, setPagar] = useState<number>(0);
  const [visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const history = useHistory();
  const [rowId, setrowId] = useState<number>(0);
  const [ticket, setTicket] = useState<number>(0);
  const [userName, setUserName] = useState<String>();
  const [correo, setCorreo] = useState<String>();

  let totalPagar = 0;

  useEffect(() => {
    getProductToBuy(_usuarioId as string).then((data: any) => {
      setProducts(data);

      data.forEach((result: any) => {
        totalPagar += result.total;
      });
      setPagar(totalPagar);
    });
  }, [_usuarioId]);

  useEffect(() => {
    getUserAndEmail(_usuarioId as string).then((result) => {
      setUserName(result["nombres"]);
      setCorreo(result["correo"]);
    });
  }, []);

  useEffect(() => {
    getRowId().then((result) => {
      setrowId(result);
    });
  }, []);

  useEffect(() => {
    getTicketId().then((result) => {
      setTicket(result);
    });
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async (values: any) => {
    setIsModalVisible(false);

    values.forEach((result: any) => {
      const _cart = {
        productName: result["productname"],
        price: result["price"],
        quantity: result["quantity"],
        total: result["total"],
        idProduct: result["idproduct"],
        size: result["size"],
        observations: result["observations"],
        usuarioId: _usuarioId,
        rowId: rowId,
        ticketId: ticket,
        buyStatus: "pago recibido",
      } as sells;

      addSellByUser(_cart as sells).then((data) => {});
    });
    setTicket(0);
    setrowId(0);

    
    message.success("El pago fue hecho exitosamente");
    history.push("/");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onDeleteProduct = (values: any) => {
    const idProduct = values["idproduct"];
    const usuarioId = values["usuarioid"];

    deleteProductsInCart(idProduct, usuarioId).then((data) => {
      message.success("Producto eliminado del carrito exitosamente");
      setProducts(data);

      data?.forEach((result: any) => {
        totalPagar += result.total;
      });
      setPagar(totalPagar);
    });
  };

  return (
    <>
      <div>{!products && <p>Producto no encontrado</p>}</div>
      <div>
        {products && (
          <div>
            <Row>
              <Col span={16}>
                {products.map((products: any) => (
                  <Row key={products.idproduct}>
                    <Col span={4}>
                      <Card style={{ width: 150, height: 150 }}>
                        <Image
                          width={100}
                          key={products.idproduct}
                          src={products.urlpicture}
                          preview={{
                            visible,
                            src: products.urlPicture,
                            onVisibleChange: (value) => {
                              setVisible(value);
                            },
                          }}
                          onClick={() => setVisible(true)}
                        />
                      </Card>
                    </Col>
                    <Col span={20}>
                      <Card style={{ width: 1050, height: 150 }}>
                        <div>
                          <span style={{ fontWeight: "bold" }}>Producto: </span>
                          <span>{products.productname}</span>
                        </div>
                        <div>
                          <span style={{ fontWeight: "bold" }}>Precio: </span>
                          <span>{products.price}</span>
                        </div>
                        <div>
                          <span style={{ fontWeight: "bold" }}>Cantidad: </span>
                          <span>{products.quantity}</span>
                        </div>
                        <div>
                          <span style={{ fontWeight: "bold" }}>
                            Descripcion:{" "}
                          </span>
                          <span>{products.longdescription}</span>
                        </div>
                        <div>
                          <Button
                            style={{
                              backgroundColor: "lightcoral",
                              fontWeight: "bold",
                            }}
                            shape="round"
                            icon={<DeleteOutlined />}
                            onClick={(event) => {
                              onDeleteProduct(products);
                            }}
                          >
                            Eliminar
                          </Button>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                ))}
              </Col>
            </Row>

            <Row>
              <Col span={16}>
                <Card style={{ width: 1198, height: 100 }}>
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <span style={{ fontWeight: "bold", paddingRight: "20px" }}>
                      TOTAL:{" "}
                    </span>
                    <span>L.{pagar}.00</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      paddingTop: "10px",
                    }}
                  >
                    <Button
                      style={{
                        backgroundColor: "deepSkyBlue",
                        fontWeight: "bold",
                      }}
                      shape="round"
                      onClick={showModal}
                      icon={<CheckCircleOutlined />}
                    >
                      Pagar
                    </Button>
                    <Modal
                      title="Método de Pago"
                      visible={isModalVisible}
                      onOk={(event) => handleOk(products)}
                      onCancel={handleCancel}
                      footer={[
                        <Button key="back" onClick={handleCancel}>
                          Cancelar
                        </Button>,
                        <Button
                          key="submit"
                          type="primary"
                          onClick={(event) => handleOk(products)}
                        >
                          Pagar
                        </Button>,
                      ]}
                    >
                      <img
                        className="logo"
                        alt="example"
                        src={
                          "data:image/png;base64,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"
                        }
                      />
                      <div className="designdiv1">
                        <h2
                          style={{
                            fontSize: "14px",
                            textAlign: "center",
                            paddingTop: "4px",
                            paddingBottom: "4px",
                          }}
                        >
                          Ingrese su número de tarjeta
                        </h2>
                      </div>
                      <div className="designdiv2">
                        <div
                          style={{
                            fontSize: "14px",
                            textAlign: "left",
                            paddingTop: "4px",
                            paddingLeft: "10px",
                          }}
                        >
                          <br />
                          <Input
                            className="input1"
                            prefix={<UserOutlined />}
                            value={"5542 4406 0588 7900"}
                            style={{
                              paddingLeft: "30px",
                              height: "1.5em",
                              textAlign: "left",
                              width: "250px",
                            }}
                          />
                          <span
                            style={{
                              fontWeight: "bold",
                              fontSize: "26px",
                              fontStyle: "italic",
                              paddingLeft: "12px",
                              fontFamily: "Century Schoolbook",
                            }}
                          >
                            VISA
                          </span>
                        </div>
                        <br />
                        <div style={{ display: "flex" }}>
                          <div
                            style={{
                              fontSize: "14px",
                              textAlign: "left",
                              paddingTop: "4px",
                              paddingLeft: "10px",
                            }}
                          >
                            <Input
                              className="input1"
                              value={"08/24"}
                              style={{
                                paddingLeft: "30px",
                                height: "1.5em",
                                textAlign: "left",
                                width: "100px",
                              }}
                            />
                          </div>

                          <div
                            style={{
                              textAlign: "left",
                              paddingTop: "4px",
                              justifyContent: "end",
                              paddingLeft: "135px",
                            }}
                          >
                            <Input
                              className="input1"
                              value={"123"}
                              style={{
                                height: "1.5em",
                                textAlign: "center",
                                width: "100px",
                              }}
                            />
                          </div>
                        </div>
                        <br />
                        <span
                          style={{
                            fontWeight: "bold",
                            fontSize: "18px",
                            fontStyle: "italic",
                            paddingLeft: "12px",
                          }}
                        >
                          NOMBRE DE LA TARJETA
                        </span>
                        <br /> <br />
                      </div>
                    </Modal>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </>
  );
}
