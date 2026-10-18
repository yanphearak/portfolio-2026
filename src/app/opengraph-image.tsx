import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The page re-themes; a link preview can't. These are the dark palette values
// from globals.css, pinned so the card always looks the same in a feed.
const BG = "#14202c";
const TEXT = "#e6ebf0";
const MUTED = "#9aa8b6";
const ACCENT = "#eba53c";

/**
 * Built at request time from `public/<photo>` rather than checked in as a flat
 * PNG, so editing name, role or location in site.ts re-renders the card too.
 * The outcome line from the hero runs along the bottom.
 */
export default async function Image() {
  const photo = site.photo
    ? `data:image/jpeg;base64,${readFileSync(
        join(process.cwd(), "public", site.photo.replace(/^\//, "")),
      ).toString("base64")}`
    : null;
  const stops = site.outcomes;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 80px 64px",
          background: BG,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 56 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div
              style={{
                fontSize: 88,
                fontWeight: 800,
                color: TEXT,
                letterSpacing: -3,
                lineHeight: 1,
              }}
            >
              {site.name}
            </div>
            <div style={{ marginTop: 20, fontSize: 36, color: MUTED }}>
              {`${site.role} in ${site.location}`}
            </div>
          </div>

          {photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo}
              alt=""
              width={200}
              height={200}
              style={{ width: 200, height: 200, borderRadius: 10, objectFit: "cover" }}
            />
          )}
        </div>

        {/* the outcome line: the hero's, stop for stop. Four equal columns
            with the stop at the left of each, as on the page, so the line
            runs from 13px to a quarter-width short of the right edge. */}
        <div style={{ display: "flex", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 13,
              // Satori has no calc(): the row is 1040px wide (1200 less padding).
              right: 1040 / stops.length - 13,
              top: 10,
              height: 6,
              background: ACCENT,
            }}
          />
          {stops.map((item) => (
            <div
              key={item.label}
              style={{ display: "flex", flexDirection: "column", flex: 1 }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 999,
                  background: BG,
                  border: `5px solid ${ACCENT}`,
                }}
              />
              <div
                style={{
                  marginTop: 18,
                  fontSize: 28,
                  fontWeight: 700,
                  color: TEXT,
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
