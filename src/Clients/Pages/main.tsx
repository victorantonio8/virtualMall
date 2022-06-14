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
  }, []);

  return (
    <>
      {usuarios && (
        <div>
          <h2>Bienvenido a virtualMall</h2>
        </div>
      )}
    </>
  );
}
