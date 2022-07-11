import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fpnxfacxjubvouiewpad.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNTU0MjA0NywiZXhwIjoxOTUxMTE4MDQ3fQ.SaXxPherpBrYQ6674hUOGlmfLs22Z8MDhpIMsNKUP2o";

export default createClient(supabaseUrl, supabaseAnonKey);
