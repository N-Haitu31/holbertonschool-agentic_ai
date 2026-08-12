<script>
import Brand from '../ui/Brand.svelte'
import Button from '../ui/Button.svelte'
</script>

<header class="fixed top-0 w-full bg-black z-50 py-4">
  <div class="max-w-6xl mx-auto px-6 flex items-center justify-between">
    <Brand />
    <div class="flex items-center gap-8">
      <nav class="text-slate-50 gap-4 hidden md:flex">
        <a href="#about-section">About</a>
        <a href="#features-section">Features</a>
        <a href="#insights-section">Insights</a>
        <a href="#contact-section">Contact</a>
      </nav>
      <Button href="#" text="Enroll now" />
    </div>
  </div>
</header>