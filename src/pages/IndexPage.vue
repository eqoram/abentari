<!--
NODE_OPTIONS=--max_old_space_size=4096 quasar dev
git reset --hard && git clean -df
-->
<template>
  <q-page v-if="showElements">
    <h1>IndexPage</h1>
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
//import { Todo, Meta } from 'components/models';
///import ExampleComponent from 'components/ExampleComponent.vue';
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'IndexPage',
  //components: { ExampleComponent },
  setup() {
    const router = useRouter();
    const showElements = ref(false);
    onMounted(() => {
      router.replace({ name: 'start-login' });
    });
    return {
      showElements,
    };
  },
});
</script>
