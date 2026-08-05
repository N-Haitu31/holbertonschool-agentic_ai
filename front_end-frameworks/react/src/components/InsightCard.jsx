function InsightCard ({ category, title, description, image, index }) {
    return (
        <article className="h-80 relative overflow-hidden rounded-xl">
            <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="self-start mb-2 px-3 py-1 text-xs rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
                    {category}
                </span>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-slate-300">{description}</p>
            </div>
        </article>
    )
}