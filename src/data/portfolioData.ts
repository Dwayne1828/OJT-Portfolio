export interface DayTask {
  id: string;
  day: string;
  date: string;
  isoDate: string;
  dayNumber: number;
  status: 'work' | 'suspension' | 'holiday' | 'off';
  statusLabel?: string;
  hours: number;
  bullets: string[];
  deliverables?: string[];
}

export interface WeeklyReport {
  id: string;
  weekNumber: number;
  title: string;
  dateRange: string;
  month: string;
  monthGroup: string;
  totalHours: number;
  workDaysCount: number;
  suspensionsCount: number;
  days: DayTask[];
  deliverables: string[];
}

// ============================================================================
// 1. DYNAMIC CONFIGURATION VARIABLES
// Change these settings anytime to update the entire calendar dynamically!
// ============================================================================
export const SCHEDULE_CONFIG = {
  startYear: 2026,
  startMonth: 5, // 0-indexed: 5 = June
  startDay: 29,  // June 29, 2026 (Monday)
  totalWeeks: 13, // 13 weeks spans June 29 to September 25, 2026
  workDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], // 4 days a week
  hoursPerDay: 10,
  workDayLabel: 'Work Day (10h)',
  offDayLabel: 'Scheduled Off'
};

// ============================================================================
// 2. SUSPENSION OVERRIDES
// Simply add dates ('YYYY-MM-DD') here when you have a suspension!
// The calendar will automatically adjust hours, badges, and warnings.
// Example: '2026-07-14': 'Typhoon Suspension - No Duty'
// ============================================================================
export const SUSPENSION_DAYS: Record<string, string> = {
  // Add date-specific suspensions here:
  // '2026-07-14': 'Typhoon Suspension - Work Suspended',
};

// ============================================================================
// 3. CUSTOM TASKS & DELIVERABLES OVERRIDES
// Add custom tasks and photos for specific dates by ISO string ('YYYY-MM-DD')
// ============================================================================
export const CUSTOM_DAY_DATA: Record<
  string,
  {
    bullets?: string[];
    deliverables?: string[];
    hours?: number;
    status?: 'work' | 'suspension' | 'holiday' | 'off';
    statusLabel?: string;
  }
> = {
  '2026-06-29': {
    bullets: [
      'Company orientation and introduction to the IT & Engineering department.',
      'Assigned workstation setup and configured development environment.',
      'Briefing on company security protocols and telecommunications infrastructure.'
    ],
    deliverables: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80'
    ]
  },
  '2026-06-30': {
    bullets: [
      'Introduced to the departmental codebase and software repositories.',
      'Conducted initial code review and analyzed ongoing project tickets.',
      'Assisted supervisor in telecommunication equipment inventory inspection.'
    ]
  },
  '2026-07-01': {
    bullets: [
      'Configured network monitoring tools and verified server connections.',
      'Prepared preliminary documentation for internal tools deployment.',
      'Attended weekly team standup meeting and shared daily progress.'
    ],
    deliverables: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80'
    ]
  },
  '2026-07-02': {
    bullets: [
      'Executed test suites and documented edge cases for network utilities.',
      'Collaborated with senior engineers on troubleshooting communication links.',
      'Compiled weekly accomplishment report and timesheet.'
    ]
  },
  '2026-07-06': {
    bullets: [
      'Resumed database audit and verified client system logs.',
      'Updated project repository documentation and resolved merge conflicts.'
    ]
  },
  '2026-07-07': {
    bullets: [
      'Implemented UI bug fixes on internal administrative dashboard.',
      'Performed sanity checks and end-to-end testing of data entry forms.'
    ],
    deliverables: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80'
    ]
  },
  '2026-07-08': {
    bullets: [
      'Assisted supervisor in diagnosing local network routing delays.',
      'Analyzed packet inspection logs to trace connection latency.'
    ]
  },
  '2026-07-09': {
    bullets: [
      'Synthesized findings and presented optimization suggestions to senior staff.',
      'Completed documentation of routing resolution steps.'
    ]
  }
};

// ============================================================================
// 4. DYNAMIC CALENDAR GENERATOR
// Automatically generates all weeks, days, dates, hours, and status calculations!
// ============================================================================
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

