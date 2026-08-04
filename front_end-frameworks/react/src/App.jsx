import { Rocket } from 'lucide-react'
import Header from './components/Header'

function App() {
  return (
    <>
      <div className="pt-20">
        <Header />
        <h1 className="text-4xl font-bold">
          <Rocket />
          fullstack-agentic-ia
        </h1>
        <h2 className="text-xl text-gray-500">
          Welcome
        </h2>
      </div>
    </>
  )
}

export default App
