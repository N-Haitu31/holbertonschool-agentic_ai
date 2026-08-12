<script>
  let {icon: Icon, title, description} = $props();
</script>

<article class="text-left p-8 rounded-3xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40">
  <div class="inline-flex bg-violet-500 p-3 rounded-lg text-white mb-4">
    <Icon />
  </div>
  <h3 class="text-xl font-bold text-white mb-3">{title}</h3>
  <p class="text-slate-300">{description}</p>
</article>