<script setup>
import { ref, onMounted } from 'vue'
import { getInsights } from '../../services/insightsService'
import InsightCard from '../cards/InsightCard.vue'
import SectionBadge from '../ui/SectionBadge.vue'
import SectionTitle from '../ui/SectionTitle.vue'

const insights = ref([])
const error = ref("")

onMounted(async () => {
  try {
    const resultat = await getInsights()
    insights.value = resultat
  } catch (erreur) {
    console.error(erreur)
    error.value = "Erreur lors du chargement des données"
  }
})
</script>

<template>
  <section id="insights-section" class="bg-slate-950 py-24">
    <div class="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
      <SectionBadge text="Insights" />
      <SectionTitle line1="Explore Agentic AI" line2="Through real-world scenes" />
      <p v-if="error" class="text-red-400 mb-8">{{ error }}</p>
      <div class="w-full grid md:grid-cols-3 gap-8">
        <InsightCard
          v-for="(insight, index) in insights"
          :key="index"
          :category="insight.category"
          :title="insight.title"
          :description="insight.description"
          :image="insight.image"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>
