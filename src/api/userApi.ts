import { supabaseClient } from "../supabaseClient";

export async function GetUserByLogin(usuario: string, password: string) {
  const { data, error } = await supabaseClient
    .from("usuarios")
    .select("*")
    .eq("usuario", usuario)
    .eq("password", password);
  return data ? data[0] : {};
}


