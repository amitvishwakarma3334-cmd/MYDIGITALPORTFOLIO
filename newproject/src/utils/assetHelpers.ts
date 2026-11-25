export function isSafeExternalUrl(rawUrl: string): boolean {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return false;
  }
  if (trimmed.startsWith('./') || (trimmed.startsWith('/') && !trimmed.startsWith('//'))) {
    return true;
  }
  try {
    const parsed = new URL(trimmed);
    return (
      parsed.protocol === 'https:' ||
      parsed.protocol === 'http:' ||
      parsed.protocol === 'mailto:' ||
      parsed.protocol === 'tel:'
    );
  } catch {
    return false;
  }
}

export function resolveAssetUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed.startsWith('/') || trimmed.startsWith('//')) {
    return trimmed;
  }
  const base = import.meta.env.BASE_URL || '/';
  return base.endsWith('/') ? `${base}${trimmed.slice(1)}` : `${base}/${trimmed.slice(1)}`;
}

export function scrollToSection(sectionId: string, reducedMotion = false): void {
  const cleanId = sectionId.replace(/^#/, '');
  const el = document.getElementById(cleanId);
  if (el) {
    el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  }
}

export function isValidConfiguredUrl(rawUrl: string): boolean {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return false;
  }
  const upper = trimmed.toUpperCase();
  if (
    upper.includes('PLACEHOLDER') ||
    upper.includes('YOUR_WORKINDIA') ||
    upper.includes('ADD_YOUR_')
  ) {
    return false;
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export async function checkPdfAvailable(url: string): Promise<boolean> {
  const resolved = resolveAssetUrl(url);
  if (!resolved || !isSafeExternalUrl(resolved)) {
    return false;
  }

  try {
    const headResponse = await fetch(resolved, { method: 'HEAD', cache: 'no-store' });
    if (headResponse.ok) {
      const contentType = (headResponse.headers.get('content-type') ?? '').toLowerCase();
      if (contentType.includes('application/pdf')) {
        return true;
      }
      if (contentType.includes('text/html')) {
        return false;
      }
    }

    const getResponse = await fetch(resolved, {
      method: 'GET',
      headers: { Range: 'bytes=0-16' },
      cache: 'no-store',
    });
    if (!getResponse.ok) {
      return false;
    }
    const contentType = (getResponse.headers.get('content-type') ?? '').toLowerCase();
    if (contentType.includes('text/html')) {
      return false;
    }
    if (contentType.includes('application/pdf')) {
      return true;
    }
    const buffer = await getResponse.arrayBuffer();
    const headerText = new TextDecoder().decode(buffer.slice(0, 5));
    return headerText === '%PDF-';
  } catch {
    return false;
  }
}

export function triggerFileDownload(url: string, filename: string): void {
  const resolved = resolveAssetUrl(url);
  if (!isSafeExternalUrl(resolved)) {
    return;
  }
  const anchor = document.createElement('a');
  anchor.href = resolved;
  anchor.download = filename;
  anchor.rel = 'noopener noreferrer';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

export function formatWhatsAppUrl(rawPhone: string, message?: string): string {
  const digits = rawPhone.replace(/\D/g, '');
  if (!digits) {
    return '';
  }
  const normalized = digits.length === 10 ? `91${digits}` : digits;
  const baseUrl = `https://wa.me/${normalized}`;
  if (message && message.trim()) {
    return `${baseUrl}?text=${encodeURIComponent(message.trim())}`;
  }
  return baseUrl;
}
