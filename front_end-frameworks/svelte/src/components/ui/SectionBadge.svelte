<script>
  import { Sparkle } from "@lucide/svelte";

  let { text } = $props();
</script>

<span class="mb-8 px-4 py-2 text-xs text-violet-300 rounded-full border border-violet-500/20 bg-violet-500/10 inline-flex items-center gap-2">
  <Sparkle size={14} /> {text} <Sparkle size={14} />
</span>
