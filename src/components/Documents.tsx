import { useState } from 'react';
import { FileText, ExternalLink, AlertCircle, FileCheck, FolderArchive } from 'lucide-react';

export interface DocumentItem {
  id: string;
  name: string;
  path: string | null;
  category: 'general' | 'before' | 'after';
  categoryLabel: string;
}

export interface DocumentCategoryGroup {
  id: 'general' | 'before' | 'after';
  label: string;
  items: DocumentItem[];
}

const DOCUMENT_GROUPS: DocumentCategoryGroup[] = [
  {
    id: 'general',
    label: 'General Documents',
    items: [
      {
        id: 'cv',
        name: 'CV',
        path: '/Resume - Dwayne Barrameda (2).pdf',
        category: 'general',
        categoryLabel: 'General'
      },
      {
        id: 'insurance',
        name: 'Insurance',
        path: null,
        category: 'general',
        categoryLabel: 'General'
      },
      {
        id: 'medical-certificate',
        name: 'Medical Certificate',
        path: '/MedCert.pdf',
        category: 'general',
        categoryLabel: 'General'
      },
      {
        id: 'approval-sheet',
        name: 'Approval Sheet',
        path: '/Approval Sheet.pdf',
        category: 'general',
        categoryLabel: 'General'
      },
      {
        id: 'certificate-of-completion',
        name: 'Certificate of Completion',
        path: null,
        category: 'general',
        categoryLabel: 'General'
      }
    ]
  },
  {
    id: 'before',
    label: 'Before OJT',
    items: [
      {
        id: 'moa',
        name: 'MOA',
        path: '/7. NATIONAL TELECOMMUNICATION COMMISSION.pdf',
        category: 'before',
        categoryLabel: 'Before OJT'
      },
      {
        id: 'loe',
        name: 'Letter of Endorsement (LOE)',
        path: '/Letter of Endorsement.pdf',
        category: 'before',
        categoryLabel: 'Before OJT'
      },
      {
        id: 'loi',
        name: 'Letter of Intent (LOI)',
        path: '/Letter of Intent.pdf',
        category: 'before',
        categoryLabel: 'Before OJT'
      },
      {
        id: 'student-waiver',
        name: 'Student Waiver',
        path: null,
        category: 'before',
        categoryLabel: 'Before OJT'
      },
      {
        id: 'internship-agreement',
        name: 'Internship Agreement',
        path: null,
        category: 'before',
        categoryLabel: 'Before OJT'
      },
      {
        id: 'pup-consent-form',
        name: 'Consent Form',
        path: null,
        category: 'before',
        categoryLabel: 'Before OJT'
      }
    ]
  },
  {
    id: 'after',
    label: 'After OJT',
    items: [
      {
        id: 'eval-student-intern',
        name: 'Evaluation Instrument for Student Intern',
        path: null,
        category: 'after',
        categoryLabel: 'After OJT'
      },
      {
        id: 'eval-trainee',
        name: 'Trainee Performance Evaluation',
        path: null,
        category: 'after',
        categoryLabel: 'After OJT'
      },
      {
        id: 'eval-hte',
        name: 'Evaluation Instrument for HTE',
        path: null,
        category: 'after',
        categoryLabel: 'After OJT'
      },
      {
        id: 'eval-training-supervisor',
        name: 'Evaluation Instrument for Training Supervisor',
        path: null,
        category: 'after',
        categoryLabel: 'After OJT'
      },
      {
        id: 'eval-ojt-adviser',
        name: 'OJT Adviser Performance Evaluation',
        path: null,
        category: 'after',
        categoryLabel: 'After OJT'
      }
    ]
  }
];

