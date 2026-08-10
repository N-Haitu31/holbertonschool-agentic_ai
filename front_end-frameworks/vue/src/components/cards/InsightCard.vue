<script setup>
defineProps({
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  index: { type: Number, required: true },
})
</script>

<template>
  <article :class="`group h-80 relative overflow-hidden rounded-xl ${index === 0 ? 'md:col-span-2' : ''}`">
    <img :src="image" :alt="title" class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
    <div class="absolute inset-0 flex flex-col justify-end p-6">
      <span class="self-start mb-2 px-3 py-1 text-xs rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
        {{ category }}
      </span>
      <h3 class="text-xl font-bold text-white mb-3">{{ title }}</h3>
      <p class="text-slate-300">{{ description }}</p>
    </div>
  </article>
</template>
