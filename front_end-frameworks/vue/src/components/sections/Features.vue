<script setup>
import { features } from '../../data/features'
import FeatureCard from '../cards/FeatureCard.vue'
import SectionBadge from '../ui/SectionBadge.vue'
import SectionTitle from '../ui/SectionTitle.vue'
</script>

<template>
  <section id="features-section" class="py-24 bg-slate-950">
    <div class="max-w-6xl mx-auto px-6 flex flex-col items-center text-left">
      <SectionBadge text="Features" />
      <SectionTitle line1="Everything you need to build" line2="With powerful AI agents" />
      <div class="grid md:grid-cols-3 gap-8">
        <FeatureCard
          v-for="feature in features"
          :key="feature.title"
          :icon="feature.icon"
          :title="feature.title"
          :description="feature.description"
        />
      </div>
    </div>
  </section>
</template>
