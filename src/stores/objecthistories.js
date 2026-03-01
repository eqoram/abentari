import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '../helpers/supabase';
import { useQuasar } from 'quasar';
import { usePermissionsStore } from '../stores/permissions';
var $q;
export const useObjectHistoriesStore = defineStore('objecthistories', () => {
  const storePermissions = usePermissionsStore();
  const hideHistory = ref(true);
  const isSetup = ref(false);
  const historyfilter = ref({});
  const histories = ref([]);
  const showObjecthistoriesSpinner = ref(false);

  $q = useQuasar();

  let getAllHistories = false;

  getObjectHistories();
  function getObjectHistories() {
    showObjecthistoriesSpinner.value = true;

    (async () => {
      await storePermissions.getPermissions();

      try {
        const { data, error } = await supabase
          .from('objecthistories')
          .select('*')
          // .neq('api_name', 'c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413')
          .order('name', { ascending: true });

        if (error) throw error;

        if (data !== undefined && data != null && data.length > 0) {
          let llist = [];
          for (let i = 0; i < data.length; i++) {
            if (
              storePermissions.permissionsByPermission['setup'] ||
              storePermissions.permissionsByPermission['showall.objecthistories'] ||
              storePermissions.permissionsByPermission[data[i].api_name + '.all.select']
            ) {
              llist.push(data[i]);
              hideHistory.value = false;
            }
          }
          histories.value = llist;
          showObjecthistoriesSpinner.value = false;
        } else {
          histories.value = data;
          showObjecthistoriesSpinner.value = false;
        }
      } catch (error) {
        console.log('objecthistories.js: ' + error);
        $q.notify({
          type: 'negative',
          message: error?.message
            ? 'Something went wrong.' + ' (' + error.message + ')'
            : 'Something went wrong.',
        });
      } finally {
        //getSetupData();
      }

      // historyfilter.value = {};
      // let lhistoryfilter = {};
      // if (storePermissions.permissionsByPermission['setup']) {
      //   isSetup.value = true;
      //   hideHistory.value = false;
      // } else {
      //   let lpermissions = storePermissions.permissions;
      //   let lpermissionsbypermission = storePermissions.permissionsByPermission;

      //   for (let i = 0; i < lpermissions.length; i++) {
      //     if (lpermissions[i].permission.startsWith('h_')) {
      //       // console.log('n1');
      //       // console.log('c_' + lpermissions[i].permission.slice(2));
      //       let lhelper1 = lpermissions[i].permission.slice(2).split('.');
      //       if (lpermissionsbypermission['c_' + lpermissions[i].permission.slice(2)]) {
      //         lhistoryfilter['c_' + lpermissions[i].permission.slice(2)] = true;
      //         hideHistory.value = false;
      //       }
      //     }
      //   }
      //   historyfilter.value = lhistoryfilter;
      // }
    })();
  }

  return {
    hideHistory,
    getObjectHistories,
    isSetup,
    historyfilter,
    histories,
    showObjecthistoriesSpinner,
  };
});
