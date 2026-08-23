# Portfolio

A clean, modern one-page portfolio for a DevOps engineer. Next.js 15 (App Router) + Tailwind CSS v4 + TypeScript.

## Run it

```bash
npm run dev
```

Then open http://localhost:3000

```bash
npm run build && npm start
```

> Don't run `npm run build` while `npm run dev` is running — they share the `.next` folder and the dev server will start erroring. Stop dev first.

## Make it yours

**Everything you need to edit is in one file: [`src/config/site.ts`](src/config/site.ts).**

Name, role, tagline, links, stats, about text, skills, projects, education, experience, contact copy — all of it. No component files need touching.

A few notes:

- **Section order** — `order` lists the sections and their order on the page. The nav, the scroll-spy and the `01`/`02`/`03` above each heading all derive from it, so reordering or removing a line renumbers everything for you.
- **Experience** — renders as tabs, one role per panel. Each entry takes a `short` label for the tab (a long employer name won't fit the rail) and a `type` shown beside the company, e.g. `"Full-time"`. A `period` containing `Present` marks the role as current: it gets a pulsing dot on its tab and an accent date chip.
- **Company logos** — drop the file in `public/logos/` and point `logo` at it (`"/logos/aba-bank.png"`). SVG is best; otherwise around 400px wide is plenty, since it renders at ~100px. Logos sit at a fixed height on a white plate, so wordmarks and round emblems come out the same visual size in both themes. Set `logo: ""` and that company falls back to a lettered tile rather than a broken image.
- **Résumé** — drop your PDF into `public/` (e.g. `public/resume.pdf`) and point `links.resume` at `/resume.pdf`. Delete the `resume` line to hide the button.
- **Links** — remove any line in `links` (`github`, `linkedin`, …) and its icon disappears automatically.
- **Availability badge** — set `available: false` to hide the pulsing green badge.
- **Education** — `degree` and `school` are required; `location`, `credential`, `description`, `highlights` and `link` can each be left `""` (or removed) and that piece of the card disappears. `highlights` are the small chips — coursework, thesis, awards.
- **`url`** — update this to your real domain after deploying; it's used for SEO/link-preview metadata.
- **Section headings** — each entry in `sections` has a `label` (the small uppercase eyebrow), a `nav` (the shorter word in the top bar) and a `subtitle` (the big heading), so you can retitle them without touching components.

## Change the look

Colours live at the top of [`src/app/globals.css`](src/app/globals.css) as CSS variables — one block for dark, one for light. Change `--accent` and the whole site re-skins.

Type sizes come from Tailwind's own scale plus four named steps in the `@theme` block — `text-micro` (10px), `text-note` (13px), `text-body` (15px), `text-lead` (17px). Reach for one of those rather than adding another `text-[13.5px]`.

Cards, chips and icon buttons each have one shared component in [`src/components/ui/`](src/components/ui) — edit `Card.tsx` and every card on the page changes together.

The terminal animation in the hero is decorative; edit the `SCRIPT` array in [`src/components/Terminal.tsx`](src/components/Terminal.tsx) to change what it types.

## What's included

- Dark/light theme with a toggle, remembered in `localStorage`, applied before first paint so there's no flash
- Scroll-reveal animations, typing terminal, scrolling tech marquee, hover glows
- Sticky nav with scroll-spy active states and a mobile menu
- Fully responsive; verified with no horizontal overflow at 375px and 1280px
- Fully static — the whole page prerenders to HTML, so it's fast and indexable
- Respects `prefers-reduced-motion` (all animation disabled), and content stays visible with JS disabled

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
    page.tsx        section order
    globals.css     palette + type scale + animations
  components/
    ui/             Card, Chip, IconLink — the shared primitives
    skills/         the six looping toolchain visuals
    *.tsx           Nav, Hero, Terminal, About, Skills,
                    Education, Experience, Contact, Footer
  config/
    site.ts         ← edit this
    nav.ts          derives the nav + heading numbers from site.order
```
