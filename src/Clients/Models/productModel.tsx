import { Comment } from "./commentModel";
import type { RcFile } from "antd/es/upload/interface";
import { rates } from "./rateModel";

export interface Product {
  id: string;
  name: string;
  urlPicture: string;
  urlPictureSide: string;
  urlPictureBack: string;
  shortDescription: string;
  longDescription: string;
  stock: number;
  price: number;
  idCategory: string;
  idBusiness: string;
  sizes: string[];
  rates?: rates[];
  comments?: Comment[];
}

export interface CreateProduct {
  name: string;
  urlPicture: RcFile;
  urlPictureSide: RcFile;
  urlPictureBack: RcFile;
  shortDescription: string;
  longDescription: string;
  stock: number;
  price: number;
  idCategory: string;
  idBusiness: string;
  sizes: string[];
}
