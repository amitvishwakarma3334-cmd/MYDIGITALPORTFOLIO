import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Download, ExternalLink, Eye, FileText, X } from 'lucide-react';
import type { ProfileData } from '../types/portfolio';
import {
  checkPdfAvailable,
  isSafeExternalUrl,
  resolveAssetUrl,
  triggerFileDownload,
} from '../utils/assetHelpers';

interface DocumentCardConfig {
  key: 'resume' | 'cv';
  title: string;
  subtitle: string;
  url: string;
  downloadName: string;
  visible: boolean;
  allowDownload: boolean;
}

export function DocumentsSection({ profile }: { profile: ProfileData }) {
  const prefersReducedMotion = useReducedMotion();
  const [availability, setAvailability] = useState<{ resume: boolean | null; cv: boolean | null }>({
    resume: null,
    cv: null,
  });
  const [previewDoc, setPreviewDoc] = useState<{ title: string; url: string } | null>(null);

  useEffect(() => {
    let active = true;

    async function verifyDocs() {
      const [resumeOk, cvOk] = await Promise.all([
        profile.document_visibility.show_resume && profile.resume_url
          ? checkPdfAvailable(profile.resume_url)
          : Promise.resolve(false),
        profile.document_visibility.show_cv && profile.cv_url
          ? checkPdfAvailable(profile.cv_url)
          : Promise.resolve(false),
      ]);

      if (active) {
        setAvailability({ resume: resumeOk, cv: cvOk });
      }
    }

    verifyDocs();
    return () => {
      active = false;
    };
  }, [
    profile.cv_url,
    profile.document_visibility.show_cv,
    profile.document_visibility.show_resume,
    profile.resume_url,
  ]);

  useEffect(() => {
    if (!previewDoc) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPreviewDoc(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [previewDoc]);

  const allDocs: DocumentCardConfig[] = [
    {
      key: 'resume',
      title: 'Resume (PDF)',
      subtitle: 'Concise 1-page job application summary of skills, projects & academics',
      url: resolveAssetUrl(profile.resume_url),
      downloadName: 'Amit_Resume.pdf',
      visible: profile.document_visibility.show_resume,
      allowDownload: profile.document_visibility.allow_resume_download,
    },
    {
      key: 'cv',
      title: 'Curriculum Vitae (CV)',
      subtitle: 'Complete academic, certification & technical portfolio document',
      url: resolveAssetUrl(profile.cv_url),
      downloadName: 'Amit_CV.pdf',
      visible: profile.document_visibility.show_cv,
      allowDownload: profile.document_visibility.allow_cv_download,
    },
  ];
  const docs = allDocs.filter((doc) => doc.visible);

  if (docs.length === 0) {
    return null;
  }

  return (
    <section
      id="documents"
      className="py-16 sm:py-20 bg-white dark:bg-[#081223] border-b border-slate-200 dark:border-slate-800/80"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">
            Documents
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-1.5">
            Resume &amp; Curriculum Vitae
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            Preview or download official PDF documents directly for recruitment and HR review.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {docs.map((doc, idx) => {
            const isAvailable = availability[doc.key];
            const safeUrl = isSafeExternalUrl(doc.url);

            return (
              <motion.div
                key={doc.key}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-slate-50 dark:bg-[#0B172A] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between gap-5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0B192C] dark:bg-blue-600/20 text-white dark:text-blue-400 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                      {doc.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {doc.subtitle}
                    </p>
                  </div>
                </div>

                {/* Inline Mini Preview or Graceful Missing Placeholder */}
                {isAvailable === null ? (
                  <div className="h-56 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 flex items-center justify-center text-xs text-slate-500">
                    Checking document availability...
                  </div>
                ) : isAvailable && safeUrl ? (
                  <div className="h-64 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
                    <iframe
                      src={`${doc.url}#toolbar=0&view=FitH`}
                      title={doc.title}
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 p-6 text-center space-y-2">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      PDF Document Not Uploaded Yet
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                      Place the PDF file at <span className="font-mono">public{doc.url || '/assets/...'}</span> in the GitHub repository to enable inline preview and download.
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  {isAvailable && safeUrl ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setPreviewDoc({ title: doc.title, url: doc.url })}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" aria-hidden="true" />
                        <span>Full Preview</span>
                      </button>

                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        <span>Open Tab</span>
                      </a>

                      {doc.allowDownload && (
                        <button
                          type="button"
                          onClick={() => triggerFileDownload(doc.url, doc.downloadName)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B192C] dark:bg-blue-600 text-white text-xs sm:text-sm font-semibold hover:bg-[#132948] dark:hover:bg-blue-500 transition-colors cursor-pointer ml-auto"
                        >
                          <Download className="w-4 h-4" aria-hidden="true" />
                          <span>Download PDF</span>
                        </button>
                      )}
                    </>
                  ) : (
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Awaiting PDF upload
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen PDF Modal */}
      <AnimatePresence>
        {previewDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label={previewDoc.title}
          >
            <motion.div
              initial={prefersReducedMotion ? false : { scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={prefersReducedMotion ? undefined : { scale: 0.96, opacity: 0 }}
              className="w-full max-w-5xl h-[85vh] bg-white dark:bg-[#0B172A] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                <h3 className="font-display text-base font-bold text-slate-900 dark:text-white truncate">
                  {previewDoc.title}
                </h3>
                <div className="flex items-center gap-2">
                  <a
                    href={previewDoc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Open in New Tab</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setPreviewDoc(null)}
                    aria-label="Close PDF preview"
                    className="w-8 h-8 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <iframe src={previewDoc.url} title={previewDoc.title} className="w-full flex-1 bg-slate-100" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
