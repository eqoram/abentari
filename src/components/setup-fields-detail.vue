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
  <blank-bar pbgcolor="bg-secondary" ptext="fields"></blank-bar>
  <tab-bar
    :ptab="tab"
    :ptaboptions="tabOptions"
    @updatevalue="tab = $event"
    :ptabalways="true"
  ></tab-bar>
  <div v-if="showElements">
    <q-scroll-area style="height: calc(100dvh - 137.01px); contain: style">
      <div class="q-pt-md q-pb-md q-ml-md q-mr-md">
        <detail-main
          :psetup="true"
          pmaincolor="secondary"
          pobject="fields"
          psingular="field"
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
              text: 'NOTICE: the api_name will be used for the public column name',
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
              label: 'required',
              name: 'required',
              type: 'bool',
              value: true,
              required: true,
            },
            {
              label: 'type',
              name: 'type',
              type: 'picklist',
              value: null,
              required: true,
              options: [
                { label: 'bool', value: 'bool' },
                { label: 'date', value: 'date' },
                { label: 'datetime', value: 'datetime' },
                { label: 'display', value: 'display' },
                { label: 'editor', value: 'editor' },
                { label: 'file', value: 'file' },
                { label: 'longtext', value: 'longtext' },
                { label: 'number', value: 'number' },
                { label: 'picklist', value: 'picklist' },
                { label: 'picklist multiple', value: 'picklistmulti' },
                { label: 'relation', value: 'relation' },
                { label: 'relation multiple', value: 'relationmulti' },
                { label: 'text', value: 'text' },
              ],
            },
            {
              type: 'p',
              text: 'NOTICE: be careful when using display because of cross-site scripting',
              showcondition:
                'lrecord.value[`type`] && (lrecord.value[`type`] == `display` || lrecord.value[`type`].value == `display`)',
            },
            {
              type: 'p',
              text: 'NOTICE: be careful when using editor because of cross-site scripting',
              showcondition:
                'lrecord.value[`type`] && (lrecord.value[`type`] == `editor` || lrecord.value[`type`].value == `editor`)',
            },
            {
              label: 'display',
              name: 'display',
              type: 'editor',
              value: null,
              required: true,
              showcondition:
                'lrecord.value[`type`] && (lrecord.value[`type`] == `display` || lrecord.value[`type`].value == `display`)',
            },
            {
              label: 'relation name (relationname)',
              name: 'relationname',
              type: 'text',
              value: null,
              required: true,
              showcondition:
                'lrecord.value[`type`] && (lrecord.value[`type`] == `relation` || lrecord.value[`type`].value == `relation` || lrecord.value[`type`] == `relationmulti` || lrecord.value[`type`].value == `relationmulti`)',
            },
            {
              label: 'relation object (relation_id)',
              name: 'relation_id',
              type: 'relation',
              showcondition:
                'lrecord.value[`type`] && (lrecord.value[`type`] == `relation` || lrecord.value[`type`].value == `relation` || lrecord.value[`type`] == `relationmulti` || lrecord.value[`type`].value == `relationmulti`)',
              value: null,
              required: true,
              load: true,
              loadtable: 'objects',
              loadcolumn: 'name',
              loadvalue: 'id',
              phideiframebutton: true,
            },
            {
              label: 'picklist values (picklist_values)',
              name: 'picklist_values',
              type: 'multiadd',
              value: null,
              required: true,
              showcondition:
                'lrecord.value[`type`] && (lrecord.value[`type`] == `picklist` || lrecord.value[`type`].value == `picklist` || lrecord.value[`type`] == `picklistmulti` || lrecord.value[`type`].value == `picklistmulti`)',
            },
            {
              label: 'trigger_addfieldtolayout',
              name: 'trigger_addfieldtolayout',
              type: 'bool',
              value: true,
              required: true,
            },
            {
              type: 'p',
              text: 'NOTICE: if enabled fields will be added to the bottom of the page layout automatically after creating',
            },
          ]"
          pbacklink="setup-objects-detail"
          :psilentelements="[
            {
              name: 'parent_id',
              value: objectid,
            },
          ]"
          :phideeditsave="false"
          pdeletetext="IMPORTANT: this will also delete all data of this field."
        ></detail-main>
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
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { supabase } from '../helpers/supabase';
var $q;
export default {
  name: 'setup-users-detail',
  components: { BlankBar, TabBar, DetailMain },
  setup() {
    $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const showElements = ref(false);
    const maincolor = ref('secondary');
    const userid = ref('');
    const useremail = ref('');
    const tab = ref('general');
    const tabOptions = ref(['general']);
    const objectid = ref('');

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
            if (route.params.pobjectid) {
              objectid.value = route.params.pobjectid;
            }
            if (route.params.pid) {
            } else {
              tab.value = 'new';
              tabOptions.value = ['new'];
            }
            showElements.value = true;
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
        router.replace({ name: 'setup-users' });
      }
    }

    return {
      showElements,
      maincolor,
      tab,
      tabOptions,
      objectid,
      backButton,
    };
  },
};
</script>
