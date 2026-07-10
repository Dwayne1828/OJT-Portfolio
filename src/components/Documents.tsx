import { useState } from 'react';
import { FileText } from 'lucide-react';

const documentList = [
  { name: "Approval Sheet", path: null },
  { name: "Letter of Intent", path: null },
  { name: "MOA", path: "/7. NATIONAL TELECOMMUNICATION COMMISSION.pdf" },
  { name: "Letter of Endorsement", path: null },
  { name: "Student Waiver", path: null },
  { name: "Internship Agreement", path: null },
  { name: "CV", path: "/Resume - Dwayne Barrameda (2).pdf" },
  { name: "Consent Form", path: null },
  { name: "Insurance", path: null },
  { name: "MedCert", path: null },
  { name: "Cert Of Completion", path: null },
  { name: "Certificate of Completion", path: null }
];

export function Documents() {
  const [activeDoc, setActiveDoc] = useState<string | null>(null);

  return (
    <section id="projects" className="py-24 bg-brand-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Documents
          </h2>
          <p className="text-lg text-brand-slate-400 max-w-2xl mx-auto">
            A collection of important documents related to my internship.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar / Button Grid */}
          <div className="lg:w-1/4">
            <div className="relative">
              <select
                onChange={(e) => setActiveDoc(e.target.value || null)}
                className="w-full bg-brand-slate-800 text-white px-4 py-3 rounded-md font-medium transition-all duration-200 appearance-none border border-brand-slate-700 hover:bg-brand-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              >
                <option value="">Select a document...</option>
                {documentList.map((doc) => (
                  <option key={doc.name} value={doc.path || ''} disabled={!doc.path}>
                    {doc.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-brand-slate-950 border border-brand-slate-800 rounded-lg h-[70vh] flex items-center justify-center">
              {activeDoc ? (
                <iframe
                  src={activeDoc}
                  className="w-full h-full"
                  title="Document Viewer"
                />
              ) : (
                <p className="text-brand-slate-400">Select a document from the left to view it here.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}