export function Documents() {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'before' | 'after' | 'general'>('all');
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem>(
    DOCUMENT_GROUPS[1].items[0] // Default to MOA which has a valid PDF
  );

  const filterTabs: { id: 'all' | 'before' | 'after' | 'general'; label: string }[] = [
    { id: 'all', label: 'All Files' },
    { id: 'before', label: 'Before OJT' },
    { id: 'after', label: 'After OJT' },
    { id: 'general', label: 'General' }
  ];

  const filteredGroups = DOCUMENT_GROUPS.filter((group) => {
    if (activeCategoryFilter === 'all') return true;
    return group.id === activeCategoryFilter;
  });

  return (
    <section id="projects" className="py-24 bg-brand-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Documents
          </h2>
          <p className="text-lg text-brand-slate-400 max-w-3xl mx-auto">
            A categorized collection of required documents and evaluation forms from my internship.
          </p>
        </div>

        <div className="bg-brand-slate-900 border border-brand-slate-800 rounded-2xl overflow-hidden flex flex-col lg:flex-row h-[820px] shadow-2xl">
          {/* Sidebar */}
          <div className="w-full lg:w-80 xl:w-96 border-b lg:border-b-0 lg:border-r border-brand-slate-800 flex flex-col h-1/2 lg:h-full bg-brand-slate-900/90">
            {/* Header & Tabs */}
            <div className="p-4 border-b border-brand-slate-800 shrink-0">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center space-x-2">
                  <FolderArchive className="w-5 h-5 text-brand-blue" />
                  <h3 className="text-white font-semibold text-base">My Files</h3>
                </div>
                <span className="text-xs bg-brand-slate-800 text-brand-slate-400 border border-brand-slate-700/60 px-2 py-0.5 rounded-full font-medium">
                  {DOCUMENT_GROUPS.reduce((acc, curr) => acc + curr.items.length, 0)} Files
                </span>
              </div>

              {/* Category Filter Pills */}
              <div className="grid grid-cols-4 gap-1 bg-brand-slate-950/80 p-1 rounded-lg border border-brand-slate-800/80 text-xs">
                {filterTabs.map((tab) => {
                  const isActive = activeCategoryFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCategoryFilter(tab.id)}
                      className={`px-2 py-1.5 rounded-md font-medium text-center transition-all duration-150 truncate ${isActive
                        ? 'bg-brand-blue text-white shadow-sm'
                        : 'text-brand-slate-400 hover:text-white hover:bg-brand-slate-800/60'
                        }`}
                      title={tab.label}
                    >
                      {tab.label === 'General Documents' ? 'General' : tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scrollable File List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-5 scrollbar-thin scrollbar-thumb-brand-slate-700 scrollbar-track-transparent">
              {filteredGroups.map((group) => (
                <div key={group.id} className="space-y-1">
                  {/* Category Title */}
                  <div className="flex items-center justify-between px-2 py-1 text-xs font-semibold text-brand-slate-400 uppercase tracking-wider">
                    <span>{group.label}</span>
                    <span className="text-[10px] bg-brand-slate-800 text-brand-slate-400 px-1.5 py-0.5 rounded-full border border-brand-slate-700/50">
                      {group.items.length}
                    </span>
                  </div>

                  {/* Category Items */}
                  <div className="space-y-1">
                    {group.items.map((doc) => {
                      const isSelected = selectedDoc.id === doc.id;
                      const hasPdf = Boolean(doc.path);

                      return (
                        <button
                          key={doc.id}
                          onClick={() => setSelectedDoc(doc)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg font-medium transition-all duration-150 flex items-center justify-between text-sm group ${isSelected
                            ? 'bg-brand-blue text-white shadow-md'
                            : 'text-white hover:bg-brand-slate-800/80'
                            }`}
                        >
                          <div className="flex items-center min-w-0 mr-2">
                            {hasPdf ? (
                              <FileCheck
                                className={`w-4 h-4 mr-2.5 flex-shrink-0 ${isSelected ? 'text-white' : 'text-emerald-400'
                                  }`}
                              />
                            ) : (
                              <FileText
                                className={`w-4 h-4 mr-2.5 flex-shrink-0 ${isSelected ? 'text-white' : 'text-brand-slate-400 group-hover:text-white'
                                  }`}
                              />
                            )}
                            <span className="truncate text-xs sm:text-sm text-white" title={doc.name}>
                              {doc.name}
                            </span>
                          </div>

                          {hasPdf && (
                            <span
                              className={`text-[10px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider flex-shrink-0 ${isSelected
                                ? 'bg-white/20 text-white'
                                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                }`}
                            >
                              PDF
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Viewer */}
          <div className="w-full lg:flex-1 h-1/2 lg:h-full flex flex-col bg-brand-slate-950/40">
            {/* Viewer Top Bar */}
            <div className="px-5 py-3.5 border-b border-brand-slate-800 flex items-center justify-between bg-brand-slate-900/60 shrink-0">
              <div className="flex items-center space-x-3 truncate">
                <span className="text-xs px-2 py-0.5 rounded-md font-medium uppercase tracking-wider bg-brand-slate-800 text-brand-slate-300 border border-brand-slate-700/60 shrink-0">
                  {selectedDoc.categoryLabel}
                </span>
                <h4 className="text-white font-medium text-sm md:text-base truncate" title={selectedDoc.name}>
                  {selectedDoc.name}
                </h4>
              </div>

              {selectedDoc.path && (
                <a
                  href={selectedDoc.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-medium text-brand-blue hover:text-white bg-brand-blue/10 hover:bg-brand-blue px-3 py-1.5 rounded-md transition-colors border border-brand-blue/30 shrink-0 ml-2"
                >
                  <span>Open in New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </a>
              )}
            </div>

            {/* Viewer Body */}
            <div className="flex-1 p-3 flex items-center justify-center overflow-hidden">
              {selectedDoc.path ? (
                <iframe
                  src={selectedDoc.path}
                  className="w-full h-full bg-white rounded-lg shadow-inner border border-brand-slate-800"
                  title={`Viewer for ${selectedDoc.name}`}
                />
              ) : (
                <div className="text-center p-8 max-w-md mx-auto">
                  <div className="w-16 h-16 rounded-2xl bg-brand-slate-800/80 border border-brand-slate-700/70 flex items-center justify-center mx-auto mb-4 text-brand-slate-500 shadow-lg">
                    <AlertCircle className="w-8 h-8 text-brand-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {selectedDoc.name}
                  </h3>
                  <div className="inline-block mb-3">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      Pending Upload
                    </span>
                  </div>
                  <p className="text-sm text-brand-slate-400 leading-relaxed">
                    This document belongs to the <span className="text-white font-medium">{selectedDoc.categoryLabel}</span> category. The official copy has not been uploaded to the repository yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}