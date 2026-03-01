<template>
  <button-back pmaincolor="secondary"></button-back>
  <blank-bar pbgcolor="bg-secondary" ptext="setup"></blank-bar>
  <tab-bar
    :ptab="tab"
    :ptaboptions="tabOptions"
    @updatevalue="tab = $event"
    :ptabalways="true"
  ></tab-bar>
  <div>
    <q-scroll-area style="height: calc(100dvh - 137.01px); contain: style">
      <div class="q-pt-md q-pb-md q-ml-md q-mr-md">
        <q-form @submit="onSubmit">
          <div>
            <!--<q-input
              rounded
              outlined
              v-model="inputlink"
              label="link to instance"
              readonly
              ><template v-slot:append>
                <q-icon
                  name="content_paste"
                  @click="copyText(inputlink)"
                  class="cursor-pointer"
                /> </template
            ></q-input>-->
            <div>
              <div style="display: flex">
                <div class="column" style="width: 60px; float: left">
                  <div class="q-mt-sm">
                    <q-btn
                      style="margin-left: 4px"
                      @click="copyText(supabaselink)"
                      fab-mini
                      color="white"
                      ><q-icon color="black" name="content_copy"></q-icon
                    ></q-btn>
                  </div>
                </div>
                <div class="column" style="flex-grow: 1">
                  <div class="row full-width">
                    <q-input
                      rounded
                      outlined
                      v-model="supabaselink"
                      label="supabase link"
                      readonly
                      class="full-width"
                    ></q-input>
                  </div>
                </div>
              </div>
              <div style="display: flex" class="q-mt-lg">
                <div class="column" style="width: 60px; float: left">
                  <div class="q-mt-sm">
                    <q-btn
                      style="margin-left: 4px"
                      @click="copyText(supabasekey)"
                      fab-mini
                      color="white"
                      ><q-icon color="black" name="content_copy"></q-icon
                    ></q-btn>
                  </div>
                </div>
                <div class="column" style="flex-grow: 1">
                  <div class="row full-width">
                    <q-input
                      rounded
                      outlined
                      v-model="supabasekey"
                      label="supabase public key"
                      readonly
                      class="full-width"
                    ></q-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-form>
      </div>
    </q-scroll-area>
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
    const inputlink = ref(null);
    const supabaselink = ref(null);
    const supabasekey = ref(null);
    const tab = ref('general');
    const tabOptions = ref([{ name: 'general' }]);

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
      return;
    }

    function copyText(pText) {
      copyToClipboard(pText)
        .then(() => {
          $q.notify({
            type: 'positive',
            message: 'copied to clipboard.',
            color: 'secondary',
          });
        })
        .catch(() => {
          $q.notify({
            type: 'negative',
            message: 'something did not work',
          });
        });
    }

    inputlink.value =
      window.location.origin +
      '/#/start-main?link=' +
      supabaseUrl.replace('https://', '').replace('http://', '') +
      '&key=' +
      supabaseAnonKey;
    supabaselink.value = supabaseUrl;
    supabasekey.value = supabaseAnonKey;

    return {
      showElements,
      inputlink,
      supabaselink,
      supabasekey,
      tab,
      tabOptions,
      onSubmit,
      copyText,
    };
  },
});
</script>
