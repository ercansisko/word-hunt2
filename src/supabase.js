import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jyrrcacvdsvcactfppev.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5cnJjYWN2ZHN2Y2FjdGZwcGV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI5MDMyOTAsImV4cCI6MjAxODQ3OTI5MH0.Rr7IMlk8OCDaN1XBWrzpwkmYuxd2rF0HMvyVMegg59g";
export const supabase = createClient(supabaseUrl, supabaseKey);
