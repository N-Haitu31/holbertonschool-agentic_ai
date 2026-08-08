import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button'
import SectionBadge from '../ui/SectionBadge';

function Hero() {
    return (
        <section id="hero-section" className="bg-slate-950 pt-36 pb-24">
            <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
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
                    <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40">
                        <p className="text-2xl font-bold text-violet-300">10K+</p>
                        <p className="text-sm text-slate-300">Active agents</p>
                    </div>
                    <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40">
                        <p className="text-2xl font-bold text-violet-300">99.9%</p>
                        <p className="text-sm text-slate-300">Uptime</p>
                    </div>
                    <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40">
                        <p className="text-2xl font-bold text-violet-300">50M+</p>
                        <p className="text-sm text-slate-300">Tasks automated</p>
                    </div>
                    <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40">
                        <p className="text-2xl font-bold text-violet-300">24/7</p>
                        <p className="text-sm text-slate-300">Support</p>
                    </div>
                 </div>
            </div>


        </section>

    )
}
export default Hero
