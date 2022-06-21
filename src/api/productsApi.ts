import { supabaseClient } from "../supabaseClient";
import { CreateProduct, Product } from "../Clients/Models/productModel";
import { Comment } from "antd";
import { cars } from "../Clients/Models/carsModel";
import { sells } from "../Clients/Models/sellsModel";
import { RcFile } from "antd/lib/upload";
import { rates } from "../Clients/Models/rateModel";


export async function getProductsByBusiness(businessId: string) {
  const { data, error } = await supabaseClient
    .from("categoryProducts")
    .select(
      `
            id,
            name,
            products (
                id,
                name,
                urlPicture,
                urlPictureSide,
                urlPictureBack,
                shortDescription,
                longDescription,
                stock,
                price,
                idCategory,
                idBusiness,
                sizes,
                rates(
                  stars
                )
            )
        `
    )
    .eq("idBusiness", businessId)
    .eq("products.status", true);
  return data;
}

export async function getProductById(
  productId: string
): Promise<Product | null> {
  const { data, error } = await supabaseClient
    .from("products")
    .select(
      `
                    id,
                    name,
                    urlPicture,
                    urlPictureSide,
                    urlPictureBack,
                    shortDescription,
                    longDescription,
                    stock,
                    price,
                    idCategory,
                    idBusiness,
                    sizes,
                    comments(
                      id,
                      description,
                      stars,
                      created_at,
                      usuarios(
                          id,
                          nombres
                      )
                    )
        `
    )
    .eq("id", productId);

  if (error) {
    return null;
  }

  return data?.[0] as Product;
}

export async function addComments(comment: Comment) {
  const { data, error } = await supabaseClient.from("comments").insert(comment);
  return data;
}

export async function addProductsToCart(cars: cars) {
  let oldQuantity = 0;
  const { data, error } = await supabaseClient
    .from("cars")
    .select("quantity")
    .match({ idProduct: cars.idProduct, usuarioId: cars.usuarioId });

  if (data?.length !== 0) {
    const result = data ? data[0].quantity : 0;
    oldQuantity = result as number;
  }

  if (data?.length === 0) {
    const { data, error } = await supabaseClient.from("cars").insert(cars);
    return data;
  } else {
    let newQuantity = 0;
    newQuantity = oldQuantity + cars.quantity;
    const { data, error } = await supabaseClient
      .from("cars")
      .update({ quantity: newQuantity })
      .match({ idProduct: cars.idProduct, usuarioId: cars.usuarioId });
    return data;
  }
}

export async function getProductInCartByUser(usuarioId: string) {
  const { data, error } = await supabaseClient.rpc(
    "get_products_quantity_in_cart",
    { _usuarioid: usuarioId }
  );
  let result = 0;
  if (data) {
    result = data as any;
  }
  return result;
}

export async function getProductToBuy(usuarioId: string) {
  const { data, error } = await supabaseClient.rpc("get_products_to_buy", {
    _usuarioid: usuarioId,
  });
  let result = 0;
  if (data) {
    result = data as any;
  }

  return result;
}

export async function addSellByUser(product: sells) {
  // capturamos la cantidad que compra el usuario
  let quantity = 0;
  quantity = product.quantity;

  // traemos el stock en existencia del producto
  let oldStock = 0;
  const { data, error } = await supabaseClient
    .from("products")
    .select("stock")
    .match({ id: product.idProduct });

  if (data?.length !== 0) {
    const result = data ? data[0].stock : 0;
    oldStock = result as number;
  }

  //insertamos los productos ya en ventas
  await supabaseClient.from("sells").insert(product);

  // eliminamos los productos del carrito
  await supabaseClient
    .from("cars")
    .delete()
    .match({ idProduct: product.idProduct, usuarioId: product.usuarioId });

  // actualizamos el nuevo stock de los productos, restando el oldStock - quantity
  let newStock = 0;
  newStock = oldStock - quantity;
  await supabaseClient
    .from("products")
    .update({ stock: newStock })
    .match({ id: product.idProduct });

  return data;
}

export async function deleteProductsInCart(
  _idProduct: string,
  _idUsuario: string
) {
  await supabaseClient
    .from("cars")
    .delete()
    .match({ idProduct: _idProduct, usuarioId: _idUsuario });

  const { data, error } = await supabaseClient.rpc("get_products_to_buy", {
    _usuarioid: _idUsuario,
  });
  return data;
}

