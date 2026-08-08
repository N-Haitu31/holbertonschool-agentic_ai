import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button'
import SectionBadge from '../ui/SectionBadge';
import StatCard from '../cards/StatCard';

function Hero() {
    return (
        <section id="hero-section" className="relative bg-slate-950 pt-36 pb-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.3),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30"></div>
                <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center relative z-10">
                    <SectionBadge text="The future of coding" />
                    <h1 className="mb-8 text-5xl md:text-7xl font-black tracking-tight leading-none">
                        <span className="block text-white">Build smarter workflows</span>
                        <span className="block text-violet-300">with Agentic AI</span>
                    </h1>
                    <p className="mb-8 text-slate-300 max-w-2xl mt-6">
                        Create autonomous AI agents that think, plan, and execute complex tasks. Transform your business with intelligent automation.
                    </p>
                    <div className="flex gap-4">
                    <Button href="#" text="Start learning with Holberton School" icon={ArrowRight} />
                    <Button href="#" text="Methodology" variant="secondary" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                        <StatCard value="10K+" label="Active agents" />
                        <StatCard value="99.9%" label="Uptime" />
                        <StatCard value="50M+" label="Tasks automated" />
                        <StatCard value="24/7" label="Support" />
                    </div>
                </div>
        </section>
    )
}
export default Hero
