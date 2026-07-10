import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WeeklyReports } from './components/WeeklyReports';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="min-h-screen bg-brand-slate-950 font-sans selection:bg-brand-blue selection:text-white">
      <Header />
      <main>
        <Hero />
        <WeeklyReports />
        <Projects />
      </main>
      <Footer />
    </div>
    );
}