import React from 'react';
export function Footer() {
  return (
    <footer className="bg-brand-slate-950 py-12 border-t border-brand-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-4">
          <span className="text-2xl font-bold text-white tracking-tight">
            OJT<span className="text-brand-blue">Portfolio</span>
          </span>
        </div>
        <p className="text-brand-slate-400 text-sm mb-6 max-w-md mx-auto">
          Designed and built as a comprehensive log of internship experiences,
          learnings, and technical growth.
        </p>
        <div className="text-brand-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Juan Dela Cruz. All rights reserved.
        </div>
      </div>
    </footer>);

}