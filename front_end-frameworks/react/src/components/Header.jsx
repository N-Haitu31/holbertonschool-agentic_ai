import { Brain } from 'lucide-react';

function Header() {
    return (
        <header className="fixed top-0 w-full bg-black z-50 py-4">
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-violet-500 p-2 rounded-lg text-white">
                        <Brain aria-hidden="true"  />
                    </div>
                    <span className="text-white font-bold">Agentic AI</span>
                </div>
                <div className="flex items-center gap-8">
                    <nav className="text-slate-300 gap-4 hidden md:flex">
                        <a href="#about-section">About</a>
                        <a href="#features-section">Features</a>
                        <a href="#insights-section">Insights</a>
                        <a href="#contact-section">Contact</a>
                    </nav>
                <a href="#" className="text-white px-4 py-2 font-semibold rounded-md bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/40
">Enroll now</a>
                </div>
            </div>
        </header>
    )
}

export default Header
