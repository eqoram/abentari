<template>
  <div>
    <q-page-sticky
      v-if="!pmodal"
      style="
        z-index: 99;
        padding-top: constant(safe-area-inset-top);
        padding-top: env(safe-area-inset-top);
      "
      position="top-left"
      :offset="[80, 20]"
    >
      <q-btn fab color="primary" @click="backButton()">
        <q-icon name="arrow_back_ios_new" class="text-white" />
      </q-btn>
    </q-page-sticky>
  </div>
  <blank-bar
    pbgcolor="bg-primary"
    :ptext="objectname"
    v-if="!pmodal"
    :pdisplayactions="true"
    :pactionparameter="'pagedetail__' + objectapiname"
  ></blank-bar>
  <tab-bar
    v-if="!pmodal"
    pcolor="primary"
    :ptab="tab.name"
    :pid="tab.id"
    :ptaboptions="tabOptions"
    @updatevalue="tab.name = $event"
    @updateid="tab.id = $event"
    :ptabalways="true"
  ></tab-bar>
  <div v-if="showElements">
    <q-scroll-area style="height: calc(100dvh - 137.01px); contain: style">
      <div class="q-pt-md q-pb-md q-ml-md q-mr-md">
        <div
          v-if="
            tab.id == '02e2e5ee-27c3-4720-8782-bd478e5cbcc0' ||
            tab.id == '8ed8ea5b-591f-4427-bff0-35105acccf0a'
          "
        >
          <detail-main
            :pmain="true"
            :pmodal="pmodal"
            pmaincolor="primary"
            :pobject="objectapiname"
            :psingular="objectname"
            :pelements="fieldelements"
            :pbacklink="plinkobject"
            :psilentelements="[]"
            :ppermissions="storePermissions.permissions"
            :puserid="userid"
            :pguest="pguest"
            :pguestid="userid"
            :pobjectdetail="true"
            :pobjectapiname="objectapiname"
          ></detail-main>
        </div>
        <div v-if="tabDetails[tab.id]?.showlist">
          <list-item
            pidentifier="id"
            pname="name"
            :pdetaillink="plinkobjectdetail"
            :ploaddata="true"
            :pobject="tabDetails[tab.id]?.lobjectapiname"
            :pparam="true"
            :pparamname="'objectapiname'"
            :pparamvalue="tabDetails[tab.id]?.lobjectapiname"
            porderby="name"
            :pshowaddbutton="false"
            :paddbuttonurl="plinkobjectdetail"
            pmaincolor="primary"
            :pfilterdata="true"
            :pfilterby="tabDetails[tab.id]?.lfiltercolumn"
            :pfilter="parameterid"
            :prelationmulti="tabDetails[tab.id]?.relationmulti"
          ></list-item>
        </div>
      </div>
    </q-scroll-area>
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
import BlankBar from 'components/blank-bar.vue';
import TabBar from 'components/tab-bar.vue';
import DetailMain from 'components/detail-main.vue';
import ListItem from 'components/list-item.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { supabase } from '../helpers/supabase';
import { usePermissionsStore } from '../stores/permissions';
var $q;
export default {
  inheritAttrs: false,
  name: 'main-objects-detail',
  props: {
    pguest: {
      type: Boolean,
      default: false,
    },
    plinkobject: {
      type: String,
      default: 'main-objects',
    },
    plinkobjectdetail: {
      type: String,
      default: 'main-objects-detail',
    },
    pmodal: {
      type: Boolean,
      default: false,
    },
    prelation_apiname: {
      type: String,
      default: '',
    },
  },
  components: { BlankBar, TabBar, DetailMain, ListItem },
  setup(props) {
    $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const showElements = ref(false);
    const userid = ref('');
    const useremail = ref('');
    const objectname = ref('loading...');
    const objectapiname = ref('');
    const objectid = ref('');
    const objectfieldorder = ref([]);
    const tab = ref({ name: '', id: '' });
    const tabOptions = ref([{ name: '' }]);
    const fieldelements = ref([]);
    const objectrelations = ref([]);
    const tabDetails = ref({});
    const parameterid = ref('');
    parameterid.value = route.params.pid;
    const allowSELECT = ref(false);
    const allowINSERT = ref(false);
    const allowUPDATE = ref(false);
    const allowDELETE = ref(false);
    const isEdit = ref(false);
    const lshowid = ref(false);
    const lshowcreatedby = ref(false);
    const lshowcreatedat = ref(false);
    const lshowmodifiedby = ref(false);
    const lshowmodifiedat = ref(false);
    const lshowowner = ref(false);
    const lshowname = ref(false);
    const storePermissions = usePermissionsStore();

    onMounted(() => {
      if (route.params.pid) {
        isEdit.value = true;
      }
      if (props.pguest) {
        userid.value = '00000000-0000-0000-0000-000000000000';
        getObjectMetaData();
      } else {
        checkIfUserIsLoggedIn();
      }
    });

    function checkIfUserIsLoggedIn() {
      (async () => {
        await storePermissions.getPermissions();

        try {
          const { data, error } = await supabase.auth.getSession();

          if (error) throw error;

          if (data != null && data.session != null) {
            // user is logged in
            userid.value = data.session.user.id;
            useremail.value = data.session.user.email;
            getObjectMetaData();
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

    function getObjectMetaData() {
      (async () => {
        try {
          await storePermissions.getPermissions();

          if (props.pmodal) {
            objectapiname.value = props.prelation_apiname;
            //objectapiname.value = route.params.objectapiname;
          } else {
            objectapiname.value = route.params.objectapiname;
          }

          const { data, error } = await supabase
            .from('objects')
            .select('*')
            .eq('api_name', objectapiname.value);

          if (error) throw error;

          if (data !== undefined && data != null && data.length > 0) {
            // object does exist
            objectname.value = data[0].name;
            objectid.value = data[0].id;
            objectfieldorder.value = data[0].fields_selected;
            objectrelations.value = data[0].relations;

            lshowid.value = data[0].show_id;
            lshowcreatedby.value = data[0].show_createdby;
            lshowcreatedat.value = data[0].show_createdat;
            lshowmodifiedby.value = data[0].show_modifiedby;
            lshowmodifiedat.value = data[0].show_modifiedat;
            lshowowner.value = data[0].show_owner;
            lshowname.value = data[0].show_name;

            getFields();
          } else {
            // object does NOT exist
            console.log('main-objects.vue error1');
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

    function getFields() {
      (async () => {
        try {
          if (props.pmodal) {
            objectapiname.value = props.prelation_apiname;
            //objectapiname.value = route.params.objectapiname;
          } else {
            objectapiname.value = route.params.objectapiname;
          }

          const { data, error } = await supabase
            .from('fields')
            .select('*')
            .eq('parent_id', objectid.value);

          if (error) throw error;

          fieldelements.value = [];

          if (lshowid.value) {
            fieldelements.value.push({
              label: 'id',
              name: 'id',
              type: 'readonlycopy',
              value: null,
            });
          }

          if (lshowcreatedby.value) {
            fieldelements.value.push({
              label: 'created by',
              name: 'created_by',
              type: 'readonlycopy',
              value: null,
            });
          }

          if (lshowcreatedat.value) {
            fieldelements.value.push({
              label: 'created at',
              name: 'created_at',
              type: 'readonlycopy',
              value: null,
            });
          }

          if (lshowmodifiedby.value) {
            fieldelements.value.push({
              label: 'modified by',
              name: 'modified_by',
              type: 'readonlycopy',
              value: null,
            });
          }

          if (lshowmodifiedat.value) {
            fieldelements.value.push({
              label: 'modified at',
              name: 'modified_at',
              type: 'readonlycopy',
              value: null,
            });
          }

          if (lshowowner.value) {
            fieldelements.value.push({
              label: 'owner',
              name: 'owner_id',
              type: 'relation',
              value: false,
              required: true,
              load: true,
              loadtable: 'c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413',
              loadcolumn: 'name',
              loadvalue: 'xuser_id',
              relation_apiname: 'c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413',
              powner: true,
              punkownrecordtext: 'UNKOWN USER',
              phideiframebutton: false,
            });
          }

          if (lshowname.value) {
            fieldelements.value.push({
              label: 'name',
              name: 'name',
              type: 'text',
              value: null,
              required: true,
            });
          }

          if (data !== undefined && data != null && data.length > 0) {
            let lobjectfieldorder = objectfieldorder.value;
            for (let j = 0; j < lobjectfieldorder?.length; j++) {
              for (let i = 0; i < data.length; i++) {
                if (lobjectfieldorder[j] == data[i].id) {
                  if (data[i].type == 'text') {
                    fieldelements.value.push({
                      label: data[i].name,
                      name: data[i].api_name,
                      type: data[i].type,
                      value: null,
                      required: data[i].required,
                    });
                  } else if (data[i].type == 'editor') {
                    fieldelements.value.push({
                      label: data[i].name,
                      name: data[i].api_name,
                      type: data[i].type,
                      value: '',
                      required: data[i].required,
                    });
                  } else if (data[i].type == 'display') {
                    fieldelements.value.push({
                      label: data[i].name,
                      name: data[i].api_name,
                      type: data[i].type,
                      value: data[i].display,
                      required: data[i].required,
                    });
                  } else if (data[i].type == 'date') {
                    fieldelements.value.push({
                      label: data[i].name,
                      name: data[i].api_name,
                      type: data[i].type,
                      value: '',
                      required: data[i].required,
                    });
                  } else if (data[i].type == 'datetime') {
                    fieldelements.value.push({
                      label: data[i].name,
                      name: data[i].api_name,
                      type: data[i].type,
                      value: '',
                      required: data[i].required,
                    });
                  } else if (data[i].type == 'number') {
                    fieldelements.value.push({
                      label: data[i].name,
                      name: data[i].api_name,
                      type: data[i].type,
                      value: '',
                      required: data[i].required,
                    });
                  } else if (data[i].type == 'longtext') {
                    fieldelements.value.push({
                      label: data[i].name,
                      name: data[i].api_name,
                      type: data[i].type,
                      value: '',
                      required: data[i].required,
                    });
                  } else if (data[i].type == 'bool') {
                    fieldelements.value.push({
                      label: data[i].name,
                      name: data[i].api_name,
                      type: data[i].type,
                      value: false,
                      required: true,
                    });
                  } else if (data[i].type == 'file') {
                    fieldelements.value.push({
                      label: data[i].name,
                      name: data[i].api_name,
                      type: data[i].type,
                      value: false,
                      required: data[i].required,
                    });
                  } else if (data[i].type == 'relation') {
                    fieldelements.value.push({
                      label: data[i].name,
                      name: data[i].api_name,
                      type: 'relation',
                      value: false,
                      required: data[i].required,
                      load: true,
                      loadtable: data[i].relation_apiname,
                      loadcolumn: 'name',
                      loadvalue: 'id',
                      relation_apiname: data[i].relation_apiname,
                    });
                  } else if (data[i].type == 'relationmulti') {
                    fieldelements.value.push({
                      label: data[i].name,
                      name: data[i].api_name,
                      type: 'relationmulti',
                      value: false,
                      required: data[i].required,
                      load: true,
                      loadtable: data[i].relation_apiname,
                      loadcolumn: 'name',
                      loadvalue: 'id',
                      relation_apiname: data[i].relation_apiname,
                    });
                  } else if (data[i].type == 'picklist') {
                    let loptions = [];
                    for (let j = 0; j < data[i].picklist_values.length; j++) {
                      let lparts = data[i].picklist_values[j].split(';');
                      // loptions.push({
                      //   label: lparts[2] === 'true' ? '<s>' + lparts[1] + '</s>' : lparts[1],
                      //   value: lparts[0],
                      //   disable: lparts[2] === 'true',
                      //   html: lparts[2] === 'true' ? true : false,
                      // });
                      loptions.push({
                        label: lparts[2] === 'true' ? '' + lparts[1] + '' : lparts[1],
                        value: lparts[0],
                        disable: lparts[2] === 'true',
                      });
                    }

                    fieldelements.value.push({
                      label: data[i].name,
                      name: data[i].api_name,
                      type: 'picklist',
                      value: false,
                      required: data[i].required,
                      options: loptions,
                    });
                  } else if (data[i].type == 'picklistmulti') {
                    let loptions = [];
                    for (let j = 0; j < data[i].picklist_values.length; j++) {
                      let lparts = data[i].picklist_values[j].split(';');
                      // loptions.push({
                      //   label: lparts[2] === 'true' ? '<s>' + lparts[1] + '</s>' : lparts[1],
                      //   value: lparts[0],
                      //   disable: lparts[2] === 'true',
                      //   html: lparts[2] === 'true' ? true : false,
                      // });
                      loptions.push({
                        label: lparts[2] === 'true' ? '' + lparts[1] + '' : lparts[1],
                        value: lparts[0],
                        disable: lparts[2] === 'true',
                      });
                    }

                    fieldelements.value.push({
                      label: data[i].name,
                      name: data[i].api_name,
                      type: 'picklistmulti',
                      value: false,
                      required: data[i].required,
                      options: loptions,
                    });
                  }
                }
              }
            }

            getRelations();
          } else {
            // fields do NOT exist
            getRelations();
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

    function getRelations() {
      if (isEdit.value) {
        tab.value = { name: 'general', id: '02e2e5ee-27c3-4720-8782-bd478e5cbcc0' };
        tabOptions.value = [{ name: 'general', id: '02e2e5ee-27c3-4720-8782-bd478e5cbcc0' }];

        (async () => {
          try {
            const { data, error } = await supabase
              .from('fields')
              .select('*')
              .in('id', objectrelations.value)
              .order('relationname', { ascending: true });

            if (error) throw error;

            if (data !== undefined && data != null && data.length > 0) {
              // fields exist
              for (var i = 0; i < data.length; i++) {
                tabOptions.value.push({
                  name: data[i]['relationname'],
                  id: data[i]['id'],
                  showlist: true,
                  relationmulti: data[i].type == 'relationmulti' ? true : false,
                  lobjectapiname: data[i]['parent_apiname'],
                  lfiltercolumn: data[i]['api_name'],
                });
                tabDetails.value[data[i]['id']] = {
                  showlist: true,
                  relationmulti: data[i].type == 'relationmulti' ? true : false,
                  lobjectapiname: data[i]['parent_apiname'],
                  lfiltercolumn: data[i]['api_name'],
                };
              }

              showElements.value = true;
            } else {
              // relation does NOT exist
              showElements.value = true;
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
      } else {
        tab.value = { name: 'new', id: '8ed8ea5b-591f-4427-bff0-35105acccf0a' };
        tabOptions.value = [{ name: 'new', id: '8ed8ea5b-591f-4427-bff0-35105acccf0a' }];
        showElements.value = true;
      }
    }

    function backButton() {
      if (window.history.state.back != null) {
        router.back();
      } else {
        router.replace({
          name: props.plinkobject,
          params: { objectapiname: route.params.objectapiname },
        });
      }
    }

    return {
      showElements,
      parameterid,
      objectid,
      objectname,
      objectapiname,
      tab,
      tabOptions,
      fieldelements,
      tabDetails,
      backButton,
      userid,
      lshowid,
      lshowcreatedby,
      lshowcreatedat,
      lshowmodifiedby,
      lshowmodifiedat,
      lshowowner,
      lshowname,
      storePermissions,
    };
  },
};
</script>
