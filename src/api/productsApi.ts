import { supabaseClient } from "../supabaseClient";
import { Product } from '../Clients/Models/productModel';
import { Comment } from 'antd';
import { cars } from "../Clients/Models/carsModel";
import { sells } from "../Clients/Models/sellsModel";


export async function getProductsByBusiness(businessId: string)
{
    const {data, error} = await supabaseClient
    .from("categoryProducts")
        .select(`
            id,
            name,
            products (
                id,
                name,
                urlPicture,
                shortDescription,
                longDescription,
                stock,
                price,
                idCategory,
                idBusiness
            )
        `)
        .eq("idBusiness", businessId)
    
    return data;
}

export async function getProductById(productId: string): Promise<Product | null>
{
    const {data, error} = await supabaseClient
    .from("products")
        .select(`
                    id,
                    name,
                    urlPicture,
                    shortDescription,
                    longDescription,
                    stock,
                    price,
                    idCategory,
                    idBusiness,
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
        `)
        .eq("id", productId)

        if (error) {
            return null;
        }

    return data?.[0] as Product;
}

export async function addComments(comment: Comment) {
    const { data, error } = await supabaseClient
    .from("comments")
    .insert(comment);
    return data;
  }


  export async function addProductsToCartv2(cars: cars) {
    const { data, error } = await supabaseClient
    .from("cars")
    .insert(cars);
    return data;
  }

  export async function addProductsToCart(cars: cars) {
    let oldQuantity=0;
    const {data, error} = await supabaseClient
    .from("cars")
        .select('quantity')
        .match({idProduct:cars.idProduct, usuarioId:cars.usuarioId})

    if(data?.length !== 0){
        const result = data?data[0].quantity:0;
        oldQuantity = result as number;     
    }

    if(data?.length === 0){
        const {data,error} = await supabaseClient.from("cars").insert(cars);
        return data;
    }
    else{
        
        let newQuantity=0;
        newQuantity = oldQuantity + cars.quantity;
        const { data, error } = await supabaseClient
        .from('cars')
        .update({ quantity : newQuantity })
        .match({ idProduct: cars.idProduct, usuarioId: cars.usuarioId })
        return data;
    }

  }

  export async function getProductInCartByUser(usuarioId: string)
{
    const {data, error} = await supabaseClient
    .rpc('get_products_quantity_in_cart', { '_usuarioid': usuarioId });
    let result = 0;
    if (data) {
        result = data as any;
    }
    return result;
}

export async function getProductToBuy(usuarioId: string)
{
    const {data, error} = await supabaseClient
    .rpc('get_products_to_buy', { '_usuarioid': usuarioId });
    let result = 0;
    if (data) {
        result = data as any;
    }

    return result;
}


export async function addSellByUser(product:sells) {
    debugger;
    const { data, error } = await supabaseClient
    .from("sells")
    .insert(product);

    await supabaseClient
    .from("cars")
    .delete()
    .match({idProduct:product.idProduct,usuarioId: product.usuarioId})
    
    return data;
  }