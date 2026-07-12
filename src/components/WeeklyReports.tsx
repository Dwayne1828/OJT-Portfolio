import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Image as ImageIcon } from
'lucide-react';
import { WEEKLY_REPORTS } from '../data/portfolioData';
export function WeeklyReports() {
  const [activeWeek, setActiveWeek] = useState(WEEKLY_REPORTS[0].id);
  const currentReport =
  WEEKLY_REPORTS.find((r) => r.id === activeWeek) || WEEKLY_REPORTS[0];
  return (
    <section
      id="reports"
      className="py-24 bg-brand-slate-900 border-y border-brand-slate-800">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Weekly Reports Dashboard
          </h2>
          <p className="text-lg text-brand-slate-400 max-w-2xl mx-auto">
            A comprehensive log of my tasks, learnings, and deliverables
            throughout the internship period.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Button Grid */}
          <div className="lg:w-1/4">
            <div className="bg-brand-slate-950 p-4 border border-brand-slate-800 sticky top-24">
              <h3 className="text-lg font-semibold text-white mb-4 px-2">
                Timeline
              </h3>
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar">
                {WEEKLY_REPORTS.map((report) =>
                <button
                  key={report.id}
                  onClick={() => setActiveWeek(report.id)}
                  className={`flex-shrink-0 lg:w-full text-left px-4 py-3 rounded-md transition-all duration-200 font-medium ${activeWeek === report.id ? 'bg-brand-blue text-white' : 'bg-brand-slate-800 text-brand-slate-400 hover:text-white hover:bg-brand-slate-700 border border-brand-slate-700'}`}>
                  
                    {report.title}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="lg:w-3/4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeWeek}
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  y: -20
                }}
                transition={{
                  duration: 0.3
                }}
                className="bg-brand-slate-950 border border-brand-slate-800 overflow-hidden">
                
                {/* Card Header */}
                <div className="bg-brand-slate-900 border-b border-brand-slate-800 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {currentReport.title}
                    </h3>
                    <div className="flex items-center text-brand-slate-400">
                      <Calendar className="w-4 h-4 mr-2 text-brand-blue" />
                      <span>{currentReport.dateRange}</span>
                    </div>
                  </div>
                  <div className="flex items-center bg-brand-slate-800 px-4 py-2 rounded-md border border-brand-slate-700">
                    <Clock className="w-5 h-5 mr-2 text-brand-maroon" />
                    <span className="font-semibold text-white">
                      {currentReport.hours} Hours
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 md:p-8 space-y-8">
                  {/* Objectives / Tasks */}
                  <div>
                    <h4 className="text-lg font-semibold text-white flex items-center mb-4">
                      <CheckCircle2 className="w-5 h-5 mr-2 text-brand-blue" />
                      Tasks Accomplished
                    </h4>
                    <div className="space-y-4">
                      {currentReport.tasksByDay.map((dayTask, idx) =>
                      <div key={idx} className="rounded-lg border border-brand-slate-800 bg-brand-slate-900/50 p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <h5 className="text-md font-semibold text-white">{dayTask.day}</h5>
                            <span className="text-sm text-brand-slate-400">• {dayTask.date}</span>
                          </div>
                          <ul className="space-y-2">
                            {dayTask.bullets.map((bullet, bulletIdx) =>
                            <li key={bulletIdx} className="flex items-start">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2 mr-3 flex-shrink-0"></span>
                                <span className="text-brand-slate-400">{bullet}</span>
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <h4 className="text-lg font-semibold text-white flex items-center mb-4">
                      <ImageIcon className="w-5 h-5 mr-2 text-brand-slate-400" />
                      Deliverables & Documentation
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {currentReport.deliverables.map((img, idx) =>
                      <div
                        key={idx}
                        className="relative aspect-video overflow-hidden border border-brand-slate-800 group">
                        
                          <img
                          src={img}
                          alt={`Deliverable ${idx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>);

}