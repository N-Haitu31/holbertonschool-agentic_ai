<script>
  let {href="#", variant="primary", icon: Icon = null, target="", rel="", text="" } = $props();

  const baseClasses = "text-white px-4 py-2 font-semibold rounded-md"
</script>

<a
  href={href}
  target={target}
  rel={rel}
  class="{baseClasses} {variant === 'primary' ? 'bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/40' : 'border border-slate-800 bg-slate-950 hover:bg-slate-900'} {Icon ? 'inline-flex items-center gap-2' : ''}">
  {text}
  {#if Icon}
    <Icon />
  {/if}
</a>