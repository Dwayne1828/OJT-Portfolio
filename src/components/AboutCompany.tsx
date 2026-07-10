import { Building } from 'lucide-react';

export function AboutCompany() {
  return (
    <section id="about" className="py-24 bg-brand-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center">
            <img
              src="public/National_Telecommunications_Commission.svg"
              alt="Company Logo"
              className="w-12 h-12 mr-3"
            />
            National Telecommunications Commission (NTC)
          </h2>
          <p className="text-lg text-brand-slate-400 max-w-3xl mx-auto">
            Information about the company where the internship was conducted.
          </p>
        </div>
        <div className="bg-brand-slate-950 border border-brand-slate-800 rounded-lg p-8">
          <p className="text-brand-slate-300">
            [Company information will go here.]
          </p>
        </div>
      </div>
    </section>
  );
}