import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '../helpers/supabase';
import { useQuasar } from 'quasar';
import { usePermissionsStore } from '../stores/permissions';
var $q;
export const useObjectsStore = defineStore('objects', () => {
  const storePermissions = usePermissionsStore();
  const objects = ref([]);
  const showObjectSpinner = ref(false);
  $q = useQuasar();
  const hideObject = ref(true);

  getObjectData();
  function getObjectData() {
    showObjectSpinner.value = true;
    objects.value = [];
    (async () => {
      await storePermissions.getPermissions();

      try {
        const { data, error } = await supabase
          .from('objects')
          .select('*')
          // .neq('api_name', 'c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413')
          .order('name', { ascending: true });

        if (error) throw error;

        if (data !== undefined && data != null && data.length > 0) {
          let llist = [];
          for (let i = 0; i < data.length; i++) {
            if (
              storePermissions.permissionsByPermission['setup'] ||
              storePermissions.permissionsByPermission['showall.objects'] ||
              storePermissions.permissionsByPermission[data[i].api_name + '.all.select'] ||
              storePermissions.permissionsByPermission[data[i].api_name + '.all.insert'] ||
              storePermissions.permissionsByPermission[data[i].api_name + '.all.update'] ||
              storePermissions.permissionsByPermission[data[i].api_name + '.all.delete'] ||
              storePermissions.permissionsByPermission[data[i].api_name + '.owner.select'] ||
              storePermissions.permissionsByPermission[data[i].api_name + '.owner.insert'] ||
              storePermissions.permissionsByPermission[data[i].api_name + '.owner.update'] ||
              storePermissions.permissionsByPermission[data[i].api_name + '.owner.delete']
            ) {
              llist.push(data[i]);
            }
          }
          objects.value = llist;
          showObjectSpinner.value = false;
        } else {
          objects.value = data;
          showObjectSpinner.value = false;
        }
      } catch (error) {
        console.log('objects.js: ' + error);
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
    objects,
    showObjectSpinner,
    getObjectData,
    hideObject,
  };
});
