import React, { useEffect, useState } from "react";
import { Button, message, Modal, Typography } from "antd";
import { Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { deleteProduct, getProductsByUser } from "../../api/productsApi";
import { useHistory } from "react-router";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;

const { confirm } = Modal;

export default function ListProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const showConfirm = (productId: string) => {
    confirm({
      title: "¿Está seguro que desea elimiar el producto?",
      icon: <ExclamationCircleOutlined />,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteProduct(productId)
          .then(() => {
            setProducts(products.filter((p) => p.id !== productId));
            message.success("Producto elimando exitosamente");
          })
          .catch(() => {
            message.error("Ocurrió al eliminar el producto");
          });
      },
      onCancel() {},
    });
  };

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
          <Button type="primary" danger onClick={() => showConfirm(record.id)}>
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
