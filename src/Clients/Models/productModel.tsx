export interface Product {
  id: string;
  name: string;
  urlPicture: string;
  shortDescription: string;
  longDescription: string;
  stock: number;
  price: number;
  idCategory: string;
  idBusiness: string;
  comments?: Comment;
}
