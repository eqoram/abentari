<template>
  <div v-if="showElements">
    <q-list>
      <!--<q-bar
      class="q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle q-btn--rounded text-white q-btn--actionable q-focusable q-hoverable q-btn--fab"
      :class="pbgcolor"
      style="flex-direction: row"
    >
      <div
        class="text-weight-regular text-lowercase text-center"
        style="margin: auto"
      >
        abentari.
      </div>
    </q-bar>-->
      <q-item-label v-if="pshowhome" header
        ><span
          :class="loggedIn ? pbgcolor : 'bg-accent'"
          class="text-white rounded q-pt-sm q-pb-sm q-pl-md q-pr-md"
          style="border-radius: 20px 20px"
          >abentari.</span
        ></q-item-label
      >
      <q-item v-if="pshowhome && loggedIn" clickable v-close-popup tabindex="0" to="/main/home">
        <q-item-section avatar>
          <q-avatar color="white">
            <q-icon name="home" class="text-primary" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="allowtextbreak">home</q-item-label>
        </q-item-section>
      </q-item>

      <q-item v-if="!loggedIn" clickable v-close-popup tabindex="0" to="/guest/home">
        <q-item-section avatar>
          <q-avatar color="white">
            <q-icon name="home" class="text-primary" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="allowtextbreak">home</q-item-label>
        </q-item-section>
      </q-item>

      <div
        v-if="storePermissions.permissionsByPermission['show.apps'] && storeApps.showAppSpinner"
        class="q-mt-md q-mb-md"
        style="margin-left: 40%; width: 20%"
      >
        <q-spinner color="primary" size="100%" :thickness="2" />
      </div>
      <div v-else>
        <q-item-label
          v-if="storePermissions.permissionsByPermission['show.apps'] && storeApps.apps.length > 0"
          header
          >apps</q-item-label
        >
        <div v-for="app in storeApps.apps" :key="app.id">
          <div
            v-if="
              storePermissions.permissionsByPermission['show.apps'] && storeApps.apps.length > 0
            "
          >
            <q-expansion-item
              :model-value="!expandedApps[app.id]"
              @update:model-value="(val) => (expandedApps[app.id] = !val)"
            >
              <template v-slot:header>
                <q-item-section avatar>
                  <q-avatar icon="apps" color="white" text-color="primary" />
                </q-item-section>

                <q-item-section>
                  <q-item-label style="white-space: normal; word-break: break-word">{{
                    app.name
                  }}</q-item-label>
                </q-item-section>
              </template>

              <div v-for="item in storeApps.itemsByAppId[app.id]" :key="item.id">
                <!-- {{ 'm1' }}
                {{ item }} -->
                <q-item
                  v-if="item.url"
                  clickable
                  v-close-popup
                  tabindex="0"
                  :to="loggedIn ? '/main/pages/' + item.api_name : '/guest/pages/' + item.api_name"
                >
                  <q-item-section avatar> </q-item-section>
                  <q-item-section>
                    <q-item-label style="white-space: normal; word-break: break-word">{{
                      item.name
                    }}</q-item-label>
                    <q-item-label caption>page</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  v-if="!item.url"
                  clickable
                  v-close-popup
                  tabindex="0"
                  :to="
                    loggedIn ? '/main/objects/' + item.api_name : '/guest/objects/' + item.api_name
                  "
                >
                  <q-item-section avatar> </q-item-section>
                  <q-item-section>
                    <q-item-label style="white-space: normal; word-break: break-word">{{
                      item.name
                    }}</q-item-label>
                    <q-item-label caption>object</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
              <q-item
                v-if="storeApps.itemsByAppId[app.id].length === 0"
                clickable
                v-close-popup
                tabindex="0"
              >
                <q-item-section avatar> </q-item-section>
                <q-item-section>
                  <q-item-label class="allowtextbreak">none</q-item-label>
                </q-item-section>
              </q-item>
            </q-expansion-item>
          </div>
        </div>
      </div>

      <div
        v-if="storePermissions.permissionsByPermission['show.pages'] && storePages.showPageSpinner"
        class="q-mt-md q-mb-md"
        style="margin-left: 40%; width: 20%"
      >
        <q-spinner color="primary" size="100%" :thickness="2" />
      </div>
      <div v-else>
        <div
          v-if="
            storePermissions.permissionsByPermission['show.pages'] && storePages.pages.length > 0
          "
        >
          <q-item-label header>pages</q-item-label>
          <q-expansion-item v-model="expandedPages">
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar icon="pages" color="white" text-color="primary" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="allowtextbreak">pages</q-item-label>
              </q-item-section>
            </template>

            <div v-if="storePages.showPageSpinner" style="margin-left: 40%; width: 20%">
              <q-spinner color="primary" size="100%" :thickness="2" />
            </div>
            <div v-else>
              <div v-for="page in storePages.pages" :key="page.id">
                <q-item
                  clickable
                  v-close-popup
                  tabindex="0"
                  :to="loggedIn ? '/main/pages/' + page.api_name : '/guest/pages/' + page.api_name"
                >
                  <q-item-section avatar> </q-item-section>
                  <q-item-section>
                    <q-item-label style="white-space: normal; word-break: break-word">{{
                      page.name
                    }}</q-item-label>
                    <q-item-label caption>page</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
              <q-item v-if="storePages.pages.length === 0" clickable v-close-popup tabindex="0">
                <q-item-section avatar> </q-item-section>
                <q-item-section>
                  <q-item-label class="allowtextbreak">none</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </q-expansion-item>
        </div>
      </div>

      <div
        v-if="
          storePermissions.permissionsByPermission['show.objects'] && storeObjects.showObjectSpinner
        "
        class="q-mt-md q-mb-md"
        style="margin-left: 40%; width: 20%"
      >
        <q-spinner color="primary" size="100%" :thickness="2" />
      </div>
      <div v-else>
        <div
          v-if="
            storePermissions.permissionsByPermission['show.objects'] &&
            storeObjects.objects.length > 0
          "
        >
          <q-item-label header>objects</q-item-label>
          <q-expansion-item v-model="expandedObjects">
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar icon="tab" color="white" text-color="primary" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="allowtextbreak">objects</q-item-label>
              </q-item-section>
            </template>

            <div v-if="storeObjects.showObjectSpinner" style="margin-left: 40%; width: 20%">
              <q-spinner color="primary" size="100%" :thickness="2" />
            </div>
            <div v-else>
              <div v-for="object in storeObjects.objects" :key="object.id">
                <q-item
                  clickable
                  v-close-popup
                  tabindex="0"
                  :to="
                    loggedIn
                      ? '/main/objects/' + object.api_name
                      : '/guest/objects/' + object.api_name
                  "
                >
                  <q-item-section avatar> </q-item-section>
                  <q-item-section>
                    <q-item-label style="white-space: normal; word-break: break-word">{{
                      object.name
                    }}</q-item-label>
                    <q-item-label caption>object</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
              <q-item v-if="storeObjects.objects.length === 0" clickable v-close-popup tabindex="0">
                <q-item-section avatar> </q-item-section>
                <q-item-section>
                  <q-item-label class="allowtextbreak">none</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </q-expansion-item>
        </div>
      </div>

      <div v-if="storeObjectHistories.hideHistory" style="margin-left: 40%; width: 20%"></div>
      <div v-else>
        <div
          v-if="
            storePermissions.permissionsByPermission['show.history'] &&
            storeObjectHistories.histories.length > 0
          "
        >
          <q-item-label header>history</q-item-label>
          <q-expansion-item v-model="expandedObjectHistories">
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar icon="history" color="white" text-color="primary" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="allowtextbreak">history</q-item-label>
              </q-item-section>
            </template>

            <div v-for="history in storeObjectHistories.histories" :key="history.id">
              <q-item
                clickable
                v-close-popup
                tabindex="0"
                :to="
                  loggedIn
                    ? '/main/history/' + 'h_' + history.api_name.slice(2)
                    : '/guest/history/' + 'h_' + history.api_name.slice(2)
                "
              >
                <q-item-section avatar> </q-item-section>
                <q-item-section>
                  <q-item-label style="white-space: normal; word-break: break-word">{{
                    history.name
                  }}</q-item-label>
                  <q-item-label caption>history</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <q-item
              v-if="storeObjectHistories.histories.length === 0"
              clickable
              v-close-popup
              tabindex="0"
            >
              <q-item-section avatar> </q-item-section>
              <q-item-section>
                <q-item-label class="allowtextbreak">none</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </div>
      </div>

      <div
        v-if="
          storePermissions.permissionsByPermission['setup'] ||
          storePermissions.permissionsByPermission['setuplimited']
        "
      >
        <q-item-label header>setup</q-item-label>
        <q-expansion-item v-model="expandedSetup">
          <template v-slot:header>
            <q-item-section avatar>
              <q-avatar icon="settings" color="white" text-color="secondary" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="allowtextbreak"> setup </q-item-label>
            </q-item-section>
          </template>

          <q-item
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/general"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">general</q-item-label>
              <q-item-label caption>setup</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                (storePermissions.permissionsByPermission['apps.setup.select'] ||
                  storePermissions.permissionsByPermission['apps.setup.insert'] ||
                  storePermissions.permissionsByPermission['apps.setup.update'] ||
                  storePermissions.permissionsByPermission['apps.setup.delete']))
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/apps"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">apps</q-item-label>
              <q-item-label caption>setup</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                (storePermissions.permissionsByPermission['pages.setup.select'] ||
                  storePermissions.permissionsByPermission['pages.setup.insert'] ||
                  storePermissions.permissionsByPermission['pages.setup.update'] ||
                  storePermissions.permissionsByPermission['pages.setup.delete']))
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/pages"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">pages</q-item-label>
              <q-item-label caption>setup</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                (storePermissions.permissionsByPermission['profiles.setup.select'] ||
                  storePermissions.permissionsByPermission['profiles.setup.insert'] ||
                  storePermissions.permissionsByPermission['profiles.setup.update'] ||
                  storePermissions.permissionsByPermission['profiles.setup.delete']))
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/profiles"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">profiles</q-item-label>
              <q-item-label caption>setup</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                (storePermissions.permissionsByPermission['xusers.setup.select'] ||
                  storePermissions.permissionsByPermission['xusers.setup.insert'] ||
                  storePermissions.permissionsByPermission['xusers.setup.update'] ||
                  storePermissions.permissionsByPermission['xusers.setup.delete']))
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/users"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">users</q-item-label>
              <q-item-label caption>setup</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                (storePermissions.permissionsByPermission['objects.setup.select'] ||
                  storePermissions.permissionsByPermission['objects.setup.insert'] ||
                  storePermissions.permissionsByPermission['objects.setup.update'] ||
                  storePermissions.permissionsByPermission['objects.setup.delete']))
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/objects"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">objects</q-item-label>
              <q-item-label caption>setup</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                (storePermissions.permissionsByPermission['cpermissions.setup.select'] ||
                  storePermissions.permissionsByPermission['cpermissions.setup.insert'] ||
                  storePermissions.permissionsByPermission['cpermissions.setup.update'] ||
                  storePermissions.permissionsByPermission['cpermissions.setup.delete']))
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/cpermissions"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">cpermissions</q-item-label>
              <q-item-label caption>setup</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                (storePermissions.permissionsByPermission['actions.setup.select'] ||
                  storePermissions.permissionsByPermission['actions.setup.insert'] ||
                  storePermissions.permissionsByPermission['actions.setup.update'] ||
                  storePermissions.permissionsByPermission['actions.setup.delete']))
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/actions"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">actions</q-item-label>
              <q-item-label caption>setup</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                (storePermissions.permissionsByPermission['csql.setup.select'] ||
                  storePermissions.permissionsByPermission['csql.setup.insert'] ||
                  storePermissions.permissionsByPermission['csql.setup.update'] ||
                  storePermissions.permissionsByPermission['csql.setup.delete']))
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/csql"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">csql</q-item-label>
              <q-item-label caption>setup</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                (storePermissions.permissionsByPermission['settings.setup.select'] ||
                  storePermissions.permissionsByPermission['settings.setup.insert'] ||
                  storePermissions.permissionsByPermission['settings.setup.update'] ||
                  storePermissions.permissionsByPermission['settings.setup.delete']))
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/settings"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">settings</q-item-label>
              <q-item-label caption>setup</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                storePermissions.permissionsByPermission['run.setup'])
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/run"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">run</q-item-label>
              <q-item-label caption>setup</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                storePermissions.permissionsByPermission['retrieve.setup'])
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/retrieve"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">retrieve</q-item-label>
              <q-item-label caption>setup</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                storePermissions.permissionsByPermission['deploy.setup'])
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/deploy"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">deploy</q-item-label>
              <q-item-label caption>setup</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </div>

      <div
        v-if="
          storePermissions.permissionsByPermission['setup'] ||
          storePermissions.permissionsByPermission['setuplimited']
        "
      >
        <q-item-label header>history</q-item-label>
        <q-expansion-item v-model="expandedSetupHistory">
          <template v-slot:header>
            <q-item-section avatar>
              <q-avatar icon="history" color="white" text-color="secondary" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="allowtextbreak"> history </q-item-label>
            </q-item-section>
          </template>
          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                storePermissions.permissionsByPermission['i_apps.setup.select'])
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/history/i_apps"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">apps</q-item-label>
              <q-item-label caption>history</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                storePermissions.permissionsByPermission['i_appoptions.setup.select'])
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/history/i_appoptions"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">appoptions</q-item-label>
              <q-item-label caption>history</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                storePermissions.permissionsByPermission['i_pages.setup.select'])
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/history/i_pages"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">pages</q-item-label>
              <q-item-label caption>history</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                storePermissions.permissionsByPermission['i_profiles.setup.select'])
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/history/i_profiles"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">profiles</q-item-label>
              <q-item-label caption>history</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                storePermissions.permissionsByPermission['i_permissions.setup.select'])
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/history/i_permissions"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">permissions</q-item-label>
              <q-item-label caption>history</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                storePermissions.permissionsByPermission['i_permissionoptions.setup.select'])
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/history/i_permissionoptions"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">permissionoptions</q-item-label>
              <q-item-label caption>history</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                storePermissions.permissionsByPermission['i_xusers.setup.select'])
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/history/i_xusers"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">users</q-item-label>
              <q-item-label caption>history</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                storePermissions.permissionsByPermission['i_objects.setup.select'])
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/history/i_objects"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">objects</q-item-label>
              <q-item-label caption>history</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                storePermissions.permissionsByPermission['i_objecthistories.setup.select'])
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/history/i_objecthistories"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">objecthistories</q-item-label>
              <q-item-label caption>history</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                storePermissions.permissionsByPermission['i_fields.setup.select'])
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/history/i_fields"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">fields</q-item-label>
              <q-item-label caption>history</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                storePermissions.permissionsByPermission['i_cpermissions.setup.select'])
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/history/i_cpermissions"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">cpermissions</q-item-label>
              <q-item-label caption>history</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                storePermissions.permissionsByPermission['i_actions.setup.select'])
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/history/i_actions"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">actions</q-item-label>
              <q-item-label caption>history</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                storePermissions.permissionsByPermission['i_csql.setup.select'])
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/history/i_csql"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">csql</q-item-label>
              <q-item-label caption>history</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                storePermissions.permissionsByPermission['i_settings.setup.select'])
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/history/i_settings"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">settings</q-item-label>
              <q-item-label caption>history</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                storePermissions.permissionsByPermission['i_run.setup.select'])
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/history/i_run"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">run</q-item-label>
              <q-item-label caption>history</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                storePermissions.permissionsByPermission['i_retrieve.setup.select'])
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/history/i_retrieve"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">retrieve</q-item-label>
              <q-item-label caption>history</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setup'] ||
              (storePermissions.permissionsByPermission['setuplimited'] &&
                storePermissions.permissionsByPermission['i_deploy.setup.select'])
            "
            active-class="text-secondary"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/setup/history/i_deploy"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">deploy</q-item-label>
              <q-item-label caption>history</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="
              storePermissions.permissionsByPermission['setuplimited'] &&
              !storePermissions.permissionsByPermission['i_apps.setup.select'] &&
              !storePermissions.permissionsByPermission['i_appoptions.setup.select'] &&
              !storePermissions.permissionsByPermission['i_pages.setup.select'] &&
              !storePermissions.permissionsByPermission['i_profiles.setup.select'] &&
              !storePermissions.permissionsByPermission['i_permissions.setup.select'] &&
              !storePermissions.permissionsByPermission['i_permissionoptions.setup.select'] &&
              !storePermissions.permissionsByPermission['i_xusers.setup.select'] &&
              !storePermissions.permissionsByPermission['i_objects.setup.select'] &&
              !storePermissions.permissionsByPermission['i_objecthistories.setup.select'] &&
              !storePermissions.permissionsByPermission['i_fields.setup.select'] &&
              !storePermissions.permissionsByPermission['i_run.setup.select'] &&
              !storePermissions.permissionsByPermission['i_cpermissions.setup.select'] &&
              !storePermissions.permissionsByPermission['i_actions.setup.select'] &&
              !storePermissions.permissionsByPermission['i_csql.setup.select'] &&
              !storePermissions.permissionsByPermission['i_settings.setup.select']
            "
            clickable
            v-close-popup
            tabindex="0"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">none</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </div>

      <q-item-label v-if="pshowuser" header>user</q-item-label>
      <div v-if="loggedIn">
        <q-expansion-item v-if="pshowuser" v-model="expandedUser">
          <template v-slot:header>
            <q-item-section avatar>
              <q-avatar icon="person" color="white" text-color="primary" />
            </q-item-section>

            <q-item-section>
              <q-item-label style="white-space: normal; word-break: break-word">{{
                useremail
              }}</q-item-label>
              <!-- <q-item-label class="allowtextbreak">{{
                useremail.length > 20 ? useremail.substring(0, 20) + '...' : useremail
              }}</q-item-label> -->
            </q-item-section>
          </template>

          <q-item
            v-if="storePermissions.permissionsByPermission['show.mfa']"
            clickable
            v-close-popup
            tabindex="0"
            to="/main/user/mfa-setup/"
          >
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">multi-factor authentication</q-item-label>
              <q-item-label caption>user</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup tabindex="0" @click="signout()">
            <q-item-section avatar> </q-item-section>
            <q-item-section>
              <q-item-label class="allowtextbreak">sign out</q-item-label>
              <q-item-label caption>user</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </div>
      <div v-else>
        <q-item clickable v-close-popup tabindex="0" @click="login()">
          <q-item-section avatar>
            <q-avatar icon="person" color="white" text-color="primary"
          /></q-item-section>
          <q-item-section>
            <q-item-label class="allowtextbreak">log in</q-item-label>
            <q-item-label caption>user</q-item-label>
          </q-item-section>
        </q-item>
      </div>

      <q-item-label v-if="pshowversion" header>version</q-item-label>
      <q-item v-if="pshowversion" clickable v-close-popup tabindex="0">
        <q-item-section avatar>
          <q-avatar color="white">
            <q-icon name="info" class="text-primary" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <!-- <q-item-label style="white-space: normal; word-break: break-word">
            <span
              v-if="lenvironment != 'prod' && lenvironment != 'main' && lenvironment != 'live'"
              >{{ lenvironment + ' - ' }}</span
            >0.0.0
          </q-item-label> -->
          <q-item-label style="white-space: normal; word-break: break-word">
            <span>{{ lenvironment + ' - ' }}</span
            >0.1.1
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
  <div v-else></div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { supabase, environment } from '../helpers/supabase';
