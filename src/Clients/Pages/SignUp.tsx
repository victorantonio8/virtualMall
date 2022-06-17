import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Spin,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { createUser } from "../../api/userApi";

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    document.body.style.height = "auto";
  }, []);

  const { Title } = Typography;
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await createUser({
        ...values,
      });
      history.push("/login");
      message.success("Usuario creado exitosamente");
    } catch (error) {
      setLoading(false);
      message.error("Ocurrió un error al crear el usuario");
    }
  };

  const onFinishFailed = (errorInfo: any) => {};

  return (
    <Spin spinning={loading}>
      <div style={{ position: "relative" }}>
        <Title style={{ textAlign: "center", margin: "50px" }}>
          Registro de cliente
        </Title>
        <Form
          name="basic"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 4 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Nombres"
            name="nombres"
            rules={[{ required: true, message: "Campo requerido" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Apellidos"
            name="apellidos"
            rules={[{ required: true, message: "Campo requerido" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="fechaNacimiento"
            label="Fecha de nacimiento"
            rules={[{ required: true, message: "Campo requerido" }]}
          >
            <DatePicker placeholder="" />
          </Form.Item>
          <Form.Item
            label="Usuario"
            name="usuario"
            rules={[{ required: true, message: "Campo requerido" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Correo"
            name="correo"
            rules={[
              {
                type: "email",
                message: "formato no valido",
              },
              { required: true, message: "Campo requerido" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Campo requerido" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Teléfono"
            name="telefono"
            rules={[{ required: true, message: "Campo requerido" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Registrarse
            </Button>
          </Form.Item>
        </Form>
        <div
          style={{
            padding: "20px",
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            fontWeight: "bold",
            fontSize: "14px",
            textAlign: "center",
            background: "rgb(42, 49, 50)",
            color: "#fff",
          }}
        >
          <p style={{ margin: "0px" }}>
            Se deseas convertirte en miembro para promocionar tus productos
            escribenos a{" "}
            <a href="mailto:info@virtualmall.com">info@virtualmall.com</a>.
          </p>
        </div>
      </div>
    </Spin>
  );
};

export default App;
