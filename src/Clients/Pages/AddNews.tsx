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
import { createNews } from "../../api/newsApi";

const { Title } = Typography;

export default function AddNews() {
  const [form] = Form.useForm();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await createNews({
        ...values,
        urlPicture: values.urlPicture[0].originFileObj,
      });
      form.resetFields();
      history.push("/news");
      message.success("Noticia agregado exitosamente");
    } catch (error) {
      setLoading(false);
      message.error("Ocurrió un problema al agregar la noticia");
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
        Agregar nueva noticia
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
          name="urlPicture"
          label="Foto"
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

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}
