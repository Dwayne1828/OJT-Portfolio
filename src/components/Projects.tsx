import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code2 } from 'lucide-react';
import { PROJECTS, CATEGORIES } from '../data/portfolioData';
export function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filteredProjects =
  activeCategory === 'All' ?
  PROJECTS :
  PROJECTS.filter((p) => p.category === activeCategory);
  return (
    <section id="projects" className="py-24 bg-brand-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Projects & Skills Showcase
          </h2>
          <p className="text-lg text-brand-slate-400 max-w-2xl mx-auto">
            A collection of technical projects, tools built, and programming
            milestones achieved during the internship.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((category) =>
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${activeCategory === category ? 'bg-brand-blue text-white' : 'bg-brand-slate-800 text-brand-slate-400 hover:text-white hover:bg-brand-slate-700 border border-brand-slate-700'}`}>
            
              {category}
            </button>
          )}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <AnimatePresence>
            {filteredProjects.map((project) =>
            <motion.div
              key={project.id}
              layout
              initial={{
                opacity: 0,
                scale: 0.95
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              exit={{
                opacity: 0,
                scale: 0.95
              }}
              transition={{
                duration: 0.3
              }}
              className="bg-brand-slate-900 overflow-hidden border border-brand-slate-800 hover:border-brand-slate-700 transition-colors duration-200 group flex flex-col">
              
                <div className="relative h-48 overflow-hidden">
                  <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                
                  <div className="absolute top-4 right-4 bg-brand-slate-950/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-brand-blue border border-brand-slate-700">
                    {project.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-blue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-brand-slate-400 text-sm mb-6 flex-1">
                    {project.description}
                  </p>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) =>
                    <span
                      key={tag}
                      className="flex items-center text-xs font-medium text-brand-slate-400 bg-brand-slate-800 px-2.5 py-1 rounded-md">
                      
                          <Code2 className="w-3 h-3 mr-1 opacity-70" />
                          {tag}
                        </span>
                    )}
                    </div>

                    <button className="w-full py-2.5 rounded-md border border-brand-slate-700 text-white font-medium text-sm hover:bg-brand-slate-800 transition-colors flex items-center justify-center group/btn">
                      View Details
                      <ExternalLink className="w-4 h-4 ml-2 text-brand-slate-400 group-hover/btn:text-brand-blue transition-colors" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 &&
        <div className="text-center py-20">
            <p className="text-brand-slate-400 text-lg">
              No projects found in this category.
            </p>
          </div>
        }
      </div>
    </section>);

}