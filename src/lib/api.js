import { createClient } from "@supabase/supabase-js";
import { supabase_key } from "./constants";

export const supabase = createClient("https://ktarzedewanwgktunvta.supabase.co", supabase_key);
