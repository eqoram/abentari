<template>
  <div v-show="true">
    <q-form @submit="onSubmit" style="" @validation-error="focus">
      <div>
        <div v-for="element in pelements" :key="element.name">
          <div v-if="element.showcondition == null || checkcondition(element.showcondition)">
            <div v-if="element.type == 'readonlycopy' && pisedit">
              <div style="display: flex">
                <!-- <div
                  class="column"
                  style="width: 60px; float: left"
                  v-if="(pisedit && pallowUPDATE) || (!pisedit && pallowINSERT)"
                >
                  <div class="q-mt-sm">
                    <q-btn
                      style="margin-left: 4px"
                      @click="copyText(lrecord[element.name])"
                      fab-mini
                      color="white"
                      ><q-icon color="black" name="content_copy"></q-icon
                    ></q-btn>
                  </div>
                </div> -->
                <div class="column" style="flex-grow: 1">
                  <div class="row full-width">
                    <q-input
                      :readonly="true"
                      :color="pmaincolor"
                      rounded
                      outlined
                      :label="element.label"
                      v-model="lrecord[element.name]"
                      class="full-width"
                      :class="element.disabled ? 'text-strike' : ''"
                      lazy-rules
                      :rules="[(val) => true, 'this field is required']"
                    ></q-input>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="element.type == 'id'">
              <div style="display: flex">
                <div
                  class="column"
                  style="width: 60px; float: left"
                  v-if="(pisedit && pallowUPDATE) || (!pisedit && pallowINSERT)"
                >
                  <div class="q-mt-sm">
                    <q-btn
                      style="margin-left: 4px"
                      @click="copyText(lrecord[element.name])"
                      fab-mini
                      color="white"
                      ><q-icon color="black" name="content_copy"></q-icon
                    ></q-btn>
                  </div>
                </div>
                <div class="column" style="flex-grow: 1">
                  <div class="row full-width">
                    <q-input
                      :readonly="pisedit && element.notEditable"
                      :color="pmaincolor"
                      rounded
                      outlined
                      :label="element.required ? element.label + ' *' : element.label"
                      v-model="lrecord[element.name]"
                      prefix="(edit with caution) id: "
                      class="full-width"
                      :class="element.disabled ? 'text-strike' : ''"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (pisedit && element.notEditable) ||
                          !element.required ||
                          (val && val.trim().length > 0) ||
                          'this field is required',
                        (val) =>
                          (pisedit && element.notEditable) ||
                          val.length <= 250 ||
                          'this field is limited to 250 characters',
                        (val) =>
                          (pisedit && element.notEditable) ||
                          !val.includes(';') ||
                          'semicolon is not allowed',
                        (val) =>
                          (pisedit && element.notEditable) || isValidUUID(val) || 'must be a uuid',
                      ]"
                    ></q-input>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="element.type == 'api'">
              <div style="display: flex">
                <div
                  class="column"
                  style="width: 60px; float: left"
                  v-if="(pisedit && pallowUPDATE) || (!pisedit && pallowINSERT)"
                >
                  <div class="q-mt-sm">
                    <q-btn
                      style="margin-left: 4px"
                      @click="
                        copyText(
                          (!lrecordapistandard[element.name] ? 'c_' : '') +
                            lrecord[element.name] +
                            (!lrecordapistandard[element.name]
                              ? '__' + lrecord['id'].replaceAll('-', '_')
                              : ''),
                        )
                      "
                      fab-mini
                      color="white"
                      ><q-icon color="black" name="content_copy"></q-icon
                    ></q-btn>
                  </div>
                </div>
                <div class="column" style="flex-grow: 1">
                  <div class="row full-width">
                    <q-input
                      div
                      class="full-width"
                      :readonly="pisedit && element.notEditable"
                      :color="pmaincolor"
                      outlined
                      rounded
                      v-model="lrecord[element.name]"
                      :type="element.type"
                      :label="element.required ? element.label + ' *' : element.label"
                      lazy-rules
                      :rules="[
                        (val) =>
                          !element.required ||
                          (val && val.trim().length > 0) ||
                          'this field is required',
                        (val) => val.length <= 20 || 'this field is limited to 20 characters',
                        (val) =>
                          (pisedit && element.notEditable) ||
                          val.match(/^[0-9a-z]+$/) ||
                          'only numbers and lowercase letters are allowed',
                      ]"
                    >
                      <template v-slot:prepend>
                        <div v-if="!lrecordapistandard[element.name]">c_</div>
                      </template>
                      <template v-slot:append>
                        <div v-if="!lrecordapistandard[element.name]">_ _id</div>
                      </template>
                      <!-- suffix="+_id" -->
                    </q-input>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="element.type == 'relation'">
              <detail-relation
                :prelationcounter="relationcounter[element.name]"
                :phideiframebutton="element.phideiframebutton ? element.phideiframebutton : false"
                :pinitvalue="lrecord[element.name]"
                plabel="sjdfn"
                @updatepicklist="lrecord[element.name] = $event"
                @ready="relationcounter[element.name].isRefreshed = true"
                @showelements="relationcounter[element.name].isRefreshed = true"
                @hideelements="relationcounter[element.name].isRefreshed = false"
                @refreshelements="refreshDropdowns"
                :pisedit="pisedit"
                :pallow-i-n-s-e-r-t="pallowINSERT"
                :pallow-u-p-d-a-t-e="pallowUPDATE"
                :pelement="element"
                :pmaincolor="pmaincolor"
                :powner="element.powner"
                :pxuserid="pxuserid"
                :punkownrecordtext="element.punkownrecordtext"
                :pallowownerchange="allowownerchange"
                :pguest="pguest"
              ></detail-relation>
            </div>
            <div v-if="element.type == 'relationmulti'">
              <detail-relation
                :prelationcounter="relationcounter[element.name]"
                :phideiframebutton="element.phideiframebutton ? element.phideiframebutton : false"
                :pinitvalue="lrecord[element.name]"
                @updatepicklist="lrecord[element.name] = $event"
                plabel="sjdfn"
                @ready="relationcounter[element.name].isRefreshed = true"
                @showelements="relationcounter[element.name].isRefreshed = true"
                @hideelements="relationcounter[element.name].isRefreshed = false"
                @refreshelements="refreshDropdowns"
                :pisedit="pisedit"
                :pallow-i-n-s-e-r-t="pallowINSERT"
                :pallow-u-p-d-a-t-e="pallowUPDATE"
                :pelement="element"
                :pmaincolor="pmaincolor"
                :powner="element.powner"
                :pxuserid="pxuserid"
                :pguest="pguest"
              ></detail-relation>
            </div>
            <div v-if="element.type == 'text'">
              <q-input
                :readonly="!((pisedit && pallowUPDATE) || (!pisedit && pallowINSERT))"
                :color="pmaincolor"
                :prefix="element.prefix"
                outlined
                rounded
                v-model="lrecord[element.name]"
                :type="element.type"
                :label="element.required ? element.label + ' *' : element.label"
                style="width: 100%"
                lazy-rules
                :rules="[
                  (val) =>
                    !element.required || (val && val.trim().length > 0) || 'this field is required',
                  (val) => val.length <= 250 || 'this field is limited to 250 characters',
                ]"
              >
              </q-input>
            </div>
            <div v-if="element.type == 'date'">
              <q-input
                :readonly="!((pisedit && pallowUPDATE) || (!pisedit && pallowINSERT))"
                :color="pmaincolor"
                :prefix="element.prefix"
                outlined
                rounded
                v-model="lrecord[element.name]"
                :type="element.type"
                :label="element.required ? element.label + ' *' : element.label"
                style="width: 100%"
                lazy-rules
                :rules="[
                  (val) =>
                    !element.required || (val && val.trim().length > 0) || 'this field is required',
                ]"
              >
              </q-input>
            </div>
            <div v-if="element.type == 'datetime'">
              <q-input
                :readonly="!((pisedit && pallowUPDATE) || (!pisedit && pallowINSERT))"
                :color="pmaincolor"
                :prefix="element.prefix"
                outlined
                rounded
                v-model="lrecord[element.name]"
                step="1"
                type="datetime-local"
                :label="element.required ? element.label + ' *' : element.label"
                style="width: 100%"
                lazy-rules
                :rules="[
                  (val) =>
                    !element.required || (val && val.trim().length > 0) || 'this field is required',
                  (val) => val.length <= 250 || 'this field is limited to 250 characters',
                ]"
              >
              </q-input>
            </div>
            <div v-if="element.type == 'number'">
              <q-input
                :readonly="!((pisedit && pallowUPDATE) || (!pisedit && pallowINSERT))"
                :color="pmaincolor"
                :prefix="element.prefix"
                outlined
                rounded
                v-model="lrecord[element.name]"
                :type="element.type"
                :label="element.required ? element.label + ' *' : element.label"
                style="width: 100%"
                lazy-rules
                :rules="[
                  (val) =>
                    !element.required ||
                    (val && val.toString().trim().length > 0) ||
                    'this field is required',
                ]"
              >
              </q-input>
            </div>
            <div v-if="element.type == 'longtext'">
              <q-input
                :readonly="!((pisedit && pallowUPDATE) || (!pisedit && pallowINSERT))"
                :color="pmaincolor"
                :prefix="element.prefix"
                outlined
                rounded
                v-model="lrecord[element.name]"
                type="textarea"
                :label="element.required ? element.label + ' *' : element.label"
                :placeholder="element.placeholder ? element.placeholdervalue : ''"
                style="width: 100%"
                lazy-rules
                :rules="[
                  (val) =>
                    !element.required || (val && val.trim().length > 0) || 'this field is required',
                ]"
              >
              </q-input>
            </div>
            <div v-if="element.type == 'editor'">
              <!-- THIS IS NOT SAFE FOR USER INPUT BECAUSE OF XSS -->
              <p class="q-ml-sm" style="margin-bottom: -10px">
                {{ element.required ? element.label + ' *' : element.label }}
              </p>
              <p>
                <q-field
                  tag="null"
                  style="max-width: 90vw; overflow-x: auto"
                  ref="myltref[element.name]"
                  v-model="lrecord[element.name]"
                  borderless
                  :rules="[
                    (val) =>
                      !element.required || (!!val && val !== '<br>') || 'this field is required',
                  ]"
                >
                  <template #control>
                    <q-editor
                      :readonly="!((pisedit && pallowUPDATE) || (!pisedit && pallowINSERT))"
                      :color="pmaincolor"
                      outlined
                      rounded
                      v-model="lrecord[element.name]"
                      :definitions="{
                        bold: {
                          label: 'Bold',
                          icon: null,
                          tip: 'My bold tooltip',
                        },
                      }"
                      :style="
                        myltref[element.name] && myltref[element.name].hasError
                          ? 'border-color: var(--q-negative)'
                          : ''
                      "
                      :toolbar="[
                        [
                          {
                            label: $q.lang.editor.align,
                            icon: $q.iconSet.editor.align,
                            fixedLabel: true,
                            list: 'only-icons',
                            options: ['left', 'center', 'right', 'justify'],
                          },
                          {
                            label: $q.lang.editor.align,
                            icon: $q.iconSet.editor.align,
                            fixedLabel: true,
                            options: ['left', 'center', 'right', 'justify'],
                          },
                        ],
                        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                        ['token', 'hr', 'link', 'custom_btn'],
                        ['print', 'fullscreen'],
                        [
                          {
                            label: $q.lang.editor.formatting,
                            icon: $q.iconSet.editor.formatting,
                            list: 'no-icons',
                            options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
                          },
                          {
                            label: $q.lang.editor.fontSize,
                            icon: $q.iconSet.editor.fontSize,
                            fixedLabel: true,
                            fixedIcon: true,
                            list: 'no-icons',
                            options: [
                              'size-1',
                              'size-2',
                              'size-3',
                              'size-4',
                              'size-5',
                              'size-6',
                              'size-7',
                            ],
                          },
                          {
                            label: $q.lang.editor.defaultFont,
                            icon: $q.iconSet.editor.font,
                            fixedIcon: true,
                            list: 'no-icons',
                            options: [
                              'default_font',
                              'arial',
                              'arial_black',
                              'comic_sans',
                              'courier_new',
                              'impact',
                              'lucida_grande',
                              'times_new_roman',
                              'verdana',
                            ],
                          },
                          'removeFormat',
                        ],
                        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

                        ['undo', 'redo'],
                        ['viewsource'],
                      ]"
                      :fonts="{
                        arial: 'Arial',
                        arial_black: 'Arial Black',
                        comic_sans: 'Comic Sans MS',
                        courier_new: 'Courier New',
                        impact: 'Impact',
                        lucida_grande: 'Lucida Grande',
                        times_new_roman: 'Times New Roman',
                        verdana: 'Verdana',
                      }"
                    />
                  </template>
                </q-field>
              </p>
            </div>
            <div v-if="element.type == 'bool'">
              <div style="display: flex; justify-content: center">
                <q-toggle
                  :readonly="!((pisedit && pallowUPDATE) || (!pisedit && pallowINSERT))"
                  class="q-mt-sm q-mb-md"
                  outlined
                  rounded
                  :color="pmaincolor"
                  v-model="lrecord[element.name]"
                  :type="element.type"
                  :label="element.label"
                  lazy-rules
                >
                </q-toggle>
              </div>
            </div>
            <div v-if="element.type == 'file'">
              <detail-file
                :puuid="luuid"
                :pobject="pobject"
                :pmaincolor="props.pmaincolor"
                :pelement="element"
                @updatefilelink="lrecord[element.name] = $event"
                :pvalue="lrecord[element.name]"
                :pallow-u-p-d-a-t-e="(pisedit && pallowUPDATE) || (!pisedit && pallowINSERT)"
                :puserid="puserid"
                :pxuserid="pxuserid"
                :pisedit="pisedit"
                :pguest="pguest"
              ></detail-file>
            </div>
            <div v-if="element.type == 'p'">
              <p class="text-center">{{ element.text }}</p>
            </div>
            <div v-if="element.type == 'display'">
              <div class="q-pa-sm q-pb-lg" v-html="purifydom(element.value)"></div>
            </div>
            <div v-if="element.type == 'showonly'" class="q-ml-sm q-mr-sm">
              <div>
                <p class="text-bold">{{ element.label }}</p>
                <div>{{ lrecord[element.name] }}</div>
              </div>
            </div>
            <div v-if="element.type == 'multiadd'">
              <detail-multiadd
                :plabel="'picklist values (dont add more than ' + picklistmaxstring + ' values)'"
                :plist="lrecord[element.name]"
                @updatemultiadd="lrecord[element.name] = $event"
                :pallow-u-p-d-a-t-e="(pisedit && pallowUPDATE) || (!pisedit && pallowINSERT)"
              ></detail-multiadd>
            </div>
            <div v-if="element.type == 'picklist'">
              <q-select
                behavior="menu"
                :readonly="!((pisedit && pallowUPDATE) || (!pisedit && pallowINSERT))"
                clearable
                :color="pmaincolor"
                rounded
                outlined
                use-chips
                :label="element.required ? element.label + ' *' : element.label"
                v-model="lrecord[element.name]"
                :options="lrecordoptions[element.name]"
                map-options
                lazy-rules
                :rules="[
                  (val) =>
                    !element.required ||
                    (val && (val.length > 0 || val.value?.length > 0)) ||
                    'this field is required',
                ]"
              >
                <!-- Display full selected label -->
                <template #selected-item="scope">
                  <q-chip
                    dense
                    @remove="scope.removeAtIndex(scope.index)"
                    class="q-mr-xs"
                    :style="{ height: '40px' }"
                  >
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
                        lrecordoptions[element.name]?.find((opt) => opt.value === scope.opt.value)
                          ? scope.opt.label
                          : 'UNKNOWN ITEM' + ' (' + scope.opt.value + ')'
                      }}
                    </span>
                  </q-chip>
                </template>

                <!-- Display full option labels -->
                <template v-slot:option="scope">
                  <q-item
                    v-bind="scope.itemProps"
                    style="white-space: normal; word-break: break-word"
                  >
                    <q-item-section>
                      <q-item-label>
                        <span :class="scope.opt.disable ? 'text-strike' : ''">
                          {{ scope.opt.label ? scope.opt.label : '' }}
                        </span>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div v-if="element.type == 'picklistmulti'">
              <q-select
                behavior="menu"
                :readonly="!((pisedit && pallowUPDATE) || (!pisedit && pallowINSERT))"
                clearable
                :color="pmaincolor"
                rounded
                outlined
                multiple
                use-chips
                :label="element.required ? element.label + ' *' : element.label"
                v-model="lrecord[element.name]"
                :options="lrecordoptions[element.name]"
                map-options
                lazy-rules
                :rules="[
                  (val) =>
                    !element.required || (val && val?.length > 0) || 'this field is required',
                ]"
              >
                <template #selected-item="scope">
                  <q-chip dense class="q-mr-xs" :style="{ height: '40px' }">
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
                        lrecordoptions[element.name]?.find((opt) => opt.value === scope.opt.value)
                          ? scope.opt.label
                          : 'UNKNOWN ITEM' + ' (' + scope.opt.value + ')'
                      }}
                    </span>

                    <div class="column">
                      <q-btn
                        fab-mini
                        flat
                        icon="cancel"
                        @click.stop.prevent="scope.removeAtIndex(scope.index)"
                      ></q-btn>
                    </div>
                  </q-chip>
                </template>

                <!-- Display full option labels -->
                <template v-slot:option="scope">
                  <q-item
                    v-bind="scope.itemProps"
                    style="white-space: normal; word-break: break-word"
                  >
                    <q-item-section>
                      <q-item-label>
                        <span :class="scope.opt.disable ? 'text-strike' : ''">
                          {{ scope.opt.label ? scope.opt.label : '' }}
                        </span>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>
        </div>
      </div>
      <div style="min-height: 80px" v-if="!pmodal"></div>
      <div v-if="pmodal">
        <q-btn
          unelevated
          rounded
          no-caps
          label="save"
          type="submit"
          :color="pmaincolor"
          class="q-mt-sm"
          size="lg"
          style="width: 100%"
        /><br />
      </div>
      <q-page-sticky v-if="!pmodal" position="bottom-left" :offset="[20, 20]">
        <q-btn v-if="pallowDELETE" fab icon="delete" color="red" @click="showDialogDelete = true" />
      </q-page-sticky>
      <q-page-sticky v-if="!pmodal" position="bottom-right" :offset="[20, 20]">
        <q-btn
          v-if="showSaveButton && ((pisedit && pallowUPDATE) || (!pisedit && pallowINSERT))"
          fab
          icon="save"
          :color="pmaincolor"
          type="submit"
        />
      </q-page-sticky>
    </q-form>
    <q-dialog v-model="showDialogDelete">
      <q-card style="min-width: 40%">
        <q-card-section class="row items-center">
          <div style="float: left">
            <div class="justify-center">
              <q-avatar icon="delete" color="red" text-color="white" />
            </div>
          </div>
          <div style="float: left" class="q-pl-xl q-pr-xl">
            <div class="text-center">
              <span>delete {{ psingular }}.</span><br />
              <span>{{ pdeletetext }}</span>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn @click="deleteButton()" flat label="delete" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-inner-loading v-if="!showElements" :showing="!showElements" :color="props.pmaincolor" />
  </div>
  <!-- <div v-show="!showElements">
    <div style="margin-left: 40%; width: 20%; margin-top: 20dvh">
      <div style="height: 10dvh">
        <q-spinner color="primary" size="100%" :thickness="2" />
      </div>
    </div>
  </div> -->
