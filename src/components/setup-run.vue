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
            color="secondary"
            outlined
            rounded
            placeholder="SELECT * FROM public.settings WHERE id = 'cd700b62-11e1-4664-bfe9-96a8ff376a59'::uuid"
            v-model="vquery"
            type="textarea"
            label="query  (NO SEMICOLON) *"
            style="width: 100%"
            lazy-rules
            :rules="[(val) => (val && val.trim().length > 0) || 'this field is required']"
            @keydown="handleKeyDown"
          >
          </q-input>

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
var $q;
export default defineComponent({
  //name: "ComponentName",
  components: { ButtonBack, BlankBar, TabBar },
  setup() {
    $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const showElements = ref(true);
    const showOutput = ref(false);
    const inputlink = ref(null);
    const supabaselink = ref(null);
    const supabasekey = ref(null);
    const tab = ref('run');
    const tabOptions = ref([{ name: 'run' }]);
    const vquery = ref('');
    const voutput = ref('');

    checkIfUserIsLoggedIn();

    function checkIfUserIsLoggedIn() {
      (async () => {
        try {
          const { data, error } = await supabase.auth.getSession();

          if (error) throw error;

          if (data != null && data.session != null) {
            // user is logged in
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

    function onSubmit() {
      showElements.value = false;
      (async () => {
        const { data, error } = await supabase.rpc('runsql', {
          query: vquery.value,
        });

        // console.log('output');
        // console.log(data);

        voutput.value = data;
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
      vquery,
      voutput,
      handleKeyDown,
      focus,
    };
  },
});
</script>
