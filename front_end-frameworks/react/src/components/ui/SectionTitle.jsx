function SectionTitle ({line1, line2}) {
    return (
            <h2 className="mb-8 text-4xl md:text-5xl font-black tracking-tight leading-none">
                <span className="block text-white">{line1}</span>
                <span className="block text-violet-300">{line2}</span>
            </h2>
    )
}
export default SectionTitle
