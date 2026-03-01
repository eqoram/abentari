<template>
  <blank-bar v-if="showNavbar" bgcolor="bg-primary"></blank-bar>
  <q-page v-if="showElements" class="flex flex-center">
    <div style="width: 100%; margin: 0">
      <div v-if="isReset && passwordreset_allowed">
        <q-form @submit="onReset" class="q-gutter-md" style="width: 100%; margin: 0">
          <div style="width: 80%; margin: 0 auto">
            <h2 class="text-primary" style="padding-top: 40px">reset</h2>

            <q-input
              outlined
              rounded
              v-model="resetpassword"
              :type="isPwdReset ? 'password' : 'text'"
              label="password"
              style="width: 100%"
              lazy-rules
              :rules="[
                (val) => (val && val.trim().length > 0) || 'this field is required',
                (val) => val.length >= 6 || 'this field should have at least 6 characters',
                (val) => val.length <= 250 || 'this field is limited to 250 characters',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwdReset ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwdReset = !isPwdReset"
                />
              </template>
            </q-input>

            <q-btn
              unelevated
              rounded
              no-caps
              label="reset password"
              type="submit"
              color="primary"
              size="lg"
              style="width: 100%; margin-top: 40px"
            /><br />
          </div>
        </q-form>
      </div>
      <div v-else>
        <q-form @submit="onSubmit" class="q-gutter-md" style="width: 100%; margin: 0">
          <div style="width: 80%; margin: 0 auto">
            <h2 class="text-primary" style="padding-top: 40px">
              {{ isSignUp ? 'signup' : 'login' }}
            </h2>
            <q-input
              outlined
              rounded
              v-model="email"
              type="email"
              label="email"
              style="width: 100%"
              lazy-rules
              :rules="[
                (val) => (val && val.trim().length > 0) || 'this field is required',
                (val) => val.length <= 250 || 'this field is limited to 250 characters',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="mail" />
              </template>
            </q-input>

            <q-input
              outlined
              rounded
              v-model="password"
              :type="isPwd ? 'password' : 'text'"
              label="password"
              style="width: 100%"
              lazy-rules
              :rules="[
                (val) => (val && val.trim().length > 0) || 'this field is required',
                (val) => val.length >= 6 || 'this field should have at least 6 characters',
                (val) => val.length <= 250 || 'this field is limited to 250 characters',
              ]"
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

            <q-select
              v-if="isSignUp"
              outlined
              rounded
              label="profile"
              v-model="profilemodel"
              :options="profileoptions"
              :disable="false"
            >
              <template v-slot:prepend>
                <q-icon name="account_box" />
              </template> </q-select
            ><br />

            <q-input
              v-if="isSignUp && profilemodel.value == 'none'"
              outlined
              rounded
              v-model="secret"
              :type="isSecret ? 'password' : 'text'"
              label="secret"
              style="width: 100%"
              lazy-rules
              :rules="[
                (val) => (val && val.trim().length > 0) || 'this field is required',
                (val) => val.length <= 250 || 'this field is limited to 250 characters',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="key" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isSecret ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isSecret = !isSecret"
                />
              </template>
            </q-input>

            <q-btn
              unelevated
              rounded
              no-caps
              :label="isSignUp ? 'signup' : 'login'"
              type="submit"
              color="primary"
              size="lg"
              style="width: 100%; margin-top: 40px"
            /><br />
            <!--<q-btn
            v-if="!globalgiveninstance"
            outline
            rounded
            no-caps
            label="change instance"
            color="grey"
            class="q-mt-md"
            size="lg"
            style="width: 100%; margin-top: 20px"
            @click="changeInstance()"
          />-->
            <q-btn
              outline
              rounded
              no-caps
              :label="isSignUp ? 'login' : 'create an account'"
              color="primary"
              class="q-mt-lg"
              size="lg"
              style="width: 100%"
              @click="toggleModus()"
            /><br />
            <q-btn
              v-if="!isSignUp && passwordreset_allowed"
              outline
              rounded
              no-caps
              label="reset password"
              color="grey"
              class="q-mt-lg"
              size="lg"
              style="width: 100%; margin-top: 20px"
              @click="resetPassword()"
            />
          </div>
        </q-form>
      </div>
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
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter, useRoute } from 'vue-router';
import { supabaseUrl, supabaseAnonKey, supabase } from '../helpers/supabase';
var $q;
export default {
  name: 'start-login',
  components: { BlankBar },
  setup() {
    $q = useQuasar();
    const router = useRouter();
    const route = useRoute();
    const showElements = ref(false);
    const showNavbar = ref(false);
    const isSignUp = ref(false);
    const email = ref('');
    const password = ref('');
    const resetpassword = ref('');
    const secret = ref('');
    const isPwd = ref(true);
    const isPwdReset = ref(true);
    const isSecret = ref(true);
    const isReset = ref(false);
    const profilemodel = ref({ label: 'none', value: 'none' });
    const profileoptions = ref();
    const passwordreset_allowed = ref(false);

    checkVersion();
    const lversion = ref('');
    function checkVersion() {
      fetch(window.location.origin + '/version.json?' + Date.now())
        .then((serverPromise) =>
          serverPromise.json().then((response) => {
            let lkey = 'version';
            let jsonversion = response.version;
            let lsversion = $q.localStorage.getItem(lkey);
            if (!lsversion || lsversion != jsonversion) {
              $q.localStorage.set(lkey, jsonversion);
              window.location.reload(true);
            } else {
              lversion.value = jsonversion;
            }
          }),
        )
        .finally((response) => {
          checkInstance();
        });
    }

    function checkInstance() {
      let lSupabaselink = supabaseUrl;
      let lSupabasekey = supabaseAnonKey;

      if (
        lSupabaselink &&
        lSupabasekey &&
        lSupabaselink != null &&
        lSupabasekey != null &&
        lSupabaselink !== 'null' &&
        lSupabasekey !== 'null'
      ) {
        if (!supabase) {
          router.go();
        } else {
          checkIfUserIsLoggedIn();
        }
      } else {
        router.replace({ name: 'start-main' });
      }
    }

    function checkIfUserIsLoggedIn() {
      (async () => {
        try {
          const { data, error } = await supabase.auth.getSession();

          if (error) throw error;

          if (data != null && data.session != null) {
            // user is logged in
            router.replace({ name: 'main-home' });
          } else {
            // user is NOT logged in
            checkRoute();
          }
        } catch (error) {
          if (error instanceof Error) {
          }
          checkRoute();
        } finally {
        }
      })();
    }

    function checkRoute() {
      if (route.name == 'start-reset') {
        isReset.value = true;
      }
      getSettings();
    }

    function getSettings() {
      (async () => {
        try {
          const { data, error } = await supabase
            .from('settings')
            .select('*')
            .eq('id', 'cd700b62-11e1-4664-bfe9-96a8ff376a59');

          if (error) throw error;

          if (data !== undefined && data != null && data.length > 0) {
            // found
            passwordreset_allowed.value = data[0].is_active;
            getPublicProfiles();
          } else {
            //NOT found
            passwordreset_allowed.value = false;
            getPublicProfiles();
          }
        } catch (error) {
          console.log(error);
        } finally {
        }
      })();
    }

    function getPublicProfiles() {
      (async () => {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select()
            .eq('is_active', true)
            .eq('is_public', true);

          if (error) throw error;

          let lprofileoptions = [];
          lprofileoptions.push({ label: 'none', value: 'none' });
          for (let i = 0; i < data.length; i++) {
            lprofileoptions.push({ label: data[i].name, value: data[i].id });
          }
          profileoptions.value = lprofileoptions;

          showNavbar.value = true;
          showElements.value = true;
        } catch (error) {
          console.log(error);
          showNavbar.value = true;
          showElements.value = true;
        } finally {
        }
      })();
    }

    function onSubmit() {
      handleLogin();
    }

    function changeInstance() {
      $q.localStorage.set('supabaselink', 'null');
      $q.localStorage.set('supabasekey', 'null');

      router.replace({ name: 'start-main' });
    }

    function handleLogin() {
      showElements.value = false;
      if (isSignUp.value) {
        createUser();
      } else {
        loginUser();
      }
    }

    function createUser() {
      (async () => {
        try {
          showElements.value = false;
          const { data, error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
            options: {
              emailRedirectTo: window.location.href,
              data: {
                invitesecret: secret.value,
                inviteprofile: profilemodel.value.value,
              },
            },
          });

          if (error) throw error;
          $q.notify({
            type: 'positive',
            message: 'Succuessfully signed up.',
            color: 'primary',
          });
          isSignUp.value = false;
          showElements.value = true;
          // loginUser();
        } catch (error) {
          showElements.value = true;
          if (error instanceof Error) {
            console.log('start-login1: ' + error);
            $q.notify({
              type: 'negative',
              message: error?.message
                ? 'Something went wrong.' + ' (' + error.message + ')'
                : 'Something went wrong.',
            });
          }
        } finally {
        }
      })();
    }

    function loginUser() {
      (async () => {
        try {
          showElements.value = false;
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value,
          });

          if (error) throw error;
          $q.notify({
            type: 'positive',
            message: 'Succuessfully logged in.',
            color: 'primary',
          });
          location.reload();
        } catch (error) {
          showElements.value = true;
          if (error instanceof Error) {
            console.log('start-login1: ' + error);
            $q.notify({
              type: 'negative',
              message: error?.message
                ? 'Something went wrong.' + ' (' + error.message + ')'
                : 'Something went wrong.',
            });
          }
        } finally {
        }
      })();
    }

    function toggleModus() {
      if (isSignUp.value === true || isSignUp.value === 'true') {
        isSignUp.value = false;
      } else {
        isSignUp.value = true;
      }
    }

    function resetPassword() {
      if (email.value) {
        (async () => {
          try {
            showElements.value = false;

            const { data, error } = await supabase.auth.resetPasswordForEmail(email.value, {
              redirectTo: window.location.origin + '/#/main/reset/',
            });

            if (error) throw error;

            $q.notify({
              type: 'positive',
              message: 'Check your inbox.',
              color: 'primary',
            });
          } catch (error) {
            if (error instanceof Error) {
              console.log('start-login2: ' + error);
              $q.notify({
                type: 'negative',
                message: error?.message
                  ? 'Something went wrong.' +
                    ' (' +
                    error.message +
                    ')' +
                    ' Perhaps the rate limit for emails was reach. Try again at the top of the next hour.'
                  : 'Something went wrong. Perhaps the rate limit for emails was reach. Try again at the top of the next hour.',
              });
            }
          } finally {
            showElements.value = true;
          }
        })();
      } else {
        $q.notify({
          type: 'negative',
          message: 'Enter an email address.',
        });
      }
    }

    function getBetween(str, startWord, endWord) {
      const regex = new RegExp(`${startWord}(.*?)${endWord}`);
      const match = str.match(regex);
      return match ? match[1] : null;
    }

    function onReset() {
      (async () => {
        try {
          showElements.value = false;

          const fullUrl = window.location.href;

          // Use regex or manual string parsing to find tokens
          const access_token = getBetween(fullUrl, 'access_token=', '&expires_at=');
          const refresh_token = getBetween(fullUrl, 'refresh_token=', '&token_type');

          if (!access_token || !refresh_token) {
            throw new Error('Missing access_token or refresh_token in URL');
          }

          await supabase.auth.setSession({ access_token, refresh_token });

          const { data, error } = await supabase.auth.updateUser({
            password: resetpassword.value,
          });

          if (error) throw error;

          $q.notify({
            type: 'positive',
            message: 'Password was reset.',
            color: 'primary',
          });

          router.replace({ name: 'start-login' });
        } catch (error) {
          if (error instanceof Error) {
            console.log('start-login3: ' + error);
            $q.notify({
              type: 'negative',
              message: error?.message
                ? 'Something went wrong.' + ' (' + error.message + ')'
                : 'Something went wrong.',
            });
          }
        } finally {
          showElements.value = true;
        }
      })();
    }

    return {
      showElements,
      showNavbar,
      isSignUp,
      email,
      password,
      resetpassword,
      secret,
      isPwd,
      isPwdReset,
      isSecret,
      isReset,
      profilemodel,
      profileoptions,
      onSubmit,
      changeInstance,
      toggleModus,
      resetPassword,
      onReset,
      passwordreset_allowed,
    };
  },
};
</script>
