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
            <p class="text-center">
              NOTICE: include will only retrieve metadata with the given ids
            </p>
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
            <p class="text-center">NOTICE: exclude will not retrieve metadata with the given ids</p>
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
              v-model="vretrieveall"
              label="retrieve all"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="!vretrieveall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vretrievesettings"
              label="retrieve settings"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="!vretrieveall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vretrieveprofiles"
              label="retrieve profiles"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="!vretrieveall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vretrieveobjects"
              label="retrieve objects"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="!vretrieveall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vretrievefields"
              label="retrieve fields"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="!vretrieveall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vretrievecpermissions"
              label="retrieve cpermissions"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="!vretrieveall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vretrieveactions"
              label="retrieve actions"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="!vretrieveall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vretrievecsql"
              label="retrieve csql"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="!vretrieveall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vretrievepages"
              label="retrieve pages"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="!vretrieveall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vretrieveapps"
              label="retrieve apps"
              lazy-rules
            >
            </q-toggle>
          </div>

          <div style="display: flex; justify-content: center">
            <q-toggle
              v-if="!vretrieveall"
              class="q-mt-sm q-mb-md"
              outlined
              rounded
              color="secondary"
              v-model="vretrievepermissions"
              label="retrieve permissions"
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

          <q-input
            v-if="showOutput"
            :readonly="true"
            color="secondary"
            outlined
            rounded
            v-model="voutput"
            type="textarea"
            label="output"
            style="width: 100%"
            lazy-rules
            autogrow
          >
          </q-input>
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
import { run_retrieve } from '../helpers/deployment/retrieve.js';
var $q;
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
    const tab = ref('retrieve');
    const tabOptions = ref([{ name: 'retrieve' }]);
    const vsupabaseurl = ref('');
    const vsupabasekey = ref('');
    const vusername = ref('');
    const vpassword = ref('');
    const vdebug = ref(true);
    const vinclude = ref(false);
    const vincludestring = ref('');
    const vexclude = ref(false);
    const vexcludestring = ref('');
    const vretrieveall = ref(true);
    const vretrievesettings = ref(true);
    const vretrieveprofiles = ref(true);
    const vretrieveobjects = ref(true);
    const vretrievefields = ref(true);
    const vretrievecpermissions = ref(true);
    const vretrieveactions = ref(true);
    const vretrievecsql = ref(true);
    const vretrievepages = ref(true);
    const vretrieveapps = ref(true);
    const vretrievepermissions = ref(true);
    const voutput = ref('');
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
        let lresponse = await run_retrieve(
          vdebug.value ? 'yes' : 'no',
          vsupabaseurl.value,
          vsupabasekey.value,
          vusername.value,
          vpassword.value,
          vinclude.value ? 'yes' : 'no',
          vincludestring.value,
          vexclude.value ? 'yes' : 'no',
          vexcludestring.value,
          vretrieveall.value ? 'yes' : 'no',
          vretrievesettings.value ? 'yes' : 'no',
          vretrieveprofiles.value ? 'yes' : 'no',
          vretrieveobjects.value ? 'yes' : 'no',
          vretrievefields.value ? 'yes' : 'no',
          vretrievecpermissions.value ? 'yes' : 'no',
          vretrieveactions.value ? 'yes' : 'no',
          vretrievecsql.value ? 'yes' : 'no',
          vretrievepages.value ? 'yes' : 'no',
          vretrieveapps.value ? 'yes' : 'no',
          vretrievepermissions.value ? 'yes' : 'no',
        );

        if (lresponse) {
          $q.notify({
            type: 'positive',
            message: 'retrieved',
            color: 'secondary',
          });
        }

        voutput.value = lresponse;
        showOutput.value = true;
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
      showOutput,
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
      vinclude,
      vincludestring,
      vexclude,
      vexcludestring,
      vretrieveall,
      vretrievesettings,
      vretrieveprofiles,
      vretrieveobjects,
      vretrievefields,
      vretrievecpermissions,
      vretrieveactions,
      vretrievecsql,
      vretrievepages,
      vretrieveapps,
      vretrievepermissions,
      voutput,
      handleKeyDown,
      isPwd,
      focus,
    };
  },
});
</script>
