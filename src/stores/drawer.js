import { defineStore } from "pinia";
import { ref } from "vue";
import { useQuasar } from "quasar";
var $q;
export const useDrawerStore = defineStore("drawer", () => {
  const drawer = ref(false);

  return {
    drawer,
  };
});
