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
  Coffee
} from 'lucide-react';
import { WEEKLY_REPORTS, DayTask } from '../data/portfolioData';

interface DayImageCarouselProps {
  images: string[];
  dayDate: string;
}

function DayImageCarousel({ images, dayDate }: DayImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const hasMultiple = images.length >= 2;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full aspect-video sm:aspect-[16/10] rounded-xl overflow-hidden border border-brand-slate-800 bg-brand-slate-900 group shadow-lg">
      <img
        src={images[currentIndex]}
        alt={`Accomplishment visual for ${dayDate} (${currentIndex + 1} of ${images.length})`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Subtle bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

      {/* Bottom info banner */}
      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        <span className="text-xs font-medium text-white/95 flex items-center bg-brand-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 shadow-sm">
          <ImageIcon className="w-3.5 h-3.5 mr-1.5 text-brand-blue" />
          Deliverable {hasMultiple ? `${currentIndex + 1} of ${images.length}` : ''}
        </span>
        {hasMultiple && (
          <span className="text-xs font-semibold text-brand-blue bg-brand-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 shadow-sm">
            {currentIndex + 1} / {images.length}
          </span>
        )}
      </div>

      {/* ONLY show <prev and next> button in case two or more images are uploaded per day */}
      {hasMultiple && (
        <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none z-20">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Image"
            className="pointer-events-auto px-2.5 py-1.5 rounded-lg bg-brand-slate-950/85 hover:bg-brand-blue text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-all hover:scale-105 shadow-xl flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev</span>
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Image"
            className="pointer-events-auto px-2.5 py-1.5 rounded-lg bg-brand-slate-950/85 hover:bg-brand-blue text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-all hover:scale-105 shadow-xl flex items-center gap-1 cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export function WeeklyReports() {
  const [activeWeekIndex, setActiveWeekIndex] = useState(0);
  const currentWeek = WEEKLY_REPORTS[activeWeekIndex];

  const MONTH_GROUPS = ['July 2026', 'August 2026', 'September 2026'];
  const [selectedMonth, setSelectedMonth] = useState<string>(currentWeek.monthGroup || 'July 2026');

  const handleWeekChange = (index: number) => {
    setActiveWeekIndex(index);
    const targetWeek = WEEKLY_REPORTS[index];
    if (targetWeek.monthGroup !== selectedMonth) {
      setSelectedMonth(targetWeek.monthGroup);
    }
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    const targetWeekIdx = WEEKLY_REPORTS.findIndex((w) => w.monthGroup === month);
    if (targetWeekIdx !== -1) {
      handleWeekChange(targetWeekIdx);
    }
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
            Comprehensive weekly log showing daily tasks, duty hours, and visual deliverables.
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
          {/* Header Banner: Title, Prev/Next Week Buttons & Month Dropdown */}
          <div className="p-4 sm:p-6 bg-brand-slate-900/90 border-b border-brand-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  {currentWeek.title}: {currentWeek.dateRange}
                </h3>
                {currentWeek.workDaysCount === 1 && (
                  <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    <AlertTriangle className="w-3.5 h-3.5 mr-1 text-amber-400" />
                    Shortened Week (Suspensions)
                  </span>
                )}
              </div>

              {currentWeek.workDaysCount === 1 && (
                <p className="text-xs sm:text-sm text-amber-300/90 mb-2">
                  Due to multiple government/weather suspensions, duty was only carried out on 1 day this week.
                </p>
              )}

              {/* Prev and Next Week Buttons Under the Text */}
              <div className="flex items-center space-x-2.5 mt-3">
                <button
                  type="button"
                  onClick={() => handleWeekChange(Math.max(0, activeWeekIndex - 1))}
                  disabled={activeWeekIndex === 0}
                  className="px-3.5 py-1.5 rounded-lg bg-brand-slate-800 text-brand-slate-200 hover:text-white hover:bg-brand-slate-700 disabled:opacity-30 disabled:cursor-not-allowed border border-brand-slate-700 text-xs font-medium flex items-center transition-colors shadow-sm cursor-pointer"
                  aria-label="Previous Week"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous Week
                </button>
                <button
                  type="button"
                  onClick={() => handleWeekChange(Math.min(WEEKLY_REPORTS.length - 1, activeWeekIndex + 1))}
                  disabled={activeWeekIndex === WEEKLY_REPORTS.length - 1}
                  className="px-3.5 py-1.5 rounded-lg bg-brand-slate-800 text-brand-slate-200 hover:text-white hover:bg-brand-slate-700 disabled:opacity-30 disabled:cursor-not-allowed border border-brand-slate-700 text-xs font-medium flex items-center transition-colors shadow-sm cursor-pointer"
                  aria-label="Next Week"
                >
                  Next Week
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
                <span className="text-xs text-brand-slate-400 pl-2">
                  Week {activeWeekIndex + 1} of {WEEKLY_REPORTS.length}
                </span>
              </div>
            </div>

            {/* Right: Month Dropdown & Duty Statistics */}
            <div className="flex flex-wrap items-center gap-3 shrink-0 self-start md:self-center">
              {/* Month Dropdown */}
              <div className="flex items-center space-x-2">
                <label htmlFor="month-dropdown" className="text-xs font-semibold text-brand-slate-400 uppercase tracking-wider">
                  Month:
                </label>
                <select
                  id="month-dropdown"
                  value={selectedMonth}
                  onChange={(e) => handleMonthChange(e.target.value)}
                  className="bg-brand-slate-800 border border-brand-slate-700 text-white text-xs font-medium rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-blue cursor-pointer shadow-sm hover:border-brand-slate-600 transition-colors"
                >
                  {MONTH_GROUPS.map((month) => (
                    <option key={month} value={month} className="bg-brand-slate-900 text-white">
                      {month}
                    </option>
                  ))}
                </select>
              </div>

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

          {/* TWO-COLUMN WEEKLY ACCOMPLISHMENTS LIST */}
          <div className="p-4 sm:p-6 lg:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentWeek.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {currentWeek.days.map((day: DayTask) => {
                  const deliverables = day.deliverables || [];
                  const hasImages = deliverables.length > 0;
                  const isWork = day.status === 'work';
                  const isSuspension = day.status === 'suspension';

                  return (
                    <div
                      key={day.id}
                      className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                        isWork
                          ? 'bg-brand-slate-900/70 border-brand-slate-800 hover:border-brand-slate-700/80 shadow-md'
                          : isSuspension
                          ? 'bg-amber-500/5 border-amber-500/20'
                          : 'bg-brand-slate-900/30 border-brand-slate-800/50'
                      }`}
                    >
                      <div className={`grid grid-cols-1 ${hasImages ? 'lg:grid-cols-12 gap-6' : 'gap-4'} items-start`}>
                        {/* LEFT COLUMN: Text Content */}
                        <div className={hasImages ? 'lg:col-span-7 space-y-4' : 'lg:col-span-12 space-y-4'}>
                          {/* Day Header & Status Badge */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-brand-slate-800/80">
                            <div className="flex items-center space-x-2.5">
                              <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                                {day.day}
                              </span>
                              <span className="text-brand-slate-500">•</span>
                              <span className="text-sm font-semibold text-brand-slate-200">
                                {day.date}
                              </span>
                            </div>

                            <div>
                              {isWork ? (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-blue/15 text-blue-300 border border-brand-blue/30">
                                  <Clock className="w-3.5 h-3.5 mr-1.5 text-brand-blue" />
                                  {day.hours} Hours Logged
                                </span>
                              ) : isSuspension ? (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                                  <AlertTriangle className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                                  {day.statusLabel || 'Official Suspension'}
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-slate-800 text-brand-slate-400 border border-brand-slate-700">
                                  <Coffee className="w-3.5 h-3.5 mr-1.5 text-brand-slate-400" />
                                  Scheduled Off
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Day Tasks / Accomplishment Text */}
                          {isWork ? (
                            <div className="space-y-2.5 pt-1">
                              <h5 className="text-xs font-semibold uppercase tracking-wider text-brand-slate-400 flex items-center">
                                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-brand-blue" />
                                Tasks Accomplished
                              </h5>
                              <div className="space-y-2">
                                {day.bullets.map((bullet, bIdx) => (
                                  <div key={bIdx} className="flex items-start">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2 mr-3 flex-shrink-0" />
                                    <p className="text-sm text-brand-slate-200 leading-relaxed">
                                      {bullet}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : isSuspension ? (
                            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mt-2">
                              <div className="flex items-start space-x-3">
                                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                                <div>
                                  <h5 className="text-sm font-semibold text-amber-200 mb-1">
                                    Work Suspended
                                  </h5>
                                  {day.bullets.map((b, idx) => (
                                    <p key={idx} className="text-xs text-amber-300/90 leading-relaxed">
                                      {b}
                                    </p>
                                  ))}
                                  <p className="text-[11px] text-brand-slate-400 mt-2">
                                    No duty hours required on this date due to official weather/administrative declarations.
                                  </p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-xs text-brand-slate-400 italic pt-1">
                              {day.bullets[0] || 'Scheduled non-duty day per internship work schedule.'}
                            </div>
                          )}
                        </div>

                        {/* RIGHT COLUMN: Deliverable Image / Carousel */}
                        {hasImages && (
                          <div className="lg:col-span-5 w-full">
                            <DayImageCarousel images={deliverables} dayDate={day.date} />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}