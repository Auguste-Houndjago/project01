import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsa2hza3B0amxoYWZyeGJhamNoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTQ1MDYyNCwiZXhwIjoyMDQ3MDI2NjI0fQ.U5cIaDcgKg81pWUtc8MaasooEDbMlhZkAdMrNURK8uw";

export const supabase = createClient(supabaseUrl, supabaseKey);
