import { useState, type MouseEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, ExternalLink, FolderGit2, Github, Globe } from 'lucide-react';
import type { ProjectItem } from '../types/portfolio';
import { isSafeExternalUrl } from '../utils/assetHelpers';

function TiltProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const prefersReducedMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: Number((-y * 5).toFixed(2)),
      rotateY: Number((x * 5).toFixed(2)),
    });
  };

  const resetTilt = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const hasLiveUrl = isSafeExternalUrl(project.live_url);
  const hasGithubUrl = isSafeExternalUrl(project.github_url);

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <motion.article
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                rotateX: tilt.rotateX,
                rotateY: tilt.rotateY,
              }
        }
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="h-full bg-slate-50 dark:bg-[#0B172A] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-blue-400 dark:hover:border-blue-600/70 transition-colors"
      >
      {/* Visual Preview Header */}
      <div>
        <div className="h-36 bg-gradient-to-br from-[#0B192C] via-[#102647] to-[#1A3B6E] p-5 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-blue-200">{project.category}</span>
            <FolderGit2 className="w-4 h-4 text-sky-300 shrink-0" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold tracking-tight text-white">
              {project.title}
            </h3>
            {project.preview_label && (
              <p className="text-xs text-blue-200/80 mt-0.5">{project.preview_label}</p>
            )}
          </div>
        </div>

        <div className="p-6 space-y-5">
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {project.description}
          </p>

          {project.highlights.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Key Highlights
              </p>
              <ul className="space-y-1.5">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle2
                      className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.technologies.length > 0 && (
            <div className="pt-2 border-t border-slate-200/70 dark:border-slate-800">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                Verified Stack
              </p>
              <p className="text-xs font-mono text-slate-800 dark:text-slate-200">
                {project.technologies.join(' · ')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-6 pb-6 pt-2 flex flex-wrap items-center gap-2.5">
        {hasLiveUrl && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B192C] dark:bg-blue-600 text-white text-xs sm:text-sm font-semibold hover:bg-[#132948] dark:hover:bg-blue-500 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Live Demo</span>
            <ExternalLink className="w-3 h-3 opacity-80" aria-hidden="true" />
          </a>
        )}

        {hasGithubUrl && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <Github className="w-3.5 h-3.5" aria-hidden="true" />
            <span>GitHub Source</span>
            <ExternalLink className="w-3 h-3 opacity-70" aria-hidden="true" />
          </a>
        )}

        {!hasLiveUrl && !hasGithubUrl && (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Personal project showcase (demo link optional)
          </span>
        )}
      </div>
      </motion.article>
    </motion.div>
  );
}

export function ProjectsSection({ projects }: { projects: ProjectItem[] }) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section
      id="projects"
      className="py-16 sm:py-20 bg-white dark:bg-[#081223] border-b border-slate-200 dark:border-slate-800/80"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">
            Selected Work
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-1.5">
            Projects Showcase
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            Personal web development and technical projects built while learning and applying software fundamentals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <TiltProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
