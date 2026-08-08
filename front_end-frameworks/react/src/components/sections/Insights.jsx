
import { useState, useEffect } from 'react';
import { getInsights } from '../../services/insightsService';
import InsightCard from '../cards/InsightCard';
import SectionBadge from '../ui/SectionBadge';
import SectionTitle from '../ui/SectionTitle';

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
                <SectionBadge text="Insights" />
                <SectionTitle line1="Explore Agentic AI" line2="Through real-world scenes" />
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
