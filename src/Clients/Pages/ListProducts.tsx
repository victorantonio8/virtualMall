import React, { useEffect, useState } from "react";
import { Button, Typography } from "antd";
import { Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { getProductsByUser } from "../../api/productsApi";
import { useHistory } from "react-router";
const { Title } = Typography;

export default function ListProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    getProductsByUser()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const columns: ColumnsType<any> = [
    {
      title: "Foto",
      dataIndex: "urlPicture",
      key: "urlPicture",
      render: (url) => (
        <div style={{ textAlign: "center" }}>
          <img src={url} height={50} alt="Foto" />
        </div>
      ),
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Descripción",
      dataIndex: "shortDescription",
      key: "shortDescription",
    },
    {
      title: "Cantidad en inventario",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Precio",
      key: "price",
      dataIndex: "price",
    },
    {
      title: "Acción",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button>Editar</Button>
          <Button type="primary" danger>
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title style={{ textAlign: "center", marginBottom: "50px" }}>
        Lista de productos
      </Title>
      <Button
        type="primary"
        style={{ marginBottom: "30px" }}
        onClick={() => history.push("/addProduct")}
      >
        Agregar nuevo producto
      </Button>
      <Table
        columns={columns}
        dataSource={products}
        loading={loading}
        rowKey="name"
      />
    </div>
  );
}
