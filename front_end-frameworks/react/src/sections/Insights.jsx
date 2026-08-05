
import { useState, useEffect } from 'react';
import { getInsights } from '../services/insightsService';
import InsightCard from '../components/InsightCard';
import { Sparkle } from 'lucide-react';

function Insights () {
    const [insights, setInsights] = useState ([]) ;
    const [error, setError] = useState("");

useEffect(() => {
  async function chargerDonnees() {
    try {
      const resultat = await getInsights();
        setInsights(resultat);
    }  catch (erreur) {
       console.error(erreur);
       setError("Erreur lors du chargement des données");
    }
  }

  chargerDonnees();
   }, [])
 
  return (
    <section id="insights-section" className="bg-slate-950 py-24">
            <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
                <span className="mb-8 px-4 py-2 text-xs text-violet-300 rounded-full border border-violet-500/20 bg-violet-500/10 inline-flex items-center gap-2
                "><Sparkle size={14} /> Insights <Sparkle size={14} /></span>
                <h2 className="mb-8 text-4xl md:text-5xl font-black tracking-tight leading-none">
                    <span className="block text-white">Explore Agentic AI</span>
                    <span className="block text-violet-300">Through real-world scenes</span>
                </h2>
                {error && <p className="text-red-400 mb-8">{error}</p>}
                <div className="w-full grid md:grid-cols-3 gap-8">
                    {insights.map((insight, index) => (
                        <InsightCard
                            key={index}
                            category={insight.category}
                            title={insight.title}
                            description={insight.description}
                            image={insight.image}
                            index={index}
                            />
                    ))}
                </div>
            </div>
    </section>
  )
}
export default Insights
