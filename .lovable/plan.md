## Goal
Revamp `707healthytreats.com.ng` as a single-page site that fuses the original brand (logo, calm voice, existing photos/videos) with the visual language of the uploaded slide deck (sage/olive palette, serif headlines, halftone dot motifs, rounded cards) — and add a working **Shop / Order** section with placeholder Selar links.

## Deliverable
1. **Standalone bundle** in `/mnt/documents/707-revamp/` — `index.html`, `styles.css`, `script.js`, README. Zipped as `707-revamp.zip` for download.
2. **Live preview** in this Lovable project — same three files served at `/` so she can click through it before publishing.

## Visual System (from slides)
- Palette: mint `#e8f0d8`, olive `#7a8f3a`, forest `#2d3a1a`, ink `#1a1a1a`, cream `#faf9f0`.
- Type: serif display (DM Serif Display / Lora) for headlines, Inter/Work Sans for body.
- Motifs: halftone dot clusters, large rounded olive cards with cream text, soft-radius photo frames.
- Keep original `Assets/logo707.png` lockup as `707_herbal tea`.

## Page Sections (one-page scroll)
1. **Hero** — serif headline + "Presented by chiwendu kalu" tagline + product box image. CTAs: **Shop Teas** (scrolls to shop), **Explore**. Sticky header w/ smooth-scroll nav.
2. **Most Herbal Teas Lack Genuine Purity** — circular framed photo + copy (slide 10).
3. **Our Herbal Tea Stands Apart** — 01/02 columns + olive "100%" badge (slide 7).
4. **Quality Standards** — image left + olive overlay card + Herb Sourcing / Freshness / Blend Integrity icons (slide 4).
5. **Built for Pure Flavor** — Whole Herb Quality + No Artificial Blending icon cards + product photo + 707 mark (slide 5).
6. **Features in Every Pack** — two olive feature cards + honey jar photo (slide 6).
7. **Results Worth Trusting** — stat row 100% / 4.9 / 96% + tablet/box image (slide 9).
8. **Trusted by Tea Lovers Daily** — animated CSS bar chart "Real Voices" (Quality/Aroma/Flavor/Satisfaction) — slide 2.
9. **🆕 Shop the Teas** — see "Shop Section" below.
10. **Simple & Clear Pricing** — product images + olive "100% Natural" and "Start From 5k" cards (slide 1, updated to match real prices).
11. **Other Services (from original site)** — 3 video cards (Herbal Tea Experience, Plant Matching, Pop-Ups & Events) reusing existing `.mp4` URLs from gallery.html. Custom Blends as 4th tile.
12. **Connect / Footer** — phone, Instagram `@707_treat`, WhatsApp CTA, "Let it Stim" tagline.

## 🆕 Shop Section — design + behavior
**Heading:** "Shop our Herbal Teas" with subline "Steep slow. Sip with intention."

**Grid:** responsive card grid (1 col mobile, 2 tablet, 3 desktop). Six tea cards:

| Tea | Price | Subliminal hook (1 line) | Benefits (3 bullets) | Brew ritual |
|-----|-------|--------------------------|-----------------------|-------------|
| **Lavender** | ₦5,000 / pack | "For the nights your mind won't quiet." | calms nerves · supports deeper sleep · eases tension headaches | 1 tsp in 250ml just-off-boil water, steep 5–7 min, sip 30 min before bed |
| **Saffron** | ₦5,000 / pack | "A few golden threads, a brighter mood." | lifts mood · supports focus · rich in antioxidants | 4–5 threads in hot water, steep 8 min, add honey to taste |
| **Rose Buds** | ₦5,000 / pack | "Soft on the heart. Glow from within." | clears skin · balances hormones · gentle on the gut | 1 tbsp buds, 90°C water, steep 5 min, breathe in before sipping |
| **Calendula** | ₦5,000 / pack | "Sunshine in a cup — for healing days." | soothes inflammation · supports digestion · gentle detox | 1 tsp petals, hot water, steep 8 min, drink warm after meals |
| **Spearmint** | ₦5,000 / pack | "Clear skin, clear head, every morning." | balances hormones · reduces bloating · fresh focus | 1 tsp leaves, 95°C water, steep 6 min, twice daily |
| **Lemongrass** | ₦5,000 / pack | "Bright, citrus, alive." | aids digestion · supports immunity · natural energy | 1 tsp, hot water, steep 5 min, lemon wedge optional |

Each card shows:
- rounded photo slot at top (placeholder div with tea name watermark — README explains how she drops in real photos)
- tea name (serif), price pill (olive)
- one-line hook in italic
- "Why people love it" — 3 bullets
- "How to brew" — short ritual
- **"Order on Selar →"** button — `href="#"` placeholder, `data-selar="<tea-slug>"` attribute so she can paste each Selar link later by editing one obvious block at the top of `script.js` (a `SELAR_LINKS` object). Until she does, clicking opens a small modal: "Selar link coming soon — DM @707_treat to order now" with a WhatsApp CTA.

**Honey add-on banner** (sticks just under the shop heading, also reappears as a soft note at the bottom of every card):
> "✦ Add a jar of our raw natural honey at checkout — pairs with every blend."

A dedicated **Honey** card at the end of the grid with its own Selar placeholder, so she can sell it standalone too.

## Interactions (vanilla JS, no framework)
- Sticky translucent header, smooth-scroll nav, mobile hamburger.
- IntersectionObserver: fade/slide-in for sections, animate bar chart fills on enter.
- Lazy-load videos; pause when off-screen.
- **Shop logic** (`script.js`):
  - `SELAR_LINKS = { lavender: "", saffron: "", ... , honey: "" }` — clearly commented "PASTE YOUR SELAR LINKS HERE".
  - On card button click: if link is non-empty → open in new tab; if empty → open "coming soon" modal with WhatsApp + Instagram fallbacks.

## Assets Strategy
- Use existing remote assets: `http://707healthytreats.com.ng/Assets/logo707.png`, `tea-experience.mp4`, `plant-matching.mp4`, `pop-up.mp4`, `Custom-blend.mp4`.
- Slide-style product shots reuse existing site imagery where possible; otherwise rounded placeholder slots labeled per tea — README documents how she swaps them in.
- No AI image generation (per user instruction).

## Technical Setup
- Files at `public/707/index.html`, `public/707/styles.css`, `public/707/script.js`.
- Update `src/routes/index.tsx` so the Lovable preview loads the revamp at `/` (renders the same HTML, or iframes `/707/index.html` full-bleed).
- Mirror to `/mnt/documents/707-revamp/` + zip.
- Responsive: mobile-first, breakpoints 640 / 1024.
- SEO: title, meta description, OG tags, single H1, alt text.

## README (in the bundle)
- How to upload the 3 files to her current host (replace index + add /assets).
- Where to paste Selar links (one block in `script.js`).
- Where to swap real tea photos (file names in `public/707/teas/`).

## Out of Scope
- No cart, no checkout on-site — Selar handles purchase; WhatsApp/Instagram remain the fallback channels.
- No backend, no auth, no React components.
