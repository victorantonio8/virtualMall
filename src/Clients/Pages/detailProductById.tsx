import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Product } from "../Models/productModel";
import {
  Image,
  Layout,
  Descriptions,
  Tooltip,
  Form,
  Comment,
  Row,
  Col,
  Input,
  Button,
  message,
} from "antd";
import moment from "moment";
import { getProductById } from "../../api/productsApi";
import { Comment as CommentModel } from "../Models/commentModel";
import { addComments } from "../../api/productsApi";

const { TextArea } = Input;

interface productIdParams {
  productId: string;
}

export default function DetailProductById() {
  const { productId } = useParams<productIdParams>();
  const [product, setProduct] = useState<Product | null>();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    getProductById(productId).then((data) => {
      setProduct(data);
    });
  }, [productId]);

  const onFinish = async (values: any) => {
    const _description = values["description"];
    const _productId = product?.id;
    const _usuarioId = localStorage.getItem("myUser");

    const _comment = {
      description: _description,
      stars: 5,
      idUsuario: _usuarioId,
      idProduct: _productId,
    } as CommentModel;

    addComments(_comment as any).then((result: any) => {
      message.success("El comentario ha sido agregado correctamente");
      onReset();
      //console.log();
      //setProduct(productId as any);
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div>{!product && <p>Producto no encontrado</p>}</div>
      <div>
        {product && (
          <div>
            <Row>
              <Col span={8}>
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
              </Col>
              <Col span={16}>
                <div>
                  <Descriptions key={1} title={product.name}>
                    <Descriptions.Item
                      labelStyle={{ fontWeight: "bold" }}
                      label="Precio"
                    >
                      {product.price}
                    </Descriptions.Item>
                    <Descriptions.Item
                      labelStyle={{ fontWeight: "bold" }}
                      label="en Stock"
                    >
                      {product.stock}
                    </Descriptions.Item>
                  </Descriptions>

                  <Descriptions key={2}>
                    <Descriptions.Item
                      labelStyle={{ fontWeight: "bold" }}
                      label="Descripción breve"
                    >
                      {product.shortDescription}
                    </Descriptions.Item>
                  </Descriptions>

                  <Descriptions key={3}>
                    <Descriptions.Item
                      labelStyle={{ fontWeight: "bold" }}
                      label="Descripción a Detalle"
                    >
                      {product.longDescription}
                    </Descriptions.Item>
                  </Descriptions>
                </div>
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
                          <Form.Item
                            label="Agregar comentario"
                            name="description"
                            rules={[
                              {
                                required: true,
                                message: "El campo es requerido",
                              },
                            ]}
                          >
                            <TextArea />
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
                      product.comments.map((comments: CommentModel, index) => (
                        <Comment
                          key={index}
                          author={comments.usuarios?.nombres}
                          content={comments.description}
                          datetime={
                            <Tooltip
                              title={moment().format("YYYY-MM-DD HH:mm:ss")}
                            >
                              <span>
                                {moment(comments.created_at).format(
                                  "YYYY-MM-DD HH:mm:ss"
                                )}
                              </span>
                            </Tooltip>
                          }
                        />
                      ))}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </>
  );
}
