<template>
  <button-back pmaincolor="primary"></button-back>
  <blank-bar pbgcolor="bg-primary" ptext="user"></blank-bar>
  <tab-bar
    :ptab="tab"
    :ptaboptions="tabOptions"
    @updatevalue="tab = $event"
    :ptabalways="true"
    :pshowtabs="showTabs"
    pcolor="primary"
  ></tab-bar>
  <div v-if="showElements">
    <q-scroll-area style="height: calc(100dvh - 137.01px); contain: style">
      <div class="q-pt-md q-pb-md q-ml-md q-mr-md">
        <div class="q-mt-lg">
          <div v-if="lmfa_enabled">
            <div v-if="lmfa_allowed">
              <h6 class="text-bold text-center">
                Multi-Factor Authentication is enabled. Use the button below if you want to reset
                it.
              </h6>
              <q-btn rounded @click="resetMFA" class="bg-red text-white full-width text-lowercase">
                reset MFA
              </q-btn>
            </div>
            <div v-else>
              <h6 class="text-bold text-center">Multi-Factor Authentication is already enabled.</h6>
            </div>
          </div>
          <div v-else>
            <div v-if="!qrCode">
              <h6 class="text-bold text-center">
                Use the button below to setup Multi-Factor Authentication.
              </h6>
              <q-btn
                rounded
                @click="enrollMFA"
                class="bg-primary text-white full-width text-lowercase"
              >
                setup MFA
              </q-btn>
            </div>

            <div v-else>
              <div class="flex flex-center">
                <div class="column">
                  <div class="row"><p>Scan this QR code with your Authenticator app:</p></div>

                  <div class="row flex flex-center"><img :src="qrCode" alt="MFA QR Code" /></div>

                  <q-input
                    v-model="code"
                    placeholder="Enter 6-digit code"
                    class="border p-2 mb-4 w-full"
                    outlined
                    rounded
                    :rules="[
                      (val) => /^\d*$/.test(val) || 'Only numbers allowed',
                      (val) => val.length <= 6 || 'Only 6 digits max',
                    ]"
                  />
                  <!-- <q-btn
                    rounded
                    @click="verifyCode"
                    class="bg-primary text-white full-width q-mt-md q-mb-md"
                  >
                    Verify Code
                  </q-btn> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-scroll-area>
  </div>
  <div v-else class="flex flex-center">
    <div style="min-width: 100vw">
      <div style="margin-left: 45%; width: 10%">
        <q-spinner color="primary" size="100%" :thickness="2" />
      </div>
      <div class="q-mt-lg" style="text-align: center">
        <p></p>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonBack from 'components/button-back.vue';
