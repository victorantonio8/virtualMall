import { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Checkbox,
  Row,
  Col,
} from "antd";
import { getCategoriesByBusiness } from "../../api/productsApi";

const { Title } = Typography;
const { Option } = Select;

export default function AddProduct() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    getCategoriesByBusiness().then((data) => setCategories(data));
  }, []);

  const onFinish = (values: any) => {
    debugger;
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const { TextArea } = Input;

  return (
    <div>
      <Title style={{ textAlign: "center", marginBottom: "50px" }}>
        Agregar nuevo producto
      </Title>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nombre"
          name="name"
          rules={[{ required: true, message: "Campo requerido" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Descripción corta"
          name="shortDescription"
          rules={[{ required: true, message: "Campo requerido" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Descripción larga"
          name="longDescription"
          rules={[{ required: true, message: "Campo requerido" }]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item
          label="Cantidad en inventario"
          name="stock"
          rules={[{ required: true, message: "Campo requerido" }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Precio"
          name="price"
          rules={[{ required: true, message: "Campo requerido" }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          name="idCategory"
          label="Categoría"
          rules={[{ required: true, message: "Campo requerido" }]}
        >
          <Select placeholder="Seleccione una categoría">
            {categories.map((category, index) => (
              <Option key={index} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="checkbox-group" label="Tallas">
          <Checkbox.Group>
            <Row>
              <Col span={8}>
                <Checkbox value="XS" style={{ lineHeight: "32px" }}>
                  XS
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="S" style={{ lineHeight: "32px" }}>
                  S
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="M" style={{ lineHeight: "32px" }}>
                  M
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="XL" style={{ lineHeight: "32px" }}>
                  XL
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="L" style={{ lineHeight: "32px" }}>
                  L
                </Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
