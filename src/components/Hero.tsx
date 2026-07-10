import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, GraduationCap, User } from 'lucide-react';
export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-brand-slate-950">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut'
            }}>
            
            <div className="inline-flex items-center space-x-2 bg-brand-slate-800 px-4 py-2 rounded-md border border-brand-slate-700 mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-blue"></span>
              <span className="text-sm font-medium text-brand-slate-400">
                BSCPE 2-6
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-4">
              Hi, I'm <span className="text-brand-blue">Dwayne Barrameda</span>
            </h1>

            <p className="text-xl md:text-2xl text-brand-slate-400 mb-8 max-w-2xl mx-auto md:mx-0 font-light">
              Incoming 3rd Year Computer Engineering Student at Polytechnic University of the Philippines.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-10">
              <div className="flex items-center text-brand-slate-200 bg-brand-slate-800 border border-brand-slate-700 px-4 py-3 rounded-md w-full sm:w-auto">
                <Briefcase className="w-5 h-5 text-brand-blue mr-3" />
                <span className="font-medium">Weekly Report</span>
              </div>
              <div className="flex items-center text-brand-slate-200 bg-brand-slate-800 border border-brand-slate-700 px-4 py-3 rounded-md w-full sm:w-auto">
                <GraduationCap className="w-5 h-5 text-brand-maroon mr-3" />
                <span className="font-medium">
                  Polytechnic University of the Philippines
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <button
                onClick={() =>
                document.querySelector('#reports')?.scrollIntoView({
                  behavior: 'smooth'
                })
                }
                className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-4 rounded-md font-medium transition-all duration-200 flex items-center group w-full sm:w-auto justify-center">
                  
                View Weekly Reports
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() =>
                document.querySelector('#projects')?.scrollIntoView({
                  behavior: 'smooth'
                })
                }
                className="bg-transparent hover:bg-brand-slate-800 text-white border border-brand-slate-700 px-8 py-4 rounded-md font-medium transition-all duration-200 w-full sm:w-auto justify-center">
                
                See Projects
              </button>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 hidden lg:flex justify-center"
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              delay: 0.3,
              duration: 0.6
            }}>
            
            <div className="relative w-80 h-80 xl:w-96 xl:h-96">
              <div className="absolute inset-0 bg-brand-slate-800 border border-brand-slate-700 overflow-hidden flex items-center justify-center">
                <User className="w-32 h-32 text-brand-slate-700" />
                {/* Replace with actual image if available */}
                {/* <img src="YOUR_IMAGE_URL" alt="Juan Dela Cruz" className="w-full h-full object-cover" /> */}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}