export function generateWeeklyReports(): WeeklyReport[] {
  const reports: WeeklyReport[] = [];

  for (let weekIdx = 0; weekIdx < SCHEDULE_CONFIG.totalWeeks; weekIdx++) {
    const weekNumber = weekIdx + 1;
    const days: DayTask[] = [];
    const weekDeliverables: string[] = [];

    // Weekdays: Monday (0) to Friday (4)
    for (let dayIdx = 0; dayIdx < 5; dayIdx++) {
      // Calculate calendar date without timezone shift
      const currentCalDate = new Date(
        SCHEDULE_CONFIG.startYear,
        SCHEDULE_CONFIG.startMonth,
        SCHEDULE_CONFIG.startDay + weekIdx * 7 + dayIdx
      );

      const year = currentCalDate.getFullYear();
      const monthIdx = currentCalDate.getMonth();
      const monthName = MONTH_NAMES[monthIdx];
      const dayNumber = currentCalDate.getDate();
      const dayName = DAY_NAMES[dayIdx];
      const isoDate = `${year}-${padZero(monthIdx + 1)}-${padZero(dayNumber)}`;
      const formattedDate = `${monthName} ${dayNumber}, ${year}`;

      const isConfiguredWorkDay = SCHEDULE_CONFIG.workDays.includes(dayName);
      const isSuspended = Boolean(SUSPENSION_DAYS[isoDate]);
      const customOverride = CUSTOM_DAY_DATA[isoDate];

      let status: DayTask['status'] = isConfiguredWorkDay ? 'work' : 'off';
      let statusLabel: string = isConfiguredWorkDay
        ? SCHEDULE_CONFIG.workDayLabel
        : SCHEDULE_CONFIG.offDayLabel;
      let hours: number = isConfiguredWorkDay ? SCHEDULE_CONFIG.hoursPerDay : 0;
      let bullets: string[] = [];

      if (isSuspended) {
        status = 'suspension';
        statusLabel = SUSPENSION_DAYS[isoDate] || 'Suspension';
        hours = 0;
        bullets = [
          SUSPENSION_DAYS[isoDate] || 'Official work/class suspension declared. No on-site duties performed.'
        ];
      } else if (isConfiguredWorkDay) {
        bullets = [
          `Performed assigned ${dayName.toLowerCase()} engineering tasks and documentation.`
        ];
      } else {
        bullets = [
          `Scheduled off day per 4-day (${SCHEDULE_CONFIG.workDays[0]} to ${SCHEDULE_CONFIG.workDays[SCHEDULE_CONFIG.workDays.length - 1]}) work schedule.`
        ];
      }

      // Apply custom overrides if specified
      if (customOverride) {
        if (customOverride.status) status = customOverride.status;
        if (customOverride.statusLabel) statusLabel = customOverride.statusLabel;
        if (customOverride.hours !== undefined) hours = customOverride.hours;
        if (customOverride.bullets) bullets = customOverride.bullets;
      }

      const deliverables = customOverride?.deliverables || [];
      if (deliverables.length > 0) {
        weekDeliverables.push(...deliverables);
      }

      days.push({
        id: `w${weekNumber}-${dayName.slice(0, 3).toLowerCase()}`,
        day: dayName,
        date: formattedDate,
        isoDate,
        dayNumber,
        status,
        statusLabel,
        hours,
        bullets,
        deliverables: deliverables.length > 0 ? deliverables : undefined
      });
    }

    const firstDateObj = new Date(SCHEDULE_CONFIG.startYear, SCHEDULE_CONFIG.startMonth, SCHEDULE_CONFIG.startDay + weekIdx * 7);
    const lastDateObj = new Date(SCHEDULE_CONFIG.startYear, SCHEDULE_CONFIG.startMonth, SCHEDULE_CONFIG.startDay + weekIdx * 7 + 4);

    const firstMonth = MONTH_NAMES[firstDateObj.getMonth()];
    const lastMonth = MONTH_NAMES[lastDateObj.getMonth()];
    const firstDayNum = firstDateObj.getDate();
    const lastDayNum = lastDateObj.getDate();
    const yearNum = lastDateObj.getFullYear();

    const dateRange =
      firstMonth === lastMonth
        ? `${firstMonth} ${firstDayNum} - ${lastDayNum}, ${yearNum}`
        : `${firstMonth} ${firstDayNum} - ${lastMonth} ${lastDayNum}, ${yearNum}`;

    const monthLabel =
      firstMonth === lastMonth
        ? `${firstMonth} ${yearNum}`
        : `${firstMonth} - ${lastMonth} ${yearNum}`;

    // July has 5 weeks: Weeks 1-5 (June 29 - July 31)
    // August has 4 weeks: Weeks 6-9 (August 3 - August 28)
    // September starts on August 31 with Week 10
    const monthGroup =
      weekIdx < 5 ? 'July 2026' : weekIdx < 9 ? 'August 2026' : 'September 2026';

    const totalHours = days.reduce((acc, d) => acc + d.hours, 0);
    const workDaysCount = days.filter((d) => d.status === 'work').length;
    const suspensionsCount = days.filter((d) => d.status === 'suspension').length;

    reports.push({
      id: `week-${weekNumber}`,
      weekNumber,
      title: `Week ${weekNumber}`,
      dateRange,
      month: monthLabel,
      monthGroup,
      totalHours,
      workDaysCount,
      suspensionsCount,
      days,
      deliverables: weekDeliverables
    });
  }

  return reports;
}

export const WEEKLY_REPORTS: WeeklyReport[] = generateWeeklyReports();