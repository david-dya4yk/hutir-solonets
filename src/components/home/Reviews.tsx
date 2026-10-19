"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";

import { BookButton } from "@/components/booking/BookButton";
import { Carousel } from "@/components/ui/Carousel";
import { Icon } from "@/components/ui/Icon";
import { LazyImage } from "@/components/ui/LazyImage";
import { useContent } from "@/content/ContentProvider";
import { INSTAGRAM_URL } from "@/content/site";
import { useI18n } from "@/locales/client";

import type { CarouselRegister, CarouselSlot } from "@/components/ui/Carousel";
import type { Review, ReviewClip } from "@/content/site";
import type { ReactNode } from "react";

import styles from "./Reviews.module.css";
import carousel from "@/components/ui/Carousel.module.css";
import ui from "@/components/ui/ui.module.css";

export function Reviews(): ReactNode {
  const t = useI18n();
  const { reviews } = useContent();
  const step = useRef<((dir: number) => void) | null>(null);
  const register: CarouselRegister = (fn) => {
    step.current = fn;
  };
  const [playing, setPlaying] = useState<ReviewClip | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2 className={ui.displayMd} data-reveal="lines">
          <span className={ui.line}>{t("reviews.title1")}</span>
          <span className={ui.line}>{t("reviews.title2")}</span>
        </h2>
        <div className={styles.side}>
          <p className={ui.lead} data-reveal="">
            <b>{t("reviews.lead")}</b>
            <br />
            {t("reviews.text")}
            <span className={styles.handle}>&nbsp;{t("reviews.tag")}</span>
          </p>
          <div className={styles.controls} data-reveal="">
            <button
              type="button"
              className={styles.arrow}
              aria-label={t("reviews.prev")}
              onClick={() => {
                step.current?.(-1);
              }}
            >
              ‹
            </button>
            <button
              type="button"
              className={styles.arrow}
              aria-label={t("reviews.next")}
              onClick={() => {
                step.current?.(1);
              }}
            >
              ›
            </button>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener"
              className={`${ui.underline} ${styles.ig}`}
            >
              Instagram
            </a>
            <BookButton className={`${ui.btn} ${styles.book}`} magnet />
          </div>
        </div>
      </div>
      <Carousel
        items={reviews}
        register={register}
        paused={playing !== null}
        render={(r, slot, key) => (
          <Card
            key={key}
            r={r}
            slot={slot}
            onPlay={
              r.clip === undefined
                ? undefined
                : () => {
                    if (r.clip !== undefined) {
                      setPlaying(r.clip);
                    }
                  }
            }
          />
        )}
      />
      {playing !== null && (
        <ReviewPlayer
          clip={playing}
          onClose={() => {
            setPlaying(null);
          }}
        />
      )}
    </section>
  );
}

function Card({
  r,
  slot,
  onPlay,
}: {
  readonly r: Review;
  readonly slot: CarouselSlot;
  readonly onPlay: (() => void) | undefined;
}): ReactNode {
  const t = useI18n();
  const image = r.clip?.poster ?? r.photo;
  const onOpen = slot.select ?? onPlay;
  return (
    <article
      className={`${slot.className} ${styles.item}`}
      aria-hidden={slot.hidden ? true : undefined}
    >
      <div className={styles.photo}>
        {image !== undefined && <LazyImage src={image} sizes="(max-width: 899px) 70vw, 620px" />}
      </div>
      <div className={ui.shadeLight} />
      {r.video && (
        <span className={styles.play}>
          <Icon name="play" />
        </span>
      )}
      <div className={`${styles.meta} ${carousel.fade}`}>
        <span className={styles.author}>
          <span className={styles.igIcon} />
          {r.handle}
        </span>
      </div>
      {onOpen !== undefined && (
        <button
          type="button"
          className={styles.open}
          tabIndex={slot.hidden ? -1 : 0}
          aria-label={r.clip === undefined ? r.handle : t("reviews.watch", { handle: r.handle })}
          onClick={onOpen}
        />
      )}
    </article>
  );
}

function ReviewPlayer({
  clip,
  onClose,
}: {
  readonly clip: ReviewClip;
  readonly onClose: () => void;
}): ReactNode {
  const t = useI18n();
  const onEscape = useEffectEvent(onClose);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        onEscape();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className={styles.player} role="dialog" aria-modal="true">
      <div className={styles.playerBackdrop} onClick={onClose} aria-hidden="true" />
      <video
        className={styles.playerVideo}
        src={clip.src}
        poster={clip.poster}
        controls
        autoPlay
        playsInline
      />
      <button
        type="button"
        className={styles.playerClose}
        aria-label={t("common.close")}
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
}
