// Auto-discovers gym photos dropped into ../assets/gym/.
// See ../assets/gym/README.md for the drop convention.

const HERO_FALLBACK =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800&h=1000&fit=crop&auto=format";
const FACILITY_FALLBACK =
  "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop&auto=format";
const COACH_FALLBACK =
  "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=700&h=800&fit=crop&auto=format&face";

const gymFiles = import.meta.glob<string>(
  "../assets/gym/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  { eager: true, import: "default" },
);

const gymVideos = import.meta.glob<string>(
  "../assets/gym/*.{mp4,webm,mov,MP4,WEBM,MOV}",
  { eager: true, import: "default" },
);

const MAGIC_NAMES = new Set(["hero", "facility", "coach"]);

function basename(path: string): string {
  const file = path.split("/").pop() ?? "";
  return file.replace(/\.[^.]+$/, "").toLowerCase();
}

function findByBase(base: string): string | undefined {
  const match = Object.entries(gymFiles).find(([path]) => basename(path) === base);
  return match?.[1];
}

export const heroImage: string = findByBase("hero") ?? HERO_FALLBACK;
export const facilityImage: string = findByBase("facility") ?? FACILITY_FALLBACK;
export const coachImage: string = findByBase("coach") ?? COACH_FALLBACK;

// Gallery = every image in src/assets/gym/ that isn't one of the magic files.
// Names are sorted naturally so interior-2 comes before interior-10.
export const galleryImages: string[] = Object.entries(gymFiles)
  .filter(([path]) => !MAGIC_NAMES.has(basename(path)))
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, url]) => url);

function findVideo(base: string): string | undefined {
  const match = Object.entries(gymVideos).find(([path]) => basename(path) === base);
  return match?.[1];
}

// Drop a file named `coach-intro.mp4` (or .webm / .mov) into src/assets/gym/
// to replace the static coach photo with a click-to-play video.
export const coachIntroVideo: string | undefined = findVideo("coach-intro");