</template>

<script>
import DetailRelation from 'components/detail-relation.vue';
import DetailFile from 'components/detail-file.vue';
import DetailMultiadd from 'components/detail-multiadd.vue';
import { ref, onMounted, shallowRef, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar, copyToClipboard } from 'quasar';
import { supabase } from '../helpers/supabase';
import { usePermissionsStore } from '../stores/permissions';
import { useAppsStore } from '../stores/apps';
import { usePagesStore } from '../stores/pages';
import { useObjectsStore } from '../stores/objects';
import { useObjectHistoriesStore } from '../stores/objecthistories';
import { useactionsStore } from '../stores/actions';
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import DOMPurify from 'dompurify';
const storePermissions = usePermissionsStore();
const storeApps = useAppsStore();
const storePages = usePagesStore();
const storeObjects = useObjectsStore();
const storeObjectHistories = useObjectHistoriesStore();
const storeactions = useactionsStore();
var $q;
export default {
  // name: 'ComponentName',
  components: { DetailRelation, DetailFile, DetailMultiadd },
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
    pallowSELECT: {
      type: Boolean,
      default: false,
    },
    pallowINSERT: {
      type: Boolean,
      default: false,
    },
    pallowUPDATE: {
      type: Boolean,
      default: false,
    },
    pallowDELETE: {
      type: Boolean,
      default: false,
    },
    pmodal: {
      type: Boolean,
      default: false,
    },
    precord: {
      default: {},
    },
    pisedit: {
      default: false,
    },
    pid: {
      default: '',
    },
    precordoptions: {
      default: {},
    },
    precordoptionsbyid: {
      default: {},
    },
    precordapistandard: {
      default: {},
    },
    puserid: {
      type: String,
      default: '',
    },
    pxuserid: {
      type: String,
      default: '',
    },
    poptiondescription: {
      default: {},
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
    const pisedit = ref(false);
    const lrecord = ref({});
    const showSaveButton = ref(true);
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
    const lrelation_apiname = ref('');
    const iframelink = ref('');
    const iniframe = ref(false);
    iniframe.value = window.self !== window.top;
    const comp = shallowRef();
    const loptiondescription = ref({});
    const picklistmax = 1000;
    const picklistmaxstring = ref('');
    picklistmaxstring.value = picklistmax.toLocaleString();
    const allowownerchange = ref(false);
    if (
      !storePermissions.permissionsByPermission['setup'] &&
      ((props.pisedit &&
        !storePermissions.permissionsByPermission[props.pobjectapiname + '.all.update']) ||
        (!props.pisedit &&
          !storePermissions.permissionsByPermission[props.pobjectapiname + '.all.insert']))
    ) {
      allowownerchange.value = false;
    } else {
      allowownerchange.value = true;
    }
    const relationcounter = ref({});

    lrecord.value = props.precord;
    onMounted(() => {
      lrecord.value = props.precord;
      lrecordoptions.value = props.precordoptions;
      lrecordoptionsbyid.value = props.precordoptionsbyid;
      lrecordapistandard.value = props.precordapistandard;
      loptiondescription.value = props.poptiondescription;
      // showElements.value = true;
    });

    watch(
      () => relationcounter,
      (newVal, oldVal) => {
        let alltrue = true;
        for (const item in relationcounter.value) {
          if (relationcounter.value[item].isRefreshed) {
          } else {
            showElements.value = false;
            alltrue = false;
          }
        }
        if (alltrue) {
          showElements.value = true;
        }
      },
      { deep: true },
    );

    function initDropdowns() {
      let nodropdowns = true;

      for (let i = 0; i < props.pelements.length; i++) {
        if (
          props.pelements[i]['type'] == 'relation' ||
          props.pelements[i]['type'] == 'relationmulti'
        ) {
          nodropdowns = false;
          if (props.pelements[i]['showcondition']) {
            // does not work for actions detail
            relationcounter.value[props.pelements[i]['name']] = ref({ isRefreshed: true });
          } else {
            relationcounter.value[props.pelements[i]['name']] = ref({ isRefreshed: false });
          }
        }
      }
      if (nodropdowns) {
        showElements.value = true;
      }
    }
    initDropdowns();

    function refreshDropdowns() {
      let lapiname = [];
      (async () => {
        try {
          // needs to be seperate
          for (let j = 0; j < props.pelements.length; j++) {
            if (props.pelements[j]['type'] == 'relation') {
              relationcounter.value[props.pelements[j]['name']] = ref({ isRefreshed: true });
              relationcounter.value[props.pelements[j]['name']] = ref({ isRefreshed: false });
            } else if (props.pelements[j]['type'] == 'relationmulti') {
              relationcounter.value[props.pelements[j]['name']] = ref({ isRefreshed: true });
              relationcounter.value[props.pelements[j]['name']] = ref({ isRefreshed: false });
            } else if (props.pelements[j]['type'] == 'picklist') {
              lapiname.push(props.pelements[j]['name']);
            } else if (props.pelements[j]['type'] == 'picklistmulti') {
              lapiname.push(props.pelements[j]['name']);
            }
          }

          const { data, error } = await supabase
            .from('fields')
            .select('*')
            .eq('parent_apiname', props.pobjectapiname)
            .in('api_name', lapiname);

          if (error) throw error;

          for (let i = 0; i < data.length; i++) {
            if (data[i]['type'] == 'picklist') {
              lrecordoptions.value[data[i]['api_name']] = [];
              for (let j = 0; j < data[i]['picklist_values'].length; j++) {
                let lparts = data[i].picklist_values[j].split(';');
                lrecordoptions.value[data[i]['api_name']].push({
                  label: lparts[2] === 'true' ? '' + lparts[1] + '' : lparts[1],
                  value: lparts[0],
                  disable: lparts[2] === 'true',
                });
              }
            } else if (data[i]['type'] == 'picklistmulti') {
              lrecordoptions.value[data[i]['api_name']] = [];
              for (let j = 0; j < data[i]['picklist_values'].length; j++) {
                let lparts = data[i].picklist_values[j].split(';');
                lrecordoptions.value[data[i]['api_name']].push({
                  label: lparts[2] === 'true' ? '' + lparts[1] + '' : lparts[1],
                  value: lparts[0],
                  disable: lparts[2] === 'true',
                });
              }
            }
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

    function checkcondition(pcondition) {
      return eval(pcondition);
    }

    function onSubmit() {
      showElements.value = false;
      if (props.pisedit) {
        updateData();
      } else {
        insertData();
      }
    }

    function insertData() {
      let mrecord = JSON.parse(JSON.stringify(lrecord.value));

      if (props.pobjectdetail) {
        if (mrecord['owner_id']?.value) {
          mrecord['owner_id'] = mrecord['owner_id'].value;
        }
        if (!mrecord['owner_id']) {
          mrecord['owner_id'] = props.pxuserid;
        }
      }

      if (props.pprofileid) {
        mrecord['profile_id'] = profileid.value;
      }

      for (let i = 0; i < props.pelements.length; i++) {
        if (props.pelements[i]['type'] == 'api') {
          mrecord[props.pelements[i]['name']] =
            mrecord[props.pelements[i]['name']] + '__' + mrecord['id'];
        }
        if (props.pelements[i]['prefix'] != null) {
          mrecord[props.pelements[i]['name']] =
            props.pelements[i]['prefix'] + mrecord[props.pelements[i]['name']];
        }
        if (props.pelements[i]['name'] == 'api_name') {
          mrecord[props.pelements[i]['name']] = mrecord[props.pelements[i]['name']].replaceAll(
            '-',
            '_',
          );
        }
        if (props.pelements[i]['type'] == 'picklist') {
          if (mrecord[props.pelements[i]['name']]) {
            // check needed for checkdropdown
            mrecord[props.pelements[i]['name']] = mrecord[props.pelements[i]['name']]?.value
              ? mrecord[props.pelements[i]['name']]?.value
              : mrecord[props.pelements[i]['name']];
          } else {
            mrecord[props.pelements[i]['name']] = null;
          }
        }
        if (props.pelements[i]['type'] == 'picklistmulti') {
          let lpicklistmulti = [];
          for (let j = 0; j < mrecord[props.pelements[i]['name']]?.length; j++) {
            if (mrecord[props.pelements[i]['name']][j].value) {
              lpicklistmulti.push(mrecord[props.pelements[i]['name']][j].value);
            } else {
              lpicklistmulti.push(mrecord[props.pelements[i]['name']][j]);
            }
          }
          if (lpicklistmulti.length == 0) {
            lpicklistmulti = null;
          }
          mrecord[props.pelements[i]['name']] = lpicklistmulti;
        }
        if (props.pelements[i]['type'] == 'relationmulti') {
        }
        if (props.pelements[i]['type'] == 'datetime') {
          if (mrecord[props.pelements[i]['name']]) {
            let ldatetime = new Date(mrecord[props.pelements[i]['name']]);
            mrecord[props.pelements[i]['name']] = ldatetime.toISOString();
          } else {
            mrecord[props.pelements[i]['name']] = null;
          }
        }
        if (props.pelements[i]['type'] == 'date') {
          if (mrecord[props.pelements[i]['name']] == '') {
            mrecord[props.pelements[i]['name']] = null;
          }
        }
        if (props.pelements[i]['type'] == 'display') {
          mrecord[props.pelements[i]['name']] = null;
          delete mrecord[props.pelements[i]['name']];
        }
        if (props.pelements[i]['type'] == 'number') {
          if (mrecord[props.pelements[i]['name']] == '') {
            mrecord[props.pelements[i]['name']] = null;
          }
        }
        if (props.pelements[i]['type'] == 'file') {
          if (!mrecord[props.pelements[i]['name']]) {
            mrecord[props.pelements[i]['name']] = '';
          }
        }
      }

      if (props.psilentelements) {
        for (let j = 0; j < props.psilentelements.length; j++) {
          if (props.psilentelements[j]['value']) {
            mrecord[props.psilentelements[j]['name']] = props.psilentelements[j]['value'];
          }
        }
      }

      (async () => {
        try {
          const { data, error } = await supabase.from(props.pobject).insert([mrecord]);

          if (error) throw error;

          if (props.pupdatepermission) {
            storePermissions.isLoaded = false;
            await storePermissions.getPermissions(true);
          }
          if (props.pupdateapp) {
            await storeApps.getAppData();
          }
          if (props.pupdatepage) {
            await storePages.getPageData();
          }
          if (props.pupdateobject) {
            await storeObjects.getObjectData();
            await storeObjectHistories.getObjectHistories();
          }
          if (props.pupdateaction) {
            await storeactions.getactionsData();
          }
          backButton();
          $q.notify({
            type: 'positive',
            message: props.psingular + ' added.',
            color: props.pmaincolor,
          });
        } catch (error) {
          console.log(error);
          showElements.value = true;
          $q.notify({
            type: 'negative',
            message: error?.message
              ? 'Something went wrong.' + ' (' + error.message + ')'
              : 'Something went wrong.',
          });
        } finally {
        }
      })();
    }

    function updateData() {
      let mrecord = JSON.parse(JSON.stringify(lrecord.value));

      if (props.pobjectdetail) {
        if (mrecord['owner_id']?.value) {
          mrecord['owner_id'] = mrecord['owner_id'].value;
        }
        if (!mrecord['owner_id']) {
          mrecord['owner_id'] = props.pxuserid;
        }
      }

      for (let i = 0; i < props.pelements.length; i++) {
        if (props.pelements[i]['prefix'] != null) {
          if (!lrecordapistandard.value[props.pelements[i]['name']]) {
            mrecord[props.pelements[i]['name']] =
              props.pelements[i]['prefix'] + mrecord[props.pelements[i]['name']];
          }
        }
        if (props.pelements[i]['type'] == 'api') {
          if (!lrecordapistandard.value[props.pelements[i]['name']]) {
            mrecord[props.pelements[i]['name']] =
              mrecord[props.pelements[i]['name']] + '__' + mrecord['id'].replaceAll('-', '_');
          }
        }
        if (props.pelements[i]['type'] == 'relation') {
          if (mrecord[props.pelements[i]['name']]) {
            // mrecord[props.pelements[i]['name']] = mrecord[props.pelements[i]['name']]?.value;
          } else {
            mrecord[props.pelements[i]['name']] = null;
          }
        }
        if (props.pelements[i]['type'] == 'picklist') {
          if (mrecord[props.pelements[i]['name']]) {
            // check needed for checkdropdown
            mrecord[props.pelements[i]['name']] = mrecord[props.pelements[i]['name']]?.value
              ? mrecord[props.pelements[i]['name']]?.value
              : mrecord[props.pelements[i]['name']];
          } else {
            mrecord[props.pelements[i]['name']] = null;
          }
        }
        if (props.pelements[i]['type'] == 'picklistmulti') {
          let lpicklistmulti = [];
          for (let j = 0; j < mrecord[props.pelements[i]['name']]?.length; j++) {
            if (mrecord[props.pelements[i]['name']][j].value) {
              lpicklistmulti.push(mrecord[props.pelements[i]['name']][j].value);
            } else {
              lpicklistmulti.push(mrecord[props.pelements[i]['name']][j]);
            }
          }
          if (lpicklistmulti.length == 0) {
            lpicklistmulti = null;
          }
          mrecord[props.pelements[i]['name']] = lpicklistmulti;
        }
        if (props.pelements[i]['type'] == 'relationmulti') {
        }
        if (props.pelements[i]['type'] == 'file') {
        }
        if (props.pelements[i]['type'] == 'date') {
          if (mrecord[props.pelements[i]['name']] == '') {
            mrecord[props.pelements[i]['name']] = null;
          }
        }
        if (props.pelements[i]['type'] == 'datetime') {
          if (mrecord[props.pelements[i]['name']]) {
            let ldatetime = new Date(mrecord[props.pelements[i]['name']]);
            mrecord[props.pelements[i]['name']] = ldatetime.toISOString();
          } else {
            mrecord[props.pelements[i]['name']] = null;
          }
        }
        if (props.pelements[i]['type'] == 'display') {
          mrecord[props.pelements[i]['name']] = null;
          delete mrecord[props.pelements[i]['name']];
        }
        if (props.pelements[i]['type'] == 'number') {
          if (mrecord[props.pelements[i]['name']] == '') {
            mrecord[props.pelements[i]['name']] = null;
          }
        }
      }

      (async () => {
        try {
          let { data, error } = await supabase
            .from(props.pobject)
            .update([mrecord])
            .eq('id', props.pid)
            .select();

          if (!data || data.length == 0) {
            if (!error) {
              error = {};
              error.message = 'Missing permissions.';
            }
            throw error;
          }
          if (error) throw error;

          if (props.pupdatepermission) {
            storePermissions.isLoaded = false;
            await storePermissions.getPermissions(true);
          }
          if (props.pupdateapp) {
            await storeApps.getAppData();
          }
          if (props.pupdatepage) {
            await storePages.getPageData();
          }
          if (props.pupdateobject) {
            await storeObjects.getObjectData();
            await storeObjectHistories.getObjectHistories();
          }
          if (props.pupdateaction) {
            await storeactions.getactionsData();
          }
          backButton();
          $q.notify({
            type: 'positive',
            message: props.psingular + ' edited.',
            color: props.pmaincolor,
          });
        } catch (error) {
          if (error.message.startsWith('b0f5e1ba-0eb9-4f6c-98e9-c204cf7ce95c;')) {
            refreshDropdowns();
            error.message =
              'Dropdown value is not valid anymore (UNKNOWN ITEM / RECORD). Please select another one.';
          } else {
            showElements.value = true;
          }
          console.log(error);
          $q.notify({
            type: 'negative',
            message: error?.message
              ? 'Something went wrong.' + ' (' + error.message + ')'
              : 'Something went wrong.',
          });
        }
      })();
    }

    function deleteButton() {
      showDialogDelete.value = false;
      showElements.value = false;
      (async () => {
        try {
          let { data, error } = await supabase
            .from(props.pobject)
            .delete()
            .eq('id', props.pid)
            .select();

          if (error || data.length == 0) {
            if (!error) {
              error = {};
              error.message = 'Missing permissions.';
            }

            throw error;
          }

          if (props.pupdatepermission) {
            storePermissions.isLoaded = false;
            await storePermissions.getPermissions(true);
          }
          if (props.pupdateapp) {
            storeApps.getAppData();
          }
          if (props.pupdatepage) {
            storePages.getPageData();
          }
          if (props.pupdateobject) {
            storeObjects.getObjectData();
            storeObjectHistories.getObjectHistories();
          }
          if (props.pupdateaction) {
            storeactions.getactionsData();
          }
          backButton();
          $q.notify({
            type: 'positive',
            message: props.psingular + ' deleted.',
            color: props.pmaincolor,
          });
        } catch (error) {
          showElements.value = true;
          $q.notify({
            type: 'negative',
            message: error?.message
              ? 'Something went wrong.' + ' (' + error.message + ')'
              : 'Something went wrong.',
          });
        }
      })();
    }

    function backButton() {
      if (!props.pmodal) {
        if (window.history.state.back != null) {
          router.back();
        } else {
          router.replace({
            name: props.pbacklink,
            //params: { objectapiname: route.params.objectapiname },
          });
        }
      }
    }

    function copyText(pText) {
      copyToClipboard(pText)
        .then(() => {
          $q.notify({
            type: 'positive',
            message: 'copied to clipboard.',
            color: 'secondary',
          });
        })
        .catch(() => {
          $q.notify({
            type: 'negative',
            message: 'something did not work',
          });
        });
    }

    function purifydom(ptext) {
      let ltext = ptext;
      ltext = ltext
        ? DOMPurify.sanitize(ltext, {
            USE_PROFILES: { html: true },
            FORBID_TAGS: ['script', 'iframe', 'object', 'embed'],
            FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'style'],
          })
        : '';
      return ltext;
    }

    const focus = (ref) => {
      ref.$el.scrollIntoView({ behavior: 'smooth' });
    };

    return {
      showElements,
      luuid,
      lrecord,
      lrecordoptions,
      lrecordoptionsbyid,
      showSaveButton,
      showDialogDelete,
      onSubmit,
      deleteButton,
      backButton,
      props,
      myltref,
      checkcondition,
      isValidUUID,
      lrecordapistandard,
      ldialog,
      comp,
      lrelation_apiname,
      iframelink,
      iniframe,
      loptiondescription,
      storePermissions,
      copyText,
      purifydom,
      focus,
      picklistmaxstring,
      // onPicklistReady,
      // childshowelements,
      // childhideelements,
      allowownerchange,
      relationcounter,
      refreshDropdowns,
    };
  },
};
</script>
