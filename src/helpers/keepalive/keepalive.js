console.log('start');

let lsupabaseurl = '';
let lsupabasekey = '';
lsupabaseurl = process.env.PSUPABASEURL;
lsupabasekey = process.env.PSUPABASEKEY;
console.log('PARAMETERURL: ' + lsupabaseurl);
console.log('PARAMETERKEY: ' + lsupabasekey);

const now = new Date();
const numericDateTime =
  now.getUTCFullYear().toString() +
  String(now.getUTCMonth() + 1).padStart(2, '0') +
  String(now.getUTCDate()).padStart(2, '0') +
  String(now.getUTCHours()).padStart(2, '0') +
  String(now.getUTCMinutes()).padStart(2, '0') +
  String(now.getUTCSeconds()).padStart(2, '0');
console.log('DATETIME: ' + Number(numericDateTime));

let lrunscript = '';
lrunscript = process.env.PRUNSCRIPT;
console.log('PARAMETERRUNSCRIPT: ' + lrunscript);

if (lrunscript == 'yes') {
  fetch(lsupabaseurl + '/rest/v1/keepalive?id=eq.9f5630bc-9b63-4053-9ceb-ee31345072bb', {
    method: 'PATCH',
    headers: {
      apikey: lsupabasekey,
      Authorization: 'Bearer ' + lsupabasekey,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      currentdatetime: Number(numericDateTime),
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log('SUPABASE: Updated row: ', data))
    .catch((error) => console.error('SUPABASE: Error: ', error));
}
