import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, GraduationCap, MapPin } from 'lucide-react';
import type { EducationItem } from '../types/portfolio';

export function EducationSection({ education }: { education: EducationItem[] }) {
  const prefersReducedMotion = useReducedMotion();

  if (education.length === 0) {
    return null;
  }

  return (
    <section
      id="education"
      className="py-16 sm:py-20 bg-white dark:bg-[#081223] border-b border-slate-200 dark:border-slate-800/80"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">
            Academic Timeline
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-1.5">
            Education &amp; Qualifications
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            Verified academic progression from secondary schooling to undergraduate computer applications.
          </p>
        </div>

        <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-2.5 sm:before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-slate-200 dark:before:bg-slate-800">
          {education.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-slate-50 dark:bg-[#0B172A] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 hover:border-blue-300 dark:hover:border-blue-700/70 transition-colors"
            >
              {/* Timeline marker */}
              <span
                className="absolute -left-[22px] sm:-left-[26px] top-6 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-white dark:ring-[#081223]"
                aria-hidden="true"
              />

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                    <GraduationCap className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      {item.period}
                    </span>
                    {item.current_status && (
                      <>
                        <span aria-hidden="true" className="text-slate-400">·</span>
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                          {item.current_status}
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {item.degree}
                  </h3>

                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {item.institution}
                    {item.location && (
                      <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 ml-2">
                        <MapPin className="w-3.5 h-3.5 inline" aria-hidden="true" />
                        {item.location}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {item.stream_or_details && (
                <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800 flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                  <span>{item.stream_or_details}</span>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
