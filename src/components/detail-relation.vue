<template>
  <div v-show="showElements">
    <div
      style="display: flex"
      v-if="props.pelement.type == 'relationmulti' || props.pelement.type == 'relation'"
    >
      <!-- <div
        class="column"
        style="min-width: 60px; float: left"
        v-if="
          (!props.phideiframebutton && props.pisedit && props.pallowUPDATE) ||
          (!props.phideiframebutton && !props.pisedit && props.pallowINSERT)
        "
      >
        <div class="q-pt-sm">
          <q-btn
            style="margin-left: 4px"
            @click="loadIFrame(props.pelement.relation_apiname, props.pelement.name)"
            fab-mini
            color="white"
            ><q-icon color="black" name="tab"></q-icon
          ></q-btn>
        </div>
      </div> -->
      <div class="column" style="flex-grow: 1">
        <div class="row full-width">
          <q-select
            behavior="menu"
            :data-testid="props.pelement.testid ? props.pelement.testid : 'generictestid'"
            :disable="disabledropdown"
            @update:model-value="onSelect"
            @keydown="handleKeyDown"
            @keyup="handleKeyUp"
            use-input
            class="full-width stacked-input-select"
            :readonly="
              (powner && !pallowownerchange) ||
              (!powner &&
                !((props.pisedit && props.pallowUPDATE) || (!props.pisedit && props.pallowINSERT)))
            "
            :color="props.pmaincolor"
            rounded
            outlined
            :multiple="
              props.pelement.type == 'relationmulti' || props.pelement.type == 'picklistmulti'
            "
            :label="props.pelement.required ? props.pelement.label + ' *' : props.pelement.label"
            v-model="picklistrecord"
            :options="picklistoptions"
            lazy-rules
            :rules="[
              props.pelement.type == 'relation'
                ? (val) =>
                    !props.pelement.required ||
                    (val && val.value?.trim().length > 0) ||
                    'this field is required'
                : (val) =>
                    !props.pelement.required || (val && val.length > 0) || 'this field is required',
            ]"
          >
            <template v-slot:selected-item="scope">
              <q-chip dense class="q-mr-xs" :style="{ height: '100px' }">
                <span
                  :class="scope.opt.disable ? 'text-strike' : ''"
                  style="
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 40dvw;
                    min-width: 40dvw;
                  "
                >
                  {{
                    picklistoptions.find((item) => item?.value == scope.opt.value)?.label
                      ? picklistoptions.find((item) => item.value == scope.opt.value).label
                      : props.punkownrecordtext + ' (' + scope.opt.value + ')'
                  }}
                </span>
                <div class="column">
                  <q-btn
                    fab-mini
                    flat
                    v-if="
                      (picklistoptions.find((item) => item.value == scope.opt.value)
                        ? true
                        : false) &&
                      scope.opt.value != '00000000-0000-0000-0000-000000000000' &&
                      // admin
                      scope.opt.value != '4ba98607-d109-449c-9773-250c592e4069' &&
                      scope.opt.value != props.pxuserid &&
                      !props.phideiframebutton
                    "
                    icon="tab"
                    @click.stop.prevent="
                      loadIFrame(
                        props.pelement.relation_apiname,
                        props.pelement.name,
                        true,
                        scope.opt.value,
                      )
                    "
                  ></q-btn>
                  <q-btn
                    fab-mini
                    flat
                    v-if="
                      !(
                        (powner && !pallowownerchange) ||
                        (!powner &&
                          !(
                            (props.pisedit && props.pallowUPDATE) ||
                            (!props.pisedit && props.pallowINSERT)
                          ))
                      ) && props.pelement.type == 'relationmulti'
                    "
                    icon="cancel"
                    @click.stop.prevent="scope.removeAtIndex(scope.index)"
                    class="q-mt-sm"
                  ></q-btn>
                </div>
              </q-chip>
            </template>

            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" style="white-space: normal; word-break: break-word">
                <q-item-section>
                  <q-item-label>
                    {{
                      picklistoptions.find((item) => item?.value == scope.opt.value).label
                        ? picklistoptions.find((item) => item.value == scope.opt.value).label
                        : ''
                    }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>

            <template v-slot:prepend>
              <div class="column items-center q-gutter-y-xs">
                <q-btn
                  fab-mini
                  class="cursor-pointer q-mt-md"
                  @click.stop.prevent="
                    loadIFrame(props.pelement.relation_apiname, props.pelement.name)
                  "
                  v-if="
                    (!props.phideiframebutton && props.pisedit && props.pallowUPDATE) ||
                    (!props.phideiframebutton && !props.pisedit && props.pallowINSERT)
                  "
                >
                  <q-icon name="tab"></q-icon>
                </q-btn>
                <q-btn
                  fab-mini
                  class="cursor-pointer q-mt-md"
                  @click.stop.prevent="picklistrecord = null"
                  v-if="
                    (props.pisedit && props.pallowUPDATE) || (!props.pisedit && props.pallowINSERT)
                  "
                >
                  <q-icon name="cancel" />
                </q-btn>
                <q-btn
                  fab-mini
                  class="cursor-pointer q-mt-md q-mb-sm"
                  @click.stop.prevent="searchmethod"
                  v-if="
                    (props.pisedit && props.pallowUPDATE) || (!props.pisedit && props.pallowINSERT)
                  "
                >
                  <q-icon name="search" />
                </q-btn>
              </div>
            </template>
          </q-select>
        </div>
      </div>
    </div>

    <div v-if="props.pelement.loadtable == 'permissionoptions'" class="text-center">
      <span v-if="loptiondescription[picklistrecord]"><b>description: </b></span
      >{{ loptiondescription[picklistrecord?.value] }}
    </div>

    <!-- dialog -->
    <div>
      <q-dialog
        v-model="showDialog"
        full-width
        full-height
        style="padding: 0px"
        @before-hide="hideModal()"
      >
        <q-card style="padding: 0px">
          <div
            style="
              display: inline;
              min-width: calc(100%-100px);
              min-height: calc(100%-100px);
              max-width: calc(100%-100px);
              max-height: calc(100%-100px);
              background-color: red;
            "
          >
            <div style="position: fixed; top: 0; right: 0">
              <q-btn
                fab-mini
                flat
                round
                size="lg"
                icon="close"
                color="white"
                class="bg-primary"
                style="margin-top: 4px; margin-right: 4px"
                v-close-popup
              />
            </div>
            <div
              style="
                display: inline;
                min-width: calc(100%-100px);
                min-height: calc(100%-100px);
                max-width: calc(100%-100px);
                max-height: calc(100%-100px);
                background-color: red;
              "
            >
              <div
                style="
                  display: flex;
                  min-width: 100%;
                  min-height: 100%;
                  flex-direction: column;
                  overflow: hidden;
                "
              >
                <div></div>
                <iframe :src="iframelink" style="flex-grow: 1; border: none; padding-top: -100px" />
              </div>
            </div>
          </div>
        </q-card>
      </q-dialog>
    </div>
  </div>
  <div v-show="!showElements">
    <div style="margin-left: 40%; width: 20%">
      <div style="height: 10dvh">
        <q-spinner color="primary" size="100%" :thickness="2" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 1. Force the vertical stack */
:deep(.q-field__native) {
  flex-direction: column !important;
  align-items: flex-start !important;
  flex-wrap: nowrap !important;
}

/* 2. Constrain the input field size */
:deep(.q-field__input) {
  width: 100% !important;
  /* Reset height and flex-grow so it doesn't stretch */
  min-height: 24px !important;
  height: 24px !important;
  flex-grow: 0 !important;
  margin-top: 8px; /* Space between the chip and the typing area */
}

/* 3. Your existing icon container logic */
:deep(.q-field__control) {
  min-height: 100px !important;
  height: auto !important;
  padding-top: 4px;
  padding-bottom: 8px;
}

:deep(.q-field__prepend) {
  height: auto !important;
  align-items: center;
}
</style>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount, watch, nextTick } from 'vue';
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { useFormChild } from 'quasar';
import { useRoute, useRouter } from 'vue-router';
import { supabase } from '../helpers/supabase';

