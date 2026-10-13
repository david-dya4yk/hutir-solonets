let ready = false;
const listeners = new Set<() => void>();

export const isReady = (): boolean => ready;

export const markReady = (): void => {
  if (ready) {
    return;
  }
  ready = true;
  listeners.forEach((fn) => {
    fn();
  });
  listeners.clear();
};

export const onReady = (fn: () => void): (() => void) => {
  if (ready) {
    fn();
    return () => undefined;
  }
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
};

export const prefersReducedMotion = (): boolean =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const HAVE_FUTURE_DATA = 3;

const until = async (
  target: EventTarget,
  events: readonly string[],
  timeoutMs: number,
): Promise<void> => {
  await new Promise<void>((resolve) => {
    const done = (): void => {
      window.clearTimeout(timer);
      events.forEach((e) => {
        target.removeEventListener(e, done, true);
      });
      resolve();
    };
    const timer = window.setTimeout(done, timeoutMs);
    events.forEach((e) => {
      target.addEventListener(e, done, true);
    });
  });
};

// Resolves once the hero media is ready: the video on mobile (only when one of its
// <source media> matches) or the photo otherwise. Capped so a slow network never
// traps the page behind the preloader.
export const waitForHero = async (timeoutMs: number): Promise<void> => {
  const video = document.querySelector<HTMLVideoElement>("video[data-hero-video]");
  const videoActive =
    video !== null &&
    [...video.querySelectorAll("source")].some(
      (s) => s.media === "" || window.matchMedia(s.media).matches,
    );
  if (video !== null && videoActive) {
    if (video.readyState < HAVE_FUTURE_DATA && video.error === null) {
      await until(video, ["canplay", "playing", "error"], timeoutMs);
    }
    return;
  }
  const image = document.querySelector<HTMLImageElement>("img[data-hero-image]");
  if (image !== null && !image.complete) {
    await until(image, ["load", "error"], timeoutMs);
  }
};
