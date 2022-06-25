import { useState, useEffect } from "react";
import { Space, Table, Row, Col, Typography, Button, Modal } from "antd";
import { ColumnsType } from "antd/lib/table";
import {
  getDetailByTicket,
  getPurchasedProductsByUser,
  getSellsByBusiness,
} from "../../api/productsApi";
import { utils, writeFile } from "xlsx";

const { Title } = Typography;

export default function ListPurchasedProductsByUser() {
  const _usuarioId = localStorage.getItem("myUser");
  const [purchasedProducts, setpurchasedProducts] = useState<any[]>([]);
  const [detail, setDetail] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPurchasedProductsByUser(_usuarioId as string).then((data) => {
      setpurchasedProducts(data as any);
      setLoading(false);
    });
  }, []);

  const onHandleClick = (value: number) => {
    getDetailByTicket(value).then((result) => {
      setDetail(result as any);
      setIsModalVisible(true);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns: ColumnsType<any> = [
    {
      title: "# Ticket",
      dataIndex: "ticketid",
      key: "ticketid",
    },
    {
      title: "Empresa",
      dataIndex: "business",
      key: "business",
    },
    {
      title: "Cantidad comprada",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total pagado",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Fecha comprada",
      key: "fecha",
      dataIndex: "fecha",
    },
    {
      title: "Status de compra",
      key: "buystatus",
      dataIndex: "buystatus",
    },
    {
      title: "Acción",
      key: "action",
      render: (_, data) => (
        <Space size="middle">
          <Button onClick={() => onHandleClick(data.ticketid)}>
            ver detalle
          </Button>
          <Modal
            title="Detalle de los productos"
            visible={isModalVisible}
            onCancel={handleCancel}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Table
                style={{ width: "100%" }}
                columns={columnsDetails}
                dataSource={detail}
                loading={loading}
                rowKey="id"
              />
            </div>
          </Modal>
        </Space>
      ),
    },
  ];

  const columnsDetails: ColumnsType<any> = [
    {
      title: "Producto",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Cantidad",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Observación",
      dataIndex: "observations",
      key: "observations",
    },
  ];

  return (
    <>
      <Row>
        <Col span={24}>
          <Title style={{ textAlign: "center", marginBottom: "50px" }}>
            Lista de compras por ticket
          </Title>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Table
              style={{ width: "100%" }}
              columns={columns}
              dataSource={purchasedProducts}
              loading={loading}
              rowKey="ticketid"
            />
          </div>
        </Col>
      </Row>
    </>
  );
}
