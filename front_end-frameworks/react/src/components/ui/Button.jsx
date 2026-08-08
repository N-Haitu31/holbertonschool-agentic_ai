function Button({href="#", variant="primary", icon:Icon, target="", rel="", text=""}) {
    const baseClasses = "text-white px-4 py-2 font-semibold rounded-md";
    const variantClasses = variant === "primary" ? "bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/40" : "border border-slate-800 bg-slate-950 hover:bg-slate-900";
    return (
        <a href={href} target={target} rel={rel} className={`${baseClasses} ${variantClasses} ${Icon ? 'inline-flex items-center gap-2' : ''}`}> {text} {Icon && <Icon />} </a>
    )
}
export default Button
