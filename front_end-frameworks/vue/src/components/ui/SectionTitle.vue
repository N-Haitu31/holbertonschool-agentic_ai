<script setup>
defineProps({
  line1: { type: String, required: true },
  line2: { type: String, required: true },
})
</script>

<template>
  <h2 class="mb-8 text-4xl md:text-5xl font-black tracking-tight leading-none">
    <span class="block text-white">{{ line1 }}</span>
    <span class="block text-violet-300">{{ line2 }}</span>
  </h2>
</template>
