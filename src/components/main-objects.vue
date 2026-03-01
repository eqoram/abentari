<!--
http://localhost:8080/#/main/objects/test/
-->
<template>
  <button-back pmaincolor="primary" pguest="pguest"></button-back>
  <blank-bar
    pbgcolor="bg-primary"
    :ptext="objectname"
    :pdisplayactions="true"
    :pactionparameter="'pagelist__' + objectapiname"
  ></blank-bar>
  <tab-bar
    pcolor="primary"
    :ptab="tab"
    :ptaboptions="tabOptions"
    @updatevalue="tab = $event"
    :ptabalways="true"
  ></tab-bar>
  <div v-if="showElements">
    <q-scroll-area style="height: calc(100dvh - 137.01px); contain: style">
      <div class="q-pt-md q-pb-md q-ml-md q-mr-md">
        <div v-if="nopermissions">
          <h6 style="text-align: center">no permissions</h6>
        </div>
        <div v-else>
          <list-item
            pidentifier="id"
            pname="name"
            :pdetaillink="plinkobjectdetail"
            :ploaddata="true"
            :pobject="objectapiname"
            porderby="created_at"
            :porderasc="orderasc"
            :pshowaddbutton="true"
            :paddbuttonurl="plinkobjectdetail"
            pmaincolor="primary"
            :pallow-s-e-l-e-c-t="allowSELECT"
            :pallow-i-n-s-e-r-t="allowINSERT"
            :pshowcounter="showcounter"
            :pshowsearch="showsearch"
          ></list-item>
        </div></div
    ></q-scroll-area>
  </div>
  <div v-else>
    <div style="margin-left: 40%; width: 20%; margin-top: 20dvh">
      <div style="height: 10dvh">
        <q-spinner color="primary" size="100%" :thickness="2" />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonBack from 'components/button-back.vue';
import BlankBar from 'components/blank-bar.vue';
import TabBar from 'components/tab-bar.vue';
import ListItem from 'components/list-item.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { supabase } from '../helpers/supabase';
import { usePermissionsStore } from '../stores/permissions';
var $q;
export default {
  inheritAttrs: false,
  // name: 'ComponentName',
  props: {
    pguest: {
      type: Boolean,
      default: false,
    },
    plinkobject: {
      type: String,
      default: 'main-objects',
    },
    plinkobjectdetail: {
      type: String,
      default: 'main-objects-detail',
    },
  },
  components: { ButtonBack, BlankBar, TabBar, ListItem },
  setup(props) {
    $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const showElements = ref(false);
    const userid = ref('');
    const useremail = ref('');
    const objectname = ref('loading...');
    const objectapiname = ref('');
    const tab = ref('loading...');
    const tabOptions = ref([{ name: 'loading...' }]);
    const allowSELECT = ref(false);
    const allowINSERT = ref(false);
    const allowUPDATE = ref(false);
    const allowDELETE = ref(false);
    const nopermissions = ref(false);
    const storePermissions = usePermissionsStore();
    const showsearch = ref(false);
    const showcounter = ref(false);
    const orderasc = ref(false);

    onMounted(() => {
      if (props.pguest) {
        getPermissions();
      } else {
        checkIfUserIsLoggedIn();
      }
    });

    function checkIfUserIsLoggedIn() {
      (async () => {
        await storePermissions.getPermissions();

        try {
          const { data, error } = await supabase.auth.getSession();

          if (error) throw error;

          if (data != null && data.session != null) {
            // user is logged in
            userid.value = data.session.user.id;
            useremail.value = data.session.user.email;
            getPermissions();
          } else {
            // user is NOT logged in
            router.replace({ name: 'start-login' });
          }
        } catch (error) {
          console.log(error);
          router.replace({ name: 'start-login' });
        } finally {
        }
      })();
    }

    function getPermissions() {
      (async () => {
        await storePermissions.getPermissions();
        objectapiname.value = route.params.objectapiname;
        try {
          let lpermissionhelper = storePermissions.permissions;

          if (
            lpermissionhelper !== undefined &&
            lpermissionhelper != null &&
            lpermissionhelper.length > 0
          ) {
            for (let i = 0; i < lpermissionhelper.length; i++) {
              if (
                lpermissionhelper[i].permission == objectapiname.value + '.all.select' ||
                lpermissionhelper[i].permission == objectapiname.value + '.owner.select' ||
                lpermissionhelper[i].permission == 'setup'
              ) {
                allowSELECT.value = true;
              }
              if (
                lpermissionhelper[i].permission == objectapiname.value + '.all.insert' ||
                lpermissionhelper[i].permission == objectapiname.value + '.owner.insert' ||
                lpermissionhelper[i].permission == 'setup'
              ) {
                allowINSERT.value = true;
              }
              if (
                lpermissionhelper[i].permission == objectapiname.value + '.all.update' ||
                lpermissionhelper[i].permission == objectapiname.value + '.owner.update' ||
                lpermissionhelper[i].permission == 'setup'
              ) {
                allowUPDATE.value = true;
              }
              if (
                lpermissionhelper[i].permission == objectapiname.value + '.all.delete' ||
                lpermissionhelper[i].permission == objectapiname.value + '.owner.delete' ||
                lpermissionhelper[i].permission == 'setup'
              ) {
                allowDELETE.value = true;
              }
            }

            getObjectMetaData();
          } else {
            // permission does NOT exist
            nopermissions.value = true;
            showElements.value = true;
          }
        } catch (error) {
          console.log(error);
          $q.notify({
            type: 'negative',
            message: error?.message
              ? 'Something went wrong.' + ' (' + error.message + ')'
              : 'Something went wrong.',
          });
        } finally {
        }
      })();
    }

    function getObjectMetaData() {
      (async () => {
        try {
          const { data, error } = await supabase
            .from('objects')
            .select('*')
            .eq('api_name', objectapiname.value);

          if (error) throw error;

          if (data !== undefined && data != null && data.length > 0) {
            // object does exist
            objectname.value = data[0].name;
            showcounter.value = data[0].show_counter;
            showsearch.value = data[0].show_search;
            orderasc.value = data[0].order_asc;
            tab.value = 'all ' + objectname.value;
            tabOptions.value = [{ name: 'all ' + objectname.value }];
            showElements.value = true;
          } else {
            // object does NOT exist
            console.log('main-objects.vue error1');
            $q.notify({
              type: 'negative',
              message: error?.message
                ? 'Something went wrong.' + ' (' + error.message + ')'
                : 'Something went wrong.',
            });
          }
        } catch (error) {
          console.log(error);
          $q.notify({
            type: 'negative',
            message: error?.message
              ? 'Something went wrong.' + ' (' + error.message + ')'
              : 'Something went wrong.',
          });
        } finally {
          //showElements.value = true;
        }
      })();
    }

    return {
      showElements,
      objectname,
      objectapiname,
      tab,
      tabOptions,
      allowSELECT,
      allowINSERT,
      allowUPDATE,
      allowDELETE,
      nopermissions,
      showsearch,
      showcounter,
      orderasc,
    };
  },
};
</script>
