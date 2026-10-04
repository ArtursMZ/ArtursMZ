# AR website developmenTURS

Business website for Artur's web development studio. React + TypeScript + Vite + Tailwind CSS + Framer Motion, with a three.js hero figure and a [cobe](https://github.com/shuding/cobe) globe.

## Pages

| Route | What's on it |
|---|---|
| `#/` | Animated hero with the business name and a 3D liquid figure that follows the mouse, scroll-driven website marquee, intro, pricing, how it works, work preview |
| `#/about` | About Artur, why a business needs a website, the 3-day promise |
| `#/services` | Business ($2,900) and eCommerce ($5,200) packages, custom requests, the $300 deposit process, FAQ |
| `#/work` | Stacking cards with live, non-clickable previews of Space Voyage, PROMPT and Digital Experiences |
| `#/contact` | Globe that turns with the mouse (drag on phones), "Building websites all around the world" in 10 languages, email |

Prices, the deposit, email and nav live in `src/data/site.ts`. Remote images and videos are in `src/data/media.ts`.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
npm run preview  # serve the build
```

The build uses relative paths and hash routing, so `dist/` works on any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages) with no rewrite rules.

## Security

- `public/_headers` (Netlify / Cloudflare Pages) and `vercel.json` (Vercel) send a strict Content-Security-Policy (`script-src 'self'`, no inline scripts, no `eval`, media only from the listed hosts), HSTS, `X-Frame-Options: DENY`, `nosniff`, a strict referrer policy and a locked-down Permissions-Policy.
- Fonts are bundled with the site (no Google Fonts requests).
- No forms or backend: contact is a `mailto:` link, so no visitor data is collected or stored.
- If you add new image or video hosts, add them to `img-src` / `media-src` in both header files.
- `npm audit --omit=dev` is clean. The remaining audit warnings are in Tailwind 3's build-time file watcher and never ship to visitors.