export async function getProductsByUser() {
  const idBusiness = localStorage.getItem("idBusiness");
  const { data } = await supabaseClient
    .from("products")
    .select(
      `
            id,
            name,
            shortDescription,
            stock,
            price,
            urlPicture
        `
    )
    .eq("idBusiness", idBusiness)
    .eq("status",true);

  return data ?? [];
}

export async function getCategoriesByBusiness() {
  const idBusiness = localStorage.getItem("idBusiness");
  const { data } = await supabaseClient
    .from("categoryProducts")
    .select(
      `
            id,
            name,
            availableSizes
        `
    )
    .eq("idBusiness", idBusiness);

  return data ?? [];
}

export async function uploadImage(file: RcFile) {
  const extension = file.name.split(".").pop();
  const fileId = file.uid;
  const fileName = `${fileId}.${extension}`;
  const bucketUrl =
    "https://fpnxfacxjubvouiewpad.supabase.co/storage/v1/object/public/";
  const { data, error } = await supabaseClient.storage
    .from("images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return `${bucketUrl}/${data!.Key}`;
}

export async function createProduct(product: CreateProduct) {
  const urlPicture = await uploadImage(product.urlPicture);
  const idBusiness = localStorage.getItem("idBusiness");
  const urlPictureSide = await uploadImage(product.urlPictureSide);
  const urlPictureBack = await uploadImage(product.urlPictureBack);

  await supabaseClient.from("products").insert({
    ...product,
    urlPicture,
    urlPictureSide,
    urlPictureBack,
    idBusiness,
  });
}

export async function deleteProduct(_id: string) {
  await supabaseClient.from("products").update({status:false}).match({ id:_id });
}

export async function getSellsByBusiness(
  dateI: String,
  dateF: String,
  idBusiness: string
) {
  const { data, error } = await supabaseClient.rpc("get_sells_by_business", {
    _datei: dateI,
    _datef: dateF,
    _idbusiness: idBusiness,
  });
  let result = 0;
  if (data) {
    result = data as any;
  }

  return result;
}

// export async function getPurchasedProductsByUser(
//   usuarioId: string
// ) {
//   const { data, error } = await supabaseClient.rpc("get_sells_by_business", {
//     _datei: dateI,
//     _datef: dateF,
//     _idbusiness: idBusiness,
//   });
//   let result = 0;
//   if (data) {
//     result = data as any;
//   }

//   return result;
// }

export async function fetchProductById(id: string) {
  const { data, error } = await supabaseClient
    .from("products")
    .select(
      `id,
                name,
                shortDescription,
                longDescription,
                stock,
                price,
                idCategory,
                idBusiness, 
                sizes,
                categoryProducts (
                    id,
                    name,
                    availableSizes
                )`
    )
    .eq("id", id);

  return data?.[0];
}

export async function updateProduct(id: string, product: CreateProduct) {
  const idBusiness = localStorage.getItem("idBusiness");

  let productUpdated = { ...product } as any;

  if (product.urlPicture) {
    const urlPicture = await uploadImage(product.urlPicture);
    productUpdated.urlPicture = urlPicture;
  }

  if (product.urlPictureSide) {
    const urlPictureSide = await uploadImage(product.urlPictureSide);
    productUpdated.urlPictureSide = urlPictureSide;
  }

  if (product.urlPictureBack) {
    const urlPictureBack = await uploadImage(product.urlPictureBack);
    productUpdated.urlPictureBack = urlPictureBack;
  }

  await supabaseClient
    .from("products")
    .update({
      ...productUpdated,
      idBusiness,
    })
    .match({ id });
}

export async function addRateToProduct(rates:rates) {
  debugger;
  const { data, error } = await supabaseClient
    .from("rates")
    .select("stars")
    .match({ productId: rates.productId, usuarioId: rates.usuarioId });

  if (data?.length === 0) {
    const { data, error } = await supabaseClient.from("rates").insert(rates);
    return data;
  } else {
    const { data, error } = await supabaseClient
      .from("rates")
      .update({ stars: rates.stars })
      .match({ productId: rates.productId, usuarioId: rates.usuarioId });
    return data;
  }
  
}