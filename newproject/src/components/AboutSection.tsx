import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, GraduationCap, MapPin, UserCheck } from 'lucide-react';
import type { ProfileData } from '../types/portfolio';

export function AboutSection({ profile }: { profile: ProfileData }) {
  const prefersReducedMotion = useReducedMotion();

  const facts = [
    {
      icon: UserCheck,
      label: 'Current Status',
      value: profile.professional_status,
    },
    {
      icon: GraduationCap,
      label: 'Degree & Semester',
      value: `${profile.degree} · ${profile.current_semester}`,
    },
    {
      icon: BookOpen,
      label: 'Academic Stream',
      value: `Commerce Background · ${profile.admission_year}–${profile.expected_graduation}`,
    },
    {
      icon: MapPin,
      label: 'University',
      value: profile.university,
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 border-b border-slate-200 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
        >
          <div className="lg:col-span-7 space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                About Me
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-1.5">
                Focused on Practical IT &amp; Web Development
              </h2>
            </div>

            <p className="text-base sm:text-[17px] text-slate-700 dark:text-slate-300 leading-relaxed">
              {profile.about_bio}
            </p>
          </div>

          <div className="lg:col-span-5 bg-white dark:bg-[#0B172A] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Professional Overview
              </p>
              <p className="font-display text-lg font-semibold text-slate-900 dark:text-white mt-1">
                {profile.full_name}
              </p>
            </div>

            <dl className="space-y-4">
              {facts.map((fact) => {
                const Icon = fact.icon;
                return (
                  <div key={fact.label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {fact.label}
                      </dt>
                      <dd className="text-sm font-medium text-slate-900 dark:text-slate-100 mt-0.5 leading-snug">
                        {fact.value}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
