<template>
  <div v-if="showElements">
    <h4 v-if="pmodal" class="text-weight-bold q-pt-xs q-mt-xs" :class="'text-' + pmaincolor">
      {{ psingular }}
    </h4>
    <field-main
      :precordapistandard="lrecordapistandard"
      :pelements="pelements"
      :precord="lrecord"
      :pmodal="pmodal"
      :pobject="pobject"
      :psingular="psingular"
      :pbacklink="pbacklink"
      :psilentelements="psilentelements"
      :pallow-s-e-l-e-c-t="allowSELECT"
      :pallow-i-n-s-e-r-t="allowINSERT"
      :pallow-u-p-d-a-t-e="allowUPDATE"
      :pallow-d-e-l-e-t-e="allowDELETE"
      :pisedit="isEdit"
      :pid="parameterid"
      :precordoptions="lrecordoptions"
      :precordoptionsbyid="lrecordoptionsbyid"
      :pmaincolor="pmaincolor"
      :phideeditsave="phideeditsave"
      :pguest="pguest"
      :pguestid="pguestid"
      :puserid="puserid"
      :pupdatepermission="pupdatepermission"
      :pupdatepage="pupdatepage"
      :pupdateobject="pupdateobject"
      :pupdateaction="pupdateaction"
      :pxuserid="xuserid"
      :poptiondescription="loptiondescription"
      :pupdateapp="true"
      :pobjectdetail="pobjectdetail"
      :pobjectapiname="pobjectapiname"
    ></field-main>
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
import FieldMain from 'components/field-main.vue';
import { ref, onMounted, computed, onBeforeUnmount, defineAsyncComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { supabase } from '../helpers/supabase';
import { useObjectsStore } from '../stores/objects';
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import DOMPurify from 'dompurify';
const storeObjects = useObjectsStore();
var $q;
export default {
  // name: 'ComponentName',
  components: { FieldMain },
  props: {
    pelements: {
      type: Array,
    },
    pmaincolor: {
      type: String,
      default: 'primary',
    },
    pobject: {
      type: String,
      default: '',
    },
    psingular: {
      type: String,
      default: '',
    },
    pbacklink: {
      type: String,
      default: '',
    },
    psilentelements: {
      type: Array,
    },
    pupdateapp: {
      type: Boolean,
      default: false,
    },
    pupdatepage: {
      type: Boolean,
      default: false,
    },
    pupdateobject: {
      type: Boolean,
      default: false,
    },
    pupdateaction: {
      type: Boolean,
      default: false,
    },
    pupdatepermission: {
      type: Boolean,
      default: false,
    },
    phideeditsave: {
      type: Boolean,
      default: false,
    },
    pdeletetext: {
      type: String,
      default: '',
    },
    pguest: {
      type: Boolean,
      default: false,
    },
    pguestid: {
      type: String,
      default: '',
    },
    pmodal: {
      type: Boolean,
      default: false,
    },
    ppermissions: {
      default: [],
    },
    puserid: {
      default: '',
    },
    psetup: {
      type: Boolean,
      default: false,
    },
    pmain: {
      type: Boolean,
      default: false,
    },
    pobjectdetail: {
      type: Boolean,
      default: false,
    },
    pobjectapiname: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const showElements = ref(false);
    const isEdit = ref(false);
    const lrecord = ref({});
    const showSaveButton = ref(true);
    const showDeleteButton = ref(false);
    const showDialogDelete = ref(false);
    const parameter = ref(false);
    const parameterid = ref('');
    const profileid = ref('');
    const lrecordoptions = ref({});
    const lrecordoptionsbyid = ref({});
    const luuid = ref('');
    const myltref = ref({});
    const lrecordapistandard = ref({});
    const ldialog = ref({});
    const allowSELECT = ref(false);
    const allowINSERT = ref(false);
    const allowUPDATE = ref(false);
    const allowDELETE = ref(false);
    const lowner_id = ref('');
    const xuserid = ref('');
    const loptiondescription = ref({});

    onMounted(() => {
      getXUser();
    });

    function getXUser() {
      if (props.pguest) {
        xuserid.value = '00000000-0000-0000-0000-000000000000';
        mountMethod();
      } else {
        if (props.pmain) {
          (async () => {
            try {
              // console.log('n1: userid');
              // console.log(props.puserid);
              const { data, error } = await supabase
                .from('xusers')
                .select('*')
                .eq('user_id', props.puserid)
                .eq('is_active', true);

              if (error) throw error;

              if (data !== undefined && data != null && data.length > 0) {
                // found
                xuserid.value = data[0].id;
                mountMethod();
              } else {
                //NOT found
                console.log('error: user not found');
              }
            } catch (error) {
              console.log(error);
            } finally {
            }
          })();
        } else {
          mountMethod();
        }
      }
    }

    function mountMethod() {
      if (route.params.pid && !props.pmodal) {
        luuid.value = route.params.pid;
        isEdit.value = true;
        parameter.value = true;
        parameterid.value = route.params.pid;
        showDeleteButton.value = true;
        if (props.phideeditsave) {
          showSaveButton.value = false;
        }
        setDefault();
        getOptionsAndInitValues(true);
      } else {
        luuid.value = uuidv4();
        profileid.value = route.params.pprofileid;
        setDefault();
        getOptionsAndInitValues(false);
      }
    }

    function setDefault() {
      for (let i = 0; i < props.pelements.length; i++) {
        lrecord.value[props.pelements[i].name] = props.pelements[i].value;
      }
      if (isEdit.value == false && props.pobjectdetail) {
        lrecord.value['owner_id'] = xuserid.value;
      }
    }

    function getOptionsAndInitValues(getDataAfterwards) {
      for (let i = 0; i < props.pelements.length; i++) {
        if (
          (props.pelements[i].type == 'relation' ||
            props.pelements[i].type == 'relationmulti' ||
            props.pelements[i].type == 'picklist' ||
            props.pelements[i].type == 'picklistmulti') &&
          props.pelements[i].options
        ) {
          lrecordoptions.value[props.pelements[i].name] = props.pelements[i].options;
        }
        if (props.pelements[i].type == 'picklist' || props.pelements[i].type == 'picklistmulti') {
          lrecordoptionsbyid.value[props.pelements[i].name] = {};
          for (let j = 0; j < props.pelements[i].options.length; j++) {
            lrecordoptionsbyid.value[props.pelements[i].name][
              props.pelements[i].options[j]['value']
            ] = props.pelements[i].options[j];
          }
        }
        if (props.pelements[i].type == 'picklist') {
          lrecord.value[props.pelements[i].name] = null;
        }
        if (props.pelements[i].type == 'picklistmulti') {
          lrecord.value[props.pelements[i].name] = [];
        }
        if (props.pelements[i].type == 'relation') {
          lrecord.value[props.pelements[i].name] = null;
        }
        if (props.pelements[i].type == 'relationmulti') {
          lrecord.value[props.pelements[i].name] = [];
        }
        if (props.pelements[i].type == 'editor') {
          lrecord.value[props.pelements[i].name] = '';
        }
        if (props.pelements[i].type == 'id') {
          if (!lrecord.value[props.pelements[i].name]) {
            lrecord.value[props.pelements[i].name] = uuidv4();
          }
        }
      }

      if (getDataAfterwards) {
        getData();
      } else {
        applyPermissions();
      }
    }

    function getData() {
      if (isEdit.value) {
        (async () => {
          try {
            const { data, error } = await supabase
              .from(props.pobject)
              .select()
              .eq('id', parameterid.value);

            if (error) throw error;

            if (data !== undefined && data != null) {
              if (props.pobjectdetail) {
                lowner_id.value = data[0]['owner_id'];
                lrecord.value['owner_id'] = data[0]['owner_id'];
              }

              for (let i = 0; i < props.pelements.length; i++) {
                if (props.pelements[i]['type'] == 'api') {
                  lrecordapistandard.value[props.pelements[i]['name']] = data[0]['is_standard'];

                  if (!lrecordapistandard.value[props.pelements[i]['name']]) {
                    let lapiparts = data[0][props.pelements[i]['name']].split('__');
                    lrecord.value[props.pelements[i]['name']] = lapiparts[0];
                  } else {
                    lrecord.value[props.pelements[i]['name']] = data[0][props.pelements[i]['name']];
                  }
                } else if (props.pelements[i]['type'] == 'relation') {
                  lrecord.value[props.pelements[i]['name']] = data[0][props.pelements[i]['name']];
                } else if (props.pelements[i]['type'] == 'relationmulti') {
                  lrecord.value[props.pelements[i]['name']] = data[0][props.pelements[i]['name']];
                } else if (props.pelements[i]['type'] == 'file') {
                  lrecord.value[props.pelements[i]['name']] = data[0][props.pelements[i]['name']];
                } else if (props.pelements[i]['type'] == 'datetime') {
                  if (data[0][props.pelements[i]['name']]) {
                    let date = new Date(data[0][props.pelements[i]['name']]);
                    let year = date.getFullYear();
                    let month = String(date.getMonth() + 1).padStart(2, '0');
                    let day = String(date.getDate()).padStart(2, '0');
                    let hours = String(date.getHours()).padStart(2, '0');
                    let minutes = String(date.getMinutes()).padStart(2, '0');
                    let seconds = String(date.getSeconds()).padStart(2, '0');
                    let milliseconds = String(date.getMilliseconds()).padStart(3, '0');
                    let offsetMinutes = date.getTimezoneOffset();
                    let offsetHours = Math.abs(Math.floor(offsetMinutes / 60));
                    let offsetRemainderMinutes = Math.abs(offsetMinutes % 60);
                    let offsetSign = offsetMinutes > 0 ? '-' : '+';
                    let offset = `${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetRemainderMinutes).padStart(2, '0')}`;
                    let localISOString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
                    lrecord.value[props.pelements[i]['name']] = localISOString;
                  }
                } else if (props.pelements[i]['type'] == 'picklist') {
                  let lfound = false;
                  for (let j = 0; j < lrecordoptions.value[props.pelements[i].name].length; j++) {
                    if (
                      lrecordoptions.value[props.pelements[i].name][j].value ==
                      data[0][props.pelements[i]['name']]
                    ) {
                      lfound = true;
                    }
                  }
                  if (lfound) {
                    lrecord.value[props.pelements[i]['name']] = data[0][props.pelements[i]['name']];
                  } else {
                    //lrecord.value[props.pelements[i]['name']] = '';
                    lrecord.value[props.pelements[i]['name']] = data[0][props.pelements[i]['name']];
                  }
                } else if (props.pelements[i]['type'] == 'editor') {
                  lrecord.value[props.pelements[i]['name']] = data[0][props.pelements[i]['name']]
                    ? DOMPurify.sanitize(data[0][props.pelements[i]['name']], {
                        USE_PROFILES: { html: true },
                        FORBID_TAGS: ['script', 'iframe', 'object', 'embed'],
                        FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'style'],
                      })
                    : '';
                } else {
                  lrecord.value[props.pelements[i]['name']] = data[0][props.pelements[i]['name']];
                }

                if (props.pelements[i]['prefix'] != null) {
                  if (
                    lrecord.value[props.pelements[i]['name']].startsWith(
                      props.pelements[i]['prefix'],
                    )
                  ) {
                    lrecord.value[props.pelements[i]['name']] = lrecord.value[
                      props.pelements[i]['name']
                    ].substring(props.pelements[i]['prefix'].length);
                  }
                }

                if (props.pelements[i]['showcondition'] != null) {
                  //lrecord.value['type'] = 'relation'
                  // console.log('sd1')
                  // console.log(props.pelements[i]['showcondition'])
                  // console.log(eval(props.pelements[i]['showcondition']))
                }
              }
            } else {
            }

            applyPermissions();
          } catch (error) {
            console.log('detail-main1: ' + error);
            $q.notify({
              type: 'negative',
              message: 'Something went wrong.',
            });
          }
        })();
      }
    }

    function applyPermissions() {
      if (props.psetup) {
        allowSELECT.value = true;
        allowINSERT.value = true;
        allowUPDATE.value = true;
        allowDELETE.value = true;
      } else {
        let lpermission = props.ppermissions;
        let mowner_id = lowner_id.value;

        for (let i = 0; i < lpermission.length; i++) {
          if (
            lpermission[i].permission == props.pobject + '.all.select' ||
            (lpermission[i].permission == props.pobject + '.owner.select' &&
              xuserid.value == mowner_id) ||
            lpermission[i].permission == 'setup'
          ) {
            allowSELECT.value = true;
          }
          if (
            lpermission[i].permission == props.pobject + '.all.insert' ||
            lpermission[i].permission == props.pobject + '.owner.insert' ||
            lpermission[i].permission == 'setup'
          ) {
            allowINSERT.value = true;
          }
          if (
            lpermission[i].permission == props.pobject + '.all.update' ||
            (lpermission[i].permission == props.pobject + '.owner.update' &&
              xuserid.value == mowner_id) ||
            lpermission[i].permission == 'setup'
          ) {
            allowUPDATE.value = true;
          }
          if (
            lpermission[i].permission == props.pobject + '.all.delete' ||
            (lpermission[i].permission == props.pobject + '.owner.delete' &&
              xuserid.value == mowner_id) ||
            lpermission[i].permission == 'setup'
          ) {
            allowDELETE.value = true;
          }
        }
      }
      showElements.value = true;
    }

    return {
      showElements,
      lrecord,
      isEdit,
      parameterid,
      lrecordoptions,
      lrecordoptionsbyid,
      allowSELECT,
      allowINSERT,
      allowUPDATE,
      allowDELETE,
      lrecordapistandard,
      xuserid,
      loptiondescription,
    };
  },
};
</script>
