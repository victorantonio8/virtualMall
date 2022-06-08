import { supabaseClient } from "../supabaseClient";

export async function getProductsByBusiness(businessId: string)
{
    const {data, error} = await supabaseClient
    .from("products")
        .select("*")
        .eq("idBusiness", businessId)
    return data;
}

export async function getProducts(businessId: string)
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