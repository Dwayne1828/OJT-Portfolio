import { MapPin, Building2, Radio, Target, Eye, Scale, CheckCircle2 } from 'lucide-react';

export function AboutCompany() {
  const mandates = [
    {
      directive: 'To regulate the installation, operation, and maintenance of radio stations, both for private and public use.',
      legalBasis: 'Radio Control Law, Act No. 3846, as amended'
    },
    {
      directive: 'To regulate and supervise the provision of public telecommunications services.',
      legalBasis: 'Radio Control Law, Act No. 3846, as amended, and Public Telecommunications Policy Act of 1995, RA No. 7925'
    },
    {
      directive: 'To manage the radio spectrum.',
      legalBasis: 'Radio Control Law, Act No. 3846, as amended, and Public Telecommunications Policy Act of 1995, RA No. 7925'
    },
    {
      directive: 'To regulate and supervise radio and television broadcast stations, cable television (CATV), and pay television.',
      legalBasis: 'EO No. 546 and EO No. 205'
    },
    {
      directive: 'To regulate and supervise the data transmission industry sector.',
      legalBasis: 'RA No. 12234'
    }
  ];

  return (
    <section id="about" className="py-20 bg-brand-slate-900 border-b border-brand-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-brand-slate-800/80 px-3.5 py-1.5 rounded-full border border-brand-slate-700 mb-5 shadow-sm">
            <Radio className="w-4 h-4 text-brand-blue" />
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-slate-300">
              Host Training Establishment
            </span>
          </div>

          {/* Logo & Name Header */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-3">
            <img
              src="/National_Telecommunications_Commission.svg"
              alt="National Telecommunications Commission Logo"
              className="w-14 h-14 object-contain filter drop-shadow-md"
            />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              National Telecommunications Commission (NTC)
            </h2>
          </div>

          {/* Address Below the Name Header */}
          <div className="inline-flex items-center justify-center text-xs sm:text-sm text-brand-slate-200 mt-2 px-4 py-2 rounded-xl bg-brand-slate-800/70 border border-brand-slate-700 shadow-sm gap-2 text-left sm:text-center">
            <MapPin className="w-4 h-4 text-brand-blue shrink-0" />
            <span>
              <strong className="text-white font-semibold">Headquarters Address:</strong> NTC Building, BIR Road, East Triangle, Diliman, Quezon City, Metro Manila, Philippines
            </span>
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Agency Overview Card */}
          <div className="bg-brand-slate-950 border border-brand-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center space-x-2.5 text-brand-blue font-semibold text-sm uppercase tracking-wider mb-5">
              <Building2 className="w-4 h-4" />
              <span>Company Profile</span>
            </div>
            <div className="space-y-4 text-sm sm:text-base text-brand-slate-200 leading-relaxed">
              <p className="text-base sm:text-lg font-medium text-white">
                National Telecommunications Commission is a government agency responsible for overseeing nationwide telecommunications, Broadcast, and Radiocommunication services and facilities.
              </p>
              <p>
                Established in 1979 under Executive Order 546 as an attached agency to the Department of Information and Communications Technology, it centralized the regulatory body for the nation&apos;s communication landscape. Overseeing mobile cellular networks, such as telco operations in the Philippines, and manages radio-frequency regulations.
              </p>
              <p>
                The agency issues essential permits and licenses, which allow entities such as cellular networks, broadband providers, and TV/Radio broadcasters to operate, for instance, broadcast stations and cable television networks. Additionally, NTC issues radio licenses for maritime vessels, aircraft, and commercial radio operators, including radio enthusiasts, assigning and monitoring the national radio channels strategically. The agency also ensures standard technical evaluations for equipment, such as wireless network devices. Ultimately, to meet quality-of-service standards, protects and upholds a reliable and affordable communication service, and safeguards consumer welfare, including resolving text scams and service interruptions.
              </p>
            </div>
          </div>

          {/* Vision & Mission Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vision Card */}
            <div className="bg-brand-slate-950 border border-brand-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden group hover:border-brand-blue/50 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue mb-4">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                Vision
              </h3>
              <p className="text-sm sm:text-base text-brand-slate-300 leading-relaxed">
                By 2030, the NTC is a digitally empowered and dynamic regulatory agency that ensures an inclusive, secure, and dependable connectivity.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-brand-slate-950 border border-brand-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden group hover:border-brand-blue/50 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                Mission
              </h3>
              <p className="text-sm sm:text-base text-brand-slate-300 leading-relaxed">
                Regulate and supervise telecommunications, broadcast, and ICT sectors through effective and efficient regulations that ensure affordable and reliable communication services and safeguard consumer welfare and protection.
              </p>
            </div>
          </div>

          {/* Mandate Card */}
          <div className="bg-brand-slate-950 border border-brand-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center space-x-2.5 text-brand-blue font-semibold text-sm uppercase tracking-wider mb-6">
              <Scale className="w-4 h-4" />
              <span>Agency Mandate</span>
            </div>

            <div className="space-y-4">
              {mandates.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-brand-slate-900/60 border border-brand-slate-800/80 hover:border-brand-slate-700 transition-colors flex items-start space-x-3.5"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm sm:text-base text-brand-slate-100 leading-relaxed font-medium">
                      {item.directive}
                    </p>
                    <p className="text-xs text-brand-slate-400">
                      <span className="font-semibold text-brand-slate-400">Legal Basis:</span> {item.legalBasis}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}