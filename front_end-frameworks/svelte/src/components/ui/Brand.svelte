<script>
  import { Brain } from '@lucide/svelte'

  let { className = "" } = $props();
</script>

<div class="flex items-center gap-2 {className}">
  <div class="bg-violet-500 p-1 rounded-lg text-white text-xs">
    <Brain aria-hidden="true" />
  </div>
  <span class="text-white font-bold">Agentic AI</span>
</div>
