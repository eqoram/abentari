<template>
  <q-page-sticky
    v-if="showElements"
    position="top-right"
    :offset="[20, 20]"
    style="
      z-index: 99;
      padding-top: constant(safe-area-inset-top);
      padding-top: env(safe-area-inset-top);
    "
  >
    <q-bar
      class="q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle q-btn--rounded text-white q-btn--actionable q-focusable q-hoverable q-btn--fab"
      :class="pbgcolor"
      style="
        max-width: 400px;
        width: 40vw;
        min-width: 150px;
        height: 56px;
        min-height: 56px;
        flex-direction: row;
        padding-right: 40px;
      "
    >
      <div
        class="text-weight-regular text-lowercase text-center"
        style="margin: auto; text-transform: none"
      >
        {{ ptext }}
      </div>
      <!-- <q-space /> -->
      <q-icon
        style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%)"
        name="arrow_drop_down"
        color="white"
      ></q-icon>
      <q-menu no-refocus>
        <q-list style="max-width: 400px; width: 40vw; min-width: 250px">
          <q-item-label header>reload</q-item-label>
          <q-item clickable v-close-popup tabindex="0" @click="reloadMethod()">
            <q-item-section avatar>
              <q-avatar icon="refresh" :color="pbgcolor.replace('bg-', '')" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>reload</q-item-label>
              <q-item-label caption>reload</q-item-label>
            </q-item-section>
          </q-item>

          <div v-if="pdisplayactions">
            <div
              v-if="storeactions.showactionsSpinner"
              class="q-mt-md q-mb-md"
              style="margin-left: 45%; width: 10%"
            >
              <q-spinner
                :color="pbgcolor.replace('bg-', '')"
                text-color="white"
                size="100%"
                :thickness="2"
              />
            </div>
            <div v-else>
              <div v-if="storeactions.orderedactions[pactionparameter]">
                <q-item-label header>actions</q-item-label>

                <div v-if="storeactions.showactionsSpinner" style="margin-left: 40%; width: 20%">
                  <q-spinner
                    :color="pbgcolor.replace('bg-', '')"
                    text-color="white"
                    size="100%"
                    :thickness="2"
                  />
                </div>

                <div v-else>
                  <div
                    v-for="action in storeactions.orderedactions[pactionparameter]"
                    :key="action.id"
                  >
                    <q-item clickable v-close-popup tabindex="0" @click="actionClick(action.id)">
                      <q-item-section avatar>
                        <q-avatar
                          icon="bolt"
                          :color="pbgcolor.replace('bg-', '')"
                          text-color="white"
                        />
                      </q-item-section>
                      <q-item-section>
                        <!-- <q-item-label>{{
                          action.name.length > 20
                            ? action.name.slice(0, 20) + '...'
                            : action.name
                        }}</q-item-label> -->
                        <q-item-label style="white-space: normal; word-break: break-word">{{
                          action.name
                        }}</q-item-label>
                        <q-item-label caption>action</q-item-label>
                      </q-item-section>
                    </q-item>
                  </div>
                  <q-item
                    v-if="!storeactions.orderedactions[pactionparameter]"
                    clickable
                    v-close-popup
                    tabindex="0"
                  >
                    <q-item-section avatar> </q-item-section>
                    <q-item-section>
                      <q-item-label>none</q-item-label>
                    </q-item-section>
                  </q-item>
                </div>
              </div>
            </div>
          </div>
        </q-list>
      </q-menu>
    </q-bar>
  </q-page-sticky>
  <q-page-sticky
    v-else
    position="top-right"
    :offset="[20, 20]"
    style="
      z-index: 99;
      padding-top: constant(safe-area-inset-top);
      padding-top: env(safe-area-inset-top);
    "
  >
    <div style="margin-left: 80%; width: 20%">
      <q-spinner
        :color="pbgcolor.replace('bg-', '')"
        text-color="white"
        size="100%"
        :thickness="2"
      />
    </div>
  </q-page-sticky>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useactionsStore } from '../stores/actions';
import { supabase } from '../helpers/supabase';
import { useQuasar } from 'quasar';
var $q;
export default defineComponent({
  props: {
    pbgcolor: {
      type: String,
      default: 'bg-primary',
    },
    ptext: {
      type: String,
      default: 'abentari.',
    },
    pdisplayactions: {
      type: Boolean,
      default: false,
    },
    pactionparameter: {
      type: String,
      default: 'home',
    },
  },
  setup(props) {
    $q = useQuasar();
    const router = useRouter();
    const showElements = ref(true);
    const storeactions = useactionsStore();

    onMounted(() => {
      if (props.ploadactions) {
      } else {
      }
    });

    function reloadMethod() {
      window.location.reload(true);
    }

    function actionClick(pactionid) {
      // console.log(paction);
      showElements.value = false;
      // eval(paction);
      (async () => {
        try {
          const { data, error } = await supabase
            .from('actions')
            .select('*')
            .eq('id', pactionid)
            .eq('is_active', true);

          if (error) throw error;

          if (data !== undefined && data != null && data.length > 0) {
            // action found
            eval(data[0].action);
            showElements.value = true;
          } else {
            // action NOT found
            $q.notify({
              type: 'negative',
              message: 'Something went wrong.',
            });
            showElements.value = true;
          }
        } catch (error) {
          console.log(error);
          $q.notify({
            type: 'negative',
            message: 'Something went wrong.',
          });
          showElements.value = true;
        } finally {
        }
      })();
    }

    return {
      showElements,
      reloadMethod,
      storeactions,
      actionClick,
    };
  },
});
</script>