const router = useRouter();
const showElements = ref(false);
const showDialog = ref(false);
const iframelink = ref('');

const picklistrecord = ref();
const picklistoptions = ref([]);
const loptiondescription = ref({});

const searchtext = ref('');
const issearchon = ref(false);

const disabledropdown = ref(false);

function validate() {
  return true;
}

useFormChild({
  validate, // Function; Can be async;
  // Should return a Boolean (or a Promise resolving to a Boolean)
  // resetValidation, // Optional function which resets validation
  requiresQForm: true, // should it error out if no parent QForm is found?
});

const props = defineProps({
  plabel: {
    type: String,
    required: false,
  },
  plist: {
    type: Array,
    required: false,
  },
  pallowUPDATE: {
    type: Boolean,
    default: true,
  },
  pallowINSERT: {
    type: Boolean,
    default: true,
  },
  pisedit: {
    type: Boolean,
    default: false,
  },
  powner: {
    type: Boolean,
    default: false,
  },
  pguest: {
    type: Boolean,
    default: false,
  },
  phideiframebutton: {
    type: Boolean,
    default: false,
  },
  pelement: {},
  pinitvalue: {},
  pmaincolor: {
    type: String,
    default: 'primary',
  },
  pxuserid: {
    type: String,
    default: '',
  },
  punkownrecordtext: {
    type: String,
    default: 'UNKOWN RECORD',
  },
  pallowownerchange: {
    type: Boolean,
    default: false,
  },
  prelationcounter: {},
});

