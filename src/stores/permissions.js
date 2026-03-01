import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '../helpers/supabase';
import { useQuasar } from 'quasar';
var $q;
export const usePermissionsStore = defineStore('permissions', () => {
  const isLoaded = ref(false);
  const isLoading = ref(false);
  const permissions = ref([]);
  const permissionsByPermission = ref({});
  const showPermissionsSpinner = ref(false);
  const userid = ref('');
  const useremail = ref('');
  const isGuest = ref(false);
  const lxuser = ref({});
  const lprofile = ref({});
  const lprofileid = ref('');
  const isUserLoggedIn = ref(false);
  $q = useQuasar();

  // Internal shared Promise
  let loadPromise = null;

  async function getPermissions() {
    if (isLoaded.value) return;

    if (loadPromise) {
      // Wait for ongoing request
      await loadPromise;
      return;
    }

    // Start fetch
    showPermissionsSpinner.value = true;
    isLoading.value = true;

    loadPromise = (async () => {
      await getOwnUser();
    })();

    // Await for first caller
    await loadPromise;
  }

  async function getOwnUser() {
    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) throw error;

      if (data != null && data.session != null) {
        // user is logged in
        userid.value = data.session.user.id;
        useremail.value = data.session.user.email;
        isUserLoggedIn.value = true;
      } else {
        // user is NOT logged in
        isGuest.value = true;
        userid.value = '00000000-0000-0000-0000-000000000000';
      }
      await getOwnXUser();
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  async function getOwnXUser() {
    try {
      let data, error;
      if (isGuest.value) {
        lprofileid.value = '43bf8fe6-9add-4ff4-b759-f8e1445f5914';
        await getOwnPermissions();
      } else {
        ({ data, error } = await supabase
          .from('xusers')
          .select('*')
          .eq('user_id', userid.value)
          .eq('is_active', true));
      }

      if (error) throw error;
      if (data && data.length > 0) {
        lxuser.value = data[0];
        lprofileid.value = data[0].profile_id;
        await getOwnPermissions();
      } else {
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  async function getOwnPermissions() {
    try {
      // console.log('alert:permission.store');
      const { data, error } = await supabase
        .from('permissions')
        .select('*')
        .eq('profile_id', lprofileid.value)
        .eq('is_active', true);
      if (error) throw error;

      permissions.value = [];
      permissionsByPermission.value = {};
      if (data && data.length > 0) {
        const lpermissions = [];
        const lpermissionsbypermission = {};

        for (let i = 0; i < data.length; i++) {
          if (data[i].is_active) {
            // console.log('m1');
            // console.log(data[i]);
            lpermissions.push(data[i]);
            lpermissionsbypermission[data[i].permission] = data[i];
          }
        }

        permissions.value = lpermissions;
        permissionsByPermission.value = lpermissionsbypermission;
      }

      isLoaded.value = true;
    } catch (err) {
      console.error('getPermissions error:', err);
    } finally {
      isLoading.value = false;
      showPermissionsSpinner.value = false;
      loadPromise = null;
    }
  }

  return {
    getPermissions,
    permissions,
    permissionsByPermission,
    isLoaded,
    isGuest,
    userid,
    useremail,
    lxuser,
    lprofile,
    lprofileid,
  };
});
