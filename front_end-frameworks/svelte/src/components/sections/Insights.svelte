<script>
	import { onMount } from 'svelte';
	import { getInsights } from '../../services/insightsService';
	import InsightCard from '../cards/InsightCard.svelte';
	import SectionBadge from '../ui/SectionBadge.svelte';
	import SectionTitle from '../ui/SectionTitle.svelte';

	/** @type {{category: string, title: string, description: string, image: string}[]} */
	let insights = $state([]);
	let error = $state("");

	onMount(async () => {
  try {
    insights = await getInsights();
  } catch (erreur) {
    console.error(erreur);
    error = "Erreur lors du chargement des données";
  }
	});
</script>

<section id="insights-section" class="bg-slate-950 py-24">
<div class="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
	<SectionBadge text="Insights" />
	<SectionTitle line1="Explore Agentic AI" line2="Through real-world scenes" />
	{#if error} 
	<p class="text-red-400 mb-8">{error}</p>
	{/if}
	<div class="w-full grid md:grid-cols-3 gap-8">  
			{#each insights as insight, index (index)}
					<InsightCard category={insight.category} title={insight.title} description={insight.description} image={insight.image} index={index}></InsightCard>
			{/each}
	</div>
</div>
</section>