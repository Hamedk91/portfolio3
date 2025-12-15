import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Design from "./components/Design";
import Contact from "./components/Contact";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="animated-bg"></div>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Design />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;