<!--
http://localhost:9200/#/guest/pages/c_error__/
-->
<template>
  <button-back pmaincolor="primary" pguest="pguest"></button-back>
  <!--<blank-bar pbgcolor="bg-primary" ptext="pages"></blank-bar>-->
  <div v-if="showElements">
    <div v-if="pagelink">
      <div
        style="
          width: 100%;
          height: 100vh; /* or 100% if inside a container with a defined height */
          position: relative;
          overflow: hidden;
        "
      >
        <iframe :src="pageurl" style="width: 100%; height: 100%; border: none; display: block" />
      </div>
    </div>
    <div v-if="pagehtml">
      <div
        style="
          width: 100%;
          height: 100vh; /* or 100% if inside a container with a defined height */
          position: relative;
          overflow: hidden;
        "
      >
        <iframe :src="pageurl" style="width: 100%; height: 100%; border: none; display: block" />
      </div>
    </div>
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
import ButtonBack from 'components/button-back.vue';
import BlankBar from 'components/blank-bar.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { supabase } from '../helpers/supabase';
var $q;
export default {
  inheritAttrs: false,
  // name: 'ComponentName',
  props: {
    pguest: {
      type: Boolean,
      default: false,
    },
    plinkpage: {
      type: String,
      default: 'main-pages',
    },
    plinkpagedetail: {
      type: String,
      default: 'main-pages-detail',
    },
  },
  components: { ButtonBack },
  setup(props) {
    $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const showElements = ref(false);
    const userid = ref('');
    const useremail = ref('');
    const pageapiname = ref('');
    const page = ref();
    const pagelink = ref(false);
    const pagehtml = ref(false);
    const pageurl = ref('');
    const myIframe = ref(null);
    const pagehtmlvalue = ref('');
    const pagesrcdoc = ref('');

    onMounted(() => {
      pageapiname.value = route.params.pageapiname;
      if (props.pguest) {
        loadPage();
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
            loadPage();
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

    function loadPage() {
      (async () => {
        try {
          const { data, error } = await supabase
            .from('pages')
            .select('*')
            .eq('api_name', pageapiname.value)
            .eq('is_active', true);

          if (error) throw error;

          if (data !== undefined && data != null && data.length > 0) {
            // page does exist
            page.value = data[0];
            let lpage = data[0];
            if (lpage['type'] == 'link' || lpage['type'] == null || lpage['type'] == '') {
              pagelink.value = true;
              eval(lpage['url']);
            }
            if (lpage['type'] == 'html') {
              pagehtml.value = true;
              pagehtmlvalue.value = lpage['html'];
              eval(lpage['url']);
              // pageurl.value = 'data:text/html;charset=utf-8,' + encodeURIComponent(lpage['html']);
              // console.log(pagesrcdoc.value);
            }
            showElements.value = true;
          } else {
            // page does NOT exist
            console.log('main-pages.vue error1');
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
      page,
      pagelink,
      pagehtml,
      pageurl,
      pagehtmlvalue,
      pagesrcdoc,
    };
  },
};
</script>
