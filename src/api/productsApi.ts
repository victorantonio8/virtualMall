import { supabaseClient } from "../supabaseClient";
import { Product } from '../Clients/Models/productModel';
import { Comment } from 'antd';


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