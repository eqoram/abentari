<template>
  <div class="q-ma-xs q-mt-md">
    <p class="full-width">{{ props.plabel }}</p>
    <hr />
    <div v-for="(element, index) in llist" :key="index">
      <div class="row">
        <div class="column" style="width: 50px">
          <div>
            <q-btn
              v-if="pallowUPDATE"
              class="bg-white q-ma-xs"
              @click="disableButton(element.id)"
              fab-mini
              ><q-icon
                color="black"
                :name="element.disabled ? 'visibility_off' : 'visibility'"
              ></q-icon
            ></q-btn>
          </div>
        </div>
        <div class="column" style="width: calc(100% - 100px)">
          <div class="row full-width">
            <q-input
              v-if="pallowUPDATE"
              prefix="value: "
              class="full-width"
              :class="element.disabled ? 'text-strike' : ''"
              :readonly="element.disabled"
              v-model="element.value"
              lazy-rules
              :rules="[
                (val) => (val && val.trim().length > 0) || 'this field is required',
                (val) => val.length <= 250 || 'this field is limited to 250 characters',
                (val) => !val.includes(';') || 'semicolon is not allowed',
              ]"
              outlined
              rounded
            ></q-input>
          </div>
        </div>
        <div class="column" style="width: 50px">
          <div>
            <q-btn v-if="pallowUPDATE" class="bg-white q-ma-xs" @click="moveUp(element.id)" fab-mini
              ><q-icon color="black" name="arrow_drop_up"></q-icon
            ></q-btn>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="column" style="width: 50px">
          <div>
            <q-btn
              v-if="pallowUPDATE && index != 0"
              class="bg-white q-ma-xs"
              @click="deleteButton(element.id)"
              fab-mini
              ><q-icon color="black" name="delete"></q-icon
            ></q-btn>
          </div>
        </div>
        <div class="column" style="width: calc(100% - 100px)">
          <div class="row full-width text-center">
            <!-- <p class="full-width text-center q-ma-md">
              <span v-if="element.disabled"
                ><s>{{ element.id }}</s></span
              ><span v-else>{{ element.id }}</span>
            </p> -->
            <q-input
              v-if="pallowUPDATE"
              prefix="(edit with caution) id: "
              class="full-width"
              :class="element.disabled ? 'text-strike' : ''"
              :readonly="element.disabled"
              v-model="element.id"
              lazy-rules
              :rules="[
                (val) => (val && val.trim().length > 0) || 'this field is required',
                (val) => val.length <= 250 || 'this field is limited to 250 characters',
                (val) => !val.includes(';') || 'semicolon is not allowed',
                (val) => isValidUUID(val) || 'must be a uuid',
              ]"
              outlined
              rounded
            ></q-input>
          </div>
        </div>
        <div class="column" style="width: 50px">
          <div>
            <q-btn
              v-if="pallowUPDATE"
              class="bg-white q-ma-xs"
              @click="moveDown(element.id)"
              fab-mini
              ><q-icon color="black" name="arrow_drop_down"></q-icon
            ></q-btn>
          </div>
        </div>
      </div>
      <div>
        <hr />
      </div>
    </div>
    <div class="full-width q-mt-lg q-pb-xl" style="position: relative">
      <div class="absolute-center">
        <q-btn
          v-if="pallowUPDATE && llist.length < lmaxlength"
          class="bg-white q-ma-xs absolute-center"
          @click="addButton"
          fab-mini
          ><q-icon color="black" name="add"></q-icon
        ></q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount, watch } from 'vue';
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { useFormChild } from 'quasar';

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
});

const llist = ref([]);
const lmaxlength = ref(1000);
const emit = defineEmits(['updatemultiadd']);
watch(
  llist,
  () => {
    let rlist = [];
    for (let i = 0; i < llist.value.length; i++) {
      rlist.push(
        llist.value[i]['id'] + ';' + llist.value[i]['value'] + ';' + llist.value[i]['disabled'],
      );
    }
    emit('updatemultiadd', rlist);
  },
  { deep: true },
);

onMounted(() => {
  llist.value = [];
  if (!props.plist || props.plist.length == 0) {
    llist.value.push({ value: '', id: uuidv4(), disabled: false });
  } else {
    for (let i = 0; i < props.plist.length; i++) {
      let plistparts = props.plist[i].split(';');
      llist.value.push({
        id: plistparts[0],
        value: plistparts[1],
        disabled: plistparts[2] === 'true',
      });
    }
  }
});

function addButton() {
  llist.value.push({ value: '', id: uuidv4(), disabled: false });
}

function deleteButton(pid) {
  if (llist.value.length > 1) {
    for (let i = 0; i < llist.value.length; i++) {
      if (llist.value[i]['id'] == pid) {
        llist.value.splice(i, 1);
      }
    }
  }
}

function moveUp(pid) {
  let selectedIndex;
  let selectedItem;
  let changeIndex;
  let changeItem;
  let lupdate = false;
  for (let i = 0; i < llist.value.length; i++) {
    if (llist.value[i]['id'] == pid) {
      selectedIndex = i;
      if (selectedIndex != 0) {
        selectedItem = llist.value[i];
        changeIndex = i - 1;
        changeItem = llist.value[i - 1];
        lupdate = true;
      }
    }
  }
  if (lupdate) {
    llist.value[changeIndex] = selectedItem;
    llist.value[selectedIndex] = changeItem;
  }
}

function moveDown(pid) {
  let selectedIndex;
  let selectedItem;
  let changeIndex;
  let changeItem;
  let lupdate = false;
  for (let i = 0; i < llist.value.length; i++) {
    if (llist.value[i]['id'] == pid) {
      selectedIndex = i;
      if (selectedIndex + 1 < llist.value.length) {
        selectedItem = llist.value[i];
        changeIndex = i + 1;
        changeItem = llist.value[i + 1];
        lupdate = true;
      }
    }
  }
  if (lupdate) {
    llist.value[changeIndex] = selectedItem;
    llist.value[selectedIndex] = changeItem;
  }
}

function disableButton(pid) {
  for (let i = 0; i < llist.value.length; i++) {
    if (llist.value[i]['id'] == pid) {
      llist.value[i]['disabled'] = !llist.value[i]['disabled'];
    }
  }
}
</script>
