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
  Upload,
  Spin,
  message,
} from "antd";
import { createProduct, getCategoriesByBusiness } from "../../api/productsApi";
import { UploadOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";

const { Title } = Typography;
const { Option } = Select;

export default function AddProduct() {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const [form] = Form.useForm();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategoriesByBusiness().then((data) => {
      form.setFieldsValue({ idCategory: data[0].id });
      setSelectedCategory(data[0]);
      setCategories(data);
    });
  }, []);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await createProduct({
        ...values,
        urlPicture: values.urlPicture[0].originFileObj,
        urlPictureSide: values.urlPictureSide[0].originFileObj,
        urlPictureBack: values.urlPictureBack[0].originFileObj,
      });
      form.resetFields();
      history.push("/products");
      message.success("Producto agregado exitosamente");
    } catch (error) {
      setLoading(false);
      message.error("Ocurrió al agregar el producto");
    }
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
    <Spin spinning={loading}>
      <Title style={{ textAlign: "center", marginBottom: "50px" }}>
        Agregar nuevo producto
      </Title>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
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
          <Select
            placeholder="Seleccione una categoría"
            onChange={(id) => {
              setSelectedCategory(categories.find((c) => c.id === id));
            }}
          >
            {categories.map((category, index) => (
              <Option key={index} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="urlPicture"
          label="Foto frontal"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Campo requerido" }]}
        >
          <Upload
            name="urlPicture"
            listType="picture"
            maxCount={1}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Seleccionar archivo</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="urlPictureSide"
          label="Foto lateral"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Campo requerido" }]}
        >
          <Upload
            name="urlPictureSide"
            listType="picture"
            maxCount={1}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Seleccionar archivo</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="urlPictureBack"
          label="Foto trasera"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Campo requerido" }]}
        >
          <Upload
            name="urlPictureBack"
            listType="picture"
            maxCount={1}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Seleccionar archivo</Button>
          </Upload>
        </Form.Item>

        {selectedCategory && (
          <Form.Item
            name="sizes"
            label="Tallas"
            rules={[{ required: true, message: "Campo requerido" }]}
          >
            <Checkbox.Group>
              <Row>
                {selectedCategory.availableSizes.map(
                  (size: string, index: number) => (
                    <Col span={8} key={index}>
                      <Checkbox value={size} style={{ lineHeight: "32px" }}>
                        {size}
                      </Checkbox>
                    </Col>
                  )
                )}
              </Row>
            </Checkbox.Group>
          </Form.Item>
        )}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}
