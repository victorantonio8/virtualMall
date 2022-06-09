import { Usuarios } from "./usuariosModel";

export interface Comment {
  id: string;
  description: string;
  stars: number;
  idUsuario: string;
  idProduct: string;
  created_at:string;
  usuarios?: Usuarios;
}
