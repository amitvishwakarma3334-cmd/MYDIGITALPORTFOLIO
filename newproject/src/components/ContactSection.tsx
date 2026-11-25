import { useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  AlertCircle,
  Briefcase,
  CheckCircle2,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  Send,
} from 'lucide-react';
import type { ProfileData } from '../types/portfolio';
import {
  formatWhatsAppUrl,
  isSafeExternalUrl,
  isValidConfiguredUrl,
} from '../utils/assetHelpers';

function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M16.002 3.2C8.932 3.2 3.2 8.932 3.2 16.002c0 2.257.59 4.46 1.71 6.401L3.09 29.05l6.81-1.787a12.745 12.745 0 0 0 6.102 1.552h.005c7.068 0 12.801-5.733 12.803-12.803A12.752 12.752 0 0 0 25.058 6.95 12.712 12.712 0 0 0 16.002 3.2Zm0 23.455h-.004a10.61 10.61 0 0 1-5.41-1.482l-.388-.23-4.04 1.06 1.078-3.939-.253-.403a10.59 10.59 0 0 1-1.624-5.659c.002-5.87 4.777-10.644 10.648-10.644 2.842.001 5.514 1.109 7.523 3.119a10.576 10.576 0 0 1 3.115 7.527c-.002 5.87-4.777 10.651-10.645 10.651Zm5.84-7.977c-.32-.16-1.894-.934-2.188-1.041-.293-.107-.507-.16-.72.16-.214.32-.827 1.041-1.014 1.255-.187.213-.374.24-.694.08-.32-.16-1.352-.498-2.575-1.589-.952-.85-1.595-1.899-1.782-2.219-.187-.32-.02-.493.14-.652.144-.144.32-.374.48-.561.16-.187.214-.32.32-.534.107-.213.054-.4-.026-.56-.08-.16-.72-1.735-.987-2.375-.26-.624-.524-.54-.72-.55l-.614-.01c-.213 0-.56.08-.854.4-.293.32-1.12 1.094-1.12 2.668 0 1.575 1.147 3.096 1.307 3.31.16.213 2.257 3.446 5.468 4.832.764.33 1.36.527 1.825.675.767.244 1.464.21 2.016.127.615-.092 1.894-.774 2.161-1.521.267-.748.267-1.388.187-1.522-.08-.133-.293-.213-.613-.373Z" />
    </svg>
  );
}

const WHATSAPP_PREFILL_MESSAGE =
  'Hello Amit, I visited your portfolio and would like to connect with you.';

export function ContactSection({ profile }: { profile: ProfileData }) {
  const prefersReducedMotion = useReducedMotion();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [formReadyMailto, setFormReadyMailto] = useState<string | null>(null);

  const contactPhone = profile.phone.trim() || profile.whatsapp_number.trim();
  const whatsappUrl = formatWhatsAppUrl(contactPhone, WHATSAPP_PREFILL_MESSAGE);
  const hasWhatsApp = Boolean(contactPhone && whatsappUrl);
  const hasWorkIndia = isValidConfiguredUrl(profile.workindia_url);

  const validateForm = (): string | null => {
    if (name.trim().length < 2) {
      return 'Please enter your name (at least 2 characters).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return 'Please enter a valid email address.';
    }
    if (subject.trim().length < 2) {
      return 'Please enter a subject.';
    }
    if (message.trim().length < 5) {
      return 'Please enter a message (at least 5 characters).';
    }
    return null;
  };

  const buildMailtoUrl = () =>
    `mailto:${profile.email}?subject=${encodeURIComponent(
      subject.trim() || 'Portfolio Inquiry'
    )}&body=${encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`
    )}`;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormReadyMailto(null);

    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    const mailtoHref = buildMailtoUrl();
    setFormReadyMailto(mailtoHref);
    window.location.href = mailtoHref;
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-white dark:bg-[#081223]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">
            Get in Touch
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-1.5">
            Contact &amp; Hiring Inquiries
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            Reach out directly via phone, email, or verified profiles for interviews and entry-level IT opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Contact Channels */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5 space-y-4"
          >
            <a
              href={`tel:${profile.phone}`}
              className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-[#0B172A] border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 transition-colors group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#0B192C] dark:bg-blue-600/20 text-white dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Call Now</p>
                  <p className="text-sm font-mono font-semibold text-slate-900 dark:text-white truncate">
                    {profile.phone}
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                Call
              </span>
            </a>

            <a
              href={`mailto:${profile.email}`}
              className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-[#0B172A] border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 transition-colors group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#0B192C] dark:bg-blue-600/20 text-white dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Email Me</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {profile.email}
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                Email
              </span>
            </a>

            {hasWhatsApp && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500 transition-colors group shadow-sm"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-white/15 text-white flex items-center justify-center shrink-0">
                    <WhatsAppIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">Chat on WhatsApp</p>
                    <p className="text-xs font-mono text-emerald-50/90 truncate">
                      +91 {contactPhone.replace(/\D/g, '').slice(-10)}
                    </p>
                  </div>
                </div>
                <ExternalLink
                  className="w-4 h-4 text-white/90 group-hover:translate-x-0.5 transition-transform shrink-0"
                  aria-hidden="true"
                />
              </a>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {isSafeExternalUrl(profile.linkedin_url) && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B172A] border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 text-sm font-semibold text-slate-800 dark:text-slate-100 transition-colors"
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
                  className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B172A] border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 text-sm font-semibold text-slate-800 dark:text-slate-100 transition-colors"
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
                  className="sm:col-span-2 flex items-center justify-center gap-2 p-3.5 rounded-xl bg-[#0B192C] dark:bg-blue-600 text-white hover:bg-[#132948] dark:hover:bg-blue-500 text-sm font-semibold transition-colors"
                >
                  <Briefcase className="w-4 h-4 text-emerald-300 dark:text-white" aria-hidden="true" />
                  <span>WorkIndia Profile</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" aria-hidden="true" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Static Email Composer Form */}
          <motion.form
            onSubmit={handleSubmit}
            noValidate
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="lg:col-span-7 bg-slate-50 dark:bg-[#0B172A] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/80 dark:border-slate-800">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Compose an Email Inquiry
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Opens in your default email app
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Recruiter or Company Name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="hr@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                placeholder="Interview Opportunity / Inquiry"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Share role details, interview schedule, or message..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 resize-y"
              />
            </div>

            {formError && (
              <div
                role="alert"
                className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-xs sm:text-sm text-red-700 dark:text-red-300 flex items-center gap-2.5"
              >
                <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{formError}</span>
              </div>
            )}

            {formReadyMailto && (
              <div
                role="status"
                className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 text-xs sm:text-sm text-blue-900 dark:text-blue-200 flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-1.5">
                  <p>
                    Email draft prepared for <span className="font-semibold">{profile.email}</span>. If your mail app did not open automatically, click below:
                  </p>
                  <a
                    href={formReadyMailto}
                    className="inline-flex items-center gap-1.5 font-semibold underline"
                  >
                    Open Email Draft
                  </a>
                </div>
              </div>
            )}

            <div className="pt-1">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B192C] dark:bg-blue-600 text-white text-sm font-semibold hover:bg-[#132948] dark:hover:bg-blue-500 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>Open in Email App</span>
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
