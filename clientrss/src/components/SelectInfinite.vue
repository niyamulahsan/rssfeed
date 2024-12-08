<template>
  <div :class="`${$attrs.parentclass ? $attrs.parentclass : 'mb-2'}`">
    <label :for="$attrs.id" :class="$attrs.title ? 'form-label text-capitalize d-flex' : 'd-none'">
      <span class="text-capitalize">{{ $attrs.title }}</span>
      <span :class="props.must ? 'text-danger rounded-circle bg-danger must' : 'd-none'"></span>
      <div :class="props.hood ? 'border-0 text-uppercase border w-100 text-end text-primary' : 'd-none'">
        {{ props.hood }}
      </div>
    </label>
    <v-select :filterable="false" @open="onOpen" @close="onClose" @search="inputSearch" v-model="model" v-bind="$attrs">
      <template #list-footer>
        <li v-show="hasNextPage" ref="load" class="loader">More...</li>
      </template>
    </v-select>
    <div :class="`${err ? 'form-text text-danger' : 'd-none'}`" style="font-size: 0.8rem;">{{ err }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue';
import debounce from 'lodash.debounce';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

const props = defineProps({
  data: { type: [Array, Object] },
  fetched: { type: Function },
  must: { type: Boolean },
  err: { type: [String, Boolean], required: false },
  hood: { type: [String, Boolean] },
  // modelValue: { type: [String, Number, Object, Array] }
});

// vue3.4 way
const emit = defineEmits(['fetched']);
const model = defineModel();

// vue3.3
/** 
 * const emit = defineEmits(['fetched', 'update:modelValue']);
 * const model = computed({
 *   get() { return props.modelValue },
 *   set(value) { emit('update:modelValue', value) }
 * });
 */


let observer = ref({});
let load = ref({});

const hasNextPage = computed(() => props.data.data ? props.data.data.length < props.data.total : []);

const onOpen = async () => {
  if (hasNextPage) {
    await nextTick();
    observer.value.observe(load.value);
  }
};

const onClose = () => {
  observer.value.disconnect();
};

const infiniteScroll = async ([{ isIntersecting, target }]) => {
  if (isIntersecting) {
    const ul = target.offsetParent;
    const scrollTop = target.offsetParent.scrollTop;
    // this.limit += 10
    await props.fetched();
    await nextTick();
    ul.scrollTop = scrollTop;
  }
};

const inputSearch = debounce(async function (search, loading) {
  if (search.length) {
    loading(true);
    await props.fetched(search).then(() => loading(false));
  } else {
    await props.fetched().then(() => loading(false));
  }
}, 1000);

onMounted(async () => {
  observer.value = new IntersectionObserver(infiniteScroll);
  // await props.fetched();
});
</script>

<style lang="scss" scoped>
.loader {
  text-align: center;
  color: #bbbbbb;
}

.must {
  width: 4px;
  height: 4px;
  margin-left: 2px;
  margin-top: 5px;
}
</style>
<style lang="scss">
.vs__dropdown-toggle {
  padding: .27rem 0;
  // margin-bottom: 3px;
  // margin-top: 1px;
}

.vs__dropdown-menu {
  max-height: 225px;
  min-width: 100px !important;
  right: 0 !important;
  left: auto !important;
}
</style>