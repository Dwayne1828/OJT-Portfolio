import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutCompany } from './components/AboutCompany';
import { WeeklyReports } from './components/WeeklyReports';
import { Documents } from './components/Documents';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="min-h-screen bg-brand-slate-950 font-sans selection:bg-brand-blue selection:text-white">
      <Header />
      <main>
        <Hero />
        <AboutCompany />
        <Documents />
        <WeeklyReports />
      </main>
      <Footer />
    </div>
    );
}