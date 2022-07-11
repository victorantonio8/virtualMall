import supabaseClient from "../supabaseClient";
import { uploadImage } from "./productsApi";

export async function getNewsByBusiness() {
  const { data, error } = await supabaseClient.from("business").select(`
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
    `);
  return data;
}

export async function getNewsByBusinessId() {
  const idBusiness = localStorage.getItem("idBusiness");
  const { data } = await supabaseClient
    .from("news")
    .select(
      `
        id,
        urlPicture,
        shortDescription,
        longDescription
    `
    )
    .eq("idBusiness", idBusiness);
  return data ?? [];
}

export async function deleteNews(id: string) {
  await supabaseClient.from("news").delete().match({ id });
}

export async function createNews(news: any) {
  const urlPicture = await uploadImage(news.urlPicture);
  const idBusiness = localStorage.getItem("idBusiness");

  await supabaseClient.from("news").insert({
    ...news,
    urlPicture,
    idBusiness,
  });
}
