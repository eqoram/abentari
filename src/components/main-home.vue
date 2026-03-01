<template>
  <blank-bar
    pbgcolor="bg-primary"
    ptext="abentari."
    :pdisplayactions="true"
    pactionparameter="home"
  ></blank-bar>
  <tab-bar
    :ptab="tab"
    :ptaboptions="tabOptions"
    @updatevalue="tab = $event"
    :ptabalways="true"
    pcolor="primary"
  ></tab-bar>
  <div
    v-if="showElements"
    v-touch-swipe.mouse.right="handleSwipeRight"
    v-touch-swipe.mouse.left="handleSwipeLeft"
    v-touch-swipe.capture.right="handleSwipeRight"
    v-touch-swipe.capture.left="handleSwipeLeft"
    v-touch-swipe.right="handleSwipeRight"
    v-touch-swipe.left="handleSwipeLeft"
  >
    <q-scroll-area style="height: calc(100dvh - 137.01px); contain: style">
      <nav-item v-if="false" :pshowhome="false" :pshowuser="false" :pshowversion="false"></nav-item>
      <div class="q-pt-md q-pb-md q-ml-md q-mr-md" style="word-break: break-word">
        <h2 class="">
          hello, <span class="text-primary">{{ useremail }}</span
          >!
        </h2>
        <div v-html="purifydom(lmessage)"></div>
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
import NavItem from 'components/nav-item.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { supabase } from '../helpers/supabase';
import { useDrawerStore } from '../stores/drawer';
import { store } from 'quasar/wrappers';
import DOMPurify from 'dompurify';
var $q;
export default {
  // name: 'ComponentName',
  components: { BlankBar, TabBar, NavItem },
  props: {
    pguest: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const storeDrawer = useDrawerStore();
    $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const showElements = ref(false);
    const userid = ref('');
    const useremail = ref('');
    const tab = ref('home');
    const tabOptions = ref([{ name: 'home' }]);
    const lmessage = ref('');
    const lprofileid = ref('');

    onMounted(() => {
      if (props.pguest) {
        useremail.value = 'guest';
        lprofileid.value = '43bf8fe6-9add-4ff4-b759-f8e1445f5914';
        getProfile();
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
            getXUser();
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

    function getXUser() {
      (async () => {
        try {
          const { data, error } = await supabase
            .from('xusers')
            .select('*')
            .eq('user_id', userid.value)
            .eq('is_active', true);

          if (error) throw error;

          if (data !== undefined && data != null && data.length > 0) {
            lprofileid.value = data[0].profile_id;
            getProfile();
          } else {
            router.replace({ name: 'start-login' });
          }
        } catch (error) {
          console.log(error);
          router.replace({ name: 'start-login' });
        } finally {
        }
      })();
    }

    function getProfile() {
      (async () => {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', lprofileid.value)
            .eq('is_active', true);

          if (error) throw error;

          if (data !== undefined && data != null && data.length > 0) {
            lmessage.value = data[0].home_message;
            showElements.value = true;
          } else {
            router.replace({ name: 'start-login' });
          }
        } catch (error) {
          console.log(error);
          router.replace({ name: 'start-login' });
        } finally {
        }
      })();
    }

    function handleSwipeRight({ evt, ...newInfo }) {
      storeDrawer.drawer = true;
    }

    function handleSwipeLeft({ evt, ...newInfo }) {
      storeDrawer.drawer = false;
    }

    function purifydom(ptext) {
      let ltext = ptext;
      ltext = ltext
        ? DOMPurify.sanitize(ltext, {
            USE_PROFILES: { html: true },
            FORBID_TAGS: ['script', 'iframe', 'object', 'embed'],
            FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'style'],
          })
        : '';
      return ltext;
    }

    return {
      showElements,
      tab,
      tabOptions,
      useremail,
      handleSwipeRight,
      handleSwipeLeft,
      lmessage,
      purifydom,
    };
  },
};
</script>
