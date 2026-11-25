import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Award,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  X,
} from 'lucide-react';
import type { CertificateCategory, CertificateItem } from '../types/portfolio';
import { isSafeExternalUrl, resolveAssetUrl, triggerFileDownload } from '../utils/assetHelpers';

type FilterTab = 'all' | CertificateCategory;
type CertificateSide = 'front' | 'back';

function buildCertificateDownloadName(title: string, imageUrl: string, sideSuffix?: string): string {
  const ext = imageUrl.split('.').pop()?.split('?')[0] || 'png';
  const cleanTitle = title.replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '');
  return sideSuffix ? `${cleanTitle}_${sideSuffix}.${ext}` : `${cleanTitle}.${ext}`;
}

function CertificateCard({
  cert,
  index,
  onOpen,
  onImageStatus,
}: {
  cert: CertificateItem;
  index: number;
  onOpen: (cert: CertificateItem, imgReady: boolean, side: CertificateSide) => void;
  onImageStatus: (key: string, ok: boolean) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [side, setSide] = useState<CertificateSide>('front');
  const [failedSides, setFailedSides] = useState<{ front: boolean; back: boolean }>({
    front: false,
    back: false,
  });

  const hasBackSide = Boolean(cert.secondary_image_url && isSafeExternalUrl(cert.secondary_image_url));
  const activeUrl =
    side === 'back' && cert.secondary_image_url ? cert.secondary_image_url : cert.image_url;

  useEffect(() => {
    setFailedSides({ front: false, back: false });
    setSide('front');
  }, [cert.image_url, cert.secondary_image_url]);

  const safeSrc = isSafeExternalUrl(activeUrl);
  const currentFailed = side === 'back' ? failedSides.back : failedSides.front;
  const canShowImg = safeSrc && !currentFailed;

  const frontReady = isSafeExternalUrl(cert.image_url) && !failedSides.front;
  const backReady =
    Boolean(cert.secondary_image_url && isSafeExternalUrl(cert.secondary_image_url)) &&
    !failedSides.back;

  const handleDownload = (e: React.MouseEvent, targetUrl: string, suffix?: string) => {
    e.stopPropagation();
    if (!isSafeExternalUrl(targetUrl)) return;
    triggerFileDownload(targetUrl, buildCertificateDownloadName(cert.title, targetUrl, suffix));
  };

  return (
    <motion.article
      layout
      initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.25) }}
      className="group bg-white dark:bg-[#0B172A] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col hover:border-blue-400 dark:hover:border-blue-600/70 transition-colors"
    >
      <div
        onClick={() => onOpen(cert, canShowImg, side)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpen(cert, canShowImg, side);
          }
        }}
        aria-label={`Preview ${cert.title}`}
        className="relative aspect-[4/3] bg-slate-100 dark:bg-[#071121] border-b border-slate-100 dark:border-slate-800 p-3 flex items-center justify-center overflow-hidden cursor-pointer"
      >
        {canShowImg ? (
          <>
            <img
              src={resolveAssetUrl(activeUrl)}
              alt={`${cert.title} — ${cert.issuer}${hasBackSide ? ` (${side === 'front' ? cert.primary_image_label || 'Front' : cert.secondary_image_label || 'Back'})` : ''}`}
              loading="lazy"
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              onLoad={() => onImageStatus(`${cert.id}:${side}`, true)}
              onError={() => {
                setFailedSides((prev) => ({ ...prev, [side]: true }));
                onImageStatus(`${cert.id}:${side}`, false);
              }}
            />
            <span className="absolute right-3 bottom-3 w-8 h-8 rounded-lg bg-slate-900/75 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4" aria-hidden="true" />
            </span>
          </>
        ) : (
          <div className="w-full h-full rounded-xl border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-center px-4">
            {cert.category === 'course' ? (
              <BadgeCheck className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" aria-hidden="true" />
            ) : (
              <Award className="w-8 h-8 text-sky-600 dark:text-sky-400 mb-2" aria-hidden="true" />
            )}
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 line-clamp-2">
              {cert.title}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono truncate max-w-full">
              {activeUrl}
            </p>
          </div>
        )}

        {hasBackSide && (
          <div
            onClick={(e) => e.stopPropagation()}
            role="group"
            aria-label="Switch certificate side"
            className="absolute left-3 top-3 inline-flex items-center gap-1 p-1 rounded-lg bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 shadow-xs"
          >
            <button
              type="button"
              onClick={() => setSide('front')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                side === 'front'
                  ? 'bg-[#0B192C] text-white dark:bg-blue-600'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cert.primary_image_label || 'Front'}
            </button>
            <button
              type="button"
              onClick={() => setSide('back')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                side === 'back'
                  ? 'bg-[#0B192C] text-white dark:bg-blue-600'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cert.secondary_image_label || 'Back'}
            </button>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-blue-700 dark:text-blue-400">
              {cert.category === 'course' ? 'Course Completion' : 'Kaggle Achievement'}
            </span>
            {cert.date_label && (
              <>
                <span aria-hidden="true">·</span>
                <span>{cert.date_label}</span>
              </>
            )}
            {cert.duration_label && (
              <>
                <span aria-hidden="true">·</span>
                <span>{cert.duration_label}</span>
              </>
            )}
          </div>

          <h3 className="font-display text-base font-bold text-slate-900 dark:text-white leading-snug">
            {cert.title}
          </h3>
          <p className="text-xs font-medium text-slate-700 dark:text-slate-300">{cert.issuer}</p>

          {(cert.institute_label || cert.score_label) && (
            <div className="pt-1 space-y-0.5 text-xs text-slate-600 dark:text-slate-400">
              {cert.institute_label && (
                <p>
                  <span className="font-medium text-slate-700 dark:text-slate-300">Training Institute:</span>{' '}
                  {cert.institute_label}
                </p>
              )}
              {cert.score_label && (
                <p>
                  <span className="font-medium text-slate-700 dark:text-slate-300">Assessment Score:</span>{' '}
                  <span className="font-mono font-semibold text-blue-700 dark:text-blue-400 tabular-nums">
                    {cert.score_label}
                  </span>
                </p>
              )}
            </div>
          )}

          {cert.description && (
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
              {cert.description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={() => onOpen(cert, canShowImg, side)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 dark:text-blue-400 hover:underline cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>View Fullscreen</span>
          </button>

          {hasBackSide ? (
            <div className="flex flex-wrap items-center gap-1.5">
              {frontReady && (
                <button
                  type="button"
                  onClick={(e) => handleDownload(e, cert.image_url, 'Front')}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Front</span>
                </button>
              )}
              {backReady && cert.secondary_image_url && (
                <button
                  type="button"
                  onClick={(e) => handleDownload(e, cert.secondary_image_url!, 'Back')}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Back</span>
                </button>
              )}
            </div>
          ) : (
            canShowImg && (
              <button
                type="button"
                onClick={(e) => handleDownload(e, cert.image_url)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Download</span>
              </button>
            )
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function CertificatesSection({ certificates }: { certificates: CertificateItem[] }) {
  const prefersReducedMotion = useReducedMotion();
  const [filter, setFilter] = useState<FilterTab>('all');
  const [activeCert, setActiveCert] = useState<CertificateItem | null>(null);
  const [activeSide, setActiveSide] = useState<CertificateSide>('front');
  const [loadedMap, setLoadedMap] = useState<Record<string, boolean>>({});

  const courseCertificates = useMemo(
    () => certificates.filter((c) => c.category === 'course'),
    [certificates]
  );
  const kaggleAchievements = useMemo(
    () => certificates.filter((c) => c.category === 'kaggle'),
    [certificates]
  );

  const visibleList = useMemo(() => {
    if (filter === 'course') return courseCertificates;
    if (filter === 'kaggle') return kaggleAchievements;
    return [...courseCertificates, ...kaggleAchievements];
  }, [courseCertificates, filter, kaggleAchievements]);

  useEffect(() => {
    if (!activeCert) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCert(null);
      } else if (e.key === 'ArrowRight') {
        const idx = visibleList.findIndex((c) => c.id === activeCert.id);
        if (idx >= 0 && visibleList.length > 1) {
          setActiveCert(visibleList[(idx + 1) % visibleList.length]);
          setActiveSide('front');
        }
      } else if (e.key === 'ArrowLeft') {
        const idx = visibleList.findIndex((c) => c.id === activeCert.id);
        if (idx >= 0 && visibleList.length > 1) {
          setActiveCert(visibleList[(idx - 1 + visibleList.length) % visibleList.length]);
          setActiveSide('front');
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeCert, visibleList]);

  if (certificates.length === 0) {
    return null;
  }

  const handleImageStatus = (key: string, ok: boolean) => {
    setLoadedMap((prev) => (prev[key] === ok ? prev : { ...prev, [key]: ok }));
  };

  const activeIndex = activeCert ? visibleList.findIndex((c) => c.id === activeCert.id) : -1;
  const modalHasBack = Boolean(
    activeCert?.secondary_image_url && isSafeExternalUrl(activeCert.secondary_image_url)
  );
  const modalImageUrl = activeCert
    ? activeSide === 'back' && activeCert.secondary_image_url
      ? activeCert.secondary_image_url
      : activeCert.image_url
    : '';
  const modalStatusKey = activeCert ? `${activeCert.id}:${activeSide}` : '';
  const activeImageLoaded = activeCert
    ? loadedMap[modalStatusKey] !== false && isSafeExternalUrl(modalImageUrl)
    : false;

  return (
    <section id="certificates" className="py-16 sm:py-20 border-b border-slate-200 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">
              Verified Credentials
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-1.5">
              Certificates &amp; Achievements
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
              Formal course completion and skill certificates are separated clearly from Kaggle platform achievement badges.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter certificates by category"
            className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 self-start"
          >
            {[
              { id: 'all' as const, label: `All (${certificates.length})` },
              { id: 'course' as const, label: `Course Certificates (${courseCertificates.length})` },
              { id: 'kaggle' as const, label: `Kaggle Badges (${kaggleAchievements.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={filter === tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  filter === tab.id
                    ? 'bg-white dark:bg-[#0B192C] text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-12">
          {(filter === 'all' || filter === 'course') && courseCertificates.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                <BadgeCheck className="w-5 h-5 text-blue-700 dark:text-blue-400 shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    Course &amp; Skill Certificates
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    National skill certifications, structured training, and course completions
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courseCertificates.map((cert, idx) => (
                  <CertificateCard
                    key={cert.id}
                    cert={cert}
                    index={idx}
                    onOpen={(c, ready, side) => {
                      handleImageStatus(`${c.id}:${side}`, ready);
                      setActiveSide(side);
                      setActiveCert(c);
                    }}
                    onImageStatus={handleImageStatus}
                  />
                ))}
              </div>
            </div>
          )}

          {(filter === 'all' || filter === 'kaggle') && kaggleAchievements.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                <Award className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    Kaggle Achievements
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Platform learning badges &amp; community milestones on Kaggle
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {kaggleAchievements.map((cert, idx) => (
                  <CertificateCard
                    key={cert.id}
                    cert={cert}
                    index={idx}
                    onOpen={(c, ready, side) => {
                      handleImageStatus(`${c.id}:${side}`, ready);
                      setActiveSide(side);
                      setActiveCert(c);
                    }}
                    onImageStatus={handleImageStatus}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCert(null)}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label={activeCert.title}
          >
            <motion.div
              initial={prefersReducedMotion ? false : { scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={prefersReducedMotion ? undefined : { scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl bg-white dark:bg-[#0B172A] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl"
            >
              <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">
                    {activeCert.category === 'course' ? 'Course / Skill Certificate' : 'Kaggle Achievement'}
                  </p>
                  <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                    {activeCert.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {activeCert.issuer}
                    {activeCert.date_label ? ` · ${activeCert.date_label}` : ''}
                    {activeCert.duration_label ? ` · ${activeCert.duration_label}` : ''}
                    {activeCert.score_label ? ` · Score: ${activeCert.score_label}` : ''}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {modalHasBack && (
                    <div
                      role="group"
                      aria-label="Switch certificate side"
                      className="inline-flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveSide('front')}
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                          activeSide === 'front'
                            ? 'bg-[#0B192C] text-white dark:bg-blue-600'
                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {activeCert.primary_image_label || 'Front Side'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveSide('back')}
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                          activeSide === 'back'
                            ? 'bg-[#0B192C] text-white dark:bg-blue-600'
                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {activeCert.secondary_image_label || 'Back Side'}
                      </button>
                    </div>
                  )}

                  {modalHasBack ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          triggerFileDownload(
                            activeCert.image_url,
                            buildCertificateDownloadName(activeCert.title, activeCert.image_url, 'Front')
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B192C] dark:bg-blue-600 text-white text-xs font-semibold hover:bg-[#132948] dark:hover:bg-blue-500 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Download Front</span>
                      </button>
                      {activeCert.secondary_image_url && (
                        <button
                          type="button"
                          onClick={() =>
                            triggerFileDownload(
                              activeCert.secondary_image_url!,
                              buildCertificateDownloadName(
                                activeCert.title,
                                activeCert.secondary_image_url!,
                                'Back'
                              )
                            )
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Download Back</span>
                        </button>
                      )}
                    </>
                  ) : (
                    activeImageLoaded && (
                      <button
                        type="button"
                        onClick={() =>
                          triggerFileDownload(
                            activeCert.image_url,
                            buildCertificateDownloadName(activeCert.title, activeCert.image_url)
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B192C] dark:bg-blue-600 text-white text-xs font-semibold hover:bg-[#132948] dark:hover:bg-blue-500 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" aria-hidden="true" />
                        <span className="hidden sm:inline">Download</span>
                      </button>
                    )
                  )}

                  <button
                    type="button"
                    onClick={() => setActiveCert(null)}
                    aria-label="Close certificate preview"
                    className="w-9 h-9 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="relative flex-1 bg-slate-100 dark:bg-[#060D1A] p-4 sm:p-6 flex items-center justify-center min-h-[320px] overflow-auto">
                {activeImageLoaded ? (
                  <img
                    src={resolveAssetUrl(modalImageUrl)}
                    alt={`${activeCert.title} full preview (${activeSide})`}
                    className="max-h-[65vh] w-auto object-contain rounded-lg shadow-md"
                  />
                ) : (
                  <div className="text-center max-w-md space-y-2 p-6">
                    <Award className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto" aria-hidden="true" />
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Certificate image not uploaded yet
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono break-all">
                      Expected path: {modalImageUrl}
                    </p>
                  </div>
                )}

                {visibleList.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCert(
                          visibleList[(activeIndex - 1 + visibleList.length) % visibleList.length]
                        );
                        setActiveSide('front');
                      }}
                      aria-label="Previous certificate"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 flex items-center justify-center shadow-md hover:bg-white cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCert(visibleList[(activeIndex + 1) % visibleList.length]);
                        setActiveSide('front');
                      }}
                      aria-label="Next certificate"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 flex items-center justify-center shadow-md hover:bg-white cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {(activeCert.description || activeCert.institute_label || activeCert.score_label) && (
                <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-1">
                  {activeCert.institute_label && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Training Institute: <span className="font-medium text-slate-800 dark:text-slate-200">{activeCert.institute_label}</span>
                      {activeCert.score_label && (
                        <>
                          {' · '}Assessment Score:{' '}
                          <span className="font-mono font-semibold text-blue-700 dark:text-blue-400 tabular-nums">
                            {activeCert.score_label}
                          </span>
                        </>
                      )}
                    </p>
                  )}
                  {activeCert.description && <p>{activeCert.description}</p>}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
