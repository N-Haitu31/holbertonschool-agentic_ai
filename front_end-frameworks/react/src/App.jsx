import Header from './components/Header'
import Hero from './sections/Hero'
import About from './sections/About'
import Features from './sections/Features'
import Insights from './sections/Insights'
import Contact from './sections/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main className="pt-18">
        <Hero />
        <About />
        <Features />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
