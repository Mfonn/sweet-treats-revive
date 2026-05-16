# 707_herbal tea — Revamped one-page site

Three files, no build step, no framework. Drop them on any host.

```
index.html
styles.css
script.js
```

## How to publish

1. Open your host's file manager (cPanel / Hostinger / wherever
   `707healthytreats.com.ng` is hosted).
2. Back up the existing `index.html` (rename it to `index-old.html`).
3. Upload all three files (`index.html`, `styles.css`, `script.js`) to the
   site root — the same folder where `index-old.html` now lives.
4. Keep the existing `Assets/` folder — the new page reads
   `logo707.png`, `tea-experience.mp4`, `plant-matching.mp4`,
   `pop-up.mp4` and `Custom-blend.mp4` from there.
5. Refresh the live site in an incognito window. Done.

## Adding your Selar links

Open `script.js` and look for the block at the very top:

```js
const SELAR_LINKS = {
  lavender:   "",
  saffron:    "",
  ...
};
```

Paste the Selar product URL between the quotes for each tea. Save and
re-upload `script.js`. Order buttons will start opening Selar
automatically — no other code changes needed.

Until a link is filled in, that tea's button opens a small popup that
sends the customer to WhatsApp / Instagram to order manually.

## Swapping in real tea photos (optional)

Right now each tea card uses a colored gradient with the tea name. To
use real photos:

1. Create a folder `teas/` next to `index.html`.
2. Add photos named `lavender.jpg`, `saffron.jpg`, `rosebuds.jpg`,
   `calendula.jpg`, `spearmint.jpg`, `lemongrass.jpg`, `honey.jpg`.
3. In `script.js`, change the `teaCard()` function — replace this:
   ```js
   <div class="tea-photo" style="background:linear-gradient(...)">
     <span>${t.name}</span>
   </div>
   ```
   with:
   ```js
   <div class="tea-photo" style="background:#000">
     <img src="teas/${t.slug}.jpg" alt="${t.name}" style="width:100%;height:100%;object-fit:cover"/>
   </div>
   ```

That's it. Square or 4:3 photos look best.

## Contact channels

The Connect section uses:
- Phone: `+234 810 312 6486`
- WhatsApp: `https://wa.me/2348103126486`
- Instagram: `https://www.instagram.com/707_treat`

Change them once in `index.html` if anything updates.
