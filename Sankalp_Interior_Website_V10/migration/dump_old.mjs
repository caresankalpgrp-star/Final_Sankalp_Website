import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const OLD_URL = 'https://auwnsmyvokjlmfmnpedi.supabase.co';
const OLD_SRK = 'sb_secret_F_OVOPeuyoL5ON860WRjaQ_i04u0bUa';
const client = createClient(OLD_URL, OLD_SRK);

const tables = ['auth_users', 'blog_posts', 'catalogs', 'leads', 'projects', 'services', 'testimonials'];
const dump = {};
for (const t of tables) {
  const { data, error } = await client.from(t).select('*');
  if (error) { console.log(`ERROR ${t}:`, error.message); dump[t] = { error: error.message }; }
  else { console.log(`${t}: ${data.length} rows`); dump[t] = data; }
}
fs.writeFileSync('/app/migration/old_dump.json', JSON.stringify(dump, null, 2));
console.log('DONE');
