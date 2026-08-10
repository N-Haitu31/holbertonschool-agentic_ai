<script setup>
defineProps({
  href: { type: String, default: "#" },
  variant: { type: String, default: "primary" },
  icon: { type: [Object, Function], default: null },
  target: { type: String, default: "" },
  rel: { type: String, default: "" },
  text: { type: String, default: "" },
})

const baseClasses = "text-white px-4 py-2 font-semibold rounded-md"
</script>

<template>
  <a
    :href="href"
    :target="target"
    :rel="rel"
    :class="`${baseClasses} ${variant === 'primary' ? 'bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/40' : 'border border-slate-800 bg-slate-950 hover:bg-slate-900'} ${icon ? 'inline-flex items-center gap-2' : ''}`"
  >
    {{ text }}
    <component :is="icon" v-if="icon" />
  </a>
</template>
