# Plan — Video clips, new teas, Bookclub popups, custom domain

## Where the videos come from
All site videos live in `public/707/assets/`. They were downloaded earlier from the original `707healthytreats.com.ng` site so the GitHub Pages build serves them locally (no mixed-content blocks):
- `tea-experience.mp4` — currently used in the **hero**, "Herbal Tea Experience" service card, "Built for Pure Flavor", and "Trusted by Herbal Tea Lovers Daily"
- `Custom-blend.mp4`, `plant-matching.mp4`, `pop-up.mp4` — used in other sections

You're right that the same `tea-experience.mp4` is reused in those four spots.

## What I'll do

### 1. Clip the hero video to a 4-second loop
- Use `ffmpeg` (already in the sandbox) to cut `tea-experience.mp4` to its first 4 seconds and save as `public/707/assets/hero-loop.mp4` (re-encoded clean for smooth looping).
- Repoint to `hero-loop.mp4` in these four places:
  - Hero (`#top`)
  - "Herbal Tea Built for Pure Flavor"
  - "Herbal Tea Experience" service card
- Leave the original `tea-experience.mp4` in place because it's about to be **replaced** in the "Trusted" slot (see step 3).

### 2. Replace the first two teas with Miracle Leaf and Holy Basil
- Convert `HolyBasil.HEIC` → `holy-basil.jpg` (browsers don't render HEIC).
- Save `MiracleLeaf.JPG` → `miracle-leaf.jpg`.
- Both go in `public/707/assets/`.
- In `script.js`, replace the **Lavender** and **Saffron** entries (first two cards) with:
  - **Miracle Leaf (Bryophyllum)** — hook, 3 benefits (kidney support, respiratory ease, anti-inflammatory), brew instructions, ₦5,000.
  - **Holy Basil (Tulsi)** — hook, 3 benefits (stress/adaptogen, immunity, blood-sugar balance), brew instructions, ₦5,000.
- Update `teaCard()` so cards with a `photo` field render the real image instead of the colored gradient placeholder; gradient stays as fallback for the other teas.

### 3. Wire in the two newly uploaded videos
- Copy `Tea experience.mp4` → `public/707/assets/tea-experience-new.mp4` and use it in the **"Trusted by Herbal Tea Lovers Daily"** block (replaces the current `tea-experience.mp4` there).
- Copy `BookclubPopup.mp4` → `public/707/assets/bookclub-popup.mp4` and add a new **"Bookclub Pop-Ups"** card inside the Services / Pop-Ups grid, sitting next to "Pop-Ups & Events" with a short blurb.

### 4. Deploy to `707healthytreats.com.ng` via GitHub Pages
- Add `public/707/CNAME` containing `707healthytreats.com.ng` so every Actions deploy keeps the custom domain bound (without this, the domain unsets on each deploy).
- The existing `.github/workflows/deploy-pages.yml` already copies `public/707/*` → `_site/`, so the CNAME ships automatically.

**You'll need to do these once in your DNS + GitHub UI** (I can't do them for you):
1. **DNS at your registrar** for `707healthytreats.com.ng` (apex):
   - `A` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - (Optional) `CNAME` for `www` → `<your-username>.github.io`
2. **GitHub → Settings → Pages**:
   - Source: **GitHub Actions**
   - Custom domain: `707healthytreats.com.ng` → Save → tick **Enforce HTTPS** once the cert provisions (a few minutes).

Once DNS propagates, every push to `main` redeploys the site to your domain.

## Technical notes
- ffmpeg cut command: `ffmpeg -ss 0 -i tea-experience.mp4 -t 4 -an -c:v libx264 -pix_fmt yuv420p -movflags +faststart hero-loop.mp4` (muted, web-optimized, clean loop).
- HEIC→JPG: `nix run nixpkgs#imagemagick -- HolyBasil.HEIC holy-basil.jpg` (or libheif via ImageMagick).
- Image-backed tea cards: replace the gradient `<div class="tea-photo">` with `<div class="tea-photo" style="background-image:url(...);background-size:cover">` when `photo` is set.
- Hero `<video>` already has `autoplay muted loop playsinline` — no markup change needed for looping, just the new source.
