import  {createClient} from 'https://esm.sh/@supabase/supabase-js'



const supUrl = 'https://shxycwgpulaaykxfkpwd.supabase.co'
const supKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoeHljd2dwdWxhYXlreGZrcHdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MjIzMjEsImV4cCI6MjA3OTk5ODMyMX0.EN-WcgudqkH0VwP6Qx6ZOcgguL479DWmtaU7pSQF41o'

//intialize
const supabase = createClient(supUrl,supKey)

console.log(supabase);

export default supabase;
