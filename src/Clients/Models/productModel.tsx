import { Comment } from "./commentModel";

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
  comments?: Comment[];
}
