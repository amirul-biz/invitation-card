import { createClient } from "@supabase/supabase-js";
import { serverConfig } from "./config-app-environment";

const supabaseUrl = serverConfig.supabaseKey;
const supabaseAnonKey = serverConfig.supabaseAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
