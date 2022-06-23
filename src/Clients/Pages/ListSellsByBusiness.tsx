import { useState } from "react";
import {
  Space,
  Table,
  Row,
  Col,
  DatePicker,
  Button,
  message,
  Modal,
  Radio,
} from "antd";
import type { DatePickerProps } from "antd";
import { ColumnsType } from "antd/lib/table";
import {
  getSellsByBusiness,
  getDetailByTicket,
  updateTicketStatus,
} from "../../api/productsApi";
import { utils, writeFile } from "xlsx";
import type { RadioChangeEvent } from "antd";
import { reportSells } from "../Models/sellsModel";

import email from "@emailjs/browser";
import { sendEmail } from "../../api/emailKey";


export default function ListSellsByBusiness() {
  const [sells, setSells] = useState<any | null>();
  const [dateI, setDateI] = useState<String>();
  const [dateF, setDateF] = useState<String>();
  const idBusiness = localStorage.getItem("idBusiness");
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [valueCheck, setValueCheck] = useState<String>();
  const [ticket, setTicket] = useState<Number>();
  const [userName, setUserName] = useState<String>();
  const [correo, setCorreo] = useState<String>();

  const plainOptions = [
    { label: "Pago recibido", value: "pago recibido" },
    { label: "Preparando compra", value: "preparando compra" },
    { label: "En camino", value: "en camino" },
    { label: "Entregado", value: "entregado" },
  ];

  const onChangeDateI: DatePickerProps["onChange"] = (date, dateString) => {
    setDateI(dateString);
  };

  const onChangeDateF: DatePickerProps["onChange"] = (date, dateString) => {
    setDateF(dateString);
  };

  const generateReport = () => {
    setLoading(true);
    //setSells([]);
    getSellsByBusiness(dateI as String, dateF as String, idBusiness as string)
      .then((data) => {
        setSells(data as any);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const exportExcel = () => {
    if (sells.length !== 0) {
      var wb = utils.book_new(),
        ws = utils.json_to_sheet(sells);
      utils.book_append_sheet(wb, ws, "Reporte");
      writeFile(wb, "Mis-Ventas.xlsx");
    } else {
      message.info("Por favor genere un reporte para poder exportar");
    }
  };

  const onHandleClick = (value: number) => {
    getDetailByTicket(value).then((result) => {
      setDetail(result as any);
      setIsModalVisible(true);
    });
  };

  const onHandleClickUpdate = (ticketId: number, prevStatus: string, userName: string, correo: string) => {
    setTicket(ticketId);
    setValueCheck(prevStatus);
    setUserName(userName);
    setCorreo(correo);
    setIsModal2Visible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCancel2 = () => {
    setIsModal2Visible(false);
  };

  const onChangeCheck = ({ target: { value } }: RadioChangeEvent) => {
    setValueCheck(value);
  };

  const handleOkUpdate = () => {

    let statusName = valueCheck as string;
    let ticketNumber = ticket as number;
    let _userName = userName as string;
    let _correo = correo as string;

    updateTicketStatus(ticketNumber, statusName).then(
      (result) => {
        generateReport();
        setIsModal2Visible(false);

        if(statusName === "entregado")
        {
          sendEmail(_userName, _correo);
        }

        message.success("Ticket actualizado exitosamente.");
      }
    );
  };

  const columns: ColumnsType<any> = [
    {
      title: "# Ticket",
      dataIndex: "ticketid",
      key: "ticketid",
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
      title: "Fecha",
      key: "fecha",
      dataIndex: "fecha",
    },
    {
      title: "Cliente",
      key: "nombres",
      dataIndex: "nombres",
    },
    {
      title: "Contacto",
      key: "telefono",
      dataIndex: "telefono",
    },
    {
      title: "Status",
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
          <Button
            onClick={() => onHandleClickUpdate(data.ticketid, data.buystatus, data.nombres, data.correo)}
          >
            Actualizar
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
          <Modal
            title="Actualizar Status"
            width={600}
            visible={isModal2Visible}
            onOk={handleOkUpdate}
            onCancel={handleCancel2}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Radio.Group
                options={plainOptions}
                onChange={onChangeCheck}
                value={valueCheck}
                optionType="button"
                buttonStyle="solid"
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
  ];

  return (
    <>
      <Row>
        <Col span={24}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "inline-flex" }}>
              <span style={{ paddingRight: "10px" }}>Fecha Inicio: </span>
              <Space
                style={{ paddingRight: "5px", width: "100%" }}
                direction="vertical"
              >
                <DatePicker key={1} id="dateI" onChange={onChangeDateI} />
              </Space>
              <span style={{ paddingRight: "10px" }}>Fecha Final: </span>
              <Space
                style={{ paddingRight: "5px", width: "100%" }}
                direction="vertical"
              >
                <DatePicker key={2} id="dateF" onChange={onChangeDateF} />
              </Space>
              <div style={{ display: "inline-flex" }}>
                <Button type="primary" onClick={generateReport}>
                  Generar Reporte
                </Button>
              </div>
              <div style={{ display: "inline-flex", paddingLeft: "10px" }}>
                <Button type="primary" onClick={exportExcel}>
                  Exportar Reporte
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={24}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Table
              style={{ width: "100%" }}
              columns={columns}
              dataSource={sells}
              loading={loading}
              rowKey="ticketid"
            />
          </div>
        </Col>
      </Row>
    </>
  );
}
