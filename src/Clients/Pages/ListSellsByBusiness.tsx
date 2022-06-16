import React, { useEffect, useState, useRef } from "react";
import { Space, Table, Row, Col, DatePicker, Button, message } from "antd";
import type { DatePickerProps } from "antd";
import { ColumnsType } from "antd/lib/table";
import { getSellsByBusiness } from "../../api/productsApi";
import XLSX, { utils, writeFile } from "xlsx";

export default function ListSellsByBusiness() {
  const [sells, setSells] = useState<any[]>([]);
  const [dateI, setDateI] = useState<String>();
  const [dateF, setDateF] = useState<String>();
  const idBusiness = localStorage.getItem("idBusiness");
  const [loading, setLoading] = useState(false);

  const onChangeDateI: DatePickerProps["onChange"] = (date, dateString) => {
    setDateI(dateString);
  };

  const onChangeDateF: DatePickerProps["onChange"] = (date, dateString) => {
    setDateF(dateString);
  };

  const generateReport = () => {
    setLoading(true);
    setSells([]);
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

  const columns: ColumnsType<any> = [
    {
      title: "Producto",
      dataIndex: "productname",
      key: "productname",
    },
    {
      title: "Tamaño",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Cantidad Vendida",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total",
      key: "total",
      dataIndex: "total",
    },
    {
      title: "Fecha",
      key: "created_at",
      dataIndex: "created_at",
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
              rowKey="report_id"
            />
          </div>
        </Col>
      </Row>
    </>
  );
}
