import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '../helpers/supabase';
import { useQuasar } from 'quasar';
import { usePermissionsStore } from '../stores/permissions';
var $q;
export const useAppsStore = defineStore('apps', () => {
  const storePermissions = usePermissionsStore();
  const apps = ref([]);
  const showAppSpinner = ref(false);
  const itemsByAppId = ref({});
  const pagesById = ref({});
  const objectsById = ref({});
  $q = useQuasar();

  getAppData();
  function getAppData() {
    showAppSpinner.value = true;
    apps.value = [];
    itemsByAppId.value = {};
    pagesById.value = {};
    objectsById.value = {};
    getPages();
  }

  function getPages() {
    (async () => {
      await storePermissions.getPermissions();

      try {
        const { data, error } = await supabase
          .from('pages')
          .select('*')
          .eq('is_active', true)
          // .neq('api_name', 'c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413')
          .order('name', { ascending: true });

        if (error) throw error;

        if (data !== undefined && data != null && data.length > 0) {
          let larray = {};
          for (let i = 0; i < data.length; i++) {
            if (
              storePermissions.permissionsByPermission['setup'] ||
              storePermissions.permissionsByPermission['page.' + data[i].api_name]
            ) {
              larray[data[i].id] = data[i];
            }
          }
          pagesById.value = larray;
          getObjects();
        } else {
          getObjects();
        }
      } catch (error) {
        console.log('apps1.js: ' + error);
        $q.notify({
          type: 'negative',
          message: error?.message
            ? 'Something went wrong.' + ' (' + error.message + ')'
            : 'Something went wrong.',
        });
      } finally {
        //getSetupData();
      }
    })();
  }

  function getObjects() {
    (async () => {
      try {
        const { data, error } = await supabase
          .from('objects')
          .select('*')
          // .neq('api_name', 'c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413')
          .order('name', { ascending: true });

        if (error) throw error;

        if (data !== undefined && data != null && data.length > 0) {
          let larray = {};
          for (let i = 0; i < data.length; i++) {
            if (
              storePermissions.permissionsByPermission['setup'] ||
              storePermissions.permissionsByPermission['showall.apps'] ||
              storePermissions.permissionsByPermission[data[i].api_name + '.all.select'] ||
              storePermissions.permissionsByPermission[data[i].api_name + '.all.insert'] ||
              storePermissions.permissionsByPermission[data[i].api_name + '.all.update'] ||
              storePermissions.permissionsByPermission[data[i].api_name + '.all.delete'] ||
              storePermissions.permissionsByPermission[data[i].api_name + '.owner.select'] ||
              storePermissions.permissionsByPermission[data[i].api_name + '.owner.insert'] ||
              storePermissions.permissionsByPermission[data[i].api_name + '.owner.update'] ||
              storePermissions.permissionsByPermission[data[i].api_name + '.owner.delete']
            ) {
              larray[data[i].id] = data[i];
            }
          }
          objectsById.value = larray;
          getApps();
        } else {
          getApps();
        }
      } catch (error) {
        console.log('apps2.js: ' + error);
        $q.notify({
          type: 'negative',
          message: error?.message
            ? 'Something went wrong.' + ' (' + error.message + ')'
            : 'Something went wrong.',
        });
      } finally {
        //getSetupData();
      }
    })();
  }

  function getApps() {
    (async () => {
      try {
        const { data, error } = await supabase
          .from('apps')
          .select('*')
          .eq('is_active', true)
          // .neq('api_name', 'c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413')
          .order('name', { ascending: true });

        if (error) throw error;

        if (data !== undefined && data != null && data.length > 0) {
          let llist = [];
          let llist2 = [];
          let llist3 = [];
          let ljson = {};
          for (let i = 0; i < data.length; i++) {
            if (
              storePermissions.permissionsByPermission['setup'] ||
              storePermissions.permissionsByPermission['app.' + data[i].api_name]
            ) {
              llist.push(data[i]);

              llist3 = [];
              llist2 = data[i].items_selected;
              for (let j = 0; j < llist2.length; j++) {
                if (pagesById.value[llist2[j]]) {
                  llist3.push(pagesById.value[llist2[j]]);
                }
                if (objectsById.value[llist2[j]]) {
                  llist3.push(objectsById.value[llist2[j]]);
                }
              }
              ljson[data[i].id] = llist3;
            }
          }
          apps.value = llist;
          itemsByAppId.value = ljson;
          showAppSpinner.value = false;
        } else {
          apps.value = data;
          showAppSpinner.value = false;
        }
      } catch (error) {
        console.log('apps.js: ' + error);
        $q.notify({
          type: 'negative',
          message: error?.message
            ? 'Something went wrong.' + ' (' + error.message + ')'
            : 'Something went wrong.',
        });
      } finally {
        //getSetupData();
      }
    })();
  }

  return {
    apps,
    showAppSpinner,
    getAppData,
    itemsByAppId,
  };
});
