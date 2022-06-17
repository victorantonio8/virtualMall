import { useState } from "react";
import { Card, Form, Input, Button, message, Image } from "antd";
import { Usuarios } from "./Clients/Models/usuariosModel";
import { GetUserByLogin } from "./api/userApi";
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const [usuario, setUsuario] = useState<Usuarios>();

  const onFinish = async ({ usuario, password }: Usuarios) => {
    try {
      GetUserByLogin(usuario, password).then((respone) => {
        if (respone) {
          localStorage.setItem("myUser", respone.id);
          localStorage.setItem("isAdmin", respone.isAdmin);
          localStorage.setItem("idBusiness", respone.idBusiness);
          setUsuario(respone.data);
          history.push("/");
          message.success("ha iniciado sesion correctamente.");
        } else {
          message.error("usuario o contraseña incorrecta.");
        }
      });
    } catch (error: any) {
      message.warning("error al iniciar sesion.");
    }
  };

  return (
    <>
      <div
        style={{
          background: "#2A3132",
          display: "flex",
          justifyContent: "end",
          paddingTop: "20px",
          zoom:"90%"
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 14 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <div style={{ display: "inline-flex" }}>
            <h3
              style={{
                fontWeight: "bold",
                color: "white",
                paddingRight: "5px",
                paddingTop: "3px",
              }}
            >
              Usuario:{" "}
            </h3>
            <Form.Item
              name="usuario"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese su usuario!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <h3
              style={{
                fontWeight: "bold",
                color: "white",
                paddingRight: "5px",
                paddingTop: "3px",
              }}
            >
              Contraseña:{" "}
            </h3>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Iniciar sesión
              </Button>
            </Form.Item>
            <div style={{ paddingRight: "25px" }}>
              <span
                style={{
                  display: "inline-block",
                  margin: "0 10px",
                  color: "white",
                }}
              ></span>
              <Button
                htmlType="button"
                onClick={() => history.push("/registro")}
              >
                Registrarse
              </Button>
            </div>
          </div>
        </Form>
      </div>
      <div
        style={{
          width: "100%",
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          paddingTop: "25px",
        }}
      >
        <div style={{ display: "inline-flex" }}>
          <Card
            hoverable
            style={{ width: 320, height: 320, paddingLeft: "15px" }}
            cover={
              <Image
                preview={{ visible: false }}
                style={{ width: "100%" }}
                src="https://fpnxfacxjubvouiewpad.supabase.co/storage/v1/object/public/images/IMG0_login.jpg?t=2022-06-14T22%3A52%3A18.106Z"
              />
            }
          ></Card>

          <Card
            hoverable
            style={{ width: 320, height: 320, paddingLeft: "15px" }}
            cover={
              <Image
                preview={{ visible: false }}
                style={{ width: "100%" }}
                src="https://fpnxfacxjubvouiewpad.supabase.co/storage/v1/object/public/images/IMG2_login.jpg?t=2022-06-14T22%3A56%3A59.690Z"
              />
            }
          ></Card>

          <Card
            hoverable
            style={{ width: 320, height: 320, paddingLeft: "15px" }}
            cover={
              <Image
                preview={{ visible: false }}
                style={{ width: "100%" }}
                src="https://fpnxfacxjubvouiewpad.supabase.co/storage/v1/object/public/images/IMG1_Login.jpg?t=2022-06-14T22%3A27%3A35.535Z"
              />
            }
          ></Card>

          <Card
            hoverable
            style={{ width: 320, height: 320, paddingLeft: "15px" }}
            cover={
              <Image
                preview={{ visible: false }}
                style={{ width: "100%" }}
                src="https://fpnxfacxjubvouiewpad.supabase.co/storage/v1/object/public/images/IMG4_login.jpg?t=2022-06-14T22%3A52%3A47.163Z"
              />
            }
          ></Card>
        </div>
      </div>

      <div
        style={{
          background: "#2A3132",
          width: "100%",
          position: "absolute",
          bottom: "0px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "inline-flex", paddingTop: "15px" }}>
          <p style={{ color: "white", paddingLeft: "15px" }}>
            VirtualMall 2022 || Correo: virtualmall@gmail.Com || Telefono:
            26480342
          </p>
        </div>
      </div>
    </>
  );
}
