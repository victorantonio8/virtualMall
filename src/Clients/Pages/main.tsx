import React, { useEffect } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { useState } from "react";
import { supabaseClient } from "../../supabaseClient";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<any[] | null>();
  const { Meta } = Card;
  useEffect(() => {
    supabaseClient
      .from("usuarios")
      .select("*")
      .then((response) => setUsuarios(response.data));
  });

  return (
    <>
      {usuarios && (
        <div
          style={{
            display: "flex",
            maxWidth: "1400px",
            flexWrap: "wrap",
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          {usuarios.map((usuario) => (
            <Card
              style={{ width: 300, margin: "10px" }}
              key={usuario.id}
              cover={
                <img
                  alt="example"
                  src="https://assets.adidas.com/images/w_600,f_auto,q_auto/9bc02b8d4b64450c957baa2900dcfd35_9366/Camiseta_primera_equipacion_Real_Madrid_Blanco_DW4433_01_laydown.jpg"
                />
              }
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={usuario.nombres}
                description="This is the description"
              />
            </Card>

            // <li key={usuario.id}>{usuario.nombres}</li>
          ))}
        </div>
      )}
    </>
  );
}
