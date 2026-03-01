import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { LocalStorage } from 'quasar';

let lenvironment = '';
let lSupabaselink = ''; //LocalStorage.getItem("supabaselink");
let lSupabasekey = ''; //LocalStorage.getItem("supabasekey");
let lSupabase;

if (process.env.PSUPABASE == 'yes') {
  lenvironment = process.env.PSUPABASEENVIRONMENT;
  lSupabaselink = process.env.PSUPABASELINK;
  lSupabasekey = process.env.PSUPABASEKEY;
} else {
  lenvironment = 'dev';
  lSupabaselink = 'http://127.0.0.1:54321';
  lSupabasekey = 'sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH';
}

if (
  lSupabaselink &&
  lSupabasekey &&
  lSupabaselink != null &&
  lSupabasekey != null &&
  lSupabaselink !== 'null' &&
  lSupabasekey !== 'null'
) {
  lSupabase = createClient(lSupabaselink, lSupabasekey);
}

export const environment = lenvironment;
export const supabaseUrl = lSupabaselink;
export const supabaseAnonKey = lSupabasekey;

export const supabase = lSupabase;
