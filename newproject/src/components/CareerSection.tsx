import { motion, useReducedMotion } from 'framer-motion';
import { Briefcase, Compass, Laptop, Sparkles } from 'lucide-react';
import type { ProfileData } from '../types/portfolio';

export function CareerSection({ profile }: { profile: ProfileData }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="career" className="py-16 sm:py-20 border-b border-slate-200 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="bg-white dark:bg-[#0B172A] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                Career Availability
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {profile.professional_status}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                As a dedicated BCA fresher with strong computer operations, MS Office, typing accuracy (55–60 WPM), SQL, Python, and front-end web development fundamentals, I am eager to contribute in an entry-level IT or office support role while continuing to grow professionally.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <Laptop className="w-4 h-4 text-blue-700 dark:text-blue-400 mb-2" aria-hidden="true" />
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Practical Execution</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Hands-on project experience with web dashboards, SQL, and MS Office workflows.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <Compass className="w-4 h-4 text-blue-700 dark:text-blue-400 mb-2" aria-hidden="true" />
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Ready to Learn</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Committed to fast onboarding, accuracy, and reliable day-to-day support.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200 dark:border-slate-800">
                <Briefcase className="w-5 h-5 text-blue-700 dark:text-blue-400" aria-hidden="true" />
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    Target Roles &amp; Interests
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Entry-level opportunities open to immediate consideration
                  </p>
                </div>
              </div>

              <ul className="mt-4 divide-y divide-slate-200/70 dark:divide-slate-800">
                {profile.target_roles.map((role) => (
                  <li key={role} className="py-3 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
                      {role}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" aria-hidden="true" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
