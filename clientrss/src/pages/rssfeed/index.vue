<template>
  <header class="sticky-top border-bottom">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <span class="me-2"><i class="bi bi-rss-fill"></i></span>
          <span>News Aggregator</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="row my-3 my-lg-0 ms-auto w-100 justify-content-end">
            <div class="col-12 col-sm-9 col-lg-6 col-xl-4 mb-3 mb-sm-0">
              <div class="d-flex" role="search">
                <SelectInfinite placeholder="Select..." parentclass="w-100" :data="rssData" label="title"
                  :options="rssField.all" v-model="rssField.val" :fetched="fetchedRss"
                  @option:selected="selectedPubDate" />
                <!-- {{ rssField.val }} -->
                <button class="btn btn-outline-secondary btn-sm ms-1 px-3" type="button" title="reset" @click="reset">
                  <i class="bi bi-stars"></i>
                </button>
              </div>
            </div>
            <div class="col-3 col-lg-2 col-xl-1">
              <select class="form-select border-secondary shadow-none m-0" v-model="option.val" @change="selectOption">
                <option v-for=" (value, index) in option.options" :key="index" :value="value">{{ value }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <div class="mainbody card card-body border-0">
    <Feed :data="data" />
    <div class="py-3 text-center">
      <Pagination :data="data" :fetched="fetchedData" :selectedoption="option.val"
        :searchedata="moment(rssField.val?.title).format('YYYY-MM-DD')" />
    </div>
  </div>
  <footer class="text-center fw-bold">
    Developed By Shaikh Niyamul Ahsan (niYam)
  </footer>
</template>

<script setup>
import { reactive, ref, computed, onMounted, watchEffect } from 'vue';
import moment from 'moment-timezone';
import debounce from 'lodash.debounce';
import SelectInfinite from '../../components/SelectInfinite.vue';
import Feed from './Feed.vue';
import Pagination from './Pagination.vue';;

// connect store
import { useRss } from "../../store/rss";
const rss = useRss();

// display data
const data = computed(() => rss.getRss);
const fetchedData = async (page = 1, size, search) => {
  const param = { page: page, size: size, search: search };
  await rss.fetchAll(param);
};

// rss data dropdown pubdate only
const rssField = reactive({ all: [], val: '', err: '', page: 0, size: 10 });
const rssData = ref({});
const fetchedRss = async (search) => {
  rssField.page++;
  search && (rssField.all = [], rssField.page = 0);
  await rss.fetchDistinctPubDate({ page: rssField.page, size: rssField.size, search: search }).then((res) => {
    rssData.value = res;
    // console.log(res);
    res.forEach((dt) => {
      rssField.all = [...rssField.all, { id: dt.id, title: dt.pubdate }];
    });
  });
};

// dropdown pagination per page
const option = reactive({ options: [4, 8, 12], val: '' });
const selectOption = async (e) => {
  await fetchedData(data.current_page, e.target.value, rssField.val.title);
};

// filter with publish date
const selectedPubDate = async () => {
  const param = { page: data.current_page, size: option.val, search: rssField.val?.title };
  await rss.fetchAll(param);
};

// reset page
const reset = async () => {
  rssField.val = "";
  await fetchedData();
};

// initial mounted
onMounted(async () => {
  await fetchedData();
  option.val = option.options[option.options.indexOf(data.value.per_page)];
});
</script>

<style lang="scss" scoped></style>