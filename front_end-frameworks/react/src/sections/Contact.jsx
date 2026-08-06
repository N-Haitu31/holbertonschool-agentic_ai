import { useState } from 'react';
import { UserRound, Mail, MessageSquare, FolderKanban, Users, Sparkle, ArrowRight } from 'lucide-react';

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function Contact() {
    const [formData, setFormData] = useState({ fullName: "", email: "", message: "" });
    const [isSending, setIsSending] = (useState(false));
    const [feedbackMessage, setFeedbackMessage] = (useState("Please fill all required fields."));

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }
    async function handleSubmit(event) {
    event.preventDefault();
    setIsSending(true);
    setFeedbackMessage("Sending message...");
    await delay(1500);
    setFeedbackMessage("Your message has been sent successfully.");
    setFormData({ fullName: "", email: "", message: "" });
    setIsSending(false);
    await delay(3000);
    setFeedbackMessage("Please fill all required fields.");
    }

    const isFullNameValid = formData.fullName.trim().length >= 2;
    const isEmailValid = formData.email.includes('@') && formData.email.includes('.');
    const isMessageValid = formData.message.trim().length >= 10;
    const isFormValid = isFullNameValid && isEmailValid && isMessageValid;

return (
    <section id="contact-section" className="bg-slate-950 py-24">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
            <span className="mb-8 px-4 py-2 text-xs text-violet-300 rounded-full border border-violet-500/20 bg-violet-500/10 inline-flex items-center gap-2
            "><Sparkle size={14} /> Start your AI journey <Sparkle size={14} /></span>
            <h2 className="mb-8 text-4xl md:text-5xl font-black tracking-tight leading-none">
                <span className="block text-white">Ready to Explore</span>
                <span className="block text-violet-300">Agentic AI?</span>
            </h2>
            <div className="flex gap-4 mb-8">
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-white px-4 py-2 font-semibold rounded-md inline-flex items-center gap-2 bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/40">
                Enroll at Holberton School <ArrowRight />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-white px-4 py-2 font-semibold rounded-md border border-slate-800 bg-slate-950 hover:bg-slate-900">
                    Need more information? 
                </a>
            </div>
            <div className="mb-8 flex gap-6 flex-wrap justify-center">
                <div className="text-violet-500 inline-flex items-center gap-2">
                    <FolderKanban />
                    <span className="text-sm text-slate-300">Project-based learning</span>
                </div>
                <div className="text-violet-500 inline-flex items-center gap-2">
                    <Users />
                    <span className="text-sm text-slate-300">Peer learning environment</span>
                </div>
                <div className="text-violet-500 inline-flex items-center gap-2">
                    <Sparkle />
                    <span className="text-sm text-slate-300">AI-powered workflows</span>
                </div>
            </div>
            <form autoComplete="off" onSubmit={handleSubmit} className="w-full max-w-md p-8 rounded-2xl border border-slate-800 bg-slate-900/50 mt-8">
                <div className="mb-6 w-full">
                    <label htmlFor="fullName" className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                        <UserRound className="text-violet-500" size={16} />
                        <span>Full name</span>
                    </label>
                    <input placeholder="Your full name..." id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className={`w-full px-4 py-2 rounded-md border border-slate-800 placeholder:text-slate-500 ${isFullNameValid ? 'focus:border-violet-500' : 'focus:border-red-500'} bg-black text-slate-50 focus:outline-none`} />
                </div>
                <div className="mb-6 w-full">
                    <label htmlFor="email" className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                        <Mail className="text-violet-500" size={16} />
                        <span>Email</span>
                    </label>
                    <input placeholder="you@example..." id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={`w-full px-4 py-2 rounded-md border border-slate-800 placeholder:text-slate-500 ${isEmailValid ? 'focus:border-violet-500' : 'focus:border-red-500'} bg-black text-slate-50 focus:outline-none`} />
                </div>
                <div className="mb-6 w-full">
                    <label htmlFor="message" className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                        <MessageSquare className="text-violet-500" size={16} />
                        <span>Message</span>
                    </label>
                    <textarea placeholder="Tell us about your project or learning goals!" id="message" name="message" rows="4" value={formData.message} onChange={handleChange} className={`placeholder:text-slate-500 w-full px-4 py-2 rounded-md border border-slate-800 bg-black ${isMessageValid ? 'focus:border-violet-500' : 'focus:border-red-500'}  text-slate-50 focus:outline-none`} />
                </div>
                <button
                    type="submit"
                    disabled={!isFormValid || isSending}
                    className="w-full mt-4 px-4 py-2 font-semibold rounded-md bg-violet-500 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed text-white">
                    {isSending ? "Sending..." : "Send message"}
                </button>
                <p className="text-sm text-slate-400 mt-4">{feedbackMessage}</p>
   
            </form>
        </div>

    </section>
)
}

export default Contact;
