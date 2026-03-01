<template>
  <button-back pmaincolor="secondary"></button-back>
  <blank-bar pbgcolor="bg-secondary" ptext="cpermissions"></blank-bar>
  <tab-bar
    :ptab="tab"
    :ptaboptions="tabOptions"
    @updatevalue="tab = $event"
    :ptabalways="true"
  ></tab-bar>
  <div v-if="showElements">
    <q-scroll-area style="height: calc(100dvh - 137.01px); contain: style">
      <div class="q-pt-md q-pb-md q-ml-md q-mr-md">
        <div v-for="element in tabOptions" :key="element.name">
          <div v-if="tab == element.name">
            <list-item
              :psetup="true"
              pidentifier="name"
              pname="name"
              pdetaillink="setup-cpermissions-detail"
              :ploaddata="true"
              pobject="cpermissions"
              porderby="name"
              :pshowaddbutton="true"
              paddbuttonurl="setup-cpermissions-detail"
              pmaincolor="secondary"
              :plistfilter="tabOptions.find((item) => item.name === element.name).listfilter"
              :plistfiltervalue="
                tabOptions.find((item) => item.name === element.name).listfiltervalue
              "
            ></list-item>
          </div>
        </div>
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
    const tab = ref('all cpermissions');
    const tabOptions = ref([{ name: 'all cpermissions' }]);

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
      tab,
      tabOptions,
    };
  },
};
</script>