import { useQuasar } from 'quasar';
import { usePermissionsStore } from '../stores/permissions';
import { useAppsStore } from '../stores/apps';
import { usePagesStore } from '../stores/pages';
import { useObjectsStore } from '../stores/objects';
import { useObjectHistoriesStore } from '../stores/objecthistories';
import { route } from 'quasar/wrappers';
var $q;
export default {
  props: {
    pbgcolor: {
      type: String,
      default: 'bg-primary',
    },
    pmaintext: {
      type: String,
      default: 'abentari',
    },
    puseremail: {
      type: String,
      default: 'user',
    },
    pshowhome: {
      type: Boolean,
      default: true,
    },
    pshowuser: {
      type: Boolean,
      default: true,
    },
    pshowversion: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    $q = useQuasar();
    const router = useRouter();
    const route = useRoute();
    const showElements = ref(false);
    const showDrawer = ref(false);
    const expandedUser = ref(true);
    const expandedSetup = ref(true);
    const expandedSetupHistory = ref(false);
    const expandedApps = ref({});
    const expandedPages = ref(true);
    const expandedObjects = ref(true);
    const expandedObjectHistories = ref(false);
    const showPageSpinner = ref(true);
    const showObjectSpinner = ref(true);
    const loggedIn = ref(true);
    const userid = ref('');
    const useremail = ref('');
    const storePermissions = usePermissionsStore();
    const storeApps = useAppsStore();
    const storePages = usePagesStore();
    const storeObjects = useObjectsStore();
    const storeObjectHistories = useObjectHistoriesStore();
    const profileid = ref('');
    const lenvironment = ref('');
    lenvironment.value = environment;

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
            showElements.value = true;
            loggedIn.value = true;
            userid.value = data.session.user.id;
            useremail.value = data.session.user.email;
            // useremail.value =
            //   'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW';
          } else {
            // user is NOT logged in
            //router.replace({ name: 'start-login' });
            loggedIn.value = false;
            if (!route.path.startsWith('/main/')) {
              showElements.value = true;
            }
          }
        } catch (error) {
          if (error instanceof Error) {
            console.log(error);
          }
        } finally {
        }
      })();
    }

    function redirectTo(pName) {
      router.push({ name: pName });
    }

    function setupButton(papiname) {
      router.push({ name: 'setup-list', params: { objectapiname: papiname } });
    }

    function signout() {
      (async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
          $q.notify({
            type: 'negative',
            message: 'Logout was unsuccessful.',
          });
        } else {
          router.replace({ name: 'start-login' });
        }
      })();
    }

    function login(papiname) {
      router.push({ name: 'start-login' });
    }

    return {
      showElements,
      showDrawer,
      expandedUser,
      expandedSetup,
      expandedSetupHistory,
      expandedApps,
      expandedPages,
      expandedObjects,
      expandedObjectHistories,
      showPageSpinner,
      showObjectSpinner,
      loggedIn,
      userid,
      useremail,
      storePermissions,
      storeApps,
      storePages,
      storeObjects,
      storeObjectHistories,
      redirectTo,
      setupButton,
      signout,
      login,
      props,
      lenvironment,
    };
  },
};
</script>

<style>
.allowtextbreak {
  white-space: normal;
  word-break: break-word;
}
</style>
