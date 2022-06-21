import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Product } from "../Models/productModel";
import {
  Image,
  Descriptions,
  Tooltip,
  Form,
  Comment,
  Row,
  Col,
  Input,
  Button,
  message,
  Tabs,
  Rate,
  Modal,
} from "antd";
import moment from "moment";
import { addRateToProduct, getProductById } from "../../api/productsApi";
import { Comment as CommentModel } from "../Models/commentModel";
import { addComments } from "../../api/productsApi";
import { rates } from "../Models/rateModel";

const { TextArea } = Input;

interface productIdParams {
  productId: string;
}

export default function DetailProductById() {
  const { productId } = useParams<productIdParams>();
  const [product, setProduct] = useState<Product | null>();
  const [visible, setVisible] = useState(false);
  const { TabPane } = Tabs;
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rate, setRate] = useState<number>(0);
  const _usuarioId = localStorage.getItem("myUser");

  useEffect(() => {
    getProductById(productId).then((data) => {
      setProduct(data);
    });
  }, [productId]);

  const onFinish = async (values: any) => {
    const _description = values["description"];
    const _productId = product?.id;

    const _comment = {
      description: _description,
      stars: 5,
      idUsuario: _usuarioId,
      idProduct: _productId,
    } as CommentModel;

    addComments(_comment as any).then((result: any) => {
      message.success("El comentario ha sido agregado correctamente");
      onReset();
      const productUpdated = { ...product } as Product;
      productUpdated.comments = [...(productUpdated?.comments ?? []), _comment];
      setProduct(productUpdated);
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onclickAddRate = (value: string) => {
    const _productId = value;

    const rates = {
      stars: rate,
      productId: _productId,
      usuarioId: _usuarioId,
    } as rates;

    addRateToProduct(rates).then((result) => {
      message.success("calificación agregada exitosamente");
      setIsModalVisible(false);
    });
  };

  const onChangeRate = (value: number) => {
    setRate(value);
  };

  return (
    <>
      <div>{!product && <p>Producto no encontrado</p>}</div>
      <div style={{ zoom: "90%" }}>
        {product && (
          <div>
            <Row>
              <Col span={10}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Front" key="1">
                    <Image
                      width={450}
                      key={product.id}
                      src={product.urlPicture}
                      preview={{
                        visible,
                        src: product.urlPicture,
                        onVisibleChange: (value) => {
                          setVisible(value);
                        },
                      }}
                      onClick={() => setVisible(true)}
                    />
                  </TabPane>
                  <TabPane tab="Back" key="2">
                    <Image
                      width={450}
                      key={product.id}
                      src={product.urlPictureBack}
                      preview={{
                        visible,
                        src: product.urlPictureBack,
                        onVisibleChange: (value) => {
                          setVisible(value);
                        },
                      }}
                      onClick={() => setVisible(true)}
                    />
                  </TabPane>
                  <TabPane tab="Side" key="3">
                    <Image
                      width={450}
                      key={product.id}
                      src={product.urlPictureSide}
                      preview={{
                        visible,
                        src: product.urlPictureSide,
                        onVisibleChange: (value) => {
                          setVisible(value);
                        },
                      }}
                      onClick={() => setVisible(true)}
                    />
                  </TabPane>
                </Tabs>
              </Col>
              <Col span={11}>
                <div style={{ paddingTop: "60px" }}>
                  <h3 style={{ fontWeight: "bold", fontSize: "24px" }}>
                    {product.name}
                  </h3>

                  <Descriptions key={2} style={{ fontSize: "24px" }}>
                    <Descriptions.Item
                      labelStyle={{ fontWeight: "bold", fontSize: "20px" }}
                      label="Precio"
                    >
                      <span style={{ fontSize: "20px" }}>{product.price}</span>
                    </Descriptions.Item>
                    <Descriptions.Item
                      labelStyle={{ fontWeight: "bold", fontSize: "20px" }}
                      label="en Stock"
                    >
                      <span style={{ fontSize: "20px" }}>{product.stock}</span>
                    </Descriptions.Item>
                  </Descriptions>
                </div>
                <h3 style={{ fontWeight: "bold", fontSize: "20px" }}>
                  Descripción:
                </h3>
                <span style={{ fontSize: "20px" }}>
                  {product.shortDescription}
                </span>
                <h3
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    paddingTop: "15px",
                  }}
                >
                  Detalle:
                </h3>
                <span style={{ fontSize: "20px" }}>
                  {product.longDescription}
                </span>
              </Col>
            </Row>
            <Row justify="center">
              <Col span={16}>
                <div style={{ marginTop: "40px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  ></div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                    }}
                  >
                    <Form
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      form={form}
                      layout="vertical"
                    >
                      <Row gutter={[16, 16]} justify="start">
                        <Col span={24}>
                          <span style={{ fontSize: "20px" }}>
                            Agregar Comentario
                          </span>
                          <Button
                            style={{ fontSize: "20px" }}
                            onClick={showModal}
                            type="link"
                          >
                            ¿Desea calificar este producto?
                          </Button>
                          <Form.Item
                            name="description"
                            rules={[
                              {
                                required: true,
                                message: "El campo es requerido",
                              },
                            ]}
                          >
                            <TextArea style={{ fontSize: "20px" }} />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          style={{ marginRight: "10px" }}
                        >
                          Agregar
                        </Button>
                      </Form.Item>
                    </Form>

                    {Array.isArray(product.comments) &&
                      product.comments.map((comment, index: number) => (
                        <Comment
                          key={index}
                          author={comment.usuarios?.nombres}
                          content={comment.description}
                          datetime={
                            <Tooltip
                              title={moment().format("YYYY-MM-DD HH:mm:ss")}
                            >
                              <span>
                                {moment(comment.created_at).format(
                                  "YYYY-MM-DD HH:mm:ss"
                                )}
                              </span>
                            </Tooltip>
                          }
                        />
                      ))}
                  </div>
                  <Modal
                    title="Calificación del producto"
                    visible={isModalVisible}
                    onOk={() => onclickAddRate(product.id)}
                    onCancel={handleCancel}
                  >
                    <p>Gracias por calificar nuestro producto</p>

                    <Rate onChange={onChangeRate} defaultValue={0} />
                  </Modal>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </>
  );
}
