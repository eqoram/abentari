<template>
  <q-layout view="lHh Lpr lFf">
    <nav-bar v-if="!hideNavbar" pbgcolor="bg-primary"></nav-bar>
    <!--<q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>-->

    <q-page-container>
      <router-view :key="$route.fullPath" />
    </q-page-container>
  </q-layout>
</template>

<script>
import NavBar from 'src/components/nav-bar.vue';
import { defineComponent, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { watch } from 'vue';
//import EssentialLink from 'components/EssentialLink.vue';
export default defineComponent({
  name: 'MainLayout',
  components: { NavBar },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const hideNavbarList = {
      '': true,
      '/': true,
      'index-page': true,
      'start-login': true,
      'start-login-secret': true,
      'start-reset': true,
      'start-mfa': true,
      // 'guest-objects': true,
      // 'guest-objects-detail': true,
    };
    const hideNavbar = ref(hideNavbarList[route.name] ? true : false);
    const leftDrawerOpen = ref(false);

    watch(
      () => route.fullPath,
      async () => {
        hideNavbar.value = hideNavbarList[route.name] ? true : false;
      },
    );

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      hideNavbar,
    };
  },
});
</script>
