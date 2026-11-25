import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page Not Found | Amit Portfolio';
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060D1A] text-slate-900 dark:text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white dark:bg-[#0B172A] border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-5">
        <div className="w-12 h-12 rounded-xl bg-[#0B192C] dark:bg-blue-600/20 text-white dark:text-blue-400 flex items-center justify-center mx-auto">
          <Compass className="w-6 h-6" aria-hidden="true" />
        </div>
        <div>
          <p className="font-mono text-sm font-semibold text-blue-700 dark:text-blue-400">404</p>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            The requested portfolio page does not exist or may have been moved.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B192C] dark:bg-blue-600 text-white text-sm font-semibold hover:bg-[#132948] dark:hover:bg-blue-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Return to Home</span>
        </Link>
      </div>
    </div>
  );
}
