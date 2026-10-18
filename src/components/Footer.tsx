import { site } from "@/config/site";

export default function Footer() {
  // Baked at build time — redeploys keep it current.
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-8 sm:px-8">
        <p className="text-note text-muted">
          © {year} {site.name}
        </p>
        <a
          href="#top"
          className="text-note font-semibold text-muted transition-colors hover:text-text"
        >
          Back to top
        </a>
      </div>
    </footer>
  );
}
