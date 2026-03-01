<template>
  <button-back pmaincolor="secondary"></button-back>
  <blank-bar pbgcolor="bg-secondary" ptext="setup"></blank-bar>
  <tab-bar :ptab="tab" :ptaboptions="tabOptions" @updatevalue="tab = $event" :ptabalways="true">
  </tab-bar>
  <div v-if="showElements">
    <q-scroll-area style="height: calc(100dvh - 137.01px); contain: style">
      <div class="q-pt-md q-pb-md q-ml-md q-mr-md">
        <q-form @submit="onSubmit" @validation-error="focus">
          <q-input
            v-if="false"
            color="secondary"
            outlined
            rounded
            v-model="vsupabaseurl"
            label="supabase url"
            style="width: 100%"
            lazy-rules
            :rules="[(val) => (val && val.trim().length > 0) || 'this field is required']"
          >
          </q-input>

          <q-input
            v-if="false"
            color="secondary"
            outlined
            rounded
            v-model="vsupabasekey"
            label="supabase key"
            style="width: 100%"
            lazy-rules
            :rules="[(val) => (val && val.trim().length > 0) || 'this field is required']"
          >
          </q-input>

          <q-input
            v-if="true"
            color="secondary"
            outlined
            rounded
            v-model="vusername"
            label="username *"
            style="width: 100%"
            lazy-rules
            :rules="[(val) => (val && val.trim().length > 0) || 'this field is required']"
          >
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>

          <q-input
            v-if="true"
            color="secondary"
            outlined
            rounded
            v-model="vpassword"
            label="password *"
            style="width: 100%"
            lazy-rules
            :rules="[(val) => (val && val.trim().length > 0) || 'this field is required']"
            :type="isPwd ? 'password' : 'text'"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <q-input
            v-if="true"
            color="secondary"
            outlined
            rounded
            v-model="vdeployment"
            label="deployment *"
            type="textarea"
            style="width: 100%"
            lazy-rules
            :rules="[(val) => (val && val.trim().length > 0) || 'this field is required']"
          >
          </q-input>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="false"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vdebug"
              label="debug"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vinclude"
              label="include"
              lazy-rules
              @update:model-value="vexclude = false"
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <p class="text-center">NOTICE: include will only deploy metadata with the given ids</p>
          </div>

          <q-input
            v-if="vinclude"
            color="secondary"
            outlined
            rounded
            v-model="vincludestring"
            label="include string (id;id;id;id) *"
            style="width: 100%"
            lazy-rules
            :rules="[(val) => (val && val.trim().length > 0) || 'this field is required']"
          >
          </q-input>

          <div style="display: flex; justify-content: center">
            <q-toggle
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vexclude"
              label="exclude"
              lazy-rules
              @update:model-value="vinclude = false"
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <p class="text-center">NOTICE: exclude will not deploy metadata with the given ids</p>
          </div>

          <q-input
            v-if="vexclude"
            color="secondary"
            outlined
            rounded
            v-model="vexcludestring"
            label="exclude string (id;id;id;id) *"
            style="width: 100%"
            lazy-rules
            :rules="[(val) => (val && val.trim().length > 0) || 'this field is required']"
          >
          </q-input>

          <div style="display: flex; justify-content: center">
            <q-toggle
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vdeployall"
              label="deploy all"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="!vdeployall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vdeploysettings"
              label="deploy settings"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="!vdeployall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vdeployprofiles"
              label="deploy profiles"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="!vdeployall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vdeployobjects"
              label="deploy objects"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="!vdeployall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vdeployfields"
              label="deploy fields"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="!vdeployall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vdeploycpermissions"
              label="deploy cpermissions"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="!vdeployall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vdeployactions"
              label="deploy actions"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="!vdeployall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vdeploycsql"
              label="deploy csql"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="!vdeployall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vdeploypages"
              label="deploy pages"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="!vdeployall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vdeployapps"
              label="deploy apps"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="!vdeployall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vdeploypermissions"
              label="deploy permissions"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vdestruct"
              label="destruct"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <p class="text-center">
              NOTICE: destruct will delete metadata that is not part of the deployment
            </p>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="vdestruct"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vdestructall"
              label="destruct all"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="vdestruct && !vdestructall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vdestructsettings"
              label="destruct settings"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="vdestruct && !vdestructall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vdestructprofiles"
              label="destruct profiles"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="vdestruct && !vdestructall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vdestructfields"
              label="destruct fields"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="vdestruct && !vdestructall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vdestructobjects"
              label="destruct objects"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="vdestruct && !vdestructall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vdestructcpermissions"
              label="destruct cpermissions"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="vdestruct && !vdestructall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vdestructactions"
              label="destruct actions"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="vdestruct && !vdestructall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vdestructcsql"
              label="destruct csql"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="vdestruct && !vdestructall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vdestructpages"
              label="destruct pages"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="vdestruct && !vdestructall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vdestructapps"
              label="destruct apps"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="vdestruct && !vdestructall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vdestructpermissions"
              label="destruct permissions"
              lazy-rules
            >
            </q-toggle>
          </div>

          <q-btn
            unelevated
            rounded
            no-caps
            label="submit"
            type="submit"
            color="secondary"
            size="lg"
            style="width: 100%; margin-top: 20px; margin-bottom: 20px"
          />
        </q-form>
      </div>
    </q-scroll-area>
  </div>
  <div v-else class="flex flex-center">
    <div style="margin-top: 20dvh">
      <div style="height: 10dvh">
        <q-spinner color="secondary" size="100%" :thickness="2" />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonBack from 'components/button-back.vue';
