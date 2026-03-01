// NOTICE: BE VERY CAUTIOUS WHEN USING THIS SCRIPT
// setup permission needed

import { createClient } from '@supabase/supabase-js';
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

let BUCKET = null;
let BATCHSIZE = null;
let DELAY = null;

let counter1 = 0;
let counter2 = 0;

//let fileinsomefield = {};

let allSetFileFieldString = {};
let allFiles = [];
let allDeletedFiles = [];
let allNOTDeletedFiles = [];

let ldebug = 'no';
ldebug = process.env.PDEBUG;
let ldebugmode = false;
if (ldebug == 'yes') {
  ldebugmode = true;
}

let ldelete = 'no';

let supabase = null;
let lsupabaseusername = null;
let lsupabasepassword = null;

if (lrunscript == 'yes') {
  console.log('deploy: start');

  try {
    run_filedeletion(
      process.env.PDEBUG,
      process.env.PSUPABASEURL,
      process.env.PSUPABASEKEY,
      process.env.PSUPABASEUSERNAME,
      process.env.PSUPABASEPASSWORD,
      process.env.PBUCKET,
      process.env.PBATCHSIZE,
      process.env.PDELAY,
      process.env.PDELETE,
    );
  } catch (e) {
    console.log('error');
  }
}

export async function run_filedeletion(
  pdebug,
  psupabaseurl,
  psupabasekey,
  psupabaseusername,
  psupabasepassword,
  pbucket,
  pbatchsize,
  pdelay,
  pdelete,
) {
  if (pdebug == 'yes') {
    ldebugmode = true;
  }

  lsupabaseurl = null;
  lsupabasekey = null;
  lsupabaseurl = psupabaseurl;
  lsupabasekey = psupabasekey;
  ldebugmode ? console.log('lsupabaseurl: ' + lsupabaseurl) : null;
  ldebugmode ? console.log('lsupabasekey: ' + lsupabasekey) : null;

  lsupabaseusername = null;
  lsupabasepassword = null;
  lsupabaseusername = psupabaseusername;
  lsupabasepassword = psupabasepassword;

  BUCKET = null;
  BATCHSIZE = null;
  DELAY = null;
  BUCKET = pbucket;
  BATCHSIZE = pbatchsize;
  DELAY = pdelay;

  ldelete = pdelete;

  //fileinsomefield = {};

  allSetFileFieldString = {};
  allFiles = [];
  allDeletedFiles = [];
  allNOTDeletedFiles = [];

  await login_user();
}

async function login_user() {
  supabase = createClient(lsupabaseurl, lsupabasekey);

  const { data, error } = await supabase.auth.signInWithPassword({
    email: lsupabaseusername,
    password: lsupabasepassword,
  });

  if (data && data.user) {
    //luserid = data.user.id;
    const batch = [];

    await listAndProcessFiles({
      bucket: BUCKET,
      batch,
      BATCH_SIZE: BATCHSIZE,
      PAUSE_MS: DELAY,
    });

    if (batch.length > 0) {
      await processbatch(batch);
    }

    console.log('-----FINALSTATS-----');
    console.log('NUMBER OF BATCHES: counter1');
    console.log(counter1);
    console.log('NUMBER OF FILES: counter2');
    console.log(counter2);

    // console.log('fileinsomefield');
    // console.log(fileinsomefield);

    console.log('allSetFileFieldString');
    console.log(allSetFileFieldString);

    console.log('allFiles');
    console.log(allFiles);
    console.log(allFiles.length);

    console.log('allNOTDeletedFiles');
    console.log(allNOTDeletedFiles);
    console.log(allNOTDeletedFiles.length);

    console.log('allDeletedFiles');
    console.log(allDeletedFiles);
    console.log(allDeletedFiles.length);

    console.log('✅ All files processed');
  } else {
    console.log('login_user: error');
  }
}

// 1. get all files in storage bucket with pagination
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function listAndProcessFiles({
  bucket,
  path = '',
  batch = [],
  BATCH_SIZE = 100,
  PAUSE_MS = 1000,
}) {
  let offset = 0;

  while (true) {
    const { data, error } = await supabase.storage.from(bucket).list(path, { limit: 100, offset });
    if (error) throw error;
    if (!data || data.length === 0) break;

    for (const item of data) {
      const fullPath = path ? `${path}/${item.name}` : item.name;

      if (item.metadata === null) {
        // Folder → recurse
        await listAndProcessFiles({
          bucket,
          path: fullPath,
          batch,
          BATCH_SIZE,
          PAUSE_MS,
        });
      } else {
        batch.push(fullPath);

        counter2 = counter2 + 1;

        // 🚀 Process batch
        if (batch.length >= BATCH_SIZE) {
          await processbatch(batch);
          batch.length = 0; // clear batch
          await sleep(PAUSE_MS);
        }
      }
    }

    if (data.length < 100) break;
    offset += data.length;
  }
}

async function processbatch(pbatch) {
  counter1 = counter1 + 1;
  console.log(counter1 + '.BATCH----------');

  console.log('pbatch');
  console.log(pbatch);

  let fields = await getFileFields();
  console.log('fields');
  console.log(fields);

  // if (pbatch.length > 0 && fields.length > 0) {
  //   for (let i = 0; i < pbatch.length; i++) {
  //     for (let j = 0; j < fields.length; j++) {
  //       let { data, error } = await supabase
  //         .from(fields[j].parent_apiname)
  //         .select('*')
  //         .eq(fields[j].api_name, pbatch[i]);

  //       if (!error && data.length > 0) {
  //         fileinsomefield[pbatch[i]] = true;
  //       }
  //     }
  //   }
  // }

  for (let i = 0; i < fields.length; i++) {
    let { data, error } = await supabase.from(fields[i].parent_apiname).select('*');

    if (error) throw error;

    if (data.length > 0) {
      for (let j = 0; j < data.length; j++) {
        allSetFileFieldString[data[j][fields[i].api_name]] = true;
      }
    }
  }

  let deletedbatchfiles = [];
  for (let k = 0; k < pbatch.length; k++) {
    if (allSetFileFieldString[pbatch[k]]) {
      allFiles.push(pbatch[k]);
      allNOTDeletedFiles.push(pbatch[k]);
    } else {
      allFiles.push(pbatch[k]);
      allDeletedFiles.push(pbatch[k]);
      deletedbatchfiles.push(pbatch[k]);
    }
  }

  if (ldelete == 'yes' && deletedbatchfiles.length) {
    let { data, error } = await supabase.storage.from(BUCKET).remove(deletedbatchfiles);

    if (error) throw error;
  }

  console.log('deletedbatchfiles');
  console.log(deletedbatchfiles);

  console.log('----------ENDBATCH');
}

export async function getFileFields() {
  let { data, error } = await supabase.from('fields').select('*').eq('type', 'file');

  if (error) throw error;

  return data;
}

// 2. get all file fields
// 3. check if any file fields contains the fileid
// 4. add to delete if does not exist
// 5. bulk delete list
