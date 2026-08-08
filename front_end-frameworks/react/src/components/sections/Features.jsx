import { features } from '../../data/features'
import FeatureCard from '../cards/FeatureCard'
import SectionBadge from '../ui/SectionBadge'

function Features() {
    return (
        <section id="features-section" className="py-24 bg-slate-950">
            <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-left">
                <SectionBadge text="Features" />
                <h2 className="mb-8 text-4xl md:text-5xl font-black tracking-tight leading-none">
                    <span className="block text-white">Everything You Need to Build</span>
                    <span className="block text-violet-300">With powerful AI agents</span>
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <FeatureCard key={feature.title} icon={feature.icon} title={feature.title} description={feature.description} />
                    ))}
                </div>
            </div>
        </section>
    )
}
export default Features