import BlankBar from 'components/blank-bar.vue';
import TabBar from 'components/tab-bar.vue';
import { copyToClipboard, useQuasar } from 'quasar';
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { supabase, supabaseUrl, supabaseAnonKey } from '../helpers/supabase';
import { run_deploy } from '../helpers/deployment/deploy.js';
import { usePermissionsStore } from '../stores/permissions';
import { useAppsStore } from '../stores/apps';
import { usePagesStore } from '../stores/pages';
import { useObjectsStore } from '../stores/objects';
import { useObjectHistoriesStore } from '../stores/objecthistories';
import { useactionsStore } from '../stores/actions';
var $q;
const storePermissions = usePermissionsStore();
const storeApps = useAppsStore();
const storePages = usePagesStore();
const storeObjects = useObjectsStore();
const storeObjectHistories = useObjectHistoriesStore();
const storeactions = useactionsStore();
export default defineComponent({
  //name: "ComponentName",
  components: { ButtonBack, BlankBar, TabBar },
  setup() {
    $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const showElements = ref(false);
    const showOutput = ref(false);
    const inputlink = ref(null);
    const supabaselink = ref(null);
    const supabasekey = ref(null);
    const tab = ref('deploy');
    const tabOptions = ref([{ name: 'deploy' }]);
    const vsupabaseurl = ref('');
    const vsupabasekey = ref('');
    const vusername = ref('');
    const vpassword = ref('');
    const vdebug = ref(true);
    const vdeployment = ref('');
    const vinclude = ref(false);
    const vincludestring = ref('');
    const vexclude = ref(false);
    const vexcludestring = ref('');
    const vdeployall = ref(true);
    const vdeploysettings = ref(true);
    const vdeployprofiles = ref(true);
    const vdeployobjects = ref(true);
    const vdeployfields = ref(true);
    const vdeploycpermissions = ref(true);
    const vdeployactions = ref(true);
    const vdeploycsql = ref(true);
    const vdeploypages = ref(true);
    const vdeployapps = ref(true);
    const vdeploypermissions = ref(true);
    const voutput = ref('');
    const vdestruct = ref(false);
    const vdestructall = ref(false);
    const vdestructsettings = ref(false);
    const vdestructprofiles = ref(false);
    const vdestructobjects = ref(false);
    const vdestructfields = ref(false);
    const vdestructcpermissions = ref(false);
    const vdestructactions = ref(false);
    const vdestructcsql = ref(false);
    const vdestructpages = ref(false);
    const vdestructapps = ref(false);
    const vdestructpermissions = ref(false);
    const isPwd = ref(true);

    checkIfUserIsLoggedIn();

    function checkIfUserIsLoggedIn() {
      (async () => {
        try {
          const { data, error } = await supabase.auth.getSession();

          if (error) throw error;

          if (data != null && data.session != null) {
            // user is logged in
            initFunction();
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

    function initFunction() {
      vsupabaseurl.value = supabaseUrl;
      vsupabasekey.value = supabaseAnonKey;

      showElements.value = true;
    }

    function onSubmit() {
      showElements.value = false;
      (async () => {
        // console.log('output');
        // console.log(data);
        let lresponse = await run_deploy(
          vdebug.value ? 'yes' : 'no',
          vsupabaseurl.value,
          vsupabasekey.value,
          vusername.value,
          vpassword.value,
          vdeployment.value,
          vinclude.value ? 'yes' : 'no',
          vincludestring.value,
          vexclude.value ? 'yes' : 'no',
          vexcludestring.value,
          vdeployall.value ? 'yes' : 'no',
          vdeploysettings.value ? 'yes' : 'no',
          vdeployprofiles.value ? 'yes' : 'no',
          vdeployobjects.value ? 'yes' : 'no',
          vdeployfields.value ? 'yes' : 'no',
          vdeploycpermissions.value ? 'yes' : 'no',
          vdeployactions.value ? 'yes' : 'no',
          vdeploycsql.value ? 'yes' : 'no',
          vdeploypages.value ? 'yes' : 'no',
          vdeployapps.value ? 'yes' : 'no',
          vdeploypermissions.value ? 'yes' : 'no',
          vdestructall.value ? 'yes' : 'no',
          vdestructsettings.value ? 'yes' : 'no',
          vdestructprofiles.value ? 'yes' : 'no',
          vdestructobjects.value ? 'yes' : 'no',
          vdestructfields.value ? 'yes' : 'no',
          vdestructcpermissions.value ? 'yes' : 'no',
          vdestructactions.value ? 'yes' : 'no',
          vdestructcsql.value ? 'yes' : 'no',
          vdestructpages.value ? 'yes' : 'no',
          vdestructapps.value ? 'yes' : 'no',
          vdestructpermissions.value ? 'yes' : 'no',
        );

        if (lresponse) {
          storePermissions.isLoaded = false;
          await storePermissions.getPermissions(true);
          await storeApps.getAppData();
          await storePages.getPageData();
          await storeObjects.getObjectData();
          await storeObjectHistories.getObjectHistories();
          await storeactions.getactionsData();

          $q.notify({
            type: 'positive',
            message: 'deployed',
            color: 'secondary',
          });
        }
        showElements.value = true;

        return;
      })();
    }

    function handleKeyDown(event) {
      // Cmd + Enter (on Mac)
      if (event.metaKey && event.key === 'Enter') {
        event.preventDefault();
        onSubmit(); // call your submit method directly
      }

      // Optional: Ctrl + Enter (Windows/Linux)
      if (event.ctrlKey && event.key === 'Enter') {
        event.preventDefault();
        onSubmit();
      }
    }

    const focus = (ref) => {
      ref.$el.scrollIntoView({ behavior: 'smooth' });
    };

    return {
      showElements,
      inputlink,
      supabaselink,
      supabasekey,
      tab,
      tabOptions,
      onSubmit,
      vsupabaseurl,
      vsupabasekey,
      vusername,
      vpassword,
      vdebug,
      vdeployment,
      vinclude,
      vincludestring,
      vexclude,
      vexcludestring,
      vdeployall,
      vdeploysettings,
      vdeployprofiles,
      vdeployobjects,
      vdeployfields,
      vdeploycpermissions,
      vdeployactions,
      vdeploycsql,
      vdeploypages,
      vdeployapps,
      vdeploypermissions,
      vdestruct,
      vdestructall,
      vdestructsettings,
      vdestructprofiles,
      vdestructobjects,
      vdestructfields,
      vdestructcpermissions,
      vdestructactions,
      vdestructcsql,
      vdestructpages,
      vdestructapps,
      vdestructpermissions,
      handleKeyDown,
      isPwd,
      focus,
    };
  },
});
</script>
