function StatCard ({value, label}) {
    return (
                    <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40">
                        <p className="text-2xl font-bold text-violet-300">{value}</p>
                        <p className="text-sm text-slate-300">{label}</p>
                    </div>
    )
}
export default StatCard
