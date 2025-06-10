import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://bkyihueafbhiysetzqrd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJreWlodWVhZmJoaXlzZXR6cXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzE2NjQsImV4cCI6MjA2MjQ0NzY2NH0.8jQVGGRdAwmR6vQzUmdZvTp9CXXJPaXh790qboTOAMg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
