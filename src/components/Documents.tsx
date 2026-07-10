import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const documents = [
  "Approval Sheet",
  "Letter of Intent",
  "MOA",
  "Letter of Endorsement",
  "Student Waiver",
  "Internship Agreement",
  "CV",
  "Consent Form",
  "Insurance",
  "MedCert",
  "Cert Of Completion",
  "Certificate of Completion"
];

export function Documents() {
  return (
    <section id="projects" className="py-24 bg-brand-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            National Telecommunications Commission
          </h2>
          <p className="text-lg text-brand-slate-400 max-w-2xl mx-auto">
            Company Profile and Cover Page
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc, index) => (
            <motion.div
              key={doc}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-full"
            >
              <a
                href="#" // Replace with the actual path to the document
                className="w-full bg-brand-slate-800 hover:bg-brand-slate-700 text-white px-6 py-4 rounded-md font-medium transition-all duration-200 flex items-center justify-center group text-lg border border-brand-slate-700"
              >
                <FileText className="w-6 h-6 mr-3" />
                {doc}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}