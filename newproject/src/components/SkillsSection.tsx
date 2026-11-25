import { motion, useReducedMotion } from 'framer-motion';
import { Code2, Monitor, Users } from 'lucide-react';
import type { SkillCategory, SkillItem } from '../types/portfolio';

const CATEGORY_META: Record<
  SkillCategory,
  { title: string; subtitle: string; icon: typeof Monitor }
> = {
  computer: {
    title: 'Computer Skills',
    subtitle: 'Office software, typing accuracy, and daily workstation operations',
    icon: Monitor,
  },
  programming: {
    title: 'Programming & Technology',
    subtitle: 'Core languages, SQL databases, and front-end web development',
    icon: Code2,
  },
  professional: {
    title: 'Professional Skills',
    subtitle: 'Workplace readiness, communication, and problem-solving habits',
    icon: Users,
  },
};

const CATEGORY_ORDER: SkillCategory[] = ['computer', 'programming', 'professional'];

export function SkillsSection({ skills }: { skills: SkillItem[] }) {
  const prefersReducedMotion = useReducedMotion();

  if (skills.length === 0) {
    return null;
  }

  return (
    <section id="skills" className="py-16 sm:py-20 border-b border-slate-200 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">
            Capabilities
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-1.5">
            Technical &amp; Professional Skills
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            Core tools, programming technologies, and workplace strengths developed through coursework and projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CATEGORY_ORDER.map((cat, catIdx) => {
            const meta = CATEGORY_META[cat];
            const Icon = meta.icon;
            const catSkills = skills.filter((s) => s.category === cat);

            if (catSkills.length === 0) {
              return null;
            }

            return (
              <motion.div
                key={cat}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: catIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white dark:bg-[#0B172A] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col"
              >
                <div className="flex items-start gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-[#0B192C] dark:bg-blue-600/20 text-white dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                      {meta.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                      {meta.subtitle}
                    </p>
                  </div>
                </div>

                <ul className="mt-4 space-y-2.5 flex-1">
                  {catSkills.map((skill) => (
                    <motion.li
                      key={skill.id}
                      whileHover={prefersReducedMotion ? undefined : { x: 4 }}
                      transition={{ duration: 0.15 }}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80"
                    >
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {skill.name}
                      </p>
                      {skill.detail && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                          {skill.detail}
                        </p>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
