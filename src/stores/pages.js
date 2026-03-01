import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '../helpers/supabase';
import { useQuasar } from 'quasar';
import { usePermissionsStore } from '../stores/permissions';
var $q;
export const usePagesStore = defineStore('pages', () => {
  const storePermissions = usePermissionsStore();
  const pages = ref([]);
  const showPageSpinner = ref(false);
  $q = useQuasar();

  getPageData();
  function getPageData() {
    showPageSpinner.value = true;
    pages.value = [];
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
          let llist = [];
          for (let i = 0; i < data.length; i++) {
            if (
              storePermissions.permissionsByPermission['setup'] ||
              storePermissions.permissionsByPermission['showall.pages'] ||
              storePermissions.permissionsByPermission['page.' + data[i].api_name]
            ) {
              llist.push(data[i]);
            }
          }
          pages.value = llist;
          showPageSpinner.value = false;
        } else {
          pages.value = data;
          showPageSpinner.value = false;
        }
      } catch (error) {
        console.log('pages.js: ' + error);
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
    pages,
    showPageSpinner,
    getPageData,
  };
});
