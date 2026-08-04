import { Sparkle, ArrowRight } from 'lucide-react';

function Hero() {
    return (
        <section id="hero-section" className="bg-slate-950 pt-36 pb-24">
            <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
                <span className="mb-8 px-4 py-2 text-xs text-violet-300 rounded-full border border-violet-500/20 bg-violet-500/10 inline-flex items-center gap-2
                "><Sparkle size={14} /> The future of coding <Sparkle size={14} /></span>
                <h1 className="mb-8 text-5xl md:text-7xl font-black tracking-tight leading-none">
                    <span className="block text-white">Build smarter workflows</span>
                    <span className="block text-violet-300">with Agentic AI</span>
                </h1>
                <p className="mb-8 text-slate-300 max-w-2xl mt-6">
                    Create autonomous AI agents that think, plan, and execute complex tasks. Transform your business with intelligent automation.
                </p>
                <div className="flex gap-4">
                    <a href="#" className="text-white px-4 py-2 font-semibold rounded-md inline-flex items-center gap-2 bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/40">
                    Start learning with Holberton School <ArrowRight />
                    </a>
                    <a href="#" className="text-white px-4 py-2 font-semibold rounded-md border border-slate-800 bg-slate-950 hover:bg-slate-900">
                       Methodology 
                    </a>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                    <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40">
                        <p className="text-2xl font-bold text-violet-300">10K+</p>
                        <p className="text-sm text-slate-400">Active agents</p>
                    </div>
                    <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40">
                        <p className="text-2xl font-bold text-violet-300">99.9%</p>
                        <p className="text-sm text-slate-400">Uptime</p>
                    </div>
                    <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40">
                        <p className="text-2xl font-bold text-violet-300">50M+</p>
                        <p className="text-sm text-slate-400">Tasks automated</p>
                    </div>
                    <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40">
                        <p className="text-2xl font-bold text-violet-300">24/7</p>
                        <p className="text-sm text-slate-400">Support</p>
                    </div>
                 </div>
            </div>


        </section>

    )
}
export default Hero
