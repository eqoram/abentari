<!--
http://localhost:8080/#/main/objects/test/
-->
<template>
  <button-back v-if="!pguest" :pmaincolor="pmaincolor"></button-back>
  <blank-bar :pbgcolor="'bg-' + pmaincolor" :ptext="objectname"></blank-bar>
  <tab-bar
    :pcolor="pmaincolor"
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
            :psearch="false"
            :pdetaillink="plinkobjectdetail"
            :ploaddata="true"
            :pobject="objectapiname"
            porderby="changed_at"
            :porderasc="false"
            :pshowaddbutton="true"
            :paddbuttonurl="plinkobjectdetail"
            :pmaincolor="pmaincolor"
            :pallow-s-e-l-e-c-t="allowSELECT"
            :pallow-i-n-s-e-r-t="allowINSERT"
            :phistory="true"
            prangecolumn="changed_at"
            psearchcolumn="parent_id"
            psearchlabel="record id"
            :psearchwebsearch="false"
            :psetup="psetup"
          ></list-item>
        </div></div
    ></q-scroll-area>
  </div>
  <div v-else>
    <div style="margin-left: 40%; width: 20%; margin-top: 20dvh">
      <div style="height: 10dvh">
        <q-spinner :color="pmaincolor" size="100%" :thickness="2" />
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
var $q;
export default {
  inheritAttrs: false,
  // name: 'ComponentName',
  props: {
    psetup: {
      type: Boolean,
      default: false,
    },
    psearch: {
      type: Boolean,
      default: true,
    },
    pmaincolor: {
      type: String,
      default: 'primary',
    },
    pguest: {
      type: Boolean,
      default: false,
    },
    plinkobject: {
      type: String,
      default: 'main-history',
    },
    plinkobjectdetail: {
      type: String,
      default: 'main-history-detail',
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
    const allowSELECT = ref(true);
    const allowINSERT = ref(false);
    const allowUPDATE = ref(false);
    const allowDELETE = ref(false);
    const nopermissions = ref(false);

    onMounted(() => {
      if (props.psetup) {
        objectapiname.value = route.params.objectapiname;
      } else {
        objectapiname.value = route.params.objectapiname;
      }

      if (props.pguest) {
        getObjectMetaData();
      } else {
        checkIfUserIsLoggedIn();
      }
    });

    function checkIfUserIsLoggedIn() {
      (async () => {
        try {
          const { data, error } = await supabase.auth.getSession();

          if (error) throw error;

          if (data != null && data.session != null) {
            // user is logged in
            userid.value = data.session.user.id;
            useremail.value = data.session.user.email;

            if (props.psetup) {
              getSetupMetaData();
            } else {
              getObjectMetaData();
            }
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

    function getSetupMetaData() {
      objectname.value = objectapiname.value.slice(2);
      tab.value = 'history';
      tabOptions.value = [{ name: 'history' }];
      showElements.value = true;
    }

    function getObjectMetaData() {
      (async () => {
        try {
          let mobjectname = 'h_' + objectapiname.value.slice(2);

          const { data, error } = await supabase
            .from('objecthistories')
            .select('*')
            .eq('api_name', mobjectname);

          if (error) throw error;

          if (data !== undefined && data != null && data.length > 0) {
            // object does exist
            objectname.value = data[0].name;
            tab.value = 'history';
            tabOptions.value = [{ name: 'history' }];
            showElements.value = true;
          } else {
            // object does NOT exist
            console.log('main-history.vue error1');
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
    };
  },
};
</script>
