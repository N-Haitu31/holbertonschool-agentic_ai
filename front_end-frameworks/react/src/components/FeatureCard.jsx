function FeatureCard ({ icon: Icon, title, description}) {
    return (
        <article className="text-left p-8 rounded-3xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40">
            <div className="inline-flex bg-violet-500 p-3 rounded-lg text-white mb-4">
                <Icon />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <p className="text-slate-300">{description}</p>
        </article>
    )
}
export default FeatureCard
