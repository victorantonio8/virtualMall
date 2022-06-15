import React, { useState, useEffect } from "react";
import { supabaseClient } from "./supabaseClient";
import { Card, Form, Input, Button, message } from "antd";
import { Usuarios } from "./Clients/Models/usuariosModel";
import { GetUserByLogin } from "./api/userApi";
import { Session } from "@supabase/supabase-js";
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const [usuario, setUsuario] = useState<Usuarios>();
  const [session, setSession] = useState<Session | null>(null);

  const onFinish = async ({ usuario, password }: Usuarios) => {
    try {
      GetUserByLogin(usuario, password).then((respone) => {
        if (respone) {
          localStorage.setItem("myUser", respone.id);
          localStorage.setItem("isAdmin", respone.isAdmin);
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50%",
      }}
    >
      <Card>
        <Form
          name="basic"
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Usuario"
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

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Iniciar sesión
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
