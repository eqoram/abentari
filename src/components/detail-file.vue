<template>
  <q-file
    :readonly="!pallowUPDATE"
    ref="refqfile"
    :model-value="files"
    @update:model-value="updateFiles"
    :label="pelement.required ? pelement.label + ' *' : pelement.label"
    outlined
    :data-id="'file--' + pelement.name"
    :data-name="'file--' + pelement.label"
    rounded
    multiple
    max-files="1"
    lazy-rules="ondemand"
    style="pointer-events: none"
    :rules="[
      (val) => !pelement?.required || (val != null && newuploaddone) || 'file upload is required',
    ]"
  >
    <!--:clearable="!isUploading"-->
    <template v-slot:prepend>
      <q-btn
        v-if="pallowUPDATE"
        fab-mini
        color="white"
        class="q-mt-sm q-mb-sm"
        style="pointer-events: auto"
        @click="refqfile.pickFiles()"
        ><q-icon name="attach_file" color="black"></q-icon
      ></q-btn>
      <div v-if="showDownloadSpinner">
        <q-spinner class="q-ml-sm" :color="pmaincolor" />
      </div>
      <div v-else>
        <q-btn
          style="pointer-events: auto"
          fab-mini
          color="white"
          v-if="newuploaddone && pisedit && !filechanged"
          @click="downloadbutton"
          ><q-icon color="black" name="download"></q-icon
        ></q-btn>
      </div>
    </template>
    <template v-slot:file="{ index, file }">
      <div v-if="newuploaddone" class="full-height full-width" v-on:click.prevent="void 0">
        <p class="cursor-pointer">
          {{ downloadlink }}
        </p>
      </div>
      <div v-if="index && file"></div>
      <!--<q-chip class="full-width q-my-xs" square>-->
      <!--@remove="cancelFile(index)"-->
      <!--:removable="isUploading && uploadProgress[index].percent < 1"-->
      <!--<q-linear-progress
          class="absolute-full full-height"
          :value="uploadProgress[index]?.percent"
          :color="uploadProgress[index]?.color"
          track-color="grey"
          rounded
        />-->

      <!--<q-avatar>
                    <q-icon :name="uploadProgress[index].icon" />
                  </q-avatar>-->

      <!--<div class="ellipsis relative-position" :class="'text-white'">-->
      <!--<span
            >{{ (uploadProgress[index].percent * 100).toFixed(0) }} % -
            {{ file.name }}
          </span>-->
      <!--<span v-if="newisuploading"
            >Uploading -
            {{ file.name }}
          </span>-->
      <!--<span>{{ file.name }}</span>-->
      <!--<span v-if="file" class="text-right" style="float: right"> </span>
        </div>
      </q-chip>-->
    </template>

    <template v-slot:append>
      <q-spinner size="md" :color="pmaincolor" v-if="newisuploading" />
      <q-btn
        style="pointer-events: auto"
        fab-mini
        color="white"
        v-if="newuploaddone && pallowUPDATE"
        @click="resetButton()"
        ><q-icon color="black" name="close"></q-icon
      ></q-btn>
      <q-btn fab-mini color="red" icon="warning" v-if="newuploadwarning"></q-btn>
    </template>
  </q-file>
  <!--<div class="text-center q-mb-md" v-if="newuploaddone">
    <div v-if="showDownloadSpinner">
      <q-spinner :color="pmaincolor" />
    </div>
    <div v-else>
      <a class="text-primary cursor-pointer" @click="downloadbutton()">{{
        downloadlink
      }}</a>
    </div>
  </div>-->
  <!--<img :src="imagelink" />-->
</template>

