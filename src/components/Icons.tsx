// Inline SVGs — no icon package, no extra network request.

type P = { className?: string };
const base = "h-[1.15em] w-[1.15em]";

export const GitHubIcon = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={`${base} ${className}`} aria-hidden>
    <path d="M12 .5C5.73.5.99 5.24.99 11.5c0 4.86 3.15 8.98 7.52 10.44.55.1.75-.24.75-.53v-1.9c-3.06.66-3.71-1.3-3.71-1.3-.5-1.28-1.23-1.62-1.23-1.62-1-.68.08-.67.08-.67 1.1.08 1.68 1.14 1.68 1.14.98 1.69 2.58 1.2 3.21.92.1-.72.39-1.2.7-1.48-2.44-.28-5.01-1.23-5.01-5.46 0-1.21.43-2.2 1.13-2.97-.11-.28-.49-1.4.11-2.92 0 0 .93-.3 3.05 1.14a10.5 10.5 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.6 1.52.22 2.64.11 2.92.7.77 1.13 1.76 1.13 2.97 0 4.24-2.58 5.18-5.03 5.45.4.34.75 1.02.75 2.06v3.05c0 .3.2.64.76.53a11.02 11.02 0 0 0 7.51-10.44C23.01 5.24 18.27.5 12 .5Z" />
  </svg>
);

export const LinkedInIcon = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={`${base} ${className}`} aria-hidden>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-.95 1.83-1.95 3.76-1.95 4.02 0 4.765 2.5 4.765 5.76V21h-4v-5.66c0-1.35-.03-3.09-1.94-3.09-1.94 0-2.24 1.47-2.24 2.99V21h-4V9Z" />
  </svg>
);

export const TelegramIcon = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={`${base} ${className}`} aria-hidden>
    <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm5.42 7.7-1.9 8.94c-.14.63-.52.79-1.05.49l-2.9-2.14-1.4 1.35c-.16.15-.29.29-.58.29l.2-2.96 5.4-4.88c.24-.2-.05-.32-.36-.12l-6.68 4.2-2.88-.9c-.62-.2-.64-.63.13-.94l11.26-4.34c.52-.19.98.12.76 1.01Z" />
  </svg>
);

export const MailIcon = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`} aria-hidden>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="m3 7 8.1 5.6a1.6 1.6 0 0 0 1.8 0L21 7" />
  </svg>
);

export const FileIcon = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`} aria-hidden>
    <path d="M14 2.5H7a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7.5l-5-5Z" />
    <path d="M14 2.5v5h5M9 13h6M9 17h4" />
  </svg>
);

export const ArrowIcon = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`} aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ExternalIcon = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`} aria-hidden>
    <path d="M14 4h6v6M20 4l-9 9M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />
  </svg>
);

export const SunIcon = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={`${base} ${className}`} aria-hidden>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2v2.4M12 19.6V22M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2 12h2.4M19.6 12H22M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
  </svg>
);

export const MoonIcon = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`} aria-hidden>
    <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z" />
  </svg>
);

export const MenuIcon = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" className={`${base} ${className}`} aria-hidden>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

// Paper plane — the "alert sent" marker on the anomaly card.
export const SendIcon = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`} aria-hidden>
    <path d="M21.5 2.5 10.8 13.2M21.5 2.5l-7 19-3.7-8.3-8.3-3.7 19-7Z" />
  </svg>
);

// Heavier stroke than the rest — this one renders at ~10px.
export const CheckIcon = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`} aria-hidden>
    <path d="M5 12.5 10 17.5 19 7" />
  </svg>
);

export const CloseIcon = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" className={`${base} ${className}`} aria-hidden>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
