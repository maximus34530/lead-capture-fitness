# Gym Images — Drop Folder

Drop your gym photos into this folder (`src/assets/gym/`). Vite will hash and
optimize them at build time. The site reads this folder automatically — you do
not need to touch any code.

Supported image formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`.
Supported video formats: `.mp4`, `.webm`, `.mov`.

## Magic filenames (replace the three existing Unsplash placeholders)

| Filename            | Where it appears                              |
| ------------------- | --------------------------------------------- |
| `hero.jpg`          | Full-bleed hero background (under the title)  |
| `facility.jpg`      | "The Gym Where The Methods Were Forged" card  |
| `coach.jpg`         | About section — Coach Jokko portrait          |
| `coach-intro.mp4`   | About section — click-to-play coach video     |

The extension can be `.jpg`, `.png`, `.webp`, etc. (or `.mp4`, `.webm`, `.mov`
for video) — only the basename matters. If a file is missing, the page falls
back to the current Unsplash placeholder (or, for video, hides the player and
shows just the photo).

### About the `coach-intro` video

When you drop `coach-intro.mp4` (or `.webm`/`.mov`), the About section's coach
photo is replaced with a click-to-play video player. The `coach.jpg` (or the
Unsplash fallback) is automatically used as the video poster, so viewers see
the photo until they hit play. Recommended: ≤ 60 seconds, ≤ 20 MB, 1080p H.264
mp4 for maximum browser compatibility.

## Auto-gallery (new section)

**Any** image in this folder that isn't named `hero`, `facility`, or `coach`
automatically appears in a new **"Inside Multifit"** gallery section below the
Physical Base section. Name them however you want — `interior-1.png`,
`gallery-3.jpg`, `squat-rack.webp` — they all show up.

Files are sorted naturally by filename, so `interior-2` comes before `interior-10`.

The gallery only renders when at least one such image exists. Drop one file or
twenty — it adapts.

## Recommended sizing

For best quality on retina screens without bloating the bundle:

| Slot           | Recommended size      | Aspect      |
| -------------- | --------------------- | ----------- |
| `hero.jpg`     | 2400 × 1400 px        | wide        |
| `facility.jpg` | 1600 × 1200 px        | 4:3         |
| `coach.jpg`    | 1200 × 1600 px        | portrait    |
| `gallery-*.jpg`| 1200 × 900 px         | 4:3         |

JPEG quality 75–85 is plenty. WebP is smaller still if your camera/export
supports it.
