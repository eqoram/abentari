<!--
http://localhost:8080/#/main/objects/test/
-->
<template>
  <button-back pmaincolor="secondary"></button-back>
  <blank-bar pbgcolor="bg-secondary" ptext="objects"></blank-bar>
  <tab-bar
    :ptab="tab"
    :ptaboptions="tabOptions"
    @updatevalue="tab = $event"
    :ptabalways="true"
  ></tab-bar>
  <div v-if="showElements">
    <q-scroll-area style="height: calc(100dvh - 137.01px); contain: style">
      <div class="q-pt-md q-pb-md q-ml-md q-mr-md">
        <list-item
          :psetup="true"
          pidentifier="name"
          pname="name"
          pdetaillink="setup-objects-detail"
          :ploaddata="true"
          pobject="objects"
          porderby="name"
          :pshowaddbutton="true"
          paddbuttonurl="setup-objects-detail"
          pmaincolor="secondary"
        ></list-item>
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
import ListItem from 'components/list-item.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { supabase } from '../helpers/supabase';
var $q;
export default {
  // name: 'ComponentName',
  components: { ButtonBack, BlankBar, TabBar, ListItem },
  setup() {
    $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const showElements = ref(false);
    const userid = ref('');
    const useremail = ref('');
    const objectname = ref('');
    const objectapiname = ref('');
    const routelink = ref('');
    const tab = ref('all objects');
    const tabOptions = ref([{ name: 'all objects' }]);

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
            showElements.value = true;
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

    return {
      showElements,
      objectname,
      objectapiname,
      routelink,
      tab,
      tabOptions,
    };
  },
};
</script>
