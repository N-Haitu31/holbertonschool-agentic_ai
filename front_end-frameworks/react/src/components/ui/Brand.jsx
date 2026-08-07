import { Brain } from 'lucide-react';

function Brand({ className= "" }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div className="bg-violet-500 p-1 rounded-lg text-white text-xs">
                <Brain aria-hidden="true"  />
            </div>
            <span className="text-white font-bold">Agentic AI</span>
        </div>
    )
}
export default Brand
