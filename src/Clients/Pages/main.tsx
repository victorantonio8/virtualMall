import React, { useEffect } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Carousel, Card, Image } from "antd";
import { useState } from "react";
import { supabaseClient } from "../../supabaseClient";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<any[] | null>();
  const contentStyle: React.CSSProperties = {
    height: "560px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "transparent",
  };

  const { Meta } = Card;
  const _usuarioId = localStorage.getItem("myUser");

  useEffect(() => {
    supabaseClient
      .from("usuarios")
      .select("*")
      .eq("id", _usuarioId)
      .then((response: any) => setUsuarios(response.data));
  }, []);

  return (
    <>
      {usuarios && (
        <div>
          <h2>
            Bienvenido a virtualMall {usuarios[0].nombres}{" "}
            {usuarios[0].apellidos}
          </h2>
          <br /> <br /> <br />
          <div>
            <Carousel autoplay>
              <div>
                <h3 style={contentStyle}>
                  <Image
                    preview={{ visible: false }}
                    width={900}
                    src="https://fpnxfacxjubvouiewpad.supabase.co/storage/v1/object/public/images/IMG1.jpg"
                  />
                </h3>
              </div>
              <div>
                <h3 style={contentStyle}>
                  <Image
                    preview={{ visible: false }}
                    width={900}
                    src="https://fpnxfacxjubvouiewpad.supabase.co/storage/v1/object/public/images/IMG2.jpg?t=2022-06-14T21%3A07%3A42.438Z"
                  />
                </h3>
              </div>
              <div>
                <h3 style={contentStyle}>
                  {" "}
                  <Image
                    preview={{ visible: false }}
                    width={900}
                    src="https://fpnxfacxjubvouiewpad.supabase.co/storage/v1/object/public/images/IMG3.jpg?t=2022-06-14T21%3A12%3A16.457Z"
                  />
                </h3>
              </div>
            </Carousel>
          </div>
        </div>
      )}
    </>
  );
}
