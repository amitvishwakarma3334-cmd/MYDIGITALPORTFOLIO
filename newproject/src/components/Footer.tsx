import { Briefcase, Github, Linkedin, Mail, Phone } from 'lucide-react';
import type { ProfileData } from '../types/portfolio';
import { isSafeExternalUrl, isValidConfiguredUrl } from '../utils/assetHelpers';

export function Footer({ profile }: { profile: ProfileData }) {
  const currentYear = new Date().getFullYear();
  const hasWorkIndia = isValidConfiguredUrl(profile.workindia_url);

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#050B16]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-display text-base font-bold text-slate-900 dark:text-white">
            {profile.full_name}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {profile.professional_title} · {profile.location}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
            © {currentYear} {profile.full_name}. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            aria-label="Send email"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
          </a>
          <a
            href={`tel:${profile.phone}`}
            aria-label="Call phone"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
          </a>
          {isSafeExternalUrl(profile.github_url) && (
            <a
              href={profile.github_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
            </a>
          )}
          {isSafeExternalUrl(profile.linkedin_url) && (
            <a
              href={profile.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors"
            >
              <Linkedin className="w-4 h-4" aria-hidden="true" />
            </a>
          )}
          {hasWorkIndia && (
            <a
              href={profile.workindia_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WorkIndia profile"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors"
            >
              <Briefcase className="w-4 h-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
