<template>
  <blank-bar v-if="showNavbar" bgcolor="bg-primary"></blank-bar>
  <q-page v-if="showElements" class="flex flex-center">
    <div class="q-pt-md q-pb-md q-ml-md q-mr-md">
      <h1 class="text-primary">Enter MFA code</h1>
      <q-input
        v-model="mfacode"
        placeholder="Enter 6-digit code"
        @update:model-value="codeChange"
        outlined
        rounded
        :rules="[
          (val) => /^\d*$/.test(val) || 'Only numbers allowed',
          (val) => val.length <= 6 || 'Only 6 digits max',
        ]"
      />
    </div>
  </q-page>
  <q-page v-else class="flex flex-center">
    <div style="min-width: 100vw">
      <div style="margin-left: 45%; width: 10%">
        <q-spinner color="primary" size="100%" :thickness="2" />
      </div>
      <div class="q-mt-lg" style="text-align: center">
        <p></p>
      </div>
    </div>
  </q-page>
</template>

<script>
import BlankBar from 'components/blank-bar.vue';
import { copyToClipboard, useQuasar } from 'quasar';
import { defineComponent, ref, defineAsyncComponent, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { supabase, supabaseUrl, supabaseAnonKey } from '../helpers/supabase';
var $q;
export default defineComponent({
  name: 'setup-mfa',
  components: { BlankBar },
  setup() {
    $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const showElements = ref(false);
    const showNavbar = ref(true);
    const userid = ref('');
    const useremail = ref('');
    const mfacode = ref('');
    const lmfa_enabled = ref(false);

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
            getMFALevel();
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

    function getMFALevel() {
      (async () => {
        const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

        if (error) {
          console.error('Error getting AAL:', error);
          return;
        }

        const aal = data.currentLevel;

        if (aal === 'aal2') {
          // console.log('User is authenticated with MFA.');
          // console.log(aal);
          router.replace({ name: 'main-home' });
        } else {
          // console.log('User is not authenticated with MFA.');
          // console.log(aal);
          getUserMFA();
        }
      })();
    }

    function getUserMFA() {
      (async () => {
        (async () => {
          try {
            const { data, error } = await supabase
              .from('xusers')
              .select('*')
              .eq('user_id', userid.value)
              .eq('is_active', true);

            if (error) throw error;

            let mobjects = [];
            if (data !== undefined && data != null && data.length > 0) {
              // found
              // console.log('a1');
              // console.log(data[0]);
              lmfa_enabled.value = data[0].mfa_enabled;

              if (lmfa_enabled.value) {
                // console.log('User is authenticated with MFA.');
                // console.log(aal);
                showElements.value = true;
              } else {
                // console.log('User is not authenticated with MFA.');
                // console.log(aal);
                router.replace({ name: 'main-home' });
              }
            } else {
              //NOT found
            }
          } catch (error) {
            console.log(error);
          } finally {
          }
        })();
      })();
    }

    function codeChange() {
      if (/^\d{6}$/.test(mfacode.value)) {
        showElements.value = false;

        (async () => {
          const { data: factors } = await supabase.auth.mfa.listFactors();

          let lfactorid = '';
          for (const factor of factors.all) {
            lfactorid = factor.id;
          }

          const { error: verifyError } = await supabase.auth.mfa.challengeAndVerify({
            factorId: lfactorid,
            code: mfacode.value,
          });

          if (verifyError) {
            $q.notify({
              type: 'negative',
              message: verifyError.message
                ? 'Something went wrong.' + ' (' + verifyError.message + ')'
                : 'Something went wrong.',
            });
            showElements.value = true;
          } else {
            $q.notify({
              type: 'positive',
              message: 'MFA succesful.',
              color: 'primary',
            });
            window.location.reload();
          }
        })();
      }
    }

    return {
      showElements,
      showNavbar,
      mfacode,
      codeChange,
    };
  },
});
</script>
