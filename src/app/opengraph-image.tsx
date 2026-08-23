import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The page re-themes; a link preview can't. These are the dark palette values
// from globals.css, pinned so the card always looks the same in a feed.
const BG = "#070809";
const TEXT = "#eceef1";
const MUTED = "#8a9099";
const FAINT = "#767d88";
const ACCENT = "#34d399";
const BORDER = "rgba(255,255,255,0.16)";

/**
 * Built at request time from `public/<photo>` rather than checked in as a flat
 * PNG, so editing name, role or location in site.ts re-renders the card too.
 */
export default async function Image() {
  const photo = site.photo
    ? `data:image/jpeg;base64,${readFileSync(
        join(process.cwd(), "public", site.photo.replace(/^\//, "")),
      ).toString("base64")}`
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: "0 80px",
          background: BG,
          backgroundImage: `radial-gradient(ellipse 60% 70% at 12% 0%, rgba(52,211,153,0.16), transparent), radial-gradient(ellipse 55% 65% at 95% 100%, rgba(56,189,248,0.13), transparent)`,
        }}
      >
        {photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt=""
            width={320}
            height={320}
            style={{
              width: 320,
              height: 320,
              borderRadius: 999,
              objectFit: "cover",
              border: `2px solid ${BORDER}`,
            }}
          />
        )}

        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 22,
              color: FAINT,
              letterSpacing: 2,
            }}
          >
            <div style={{ width: 40, height: 2, background: ACCENT }} />
            {site.location.toUpperCase()}
          </div>

          <div
            style={{
              marginTop: 20,
              fontSize: 76,
              fontWeight: 700,
              color: TEXT,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            {site.name}
          </div>

          <div
            style={{
              marginTop: 8,
              fontSize: 54,
              fontWeight: 700,
              color: ACCENT,
              letterSpacing: -1.5,
            }}
          >
            {site.role}
          </div>

          <div
            style={{
              marginTop: 28,
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            {/* Two: three wrap to a ragged 2-and-1 in the space left beside
                the portrait. Field name first, then the value it holds — the
                same reading order as the outcome chain on the page. */}
            {site.outcomes.slice(0, 2).map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  gap: 10,
                  padding: "10px 18px",
                  borderRadius: 999,
                  border: `1px solid ${BORDER}`,
                  fontSize: 22,
                  color: MUTED,
                }}
              >
                <span style={{ color: FAINT, textTransform: "uppercase" }}>
                  {item.label}
                </span>
                <span style={{ color: TEXT, fontWeight: 700 }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
