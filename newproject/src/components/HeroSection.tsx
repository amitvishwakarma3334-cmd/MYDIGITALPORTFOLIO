import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Award,
  Briefcase,
  Download,
  ExternalLink,
  FolderGit2,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from 'lucide-react';
import type { ProfileData } from '../types/portfolio';
import {
  checkPdfAvailable,
  isSafeExternalUrl,
  isValidConfiguredUrl,
  resolveAssetUrl,
  scrollToSection,
  triggerFileDownload,
} from '../utils/assetHelpers';

interface HeroSectionProps {
  profile: ProfileData;
}

export function HeroSection({ profile }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [imgError, setImgError] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [resumeReady, setResumeReady] = useState(false);
  const [cvReady, setCvReady] = useState(false);

  const roles = profile.typing_roles.length > 0 ? profile.typing_roles : [profile.professional_title];

  useEffect(() => {
    setImgError(false);
  }, [profile.profile_image_url]);

  useEffect(() => {
    let active = true;
    if (profile.document_visibility.show_resume && profile.resume_url) {
      checkPdfAvailable(profile.resume_url).then((ok) => {
        if (active) setResumeReady(ok);
      });
    } else {
      setResumeReady(false);
    }

    if (profile.document_visibility.show_cv && profile.cv_url) {
      checkPdfAvailable(profile.cv_url).then((ok) => {
        if (active) setCvReady(ok);
      });
    } else {
      setCvReady(false);
    }

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
    if (prefersReducedMotion) {
      setTypedText(roles[0] ?? '');
      return;
    }

    const currentRole = roles[roleIndex % roles.length] ?? '';
    let timeoutId: number;

    if (!isDeleting && typedText === currentRole) {
      timeoutId = window.setTimeout(() => setIsDeleting(true), 1700);
    } else if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    } else {
      const nextLength = isDeleting ? typedText.length - 1 : typedText.length + 1;
      const delay = isDeleting ? 35 : 65;
      timeoutId = window.setTimeout(() => {
        setTypedText(currentRole.slice(0, nextLength));
      }, delay);
    }

    return () => window.clearTimeout(timeoutId);
  }, [isDeleting, prefersReducedMotion, roleIndex, roles, typedText]);

  const handleDocumentAction = (type: 'resume' | 'cv') => {
    const isResume = type === 'resume';
    const ready = isResume ? resumeReady : cvReady;
    const url = isResume ? profile.resume_url : profile.cv_url;
    const allowed = isResume
      ? profile.document_visibility.allow_resume_download
      : profile.document_visibility.allow_cv_download;

    if (ready && allowed && url) {
      triggerFileDownload(
        url,
        isResume ? 'Amit_Resume.pdf' : 'Amit_CV.pdf'
      );
      return;
    }

    const el = document.getElementById('documents');
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  const initials = profile.full_name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-br from-[#071326] via-[#0B1D3A] to-[#0E264D] text-white"
    >
      {/* Subtle animated dark navy gradient & floating geometric orbs */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 animate-gradient-shift bg-gradient-to-tr from-blue-900/20 via-transparent to-sky-500/15"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl animate-float-slow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-28 -left-20 w-80 h-80 rounded-full bg-sky-400/10 blur-3xl animate-float-slow"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Content Column */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 space-y-6"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-blue-200/90 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                {profile.location}
              </span>
              <span aria-hidden="true" className="text-blue-400/60">·</span>
              <span>{profile.professional_status}</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance">
                {profile.full_name}
              </h1>
              <p className="text-lg sm:text-xl font-medium text-blue-200">
                {profile.professional_title}
              </p>
              <div className="min-h-8 flex items-center text-base sm:text-lg font-mono text-sky-300">
                <span>{typedText}</span>
                {!prefersReducedMotion && (
                  <span
                    className="inline-block w-0.5 h-5 bg-sky-300 ml-1 animate-pulse"
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              {profile.hero_summary}
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {profile.document_visibility.show_resume && (
                <button
                  type="button"
                  onClick={() => handleDocumentAction('resume')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#0B192C] text-sm font-semibold hover:bg-blue-50 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Download Resume</span>
                </button>
              )}

              {profile.document_visibility.show_cv && (
                <button
                  type="button"
                  onClick={() => handleDocumentAction('cv')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Download CV</span>
                </button>
              )}

              <a
                href="#certificates"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('certificates', Boolean(prefersReducedMotion));
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-medium transition-colors whitespace-nowrap shrink-0"
              >
                <Award className="w-4 h-4 text-sky-300" aria-hidden="true" />
                <span>View Certificates</span>
              </a>

              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('projects', Boolean(prefersReducedMotion));
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-medium transition-colors whitespace-nowrap shrink-0"
              >
                <FolderGit2 className="w-4 h-4 text-sky-300" aria-hidden="true" />
                <span>View Projects</span>
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact', Boolean(prefersReducedMotion));
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-transparent hover:bg-white/10 border border-blue-400/40 text-blue-100 text-sm font-medium transition-colors whitespace-nowrap shrink-0"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Verified External Profile Icons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {isSafeExternalUrl(profile.github_url) && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-xs sm:text-sm text-slate-200 transition-colors"
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                  <span>GitHub</span>
                </a>
              )}

              {isSafeExternalUrl(profile.linkedin_url) && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-xs sm:text-sm text-slate-200 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-sky-300" aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
              )}

              {isValidConfiguredUrl(profile.workindia_url) && (
                <a
                  href={profile.workindia_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WorkIndia profile"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-xs sm:text-sm text-slate-200 transition-colors"
                >
                  <Briefcase className="w-4 h-4 text-emerald-300" aria-hidden="true" />
                  <span>WorkIndia</span>
                  <ExternalLink className="w-3 h-3 opacity-70" aria-hidden="true" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Right Profile Photo Column */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col items-center lg:items-end"
          >
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-full bg-gradient-to-tr from-blue-600/40 via-sky-400/20 to-white/20 blur-xl"
                aria-hidden="true"
              />
              <div className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-full p-1.5 bg-gradient-to-b from-blue-400/60 via-white/25 to-blue-800/40 shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#0E2242] flex items-center justify-center">
                  {!imgError && isSafeExternalUrl(profile.profile_image_url) ? (
                    <img
                      src={resolveAssetUrl(profile.profile_image_url)}
                      alt={`${profile.full_name} profile photograph`}
                      className="w-full h-full object-cover"
                      loading="eager"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div
                      className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0F274B] to-[#081427] text-center px-4"
                      aria-label={`${profile.full_name} monogram`}
                    >
                      <span className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white">
                        {initials || 'AV'}
                      </span>
                      <span className="text-xs text-blue-200/80 mt-2">
                        Profile photo path ready
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
