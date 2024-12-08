<template>
  <input type="text" category="number" class="page-link shadow-none text-center mb-0 rounded-0" style="width: 5rem;"
    :value="props.modelValue" @input="updateValue" />
</template>

<script setup>
const props = defineProps({
  modelValue: { type: [String, Number], default: '' }
});
const emit = defineEmits(['update:modelValue']);
const updateValue = (e) => {
  emit('update:modelValue', e.target.value = e.target.value.replace(/[^0-9]*$/gi, ''));
};
</script>