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
