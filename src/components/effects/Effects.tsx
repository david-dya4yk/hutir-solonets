"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

import { onReady, prefersReducedMotion } from "@/lib/ready";

const EASE = "cubic-bezier(.2,.65,.25,1)";

const formatCount = (v: number, dec: number): string =>
  v.toLocaleString(document.documentElement.lang, {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
    useGrouping: false,
  });

const runCount = (node: HTMLElement): void => {
  const to = Number.parseFloat(node.dataset["count"] ?? "0");
  const dec = Number(node.dataset["dec"] ?? "0");
  const t0 = performance.now();
  const step = (now: number): void => {
    const p = Math.min(1, (now - t0) / 1800);
    node.textContent = formatCount(to * (1 - Math.pow(1 - p, 3)), dec);
    if (p < 1) {
      requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);
};

const targetsOf = (el: HTMLElement): HTMLElement[] =>
  el.dataset["reveal"] === "lines"
    ? [...el.children].filter((c): c is HTMLElement => c instanceof HTMLElement)
    : [el];

const show = (el: HTMLElement): void => {
  targetsOf(el).forEach((t, i) => {
    if (el.dataset["reveal"] === "lines") {
      t.style.transitionDelay = `${String(i * 140)}ms`;
    }
    t.style.opacity = "1";
    t.style.transform = "none";
  });
  el.querySelectorAll<HTMLElement>("[data-count]").forEach(runCount);
};

const parallax = (): void => {
  const vh = window.innerHeight;
  document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) {
      return;
    }
    const k = Number.parseFloat(el.dataset["parallax"] ?? "0.15");
    const off = (r.top + r.height / 2 - vh / 2) * -k;
    const child = el.firstElementChild;
    if (child instanceof HTMLElement) {
      child.style.transform = `translate3d(0,${off.toFixed(1)}px,0)`;
    }
  });
};

const magnet = (e: MouseEvent): void => {
  document.querySelectorAll<HTMLElement>("[data-magnet]").forEach((b) => {
    const r = b.getBoundingClientRect();
    if (r.width === 0) {
      return;
    }
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const near = Math.abs(dx) < r.width / 2 + 36 && Math.abs(dy) < r.height / 2 + 28;
    const hidden = b.hasAttribute("data-rv") && b.style.opacity === "0";
    b.style.transition =
      "transform .5s cubic-bezier(.2,.7,.2,1), background-color .3s, opacity .65s";
    if (near) {
      b.style.transform = `translate(${(dx * 0.22).toFixed(1)}px,${(dy * 0.32).toFixed(1)}px)`;
    } else {
      b.style.transform = hidden ? "translateY(28px)" : "";
    }
  });
};

export function Effects(): null {
  const path = usePathname();
  const io = useRef<IntersectionObserver | null>(null);
  const pending = useRef(new Set<HTMLElement>());

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            show(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    const stopReady = onReady(() => {
      io.current = observer;
      pending.current.forEach((el) => {
        observer.observe(el);
      });
      pending.current.clear();
      parallax();
    });

    let raf = 0;
    const onScroll = (): void => {
      if (raf !== 0) {
        return;
      }
      raf = requestAnimationFrame(() => {
        raf = 0;
        parallax();
      });
    };
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!reduced) {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      if (fine) {
        window.addEventListener("mousemove", magnet);
      }
    }
    return () => {
      stopReady();
      observer.disconnect();
      io.current = null;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("mousemove", magnet);
    };
  }, []);

  useLayoutEffect(() => {
    const reduced = prefersReducedMotion();
    document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-rv])").forEach((el) => {
      el.setAttribute("data-rv", "");
      if (reduced) {
        return;
      }
      targetsOf(el).forEach((t) => {
        t.style.opacity = "0";
        t.style.transform = "translateY(28px)";
        t.style.transition = `opacity 650ms ${EASE}, transform 650ms ${EASE}`;
      });
      el.querySelectorAll<HTMLElement>("[data-count]").forEach((n) => {
        n.textContent = formatCount(0, Number(n.dataset["dec"] ?? "0"));
      });
      if (io.current === null) {
        pending.current.add(el);
      } else {
        io.current.observe(el);
      }
    });
    if (!reduced) {
      parallax();
    }
  }, [path]);

  return null;
}
