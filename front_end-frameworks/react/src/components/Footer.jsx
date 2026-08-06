import { Brain, Camera, Music2, X, MonitorPlay } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-slate-800">
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div> {/* Colonne Agentic IA */}
                        <div className="flex items-center gap-2">
                            <div className="bg-violet-500 p-2 rounded-lg text-white">
                                <Brain aria-hidden="true"  />
                            </div>
                            <span className="text-white font-bold">Agentic AI</span>
                        </div>
                        <p>Explore the future of development with Agentic AI.</p>
                        <div className="flex items-center gap-2">
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram"> <Camera /> </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="TikTok"> <Music2 /> </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="X"> <X /> </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="YouTube"> <MonitorPlay /> </a>
                        </div>
                    </div>
                    <div> {/* Colonne Navigation */}
                        <h3 className="">Navigation</h3>
                        <ul>
                            <li><a href="#hero-section">Hero section</a></li>
                            <li><a href="#about-section">About</a></li>
                            <li><a href="#features-section">Features</a></li>
                            <li><a href="#insights-section">Insights</a></li>
                            <li><a href="#contact-section">Contact</a></li>
                        </ul>
                    </div>
                    <div> {/* Colonne Holberton School */}
                        <h3 className="">Holberton School</h3>
                        <ul>
                            <li><a href="https://www.holbertonschool.fr/" target="_blank" rel="noopener noreferrer">About</a></li>
                            <li><a href="https://www.holbertonschool.fr/methodologie" target="_blank" rel="noopener noreferrer">Methodology</a></li>
                            <li><a href="https://www.holbertonschool.fr/a-propos" target="_blank" rel="noopener noreferrer">Story</a></li>
                            <li><a href="https://www.holbertonschool.fr/" target="_blank" rel="noopener noreferrer">Agenda</a></li>
                        </ul>
                    </div>
                    <div> {/* Colonne Curriculum */}
                        <h3 className="">Curriculum</h3>
                        <ul>
                            <li><a href="https://www.holbertonschool.fr/programme/bachelor-ai-augmented-software-engineering/" target="_blank" rel="noopener noreferrer">Bachelor</a></li>
                            <li><a href="https://www.holbertonschool.fr/programme/bachelor-ai-augmented-software-engineering#programme" target="_blank" rel="noopener noreferrer">Program</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer
