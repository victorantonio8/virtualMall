import React, { useEffect, useState } from "react";
import { Button, message, Modal, Space, Typography } from "antd";
import { useHistory } from "react-router";
import Table, { ColumnsType } from "antd/lib/table";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteNews, getNewsByBusinessId } from "../../api/newsApi";
export default function ListNews() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const { confirm } = Modal;
  const { Title } = Typography;

  const showConfirm = (productId: string) => {
    confirm({
      title: "¿Está seguro que desea elimiar la noticia?",
      icon: <ExclamationCircleOutlined />,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteNews(productId)
          .then(() => {
            setNews(news.filter((p) => p.id !== productId));
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
    getNewsByBusinessId()
      .then((data) => {
        setNews(data);
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
      title: "Descripción corta",
      dataIndex: "shortDescription",
      key: "shortDescription",
    },
    {
      title: "Descripción larga",
      dataIndex: "longDescription",
      key: "longDescription",
    },
    {
      title: "Acción",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
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
        Lista de noticias
      </Title>
      <Button
        type="primary"
        style={{ marginBottom: "30px" }}
        onClick={() => history.push("/addNews")}
      >
        Agregar nueva noticia
      </Button>
      <Table
        columns={columns}
        dataSource={news}
        loading={loading}
        rowKey="name"
      />
    </div>
  );
}