const emit = defineEmits([
  'updatepicklist',
  'ready',
  'showelements',
  'hideelements',
  'refreshelements',
]);
picklistrecord.value = props.pinitvalue;
watch(
  () => props.prelationcounter,
  (newVal, oldVal) => {
    if (!newVal['isRefreshed']) {
      getData(false);
    }
  },
  { deep: true },
);

onMounted(() => {
  picklistrecord.value = props.pinitvalue;
  if (
    (props.pelement.type == 'relation' || props.pelement.type == 'relationmulti') &&
    props.pelement.load
  ) {
    getData(true);
  }
  if (
    (props.pelement.type == 'relation' ||
      props.pelement.type == 'relationmulti' ||
      props.pelement.type == 'picklist' ||
      props.pelement.type == 'picklistmulti') &&
    props.pelement.options
  ) {
    picklistoptions.value = props.pelement.options;
  }
});

async function onSelect(val) {
  // val is only one value and next tick is needed back picklistrecord is old value
  await nextTick();
  if (props.pelement.type == 'relation') {
    let helpval = JSON.parse(JSON.stringify(picklistrecord.value));
    if (picklistrecord.value) {
      emit('updatepicklist', helpval.value);
    } else {
      emit('updatepicklist', null);
    }
  }
  if (props.pelement.type == 'relationmulti') {
    if (picklistrecord.value) {
      let helper = [];
      for (let i = 0; i < picklistrecord.value.length; i++) {
        let helpval = JSON.parse(JSON.stringify(picklistrecord.value[i]));
        helper.push(helpval.value);
      }
      emit('updatepicklist', helper);
    } else {
      emit('updatepicklist', null);
    }
  }
}

