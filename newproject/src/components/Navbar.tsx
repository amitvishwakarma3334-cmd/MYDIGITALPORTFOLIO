import { useState, type MouseEvent } from 'react';
import { Mail, Menu, Moon, Sun, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import type { SectionVisibility } from '../types/portfolio';
import { scrollToSection } from '../utils/assetHelpers';
import { BrandMark } from './BrandMark';

interface NavbarProps {
  fullName: string;
  visibility: SectionVisibility;
}

export function Navbar({ fullName, visibility }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'About', id: 'about', show: visibility.about },
    { label: 'Education', id: 'education', show: visibility.education },
    { label: 'Skills', id: 'skills', show: visibility.skills },
    { label: 'Resume & CV', id: 'documents', show: visibility.documents },
    { label: 'Certificates', id: 'certificates', show: visibility.certificates },
    { label: 'Projects', id: 'projects', show: visibility.projects },
  ].filter((link) => link.show);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setMobileOpen(false);
    scrollToSection(sectionId, prefersReducedMotion);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-[#060D1A]/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, 'top')}
          className="inline-flex items-center gap-2.5 font-display text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0"
        >
          <BrandMark className="w-8 h-8 shrink-0" />
          <span>{fullName}</span>
        </a>

        {/* Zone 2: Primary Nav Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Theme Toggle & Contact CTA */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/70 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" aria-hidden="true" />
            )}
          </button>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#0B192C] text-white hover:bg-[#132948] dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0"
          >
            <Mail className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Contact</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="lg:hidden w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/70 text-slate-700 dark:text-slate-200 flex items-center justify-center cursor-pointer"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#060D1A] overflow-hidden"
          >
            <nav aria-label="Mobile navigation" className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#social-profiles"
                onClick={(e) => handleNavClick(e, 'social-profiles')}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors"
              >
                Social Profiles
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#0B192C] text-white dark:bg-blue-600"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>Contact Me</span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
