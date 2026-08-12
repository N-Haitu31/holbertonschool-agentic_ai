<script>
import { steps } from '../../data/steps'
import SectionBadge from '../ui/SectionBadge.svelte'
import SectionTitle from '../ui/SectionTitle.svelte'
</script>

<section id="about-section" class="bg-slate-950 py-24">
	<div class="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
		<SectionBadge text="What is Agentic AI?" />
		<SectionTitle line1="AI that does more than answer" line2="It acts with purpose" />
		<p class="mb-8 text-sm md:text-base text-slate-300 max-w-3xl">
			Agentic AI refers to artificial intelligence systems designed to pursue goals, make decisions, use tools, and adapt their actions across multiple steps. Instead of only responding to a single prompt, an AI agent can break down a task, plan a strategy, execute actions, evaluate results, and continue until the objective is reached.
		</p>
		<div class="grid md:grid-cols-2 gap-8">
			<div class="flex flex-col justify-center text-left p-6 rounded-xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40">
				<h3 class="mb-3 font-bold text-white">Traditional AI</h3>
				<p class="mb-8 text-sm text-slate-300">Responds to direct instructions, generates content, answers questions, or analyzes information within a limited interaction</p>
				<hr class="mb-8 border-slate-800" />
				<h3 class="mb-3 font-bold text-violet-300">Agentic AI</h3>
				<p class="text-sm text-slate-300">Understands a goal, chooses actions, uses external tools, follows a plan, and adjusts its behavior based on feedback.</p>
			</div>
			<div class="text-left flex flex-col gap-6">
			{#each steps as step (step.number)}
				<div class="flex items-start gap-4">
					<p class="bg-violet-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{step.number}</p>
					<div>
						<p class="font-bold text-white">{step.title}</p>
						<p class="text-sm md:text-base text-slate-300">{step.description}</p>
					</div>
				</div>
			{/each}
			</div>
		</div>
	</div>
</section>