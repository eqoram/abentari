import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '../helpers/supabase';
import { useQuasar } from 'quasar';
import { usePermissionsStore } from '../stores/permissions';
var $q;
export const useactionsStore = defineStore('actions', () => {
  const storePermissions = usePermissionsStore();
  const actions = ref([]);
  const orderedactions = ref({});
  const showactionsSpinner = ref(false);
  $q = useQuasar();

  getactionsData();
  function getactionsData() {
    showactionsSpinner.value = true;
    actions.value = [];
    (async () => {
      await storePermissions.getPermissions();

      actions.value = [];
      orderedactions.value = {};
      try {
        const { data, error } = await supabase
          .from('actions')
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
              storePermissions.permissionsByPermission['showall.actions'] ||
              storePermissions.permissionsByPermission['action.' + data[i].api_name]
            ) {
              llist.push(data[i]);
            }
          }
          actions.value = llist;

          let lorderedactions = {};
          let lhelpername = '';
          let lhelperarray = [];
          for (let i = 0; i < llist.length; i++) {
            if (llist[i].relation) {
              lhelpername = llist[i].type + '__' + llist[i].relation;
            } else {
              lhelpername = llist[i].type;
            }

            if (lorderedactions[lhelpername]) {
              lhelperarray = lorderedactions[lhelpername];
              lhelperarray.push(llist[i]);
              lorderedactions[lhelpername] = lhelperarray;
            } else {
              lhelperarray = [];
              lhelperarray.push(llist[i]);
              lorderedactions[lhelpername] = lhelperarray;
            }
          }
          orderedactions.value = lorderedactions;

          showactionsSpinner.value = false;
        } else {
          actions.value = data;
          showactionsSpinner.value = false;
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
    actions,
    orderedactions,
    showactionsSpinner,
    getactionsData,
  };
});
