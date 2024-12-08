<template>
  <nav class="m-0 d-inline-block">
    <ul class="pagination m-0">
      <li :class="props.data.current_page == 1 ? 'page-item disabled' : 'page-item'"><a class="page-link"
          @click="first"><i class="bi bi-chevron-double-left"></i></a></li>
      <li :class="props.data.current_page == 1 ? 'page-item disabled' : 'page-item'"><a class="page-link"
          @click="previous"><i class="bi bi-chevron-left"></i></a></li>
      <li class="page-item">
        <PaginateInput v-model="model" @keyup.enter="jump" />
      </li>
      <li class='page-item position-relative d-none d-sm-block'>
        <a class="page-link text-center pe-none d-flex" href="#">
          <span class="me-1">of</span> <span>{{ props.data.last_page }}</span>
        </a>
      </li>
      <li :class="props.data.current_page == props.data.last_page ? 'page-item disabled' : 'page-item'"><a
          class="page-link" @click="next"><i class="bi bi-chevron-right"></i></a></li>
      <li :class="props.data.current_page == props.data.last_page ? 'page-item disabled' : 'page-item'"><a
          class="page-link" @click="last"><i class="bi bi-chevron-double-right"></i></a></li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import PaginateInput from './PaginateInput.vue';

const props = defineProps({
  data: { type: [Array, Object] },
  selectedoption: { type: [String, Number, Array] },
  fetched: { type: Function },
  searchdata: { type: [String, Number] }
});

const model = ref();

// pagination
const next = () => {
  if (model.value == props.data.last_page) {
    model.value == props.data.last_page;
  } else {
    model.value = props.data.current_page + 1;
  }
  props.fetched(model.value, props.selectedoption, props.searchdata);
};

const last = () => {
  model.value = props.data.last_page;
  props.fetched(model.value, props.selectedoption, props.searchdata);
};

const first = () => {
  model.value = 1;
  props.fetched(model.value, props.selectedoption, props.searchdata);
};

const previous = () => {
  model.value = props.data.current_page - 1;
  props.fetched(model.value, props.selectedoption, props.searchdata);
};

const jump = () => {
  if (model.value > props.data.last_page) {
    model.value = props.data.last_page;
  }
  props.fetched(model.value, props.selectedoption, props.searchdata);
};

watchEffect(() => {
  model.value = props.data.current_page;
})
</script>

<style lang="scss" scoped>
li,
a,
.form-control {
  border-color: #CCCCCC;
}

.disabled a {
  background: #DFDFDF !important;
}

a {
  cursor: pointer;
}
</style>