import BlankBar from 'components/blank-bar.vue';
import TabBar from 'components/tab-bar.vue';
import { copyToClipboard, useQuasar } from 'quasar';
import { defineComponent, ref, defineAsyncComponent, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { supabase, supabaseUrl, supabaseAnonKey } from '../helpers/supabase';
var $q;
export default defineComponent({
  name: 'user-mfa-setup',
  components: { ButtonBack, BlankBar, TabBar },
  setup() {
    $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const showElements = ref(false);
    const showNavbar = ref(true);
    const showTabs = ref(true);
    const userid = ref('');
    const useremail = ref('');
    const tab = ref('Multi-Factor Authentication');
    const tabOptions = ref([{ name: 'Multi-Factor Authentication' }]);
    const mfaid = ref('');
    const lmfa_enabled = ref(true);
    const lmfa_allowed = ref(false);

    const qrCode = ref(null);
    const code = ref('');
    const error = ref('');
    const success = ref(false);

    onMounted(() => {
      checkIfUserIsLoggedIn();
    });

    watch(code, (newVal) => {
      if (newVal && newVal.length === 6) {
        verifyCode();
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
          if (error instanceof Error) {
            router.replace({ name: 'start-login' });
          }
        } finally {
        }
      })();
    }

    function getXUser() {
      showElements.value = false;
      qrCode.value = null;
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
            getSettings();
          } else {
            //NOT found
          }
        } catch (error) {
          console.log(error);
        } finally {
        }
      })();
    }

    function getSettings() {
      (async () => {
        try {
          const { data, error } = await supabase
            .from('settings')
            .select('*')
            .eq('id', '1d658364-33b2-4e73-93cc-3359cd9ef2a6');

          if (error) throw error;

          if (data !== undefined && data != null && data.length > 0) {
            // found
            lmfa_allowed.value = data[0].is_active;
            showElements.value = true;
          } else {
            //NOT found
            lmfa_allowed.value = false;
            showElements.value = true;
          }
        } catch (error) {
          console.log(error);
        } finally {
        }
      })();
    }

    const enrollMFA = async () => {
      error.value = '';
      success.value = false;

      const { data: factors } = await supabase.auth.mfa.listFactors();

      // console.log('b2');
      // console.log(factors);

      for (const factor of factors.all) {
        await supabase.auth.mfa.unenroll({ factorId: factor.id });
      }

      const { data, error: enrollError } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: userid.value,
      });

      if (enrollError) {
        error.value = enrollError.message;
        // console.log('b1');
        // console.log(error);
        $q.notify({
          type: 'negative',
          message: error.value?.message
            ? 'Something went wrong.' + ' (' + error.value.message + ')'
            : 'Something went wrong.',
        });
        return;
      }

      // console.log('c1');
      // console.log(data);

      mfaid.value = data.id;

      qrCode.value = data.totp.qr_code;
    };

    const verifyCode = async () => {
      error.value = '';
      success.value = false;
      if (/^\d{6}$/.test(code.value)) {
        const { error: verifyError } = await supabase.auth.mfa.challengeAndVerify({
          factorId: mfaid.value,
          code: code.value,
        });

        if (verifyError) {
          verifyError.message;
          $q.notify({
            type: 'negative',
            message: verifyError.message
              ? 'Something went wrong.' + ' (' + verifyError.message + ')'
              : 'Something went wrong.',
          });
        } else {
          const { data, error } = await supabase.rpc('function_setxusermfa_true', {});

          if (error) {
            console.error('Error calling function:', error);
            $q.notify({
              type: 'negative',
              message: error?.message
                ? 'Something went wrong.' + ' (' + error.message + ')'
                : 'Something went wrong.',
            });
          } else {
            if (data) {
              success.value = true;

              $q.notify({
                type: 'positive',
                message: 'MFA reset.',
                color: 'primary',
              });

              window.location.reload();
            } else {
              $q.notify({
                type: 'negative',
                message: error?.message
                  ? 'Something went wrong.' + ' (' + error.message + ')'
                  : 'Something went wrong.',
              });
            }
          }

          // console.log('o1');
          // console.log(data);
        }
      } else {
        $q.notify({
          type: 'negative',
          message: 'Enter 6 digits.',
        });
      }
    };

    const resetMFA = async () => {
      error.value = '';
      success.value = false;

      try {
        // console.log('b2');
        // console.log(factors);

        const { data, error } = await supabase.rpc('function_setxusermfa_false', {});

        if (error) {
          console.error('Error calling function:', error);
          $q.notify({
            type: 'negative',
            message: error?.message
              ? 'Something went wrong.' + ' (' + error.message + ')'
              : 'Something went wrong.',
          });
        } else {
          if (data) {
            const { data: factors } = await supabase.auth.mfa.listFactors();

            for (const factor of factors.all) {
              await supabase.auth.mfa.unenroll({ factorId: factor.id });
            }

            success.value = true;

            $q.notify({
              type: 'positive',
              message: 'MFA reset.',
              color: 'primary',
            });

            window.location.reload();
          } else {
            $q.notify({
              type: 'negative',
              message: error?.message
                ? 'Something went wrong.' + ' (' + error.message + ')'
                : 'Something went wrong.',
            });
          }
        }
      } catch (e) {
        $q.notify({
          type: 'negative',
          message: error.value?.message
            ? 'Something went wrong.' + ' (' + error.value.message + ')'
            : 'Something went wrong.',
        });
      }
    };

    return {
      showElements,
      showNavbar,
      showTabs,
      tab,
      tabOptions,
      lmfa_enabled,
      lmfa_allowed,

      qrCode,
      enrollMFA,
      resetMFA,
      code,
      verifyCode,
      error,
      success,
    };
  },
});
</script>
