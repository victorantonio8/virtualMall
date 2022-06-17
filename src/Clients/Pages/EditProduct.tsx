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
import {
  createProduct,
  fetchProductById,
  getCategoriesByBusiness,
  updateProduct,
} from "../../api/productsApi";
import { UploadOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router";

const { Title } = Typography;
const { Option } = Select;

export default function AddProduct() {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const [form] = Form.useForm();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    setLoading(true);
    getCategoriesByBusiness().then((data) => {
      setCategories(data);
    });
  }, [id]);

  useEffect(() => {
    fetchProductById(id)
      .then((data) => {
        form.setFieldsValue({ ...data });
        setSelectedCategory(categories.find((c) => c.id === data.idCategory));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [categories]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await updateProduct(id, {
        ...values,
        urlPicture: values?.urlPicture?.[0]?.originFileObj,
        urlPictureSide: values?.urlPictureSide?.[0]?.originFileObj,
        urlPictureBack: values?.urlPictureBack?.[0]?.originFileObj,
      });
      form.resetFields();
      history.push("/products");
      message.success("Producto modificado exitosamente");
    } catch (error) {
      debugger;
      setLoading(false);
      message.error("Ocurrió al modificar el producto");
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
        Editar producto
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
