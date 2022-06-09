import { supabaseClient } from "../supabaseClient";

export async function getNewsByBusiness(){
    const {data, error} = await supabaseClient
    .from("business")
    .select(`
        id,
        name,
        news(
            id,
            urlPicture,
            shortDescription,
            longDescription,
            idBusiness,
            created_at
        )
    `)
    return data;
}