let helper;
// order by name becaus of relation dropdown for example for permissions
let queryOrderColumn = 'name';
let queryOrderASC = true;
function getData(countparent, openpopup) {
  (async () => {
    try {
      let { data, error } = {};

      let llimit = 1000;
      let llimitleft = llimit;
      let firstquery = null;
      helper = [];

      if (props.pelement.type == 'relation' || props.pelement.type == 'relationmulti') {
        if (props.powner) {
          if (!props.pisedit && countparent) {
            if (props.pxuserid == '00000000-0000-0000-0000-000000000000') {
              picklistrecord.value = props.pxuserid;
            } else {
              picklistrecord.value = props.pxuserid;
            }
          }
          if (!props.pisedit && !countparent) {
            if (props.pxuserid == '00000000-0000-0000-0000-000000000000') {
              picklistrecord.value = { label: 'GUEST', value: props.pxuserid };
            } else {
              picklistrecord.value = { label: 'MY USER', value: props.pxuserid };
            }
          }
          llimitleft = llimitleft - 1;
        }

        if (picklistrecord.value) {
          if (props.pelement.type == 'relation') {
            if (countparent) {
              helper.push(picklistrecord.value);
            } else {
              helper.push(picklistrecord?.value.value);
            }
          }
          if (props.pelement.type == 'relationmulti') {
            if (countparent) {
              for (let k = 0; k < picklistrecord.value?.length; k++) {
                helper.push(picklistrecord.value[k]);
              }
            } else {
              for (let k = 0; k < picklistrecord.value.length; k++) {
                helper.push(JSON.parse(JSON.stringify(picklistrecord.value[k].value)));
              }
            }
          }
        }

        if (
          (props.pelement.type == 'relation' && helper && helper[0]) ||
          (props.pelement.type == 'relationmulti' && helper.length > 0 && helper[0])
        ) {
          ({ data, error } = await supabase
            .from(props.pelement.loadtable)
            .select()
            .order(props.pelement.loadcolumn, { ascending: true })
            .in(props.pelement.loadvalue, helper)
            .limit(1000));
          if (error) throw error;
        } else {
          helper = [];
        }

        if (data !== undefined && data != null) {
          firstquery = [];
          for (let y = 0; y < data.length; y++) {
            firstquery.push(JSON.parse(JSON.stringify(data[y])));
          }
          llimitleft = llimitleft - data.length;
        }

        data = null;
        let lfilter;
        if (props.pelement.loadfilter && props.pelement.loadfilterbyvalue == '') {
        } else {
          if (issearchon.value) {
            if (props.pelement.loadfilter) {
              ({ data, error } = await supabase
                .from(props.pelement.loadtable)
                .select()
                .order(props.pelement.loadcolumn, { ascending: true })
                .eq(props.pelement.loadfilterbycolumn, props.pelement.loadfilterbyvalue)
                .notIn(props.pelement.loadvalue, helper)
                .textSearch(props.pelement.loadcolumn, searchtext.value, {
                  type: 'websearch',
                })
                .limit(llimitleft));
            } else {
              ({ data, error } = await supabase
                .from(props.pelement.loadtable)
                .select()
                .order(props.pelement.loadcolumn, { ascending: true })
                .notIn(props.pelement.loadvalue, helper)
                .textSearch(props.pelement.loadcolumn, searchtext.value, {
                  type: 'websearch',
                })
                .limit(llimitleft));
            }
          } else {
            if (props.pelement.loadfilter) {
              ({ data, error } = await supabase
                .from(props.pelement.loadtable)
                .select()
                .order(queryOrderColumn, { ascending: queryOrderASC })
                .eq(props.pelement.loadfilterbycolumn, props.pelement.loadfilterbyvalue)
                .notIn(props.pelement.loadvalue, helper)
                .limit(llimitleft));
            } else {
              ({ data, error } = await supabase
                .from(props.pelement.loadtable)
                .select()
                .order(queryOrderColumn, { ascending: queryOrderASC })
                .notIn(props.pelement.loadvalue, helper)
                .limit(llimitleft));
            }
          }

          if (helper.length > 0) {
            let helperarray = [...structuredClone(firstquery), ...structuredClone(data)];
            data = helperarray;
          }
        }
      }
      if (error) throw error;

      if (data !== undefined && data != null) {
        let arrayOptions = [];
        if (props.powner) {
          if (props.pxuserid == '00000000-0000-0000-0000-000000000000') {
            arrayOptions.push({ label: 'GUEST', value: '00000000-0000-0000-0000-000000000000' });
          } else {
            arrayOptions.push({ label: 'MY USER', value: props.pxuserid });
            arrayOptions.push({ label: 'GUEST', value: '00000000-0000-0000-0000-000000000000' });
          }
        }
        for (let i = 0; i < data.length; i++) {
          if (props.pelement.lplabel2) {
            if (data[i][props.pelement.loadvalue] != props.pxuserid) {
              arrayOptions.push({
                label:
                  data[i][props.pelement.loadcolumn] +
                  ' (' +
                  data[i][props.pelement.lplabel2value] +
                  ')',
                value: data[i][props.pelement.loadvalue],
              });
            }
          } else {
            if (data[i][props.pelement.loadvalue] != props.pxuserid) {
              arrayOptions.push({
                label: data[i][props.pelement.loadcolumn],
                value: data[i][props.pelement.loadvalue],
              });
            }
          }
        }
        picklistoptions.value = arrayOptions;

        let moptiondescription = {};
        loptiondescription.value = {};
        if (props.pelement.loadtable == 'permissionoptions') {
          for (let i = 0; i < data.length; i++) {
            moptiondescription[data[i]['name']] = data[i]['description'];
          }
        }
        loptiondescription.value = moptiondescription;

        if (countparent && props.pelement.type == 'relation' && picklistrecord.value) {
          picklistrecord.value = {
            label: arrayOptions.find((o) => o.value === picklistrecord.value)?.label ?? '',
            value: picklistrecord.value,
          };
        } else if (props.pelement.type == 'relation' && picklistrecord.value) {
          picklistrecord.value = arrayOptions.find((o) => o.value === helper[0])
            ? arrayOptions.find((o) => o.value === helper[0])
            : picklistrecord.value;
        }

        if (countparent && props.pelement.type == 'relationmulti' && picklistrecord.value) {
          let helperrecord = picklistrecord.value;
          let helperlist = [];
          for (let j = 0; j < helperrecord.length; j++) {
            helperlist.push({
              label: arrayOptions.find((o) => o.value === helperrecord[j])?.label ?? '',
              value: helperrecord[j],
            });
          }
          picklistrecord.value = helperlist;
        } else if (props.pelement.type == 'relationmulti' && picklistrecord.value) {
          let helperrecord = picklistrecord.value;
          let helperlist = [];
          for (let j = 0; j < helper.length; j++) {
            helperlist.push(
              arrayOptions.find((o) => o.value === helper[j])
                ? arrayOptions.find((o) => o.value === helper[j])
                : helper[j],
            );
          }
          picklistrecord.value = helperlist;
        }

        if (props.powner) {
          await sleep(100);
        }
        if (countparent) {
          emit('ready');
        } else {
          emit('showelements');
        }

        searchtext.value = '';
        disabledropdown.value = false;
        showElements.value = true;
      } else {
        if (countparent) {
          emit('ready');
        } else {
          emit('showelements');
        }
        searchtext.value = '';
        disabledropdown.value = false;
        showElements.value = true;
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  })();
}

let CommonComponent;
function loadIFrame(prelation_apiname, papi_name, showdetail, detailid) {
  disabledropdown.value = true;
  (async () => {
    let ldetailid = detailid;
    if (props.powner && showdetail) {
      const { data, error } = await supabase
        .from('c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413')
        .select('*')
        .eq('xuser_id', detailid);

      if (error) throw error;

      ldetailid = data[0].id;
    }
    if (window.self !== window.top) {
      if (props.pguest) {
        if (showdetail) {
          router.push({
            name: 'guest-objects-detail',
            params: { objectapiname: prelation_apiname, pid: ldetailid },
          });
        } else {
          router.push({
            name: 'guest-objects',
            params: { objectapiname: prelation_apiname },
          });
        }
      } else {
        if (showdetail) {
          router.push({
            name: 'main-objects-detail',
            params: { objectapiname: prelation_apiname, pid: ldetailid },
          });
        } else {
          router.push({
            name: 'main-objects',
            params: { objectapiname: prelation_apiname },
          });
        }
      }
    } else {
      if (props.pguest) {
        if (showdetail) {
          iframelink.value =
            window.location.origin +
            '/#/guest/objects/' +
            prelation_apiname +
            '/detail/' +
            ldetailid;
        } else {
          iframelink.value = window.location.origin + '/#/guest/objects/' + prelation_apiname;
        }
      } else {
        if (showdetail) {
          iframelink.value =
            window.location.origin +
            '/#/main/objects/' +
            prelation_apiname +
            '/detail/' +
            ldetailid;
        } else {
          iframelink.value = window.location.origin + '/#/main/objects/' + prelation_apiname;
        }
      }
      showDialog.value = true;
    }
  })();
}

function hideModal() {
  disabledropdown.value = true;
  emit('refreshelements');
  //getData(false);
}

function searchmethod() {
  disabledropdown.value = true;

  (async () => {
    emit('hideelements');
    // await sleep(1000);
    if (searchtext.value.length > 0) {
      issearchon.value = true;
    } else {
      issearchon.value = false;
    }

    //getData(false, true);
  })();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function handleKeyUp(event) {
  searchtext.value = event.target?.value ?? '';
}

function handleKeyDown(event) {
  // Cmd + Enter (on Mac)
  if (event.metaKey && event.key === 'Enter') {
    event.preventDefault();
    searchmethod();
  }

  // Optional: Ctrl + Enter (Windows/Linux)
  if (event.ctrlKey && event.key === 'Enter') {
    event.preventDefault();
    searchmethod();
  }
}
</script>
