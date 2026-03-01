<template>
  <div v-if="showElements">
    <div v-if="!pallowSELECT">
      <h6 style="text-align: center">no view permissions</h6>
    </div>
    <div v-else>
      <!--style="max-height: 100vh"-->
      <!-- <div v-if="psearch">
        <q-input dense v-model="searchValue"
          ><template v-slot:append> <q-icon name="search" /> </template
        ></q-input>
      </div> -->
      <div style="position: sticky; top: 0; z-index: 10; background: white" class="q-pt-sm">
        <div v-if="pshowsearch">
          <q-input
            :placeholder="'searches the ' + psearchlabel"
            dense
            v-model="searchtext"
            @keydown="handleKeyDown"
            ><template v-slot:append>
              <q-icon
                v-if="issearchon && searchtext.length > 0"
                name="close"
                @click="clearmethod()"
                class="cursor-pointer q-mr-sm"
              />
              <q-icon name="search" @click="searchmethod()" class="cursor-pointer" /> </template
          ></q-input>
        </div>
        <div class="row items-center q-mt-md">
          <q-btn
            :disable="page <= 1"
            fab-mini
            :color="page > 1 ? pmaincolor : 'white'"
            :text-color="page > 1 ? 'white' : 'lightgrey'"
            icon="chevron_left"
            @click="previouspage()"
          />

          <div class="col text-center" :style="{ visibility: lshowcounter ? 'visible' : 'hidden' }">
            {{ countertwo }}
          </div>

          <q-btn
            :disable="!hasmore"
            fab-mini
            :color="hasmore ? pmaincolor : 'white'"
            :text-color="hasmore ? 'white' : 'lightgrey'"
            icon="chevron_right"
            @click="nextpage()"
          />
        </div>
        <q-separator :color="pmaincolor" class="q-mt-md" />
      </div>
      <div v-if="records.length !== 0" class="q-mt-md">
        <!--style="max-height: 50vh; overflow-y: scroll"-->
        <div v-for="(record, index) in records" :key="record.id">
          <div v-if="index < pageSize">
            <div v-if="phistory">
              <div style="word-break: break-all">
                <div class="q-pa-md">
                  <span
                    ><span class="text-bold">{{ psetup ? 'parent_id' : 'record id' }}: </span
                    >{{ record['parent_id'] }}</span
                  ><br />
                  <span
                    ><span class="text-bold">{{ psetup ? 'changed_at' : 'changed at' }}: </span
                    >{{ record['changed_at'] }}</span
                  ><br />
                  <span
                    ><span class="text-bold">{{ psetup ? 'changed_by' : 'changed by' }}: </span
                    >{{ record['changed_by'] }}</span
                  ><br />
                  <span><span class="text-bold">action: </span>{{ record['action'] }}</span
                  ><br />
                  <span
                    ><span class="text-bold">{{ psetup ? 'oldrecord' : 'old record' }}: </span
                    >{{ record['oldrecord'] }}</span
                  ><br />
                  <span
                    ><span class="text-bold">{{ psetup ? 'newrecord' : 'new record' }}: </span
                    >{{ record['newrecord'] }}</span
                  ><br />
                  <span
                    ><span class="text-bold">difference: </span
                    >{{ diffObjects(record['oldrecord'], record['newrecord']) }}</span
                  ><br />
                  <!-- {{
                  record[pname]
                    ? record[pname] +
                      ' (' +
                      record['parent_id'] +
                      ' - ' +
                      record['changed_at'] +
                      ')'
                    : ' (' + record['parent_id'] + ' - ' + record['changed_at'] + ')'
                }} -->
                </div>
              </div>
            </div>
            <div v-else>
              <q-item clickable v-ripple @click="detailButton(record.id)">
                <q-item-section style="word-break: break-all">{{ record[pname] }}</q-item-section>
              </q-item>
            </div>
            <q-separator v-if="index != records.length - 1" />
          </div>
        </div>
      </div>
      <div v-if="records.length === 0">
        <h6 v-if="!phistory" style="text-align: center">no records yet</h6>
        <h6 v-if="phistory" style="text-align: center">no history yet</h6>
      </div>
    </div>
    <!-- <q-page-sticky v-if="showElements && lshowcounter" position="bottom-left" :offset="[20, 20]">
      <q-btn
        fab
        color="white"
        text-color="black"
        style="
          text-transform: none;
          flex-direction: row;
          pointer-events: none;
          border: 1px solid lightgrey;
        "
        unelevated
      >
        <div
          class="text-weight-regular text-lowercase text-center"
          style="margin: auto; text-transform: none; user-select: text"
        >
          {{ counter }}
        </div>
      </q-btn>
    </q-page-sticky> -->
    <q-page-sticky v-if="pshowaddbutton && pallowINSERT" position="bottom-right" :offset="[20, 20]">
      <q-btn fab icon="add" :color="pmaincolor" @click="addButton()" />
    </q-page-sticky>
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
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import { copyToClipboard, useQuasar } from 'quasar';
import { supabase } from '../helpers/supabase';
var $q;
export default {
  props: {
    precords: {
      type: Array,
    },
    pidentifier: {
      type: String,
      default: 'id',
    },
    pname: {
      type: String,
      default: 'name',
    },
    psearch: {
      type: Boolean,
      default: true,
    },
    pdetaillink: {
      type: String,
      default: '',
    },
    ploaddata: {
      type: Boolean,
      default: false,
    },
    pobject: {
      type: String,
      default: '',
    },
    porderby: {
      type: String,
      default: '',
    },
    porderasc: {
      type: Boolean,
      default: true,
    },
    pfilterdata: {
      type: Boolean,
      default: false,
    },
    pfilter: {
      type: String,
      default: '',
    },
    pfilterby: {
      type: String,
      default: '',
    },
    pparam: {
      type: Boolean,
      default: false,
    },
    pparamname: {
      type: String,
      default: '',
    },
    pparamvalue: {
      type: String,
      default: '',
    },
    pshowaddbutton: {
      type: Boolean,
      default: true,
    },
    paddbuttonurl: {
      type: String,
      default: '',
    },
    paddbuttonparameter: {
      type: Boolean,
      default: false,
    },
    paddbuttonparameterid: {
      type: String,
      default: '',
    },
    paddbuttonparametervalue: {
      type: String,
      default: '',
    },
    pmaincolor: {
      type: String,
      default: 'secondary',
    },
    plistfilter: {
      type: Boolean,
      default: false,
    },
    plistfiltervalue: {
      type: String,
      default: '',
    },
    prelationmulti: {
      type: Boolean,
      default: false,
    },
    pallowSELECT: {
      type: Boolean,
      default: true,
    },
    pallowINSERT: {
      type: Boolean,
      default: true,
    },
    phistory: {
      type: Boolean,
      default: false,
    },
    pshowsearch: {
      type: Boolean,
      default: true,
    },
    pshowcounter: {
      type: Boolean,
      default: false,
    },
    prangecolumn: {
      type: String,
      default: 'created_at',
    },
    psearchcolumn: {
      type: String,
      default: 'search',
    },
    psearchlabel: {
      type: String,
      default: 'name',
    },
    psearchwebsearch: {
      type: Boolean,
      default: true,
    },
    psetup: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const showElements = ref(false);
    const allrecords = ref([]);
    const records = ref([]);
    const searchValue = ref('');
    const issearchon = ref(false);
    const searchtext = ref('');

    const pageSize = ref(100);
    const page = ref(1);
    let currentTime = new Date().toISOString();
    let yesterdayUtc = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const from = ref((page.value - 1) * pageSize.value);
    const to = ref(from.value + pageSize.value - 1);
    const hasmore = ref(false);

    const counter = ref('loading...');
    const countertwo = ref('loading...');

    const lshowcounter = ref(false);
    const lsettings = ref({});

    onMounted(() => {
      if (props.ploaddata) {
        getSettings();
      } else {
        records.value = props.precords;
        allrecords.value = props.precords;
        showElements.value = true;
      }
    });

    watch(
      searchValue,
      () => {
        if (searchValue.value && props.psearch) {
          let searchlist = [];
          for (let i = 0; i < allrecords.value.length; i++) {
            if (
              allrecords.value[i][props.pname]
                .toLowerCase()
                .trim()
                .includes(searchValue.value.toLowerCase().trim())
            ) {
              searchlist.push(allrecords.value[i]);
            }
          }
          records.value = searchlist;
        } else {
          records.value = allrecords.value;
        }
      },
      { deep: true },
    );

    watch(
      props,
      () => {
        getData();
      },
      { deep: true },
    );

    function getSettings() {
      (async () => {
        try {
          lsettings.value = {};
          lshowcounter.value = props.pshowcounter;

          var { data, error } = await supabase
            .from('settings')
            .select('*')
            .in('api_name', ['countersetuphistory', 'countersetup', 'counterhistory']);

          if (error) throw error;

          for (let i = 0; i < data.length; i++) {
            if (data[i]['is_active']) {
              lsettings.value[data[i]['api_name']] = true;
            }
          }

          if (props.psetup && props.phistory) {
            if (lsettings.value['countersetuphistory']) {
              lshowcounter.value = true;
            }
          } else if (props.phistory) {
            if (lsettings.value['counterhistory']) {
              lshowcounter.value = true;
            }
          } else if (props.psetup) {
            if (lsettings.value['countersetup']) {
              lshowcounter.value = true;
            }
          }

          getData();
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

    function getData() {
      (async () => {
        try {
          let query;
          query = getQuery();

          var { data, error, count } = await query;
          if (error) throw error;

          if (data !== undefined && data != null && data.length > 0) {
            // object does exist
            records.value = data;
            allrecords.value = data;
            if (lshowcounter.value) {
              counter.value = 'amount: ' + count.toLocaleString();
              countertwo.value = count.toLocaleString();
            }
            if (data.length > pageSize.value) {
              hasmore.value = true;
            } else {
              hasmore.value = false;
            }
            showElements.value = true;
          } else {
            // object does NOT exist
            hasmore.value = false;
            records.value = data;
            allrecords.value = data;
            if (lshowcounter.value) {
              counter.value = 'amount: ' + count.toLocaleString();
              countertwo.value = count.toLocaleString();
            }
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
    }

    function getQuery() {
      let rquery;
      if (lshowcounter.value) {
        if (props.pfilterdata) {
          if (props.prelationmulti) {
            rquery = supabase
              .from(props.pobject)
              .select('*', { count: 'exact' })
              .overlaps(props.pfilterby, [props.pfilter])
              .lt(props.prangecolumn, currentTime)
              .order(props.porderby, { ascending: props.porderasc })
              .range(from.value, to.value + 1);
          } else {
            rquery = supabase
              .from(props.pobject)
              .select('*', { count: 'exact' })
              .eq(props.pfilterby, props.pfilter)
              .lt(props.prangecolumn, currentTime)
              .order(props.porderby, { ascending: props.porderasc })
              .range(from.value, to.value + 1);
          }
        } else {
          rquery = supabase
            .from(props.pobject)
            .select('*', { count: 'exact' })
            .lt(props.prangecolumn, currentTime)
            .order(props.porderby, { ascending: props.porderasc })
            .range(from.value, to.value + 1);
        }
      } else {
        if (props.pfilterdata) {
          if (props.prelationmulti) {
            rquery = supabase
              .from(props.pobject)
              .select('*')
              .overlaps(props.pfilterby, [props.pfilter])
              .lt(props.prangecolumn, currentTime)
              .order(props.porderby, { ascending: props.porderasc })
              .range(from.value, to.value + 1);
          } else {
            rquery = supabase
              .from(props.pobject)
              .select('*')
              .eq(props.pfilterby, props.pfilter)
              .lt(props.prangecolumn, currentTime)
              .order(props.porderby, { ascending: props.porderasc })
              .range(from.value, to.value + 1);
          }
        } else {
          rquery = supabase
            .from(props.pobject)
            .select('*')
            .lt(props.prangecolumn, currentTime)
            .order(props.porderby, { ascending: props.porderasc })
            .range(from.value, to.value + 1);
        }
      }

      if (props.plistfilter) {
        rquery = rquery.or(props.plistfiltervalue);
      }

      if (issearchon.value) {
        if (props.psearchwebsearch) {
          rquery = rquery.textSearch(props.psearchcolumn, searchtext.value, {
            type: 'websearch',
          });
          // rquery = rquery.ilike('name', searchtext.value);
        } else {
          rquery = rquery.eq(props.psearchcolumn, searchtext.value);
        }
      }

      return rquery;
    }

    function searchmethod() {
      page.value = 1;
      from.value = (page.value - 1) * pageSize.value;
      to.value = from.value + pageSize.value - 1;

      if (searchtext.value.length > 0) {
        issearchon.value = true;
      } else {
        issearchon.value = false;
      }
      showElements.value = false;
      getData();
    }

    function clearmethod() {
      page.value = 1;
      from.value = (page.value - 1) * pageSize.value;
      to.value = from.value + pageSize.value - 1;
      issearchon.value = false;
      searchtext.value = '';
      showElements.value = false;
      getData();
    }

    function detailButton(pid) {
      if (props.pparam) {
        let lparams = {};
        lparams['pid'] = pid;
        lparams[props.pparamname] = props.pparamvalue;
        router.push({
          name: props.pdetaillink,
          params: lparams,
        });
      } else {
        router.push({
          name: props.pdetaillink,
          params: { pid: pid },
        });
      }
    }

    function addButton() {
      if (props.paddbuttonparameter) {
        let lparams = {};
        lparams[props.paddbuttonparameterid] = props.paddbuttonparametervalue;
        router.push({
          name: props.paddbuttonurl,
          params: lparams,
        });
      } else {
        router.push({
          name: props.paddbuttonurl,
        });
      }
    }

    function deepDiff(a, b) {
      const diff = {};

      for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
        if (
          typeof a[key] === 'object' &&
          typeof b[key] === 'object' &&
          a[key] !== null &&
          b[key] !== null
        ) {
          const nestedDiff = deepDiff(a[key], b[key]);
          if (Object.keys(nestedDiff).length > 0) {
            diff[key] = nestedDiff;
          }
        } else if (a[key] !== b[key]) {
          diff[key] = { from: a[key], to: b[key] };
        }
      }

      return diff;
    }

    function diffObjects(a, b) {
      const diff = {};

      for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
        if (a[key] !== b[key]) {
          diff[key] = { from: a[key], to: b[key] };
        }
      }

      return diff;
    }

    function copyText(pText) {
      copyToClipboard(pText)
        .then(() => {
          $q.notify({
            type: 'positive',
            message: 'copied to clipboard.',
            color: props.pmaincolor,
          });
        })
        .catch(() => {
          $q.notify({
            type: 'negative',
            message: 'something did not work',
          });
        });
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

    function previouspage() {
      showElements.value = false;
      page.value = page.value - 1;
      from.value = (page.value - 1) * pageSize.value;
      to.value = from.value + pageSize.value - 1;
      getData();
    }

    function nextpage() {
      showElements.value = false;
      page.value = page.value + 1;
      from.value = (page.value - 1) * pageSize.value;
      to.value = from.value + pageSize.value - 1;
      getData();
    }

    return {
      showElements,
      records,
      detailButton,
      addButton,
      searchValue,
      deepDiff,
      diffObjects,
      counter,
      copyText,
      searchmethod,
      issearchon,
      searchtext,
      handleKeyDown,
      previouspage,
      nextpage,
      pageSize,
      page,
      from,
      to,
      hasmore,
      countertwo,
      clearmethod,
      lshowcounter,
    };
  },
};
</script>
