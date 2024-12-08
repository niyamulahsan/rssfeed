<template>
  <div class="row g-2">
    <div class="col-12 col-sm-6 col-lg-4 col-xl-3" v-for="(dt, i) in props.data.result" :key="dt.id">
      <a :href="dt.link" class="text-decoration-none text-dark" target="_blank">
        <div class="card card-body h-100">
          <h6 class="fw-bold">{{ dt.title }}</h6>
          <p>{{ dt.summary }}</p>
          <br>
          <p class="m-0">লেখকঃ {{ dt.author }}</p>
          <p class="m-0">
            <span>প্রকাশের তারিখঃ</span>
            {{ moment(dt.pubdate).tz("Asia/Dhaka").format('DD MMM YYYY h:mm:ss A') }}
          </p>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import moment from 'moment-timezone';

const props = defineProps({
  data: { type: [Array, Object], default: [] }
});
</script>

<style lang="scss" scoped></style>