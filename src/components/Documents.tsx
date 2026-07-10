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
  const [activeDoc, setActiveDoc] = useState<string | null>('/7. NATIONAL TELECOMMUNICATION COMMISSION.pdf');

  return (
    <section id="projects" className="py-24 bg-brand-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Documents
          </h2>
          <p className="text-lg text-brand-slate-100 max-w-3xl mx-auto">
            A collection of important documents and reports from my internship.
          </p>
        </div>

        <div className="bg-brand-slate-900 border border-brand-slate-800 rounded-xl overflow-hidden flex min-h-[75vh]">
          {/* Sidebar */}
          <div className="w-1/3 md:w-1/4 border-r border-brand-slate-800 p-4">
            <h3 className="text-white font-semibold mb-4 px-2">My Files</h3>
            <div className="space-y-1.5">
              {documentList.map((doc) => (
                <button
                  key={doc.name}
                  onClick={() => setActiveDoc(doc.path)}
                  disabled={!doc.path}
                  className={`w-full text-left px-3 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center text-sm ${
                    activeDoc === doc.path
                      ? 'bg-brand-blue text-white'
                      : 'text-brand-slate-200 hover:bg-brand-slate-800 hover:text-white'
                  } ${!doc.path ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <FileText className="w-4 h-4 mr-3 flex-shrink-0" />
                  <span className="truncate">{doc.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="w-2/3 md:w-3/4 flex-1 flex items-center justify-center p-2">
            {activeDoc ? (
              <iframe
                src={activeDoc}
                className="w-full h-full bg-white rounded-md"
                title="Document Viewer"
              />
            ) : (
              <div className="text-center">
                <FileText className="w-16 h-16 mx-auto text-brand-slate-700" />
                <h3 className="mt-4 text-lg font-medium text-white">Select a document</h3>
                <p className="mt-1 text-sm text-brand-slate-400">Choose a file from the sidebar to view it here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}