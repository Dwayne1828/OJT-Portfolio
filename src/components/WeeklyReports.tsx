import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  CalendarDays,
  Sparkles,
  Coffee
} from 'lucide-react';
import { WEEKLY_REPORTS, DayTask } from '../data/portfolioData';

export function WeeklyReports() {
  const [activeWeekIndex, setActiveWeekIndex] = useState(0);
  const currentWeek = WEEKLY_REPORTS[activeWeekIndex];

  // Default selected day to the first working day of the active week
  const initialWorkDay = currentWeek.days.find((d) => d.status === 'work') || currentWeek.days[0];
  const [selectedDayId, setSelectedDayId] = useState<string>(initialWorkDay.id);

  // Find currently selected day object
  const activeDay =
    currentWeek.days.find((d) => d.id === selectedDayId) ||
    currentWeek.days.find((d) => d.status === 'work') ||
    currentWeek.days[0];

  const handleWeekChange = (index: number) => {
    setActiveWeekIndex(index);
    const targetWeek = WEEKLY_REPORTS[index];
    const defaultDay = targetWeek.days.find((d) => d.status === 'work') || targetWeek.days[0];
    setSelectedDayId(defaultDay.id);
  };

  // Overall Statistics across all weeks
  const totalInternshipHours = WEEKLY_REPORTS.reduce((acc, curr) => acc + curr.totalHours, 0);
  const totalWorkDays = WEEKLY_REPORTS.reduce((acc, curr) => acc + curr.workDaysCount, 0);
  const totalSuspensions = WEEKLY_REPORTS.reduce((acc, curr) => acc + curr.suspensionsCount, 0);

  return (
    <section id="reports" className="py-24 bg-brand-slate-900 border-y border-brand-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-brand-slate-800/80 px-3.5 py-1.5 rounded-full border border-brand-slate-700 mb-4">
            <CalendarDays className="w-4 h-4 text-brand-blue" />
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-slate-300">
              Interactive Attendance & Accomplishment Log
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Internship Calendar & Reports
          </h2>
          <p className="text-base md:text-lg text-brand-slate-400 max-w-3xl mx-auto">
            Interactive daily calendar showing duty days, weather/official suspensions, and tasks accomplished. Click on any day container below to inspect its detailed accomplishments.
          </p>
        </div>

        {/* Global Internship Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-brand-slate-950/80 border border-brand-slate-800 p-4 rounded-xl flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white leading-none mb-1">
                {totalInternshipHours} hrs
              </div>
              <div className="text-xs text-brand-slate-400">Total Hours Completed</div>
            </div>
          </div>

          <div className="bg-brand-slate-950/80 border border-brand-slate-800 p-4 rounded-xl flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white leading-none mb-1">
                {totalWorkDays} Days
              </div>
              <div className="text-xs text-brand-slate-400">On-Site Duty Days</div>
            </div>
          </div>

          <div className="bg-brand-slate-950/80 border border-brand-slate-800 p-4 rounded-xl flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-300 leading-none mb-1">
                {totalSuspensions} Days
              </div>
              <div className="text-xs text-brand-slate-400">Official Suspensions</div>
            </div>
          </div>

          <div className="bg-brand-slate-950/80 border border-brand-slate-800 p-4 rounded-xl flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white leading-none mb-1">
                {WEEKLY_REPORTS.length} Weeks
              </div>
              <div className="text-xs text-brand-slate-400">Documented Period</div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Container */}
        <div className="bg-brand-slate-950 border border-brand-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Week Selector Bar */}
          <div className="bg-brand-slate-900/90 border-b border-brand-slate-800 px-4 py-3 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-semibold text-brand-slate-400 uppercase tracking-wider">
                Select Week:
              </span>
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                {WEEKLY_REPORTS.map((week, idx) => {
                  const isActive = activeWeekIndex === idx;
                  return (
                    <button
                      key={week.id}
                      onClick={() => handleWeekChange(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 flex items-center space-x-1.5 flex-shrink-0 ${
                        isActive
                          ? 'bg-brand-blue text-white shadow-md'
                          : 'bg-brand-slate-800/80 text-brand-slate-300 hover:bg-brand-slate-800 hover:text-white border border-brand-slate-700/60'
                      }`}
                    >
                      <span>{week.title}</span>
                      {week.workDaysCount === 1 ? (
                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          1 Day Work
                        </span>
                      ) : (
                        <span
                          className={`text-[10px] px-1.2 py-0.2 rounded ${
                            isActive ? 'text-blue-100' : 'text-brand-slate-400'
                          }`}
                        >
                          {week.totalHours}h
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Week Navigation Arrows */}
            <div className="flex items-center space-x-2 self-end md:self-auto">
              <button
                onClick={() => handleWeekChange(Math.max(0, activeWeekIndex - 1))}
                disabled={activeWeekIndex === 0}
                className="p-1.5 rounded-lg bg-brand-slate-800 text-brand-slate-300 hover:text-white hover:bg-brand-slate-700 disabled:opacity-30 disabled:cursor-not-allowed border border-brand-slate-700"
                aria-label="Previous Week"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-medium text-white px-2">
                {currentWeek.month}
              </span>
              <button
                onClick={() => handleWeekChange(Math.min(WEEKLY_REPORTS.length - 1, activeWeekIndex + 1))}
                disabled={activeWeekIndex === WEEKLY_REPORTS.length - 1}
                className="p-1.5 rounded-lg bg-brand-slate-800 text-brand-slate-300 hover:text-white hover:bg-brand-slate-700 disabled:opacity-30 disabled:cursor-not-allowed border border-brand-slate-700"
                aria-label="Next Week"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Week Summary Banner */}
          <div className="p-4 sm:p-6 bg-brand-slate-900/40 border-b border-brand-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  {currentWeek.title}: {currentWeek.dateRange}
                </h3>
                {currentWeek.workDaysCount === 1 && (
                  <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    <AlertTriangle className="w-3.5 h-3.5 mr-1 text-amber-400" />
                    Shortened Week (Suspensions)
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-brand-slate-400">
                {currentWeek.workDaysCount === 1
                  ? 'Due to multiple government/weather suspensions, duty was only carried out on 1 day this week.'
                  : `Completed ${currentWeek.workDaysCount} duty days (${currentWeek.totalHours} total hours) for this period.`}
              </p>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <div className="px-3 py-1.5 rounded-lg bg-brand-slate-800 border border-brand-slate-700 text-xs font-medium text-white flex items-center space-x-1.5">
                <Briefcase className="w-3.5 h-3.5 text-brand-blue" />
                <span>{currentWeek.workDaysCount} Duty Days</span>
              </div>
              {currentWeek.suspensionsCount > 0 && (
                <div className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs font-medium text-amber-300 flex items-center space-x-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>{currentWeek.suspensionsCount} Suspensions</span>
                </div>
              )}
            </div>
          </div>

          {/* CALENDAR ROW: 5-Day Interactive Containers */}
          <div className="p-4 sm:p-6 border-b border-brand-slate-800 bg-brand-slate-950">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-slate-400">
                Weekly Duty Calendar — Click a day to view accomplishments:
              </span>
              <span className="text-[11px] text-brand-slate-400 hidden sm:inline">
                Highlighted container = Work Day
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              {currentWeek.days.map((day: DayTask) => {
                const isSelected = activeDay.id === day.id;
                const isWork = day.status === 'work';
                const isSuspension = day.status === 'suspension';
                const isOff = day.status === 'off';

                return (
                  <button
                    key={day.id}
                    onClick={() => setSelectedDayId(day.id)}
                    className={`relative p-3.5 rounded-xl text-left transition-all duration-200 flex flex-col justify-between min-h-[115px] group ${
                      isWork
                        ? isSelected
                          ? 'bg-gradient-to-b from-brand-blue/25 to-brand-blue/10 border-2 border-brand-blue shadow-lg shadow-brand-blue/20 ring-2 ring-brand-blue/40'
                          : 'bg-brand-slate-900/90 border-2 border-brand-blue/40 hover:border-brand-blue hover:bg-brand-blue/10 hover:shadow-md hover:shadow-brand-blue/10'
                        : isSuspension
                        ? isSelected
                          ? 'bg-amber-500/15 border-2 border-amber-400 shadow-md ring-1 ring-amber-400/40'
                          : 'bg-brand-slate-900/60 border border-amber-500/30 hover:border-amber-400/70 hover:bg-amber-500/10'
                        : isSelected
                        ? 'bg-brand-slate-800 border-2 border-brand-slate-600 shadow-md'
                        : 'bg-brand-slate-900/40 border border-brand-slate-800 hover:border-brand-slate-700 hover:bg-brand-slate-900/70'
                    }`}
                  >
                    {/* Top Row: Day & Date number */}
                    <div className="flex items-center justify-between w-full mb-2">
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider ${
                          isWork
                            ? isSelected
                              ? 'text-white font-bold'
                              : 'text-brand-blue'
                            : isSuspension
                            ? 'text-amber-400'
                            : 'text-brand-slate-400'
                        }`}
                      >
                        {day.day.slice(0, 3)}
                      </span>
                      <span
                        className={`text-lg font-bold ${
                          isWork
                            ? 'text-white'
                            : isSuspension
                            ? 'text-amber-200'
                            : 'text-brand-slate-400'
                        }`}
                      >
                        {day.dayNumber}
                      </span>
                    </div>

                    {/* Middle / Badge Status Container */}
                    <div className="my-1">
                      {isWork && (
                        <div
                          className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold tracking-wide ${
                            isSelected
                              ? 'bg-brand-blue text-white shadow-sm'
                              : 'bg-brand-blue/20 text-blue-300 border border-brand-blue/40'
                          }`}
                        >
                          <Briefcase className="w-3 h-3 mr-1" />
                          <span>{day.hours}h Work Day</span>
                        </div>
                      )}

                      {isSuspension && (
                        <div className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          <AlertTriangle className="w-2.5 h-2.5 mr-1 text-amber-400" />
                          <span>Suspension</span>
                        </div>
                      )}

                      {isOff && (
                        <div className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-brand-slate-800/80 text-brand-slate-400 border border-brand-slate-700/60">
                          <Coffee className="w-2.5 h-2.5 mr-1 text-brand-slate-400" />
                          <span>Off Day</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Status / Task Count Indicator */}
                    <div className="pt-2 border-t border-brand-slate-800/60 flex items-center justify-between text-[11px]">
                      {isWork ? (
                        <span
                          className={`font-medium ${
                            isSelected ? 'text-white' : 'text-brand-slate-300'
                          }`}
                        >
                          {day.bullets.length} task{day.bullets.length > 1 ? 's' : ''} logged
                        </span>
                      ) : isSuspension ? (
                        <span className="text-amber-400/90 truncate text-[10px]" title={day.statusLabel}>
                          {day.statusLabel || 'Suspended'}
                        </span>
                      ) : (
                        <span className="text-brand-slate-400 text-[10px]">No duty</span>
                      )}

                      {/* Small Active Indicator Dot */}
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SELECTED DAY ACCOMPLISHMENT CARD */}
          <div className="p-5 sm:p-8 bg-brand-slate-950/60">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Active Day Header Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-brand-slate-800 gap-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue">
                        {currentWeek.title} Details
                      </span>
                      <span className="text-brand-slate-600">•</span>
                      <span className="text-xs text-brand-slate-400 font-medium">
                        {activeDay.day}
                      </span>
                    </div>
                    <h4 className="text-2xl font-bold text-white tracking-tight">
                      Accomplishments for {activeDay.date}
                    </h4>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    {activeDay.status === 'work' ? (
                      <div className="inline-flex items-center bg-brand-blue/15 text-blue-300 border border-brand-blue/30 px-3.5 py-1.5 rounded-lg text-sm font-semibold">
                        <Clock className="w-4 h-4 mr-2 text-brand-blue" />
                        <span>{activeDay.hours} Hours Logged</span>
                      </div>
                    ) : activeDay.status === 'suspension' ? (
                      <div className="inline-flex items-center bg-amber-500/15 text-amber-300 border border-amber-500/30 px-3.5 py-1.5 rounded-lg text-sm font-semibold">
                        <AlertTriangle className="w-4 h-4 mr-2 text-amber-400" />
                        <span>{activeDay.statusLabel || 'Official Suspension'}</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center bg-brand-slate-800 text-brand-slate-300 border border-brand-slate-700 px-3.5 py-1.5 rounded-lg text-sm font-semibold">
                        <Coffee className="w-4 h-4 mr-2 text-brand-slate-400" />
                        <span>Scheduled Off</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tasks / Notes Body */}
                {activeDay.status === 'work' ? (
                  <div className="space-y-6">
                    <div>
                      <h5 className="text-base font-semibold text-white flex items-center mb-3">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-brand-blue" />
                        Tasks Completed on this Day
                      </h5>
                      <div className="bg-brand-slate-900/70 border border-brand-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                        {activeDay.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2 mr-3 flex-shrink-0" />
                            <p className="text-sm sm:text-base text-brand-slate-200 leading-relaxed">
                              {bullet}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Deliverables for this Day (or Week) */}
                    {((activeDay.deliverables && activeDay.deliverables.length > 0) ||
                      (currentWeek.deliverables && currentWeek.deliverables.length > 0)) && (
                      <div>
                        <h5 className="text-base font-semibold text-white flex items-center mb-3">
                          <ImageIcon className="w-4 h-4 mr-2 text-brand-slate-400" />
                          Deliverables & Visual Documentation
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {(activeDay.deliverables || currentWeek.deliverables).map((imgUrl, imgIdx) => (
                            <div
                              key={imgIdx}
                              className="relative aspect-video rounded-xl overflow-hidden border border-brand-slate-800 group shadow-md"
                            >
                              <img
                                src={imgUrl}
                                alt={`Deliverable for ${activeDay.date}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                <span className="text-xs font-medium text-white flex items-center">
                                  <Sparkles className="w-3 h-3 mr-1 text-brand-blue" />
                                  Deliverable Preview
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : activeDay.status === 'suspension' ? (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 sm:p-8 text-center max-w-xl mx-auto">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto mb-4 text-amber-400 shadow-md">
                      <AlertTriangle className="w-7 h-7" />
                    </div>
                    <h5 className="text-lg font-bold text-white mb-2">
                      Work Suspended on {activeDay.date}
                    </h5>
                    <p className="text-sm text-amber-200/90 leading-relaxed mb-4">
                      {activeDay.bullets[0]}
                    </p>
                    {activeDay.bullets.slice(1).map((b, idx) => (
                      <p key={idx} className="text-xs text-brand-slate-400 mt-1">
                        {b}
                      </p>
                    ))}
                    <div className="mt-4 pt-4 border-t border-amber-500/20 text-xs text-brand-slate-400">
                      No duty hours were credited or required for this date due to official city/university declarations.
                    </div>
                  </div>
                ) : (
                  <div className="bg-brand-slate-900/40 border border-brand-slate-800 rounded-xl p-6 sm:p-8 text-center max-w-md mx-auto">
                    <div className="w-12 h-12 rounded-xl bg-brand-slate-800 border border-brand-slate-700 flex items-center justify-center mx-auto mb-3 text-brand-slate-400">
                      <Coffee className="w-6 h-6" />
                    </div>
                    <h5 className="text-base font-semibold text-white mb-1">
                      Scheduled Non-Duty Day
                    </h5>
                    <p className="text-xs sm:text-sm text-brand-slate-400">
                      {activeDay.bullets[0] || 'Scheduled rest day per internship agreement schedule.'}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}