<template>
  <div>
    <q-page-sticky
      style="
        z-index: 99;
        padding-top: constant(safe-area-inset-top);
        padding-top: env(safe-area-inset-top);
      "
      position="top-left"
      :offset="[80, 20]"
    >
      <q-btn fab color="secondary" @click="backButton()">
        <q-icon name="arrow_back_ios_new" class="text-white" />
      </q-btn>
    </q-page-sticky>
  </div>
  <blank-bar pbgcolor="bg-secondary" ptext="objects"></blank-bar>
  <tab-bar
    :ptab="tab"
    :ptaboptions="tabOptions"
    @updatevalue="tab = $event"
    :ptabalways="true"
    :pshowtabs="showTabs"
  ></tab-bar>
  <div v-if="showElements">
    <q-scroll-area style="height: calc(100dvh - 137.01px); contain: style">
      <div class="q-pt-md q-pb-md q-ml-md q-mr-md">
        <div v-if="tab == 'general' || tab == 'new'">
          <detail-main
            :psetup="true"
            pmaincolor="secondary"
            pobject="objects"
            psingular="object"
            :pelements="[
              {
                label: 'id',
                name: 'id',
                type: 'id',
                value: null,
                required: true,
                notEditable: true,
              },
              {
                label: 'api_name',
                name: 'api_name',
                type: 'api',
                value: null,
                prefix: 'c_',
                required: true,
                notEditable: true,
              },
              {
                type: 'p',
                text: 'NOTICE: the api_name will be used for the public table name',
              },
              {
                label: 'created_by',
                name: 'created_by',
                type: 'readonlycopy',
                value: null,
              },
              {
                label: 'created_at',
                name: 'created_at',
                type: 'readonlycopy',
                value: null,
              },
              {
                label: 'modified_by',
                name: 'modified_by',
                type: 'readonlycopy',
                value: null,
              },
              {
                label: 'modified_at',
                name: 'modified_at',
                type: 'readonlycopy',
                value: null,
              },
              {
                label: 'name',
                name: 'name',
                type: 'text',
                value: null,
                required: true,
              },
              {
                label: 'description',
                name: 'description',
                type: 'longtext',
                value: null,
                required: false,
              },
              {
                label: 'history',
                name: 'history',
                type: 'bool',
                value: true,
                required: true,
              },
              {
                type: 'p',
                text: 'NOTICE: when deactivating all history records will be deleted',
              },
              {
                label: 'show_id',
                name: 'show_id',
                type: 'bool',
                value: true,
                required: true,
              },
              {
                label: 'show_createdby',
                name: 'show_createdby',
                type: 'bool',
                value: false,
                required: true,
              },
              {
                label: 'show_createdat',
                name: 'show_createdat',
                type: 'bool',
                value: false,
                required: true,
              },
              {
                label: 'show_modifiedby',
                name: 'show_modifiedby',
                type: 'bool',
                value: false,
                required: true,
              },
              {
                label: 'show_modifiedat',
                name: 'show_modifiedat',
                type: 'bool',
                value: false,
                required: true,
              },
              {
                label: 'show_owner',
                name: 'show_owner',
                type: 'bool',
                value: false,
                required: true,
              },
              {
                label: 'show_name',
                name: 'show_name',
                type: 'bool',
                value: true,
                required: true,
              },
              {
                type: 'p',
                text: 'NOTICE: if you dont show the name field you need some kind of logic to set it as the field is required and therefore throws an error when not set',
              },
              {
                label: 'show_counter',
                name: 'show_counter',
                type: 'bool',
                value: true,
                required: true,
              },
              {
                label: 'show_search',
                name: 'show_search',
                type: 'bool',
                value: true,
                required: true,
              },
              {
                label: 'order_asc',
                name: 'order_asc',
                type: 'bool',
                value: false,
                required: true,
              },
              {
                label: 'fields_selected',
                name: 'fields_selected',
                type: 'relationmulti',
                value: null,
                required: false,
                load: true,
                loadtable: 'fields',
                loadcolumn: 'name',
                loadvalue: 'id',
                loadfilter: true,
                loadfilterbycolumn: 'parent_id',
                loadfilterbyvalue: parameterid,
                testid: 'fieldsorder',
                phideiframebutton: true,
              },
              {
                label: 'trigger_checkrequired',
                name: 'trigger_checkrequired',
                type: 'bool',
                value: true,
                required: true,
              },
              {
                type: 'p',
                text: 'NOTICE: checks if all required fields are set before inserting or updating',
              },
              {
                label: 'trigger_checkdropdown',
                name: 'trigger_checkdropdown',
                type: 'bool',
                value: true,
                required: true,
              },
              {
                type: 'p',
                text: 'NOTICE: checks if all dropdown items (picklist, picklistmulti, relation and relationmulti) are valid and not inactive or deleted  before inserting or updating',
              },
              {
                label: 'trigger_deletepicklist',
                name: 'trigger_deletepicklist',
                type: 'bool',
                value: true,
                required: true,
              },
              {
                type: 'p',
                text: 'NOTICE: deletes all references of a picklist item in a picklist or picklistmulti field of this object',
              },
              {
                label: 'trigger_deleterelation',
                name: 'trigger_deleterelation',
                type: 'bool',
                value: true,
                required: true,
              },
              {
                type: 'p',
                text: 'NOTICE: deletes all references of a record in a related relation or relationmutli field in a different object',
              },
            ]"
            pbacklink="setup-objects"
            :pupdateobject="true"
            pdeletetext="IMPORTANT: this will also delete all data of this object."
          ></detail-main>
        </div>
        <div v-if="tab == 'fields'">
          <list-item
            :psetup="true"
            pidentifier="name"
            pname="name"
            pdetaillink="setup-fields-detail"
            :ploaddata="true"
            pobject="fields"
            porderby="name"
            :pfilterdata="true"
            pfilterby="parent_id"
            :pfilter="parameterid"
            :pparam="true"
            pparamname="pobjectid"
            :pparamvalue="parameterid"
            :pshowaddbutton="true"
            paddbuttonurl="setup-fields-detail"
            :paddbuttonparameter="true"
            paddbuttonparameterid="pobjectid"
            :paddbuttonparametervalue="parameterid"
            pmaincolor="secondary"
          ></list-item>
        </div>
      </div>
    </q-scroll-area>
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
import BlankBar from 'components/blank-bar.vue';
import TabBar from 'components/tab-bar.vue';
import DetailMain from 'components/detail-main.vue';
import ListItem from 'components/list-item.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { supabase } from '../helpers/supabase';
import { useObjectsStore } from '../stores/objects';
const storeObjects = useObjectsStore();
var $q;
export default {
  // name: 'ComponentName',
  components: { BlankBar, TabBar, DetailMain, ListItem },
  setup() {
    $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const showElements = ref(false);
    const maincolor = ref('secondary');
    const userid = ref('');
    const useremail = ref('');
    const tab = ref('general');
    const tabOptions = ref([{ name: 'general' }, { name: 'fields' }]);
    const showTabs = ref(true);
    const parameter = ref(false);
    const parameterid = ref('');

    onMounted(() => {
      checkIfUserIsLoggedIn();
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
            if (route.params.pid) {
              parameter.value = true;
              parameterid.value = route.params.pid;
              showElements.value = true;
            } else {
              tab.value = 'new';
              tabOptions.value = ['new'];
              showElements.value = true;
            }
          } else {
            // user is NOT logged in
            router.replace({ name: 'start-login' });
          }
        } catch (error) {
          if (error instanceof Error) {
            router.replace({ name: 'start-login' });
          }
        } finally {
        }
      })();
    }

    function backButton() {
      if (window.history.state.back != null) {
        router.back();
      } else {
        router.replace({
          name: 'object-list',
          params: { objectapiname: route.params.objectapiname },
        });
      }
    }

    return {
      showElements,
      maincolor,
      tab,
      tabOptions,
      showTabs,
      parameter,
      parameterid,
      backButton,
    };
  },
};
</script>
