# Portfolio

A one-page portfolio for a DevOps engineer, drawn like a transit map: delivery work is lines and stops. Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript, set in Overpass.

## Run it

```bash
npm run dev
```

Then open http://localhost:3000

```bash
npm run build && npm start
```

Or with Docker, no local Node needed — production build on http://localhost:3000:

```bash
docker compose up -d --build   # rebuild after edits
docker compose down
```

> Don't run `npm run build` while `npm run dev` is running — they share the `.next` folder and the dev server will start erroring. Stop dev first.

## Make it yours

**Everything you need to edit is in one file: [`src/config/site.ts`](src/config/site.ts).**

Name, role, tagline, links, stats, about text, skills, projects, education, experience, contact copy — all of it. No component files need touching.

A few notes:

- **Section order** — `order` lists the sections and their order on the page. The page, the route-strip nav and the scroll-spy all derive from it; the first section starts the line down the left margin and the last one ends it.
- **Outcomes** — the four stops on the line under the hero. Order matters: each should follow from the one before.
- **Experience** — renders as a timeline, one stop per role, with `type` shown beside the company, e.g. `"Full-time"`. The first four `highlights` show and the rest fold behind "Show more". A `period` containing `Present` marks the role as current, and its end date is set in the accent.
- **Company logos** — drop the file in `public/logos/` and point `logo` at it (`"/logos/aba-bank.png"`). SVG is best; otherwise around 400px wide is plenty, since it renders at ~100px. Logos sit at a fixed height on a white plate, so wordmarks and round emblems come out the same visual size in both themes. Set `logo: ""` and that company falls back to a lettered tile rather than a broken image.
- **Résumé** — drop your PDF into `public/` (e.g. `public/resume.pdf`) and point `links.resume` at `/resume.pdf`. Delete the `resume` line to hide the button.
- **Links** — remove any line in `links` (`github`, `linkedin`, …) and its icon disappears automatically.
- **Availability** — set `available: false` to hide the green-dot line under your role.
- **Education** — `degree` and `school` are required; `location`, `credential`, `description`, `highlights` and `link` can each be left `""` (or removed) and that piece of the entry disappears. `highlights` are the small tags — coursework, thesis, awards.
- **`url`** — update this to your real domain after deploying; it's used for SEO/link-preview metadata.
- **Section headings** — each entry in `sections` has a `label` (the name of its stop on the line), a `nav` (the shorter word in the top bar) and a `subtitle` (the big heading), so you can retitle them without touching components.

## Change the look

Colours live at the top of [`src/app/globals.css`](src/app/globals.css) as CSS variables — one block for dark, one for light. `--accent` is the amber main line (links, buttons, the current stop); change it and the site re-skins. Each toolchain card has its own line colour, `--line-<vis>`, which tints only that card. The share image in `src/app/opengraph-image.tsx` pins the dark values, so update it by hand if you change them.

Type sizes come from Tailwind's own scale plus named steps in the `@theme` block — `text-micro` (10px), `text-note` (13px), `text-body` (15px), `text-lead` (17px) and `text-display` (the hero name). Reach for one of those rather than adding another `text-[13.5px]`.

Cards, chips and icon buttons each have one shared component in [`src/components/ui/`](src/components/ui) — edit `Card.tsx` and every card on the page changes together.

## What's included

- Dark/light theme with a toggle, remembered in `localStorage`, applied before first paint so there's no flash
- One load animation: the hero's outcome line draws itself and lights each stop. Pure CSS
- Six looping toolchain visuals that pause when off screen
- Sticky route-strip nav: the stretch up to the current section is lit. Mobile menu runs the same route vertically
- Fully responsive; verified with no horizontal overflow at 375px and 1280px
- Fully static — the whole page prerenders to HTML, so it's fast and indexable
- Respects `prefers-reduced-motion` (the line renders finished, visuals park on their last frame), and everything is visible with JS disabled

## Deploy

Fully static output, so anywhere works. This one is on Vercel, connected to
this repo — every push to `main` deploys, and pull requests get their own
preview URL. No configuration: Vercel detects Next.js and uses `npm run build`.

If you fork it, remember to point `url` in `src/config/site.ts` at your own
domain — it's what the link-preview and canonical metadata resolve against.

Netlify, Cloudflare Pages, or a static host work too (`npm run build`).

## Structure

```
src/
  app/
    layout.tsx      metadata, fonts, no-flash theme script
    page.tsx        renders sections in site.order
    globals.css     palette + line colours + type scale + animations
  components/
    ui/             Card, Chip, IconLink — the shared primitives
    skills/         the six looping toolchain visuals
    *.tsx           Nav, Hero, OutcomeLine, Section, About, Skills,
                    Education, Experience, Contact, Footer
  config/
    site.ts         ← edit this
    nav.ts          derives the nav from site.order
```
