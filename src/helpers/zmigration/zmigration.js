console.log('start');

let lsupabaseurl = '';
let lsupabasekey = '';
lsupabaseurl = process.env.PSUPABASEURL;
lsupabasekey = process.env.PSUPABASEKEY;
console.log('PARAMETERURL: ' + lsupabaseurl);
console.log('PARAMETERKEY: ' + lsupabasekey);

let lrunscript = '';
lrunscript = process.env.PRUNSCRIPT;
console.log('PARAMETERRUNSCRIPT: ' + lrunscript);

if (lrunscript == 'yes') {
  fetch(lsupabaseurl + '/rest/v1/rpc/run_remote_migrations_http', {
    method: 'POST',
    headers: {
      apikey: lsupabasekey,
      Authorization: 'Bearer ' + lsupabasekey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}), // Pass an empty object for functions with no arguments
  })
    .then((response) => {
      if (!response.ok) throw new Error('HTTP error ' + response.status);
      return response.json();
    })
    .then((data) => console.log('SUPABASE: Function executed successfully:', data))
    .catch((error) => console.error('SUPABASE: Error invoking function:', error));
}
