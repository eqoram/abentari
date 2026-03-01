<template>
  <div>
    <q-page-sticky
      style="
        z-index: 99;
        padding-top: constant(safe-area-inset-top);
        padding-top: env(safe-area-inset-top);
      "
      position="top-left"
      :offset="[80, 20]"
    >
      <q-btn fab :color="pmaincolor" @click="backButton()">
        <q-icon name="arrow_back_ios_new" class="text-white" />
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
export default {
  props: {
    pmaincolor: {
      type: String,
      default: 'primary',
    },
    pguest: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();

    function backButton() {
      if (window.history.state.back == '/main/home' || window.history.state.back == '/guest/home') {
        router.back();
      } else {
        if (props.pguest) {
          router.replace({
            name: 'guest-home',
          });
        } else {
          router.replace({
            name: 'main-home',
          });
        }
      }
    }

    return { backButton };
  },
};
</script>