<script>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue';
import { useFormChild, useQuasar } from 'quasar';
import { supabase } from '../helpers/supabase';
import { v4 as uuidv4 } from 'uuid';
var $q;
export default {
  inheritAttrs: false,
  // name: 'ComponentName',
  props: {
    pmaincolor: {
      type: String,
      default: 'primary',
    },
    pelement: {
      default: {},
    },
    pobject: {
      type: String,
      default: '',
    },
    puuid: {
      type: String,
      default: '',
    },
    pvalue: {
      default: '',
    },
    pallowUPDATE: {
      type: Boolean,
      default: true,
    },
    puserid: {
      type: String,
      default: '',
    },
    pxuserid: {
      type: String,
      default: '',
    },
    pisedit: {
      type: Boolean,
      default: false,
    },
    pguest: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    $q = useQuasar();
    const refqfile = ref();
    const files = ref(null);
    const uploadProgress = ref([]);
    const uploading = ref(null);
    const newisuploading = ref(false);
    const newuploaddone = ref(false);
    const newuploadwarning = ref(false);
    const downloadlink = ref('');
    const imagelink = ref('');
    const showDownloadSpinner = ref(false);
    const filechanged = ref(false);

    if (props.pvalue) {
      files.value = new File([''], '', { type: 'text/html' });
      let newFiles;
      newFiles = [];
      newFiles.push(files.value);
      downloadlink.value = props.pvalue;

      uploadProgress.value = (newFiles || []).map((file) => ({
        error: false,
        color: 'grey',
        percent: 0,
        icon:
          file.type.indexOf('video/') === 0
            ? 'movie'
            : file.type.indexOf('image/') === 0
              ? 'photo'
              : file.type.indexOf('audio/') === 0
                ? 'audiotrack'
                : 'insert_drive_file',
      }));

      updateUploadProgress(true);
    }

    function resetButton() {
      files.value = null;
      newuploaddone.value = false;
      emit('updatefilelink', '');
    }

    function validate() {
      return true;
    }

    useFormChild({
      validate, // Function; Can be async;
      // Should return a Boolean (or a Promise resolving to a Boolean)
      // resetValidation, // Optional function which resets validation
      requiresQForm: true, // should it error out if no parent QForm is found?
    });

    async function downloadbutton() {
      try {
        showDownloadSpinner.value = true;
        const { data, error } = await supabase.storage
          .from('storage1')
          .download(downloadlink.value);

        if (error) throw error;

        var file = new Blob([data], { type: data.type, name: 'file' });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);

        imagelink.value = fileURL;

        showDownloadSpinner.value = false;
      } catch (e) {
        console.log(e);
        $q.notify({
          type: 'negative',
          message: 'No access.',
        });
      }
    }

    function cleanUp() {
      clearTimeout(uploading.value);
    }

    function updateUploadProgress(skiptofull, error) {
      let done = true;

      uploadProgress.value = uploadProgress.value.map((progress) => {
        if (progress.error === true) {
          return progress;
        }

        let percent;
        if (skiptofull) {
          percent = 1;
        } else {
          percent = Math.min(1, progress.percent + Math.random() / 10);
        }

        if (error === false && percent < 1 && done === true) {
          done = false;
        }

        let dispercent = percent * 100;

        if (error) {
          newuploadwarning.value = true;
          newisuploading.value = false;
          newuploaddone.value = false;
          refqfile.value.resetValidation();
          return {
            ...progress,
            error,
            color: error === true ? 'red' : props.pmaincolor,
            percent,
          };
        }

        if (done) {
          newisuploading.value = false;
          newuploaddone.value = true;
          if (refqfile.value) {
            refqfile.value.resetValidation();
          }
          return {
            ...progress,
            error,
            color: error === true ? 'red' : props.pmaincolor,
            percent,
          };
        }

        return {
          ...progress,
          error,
          color: error === true ? 'red' : 'grey',
          percent,
        };
      });

      uploading.value = done !== true ? setTimeout(updateUploadProgress, 200) : null;
    }

    onBeforeUnmount(cleanUp);

    async function upload() {
      cleanUp();

      filechanged.value = true;
      newuploadwarning.value = false;
      newuploaddone.value = false;
      newisuploading.value = true;

      if (files.value) {
        // old way
        // let directoryname =
        //   'objects' + '/' + props.pobject + '/' + props.pelement.name + '/' + props.puuid + '/';

        let filename = uuidv4();

        let directoryname = '';

        if (props.pguest) {
          directoryname =
            'objects' +
            '/' +
            props.pobject +
            '/' +
            props.pelement.name +
            '/' +
            '00000000-0000-0000-0000-000000000000' +
            '/';
        } else {
          directoryname =
            'objects' +
            '/' +
            props.pobject +
            '/' +
            props.pelement.name +
            '/' +
            props.pxuserid +
            '/';
        }

        // console.log('jn1');
        // console.log(props.pguest);
        // console.log(props.pxuserid);
        // console.log(directoryname + filename);

        //let filename = files.value[0].name;

        const { data, error } = await supabase.storage
          .from('storage1')
          .upload(directoryname + filename, files.value[0], {
            cacheControl: '0',
            upsert: false,
          });

        files.value = new File([''], '', { type: 'text/html' });

        if (error) {
          updateUploadProgress(true, true);
          throw error;
        }

        downloadlink.value = directoryname + filename;
        emit('updatefilelink', downloadlink.value);
      }

      const allDone = uploadProgress.value.every((progress) => progress.percent === 1);

      uploadProgress.value = uploadProgress.value.map((progress) => ({
        ...progress,
        error: false,
        color: 'grey',
        percent: allDone === true ? 0 : progress.percent,
      }));

      updateUploadProgress(true);
    }

    return {
      resetButton,
      refqfile,
      files,
      uploadProgress,
      uploading,
      newisuploading,
      newuploaddone,
      newuploadwarning,
      downloadlink,
      downloadbutton,
      imagelink,
      showDownloadSpinner,
      filechanged,

      isUploading: computed(() => uploading.value !== null),
      canUpload: computed(() => files.value !== null),

      cancelFile(index) {
        this.uploadProgress[index] = {
          ...this.uploadProgress[index],
          error: true,
          color: 'orange-2',
        };
      },

      updateFiles(newFiles) {
        files.value = newFiles;
        uploadProgress.value = (newFiles || []).map((file) => ({
          error: false,
          color: 'grey',
          percent: 0,
          icon:
            file.type.indexOf('video/') === 0
              ? 'movie'
              : file.type.indexOf('image/') === 0
                ? 'photo'
                : file.type.indexOf('audio/') === 0
                  ? 'audiotrack'
                  : 'insert_drive_file',
        }));

        upload();
      },
    };
  },
};
</script>
