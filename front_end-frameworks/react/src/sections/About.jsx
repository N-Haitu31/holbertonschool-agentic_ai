import { steps } from '../data/steps'
import { Sparkle } from 'lucide-react';

function About() {
    return (
        <section id="about-section" className="bg-slate-950 py-24">
            <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
                <span className="mb-8 px-4 py-2 text-xs text-violet-300 rounded-full border border-violet-500/20 bg-violet-500/10 inline-flex items-center gap-2
                "><Sparkle size={14} /> What is Agentic AI? <Sparkle size={14} /></span>
                <h2 className="mb-8 text-4xl md:text-5xl font-black tracking-tight leading-none">
                    <span className="block text-white">AI that does more than answer</span>
                    <span className="block text-violet-300">It acts with purpose</span>
                </h2>
                <p className="text-sm md:text-base text-slate-300 max-w-3xl">
                Agentic AI refers to artificial intelligence systems designed to pursue goals, make decisions, use tools, and adapt their actions across multiple steps. Instead of only responding to a single prompt, an AI agent can break down a task, plan a strategy, execute actions, evaluate results, and continue until the objective is reached.    
                </p>
                <div className="text-left max-w-xl mx-auto flex flex-col gap-6">
                    {steps.map((step) => (
                    <div className="flex items-start gap-4" key={step.number}>
                        <p className="bg-violet-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{step.number}</p>
                        <div>
                            <p className="font-bold text-white">{step.title}</p>
                            <p className="text-sm md:text-base text-slate-300">{step.description}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default About
