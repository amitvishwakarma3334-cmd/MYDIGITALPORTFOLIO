import { motion, useReducedMotion } from 'framer-motion';
import { Briefcase, ExternalLink, Github, Linkedin } from 'lucide-react';
import type { ProfileData } from '../types/portfolio';
import { isSafeExternalUrl, isValidConfiguredUrl } from '../utils/assetHelpers';

export function SocialProfilesSection({ profile }: { profile: ProfileData }) {
  const prefersReducedMotion = useReducedMotion();
  const hasWorkIndia = isValidConfiguredUrl(profile.workindia_url);

  return (
    <section
      id="social-profiles"
      className="py-14 sm:py-16 bg-slate-50 dark:bg-[#060D1A] border-b border-slate-200 dark:border-slate-800/80"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">
              Social Profiles
            </p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
              Connect Across Professional Platforms
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5">
              View source code repositories, academic updates, and verified career profiles.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {isSafeExternalUrl(profile.linkedin_url) && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white dark:bg-[#0B172A] border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-sm font-semibold text-slate-900 dark:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4 text-blue-700 dark:text-blue-400" aria-hidden="true" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
              </a>
            )}

            {isSafeExternalUrl(profile.github_url) && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white dark:bg-[#0B172A] border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-sm font-semibold text-slate-900 dark:text-white transition-colors"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                <span>GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
              </a>
            )}

            {hasWorkIndia && (
              <a
                href={profile.workindia_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#0B192C] dark:bg-blue-600 text-white hover:bg-[#132948] dark:hover:bg-blue-500 text-sm font-semibold transition-colors"
              >
                <Briefcase className="w-4 h-4 text-emerald-300 dark:text-white" aria-hidden="true" />
                <span>WorkIndia Profile</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" aria-hidden="true" />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
