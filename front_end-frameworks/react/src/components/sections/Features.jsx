import { features } from '../../data/features'
import FeatureCard from '../cards/FeatureCard'
import SectionBadge from '../ui/SectionBadge'
import SectionTitle from '../ui/SectionTitle'

function Features() {
    return (
        <section id="features-section" className="py-24 bg-slate-950">
            <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-left">
                <SectionBadge text="Features" />
                <SectionTitle line1="Everything you need to build" line2="With powerful AI agents" /> 
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
