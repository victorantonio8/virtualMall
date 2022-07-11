export interface sells {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  total: number;
  idProduct: string;
  usuarioId: string;
  size: string;
  observations: string;
  rowId: number;
  ticketId: number;
  buyStatus: string;
}

export interface reportSells {
  ticketId: number;
  quantity: number;
  total: number;
  fecha: string;
  nombres: string;
  telefono: string;
  buyStatus: string;
}
