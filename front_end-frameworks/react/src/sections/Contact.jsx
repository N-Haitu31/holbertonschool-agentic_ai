import { useState } from 'react';
import { UserRound, Mail, MessageSquare, FolderKanban, Users, Sparkle, ArrowRight } from 'lucide-react';

function Contact() {
    const [formData, setFormData] = useState({ fullName: "", email: "", message: "" });
    const [isSending, setIsSending] = (useState(false));
    const [feedbackMessage, setFeedbackMessage] = (useState("Please fill all required fields."));

return (
    <section id="contact-section" className="bg-slate-950 py-24">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
            <span className="mb-8 px-4 py-2 text-xs text-violet-300 rounded-full border border-violet-500/20 bg-violet-500/10 inline-flex items-center gap-2
            "><Sparkle size={14} /> Start your AI journey <Sparkle size={14} /></span>
            <h2 className="mb-8 text-4xl md:text-5xl font-black tracking-tight leading-none">
                <span className="block text-white">Ready to Explore</span>
                <span className="block text-violet-300">Agentic AI?</span>
            </h2>
            <div className="flex gap-4">
                <a href="#" className="text-white px-4 py-2 font-semibold rounded-md inline-flex items-center gap-2 bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/40">
                Enroll at Holberton School <ArrowRight />
                </a>
                <a href="#" className="text-white px-4 py-2 font-semibold rounded-md border border-slate-800 bg-slate-950 hover:bg-slate-900">
                    Need more information? 
                </a>
            </div>
            <div className="flex gap-6 flex-wrap justify-center">
                <div className="inline-flex items-center gap-2">
                    <FolderKanban />
                    <span>Project-based learning</span>
                </div>
                <div className="inline-flex items-center gap-2">
                    <Users />
                    <span>Peer learning environment</span>
                </div>
                <div className="inline-flex items-center gap-2">
                    <Sparkle />
                    <span>AI-powered workflows</span>
                </div>
            </div>
        </div>
    </section>
)