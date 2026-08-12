<script>
	import { features } from "../../data/features";
	import FeatureCard from "../cards/FeatureCard.svelte";
	import SectionBadge from "../ui/SectionBadge.svelte";
	import SectionTitle from "../ui/SectionTitle.svelte";
</script>

  <section id="features-section" class="py-24 bg-slate-950">
    <div class="max-w-6xl mx-auto px-6 flex flex-col items-center text-left">
      <SectionBadge text="Features" />
      <SectionTitle line1="Everything you need to build" line2="With powerful AI agents" />
      <div class="grid md:grid-cols-3 gap-8">
        {#each features as feature (feature.title)}
					<FeatureCard icon={feature.icon} title={feature.title} description={feature.description} />
				{/each}
			</div>
    </div>
  </section>