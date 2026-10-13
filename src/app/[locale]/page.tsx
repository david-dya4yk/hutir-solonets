import Image from "next/image";
import Link from "next/link";

import { BookButton } from "@/components/booking/BookButton";
import { ContactSection } from "@/components/forms/ContactSection";
import { Faq } from "@/components/home/Faq";
import { HeroVideo } from "@/components/home/HeroVideo";
import { PlanMap } from "@/components/home/PlanMap";
import { Reviews } from "@/components/home/Reviews";
import { FeatureDots } from "@/components/ui/FeatureDots";
import { Lines } from "@/components/ui/Lines";
import { Media } from "@/components/ui/Media";
import { getContent } from "@/content";
import { OFFERS_ENABLED } from "@/content/site";
import { localePath } from "@/locales/config";
import { getI18n, initLocale } from "@/locales/server";

import type { ReactNode } from "react";

import styles from "./page.module.css";
import ui from "@/components/ui/ui.module.css";

export default async function HomePage(props: PageProps<"/[locale]">): Promise<ReactNode> {
  const locale = await initLocale(props.params);
  const t = await getI18n();
  const c = getContent(locale);
  return (
    <>
      <section className={styles.hero}>
        <div className={ui.parallax} data-parallax="0.3">
          <div className={`${ui.parallaxDeep} ${styles.heroPhoto}`}>
            <Image
              src="/assets/hero.jpg"
              alt=""
              fill
              sizes="100vw"
              loading="eager"
              fetchPriority="high"
              className={styles.heroImage}
              data-hero-image=""
            />
          </div>
        </div>
        <HeroVideo src="/assets/hero-mobile.mp4" poster="/assets/hero-mobile-poster.jpg" />
        <div className={styles.heroShade} />
        <div className={styles.heroContent}>
          <Lines as="h1" className={styles.heroTitle} lines={[t("common.brand")]} />
          <p className={styles.heroLead} data-reveal="">
            {t("home.heroLead")}
          </p>
        </div>
      </section>

      <section className={ui.section}>
        <div className={styles.intro}>
          <div className={styles.introText}>
            <Lines
              className={styles.introTitle}
              lines={[t("home.introTitle1"), t("home.introTitle2")]}
            />
            <p className={ui.body} data-reveal="">
              {t("home.introBody")}
            </p>
            <BookButton className={`${ui.btn} ${styles.start}`} magnet reveal />
          </div>
          <Media
            className={styles.introPhoto}
            src="/assets/home-intro-kitchen.jpg"
            pos="center 60%"
            parallax={0.08}
          >
            <div className={styles.introFade} />
            <div className={styles.introCaption}>
              <span className={styles.introName}>{t("common.brand")}</span>
              <span className={styles.introPlace}>{t("address.place")}</span>
            </div>
          </Media>
          <div className={styles.features}>
            {c.features.map((f) => (
              <div key={f.num} className={styles.feature} data-reveal="">
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureText}>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.split}>
        <Link href={localePath(locale, "/cottages")} className={styles.tile} data-reveal="">
          <div className={`${styles.tilePhoto} ${styles.tileCottages}`} />
          <div className={styles.tileShade} />
          <div className={styles.tileBody}>
            <div className={styles.tileHead}>
              <h3 className={styles.tileTitle}>{t("home.cottagesTile")}</h3>
              <span className={styles.tileArrow}>›</span>
            </div>
            <span className={styles.tileEyebrow}>{t("home.cottagesEyebrow")}</span>
            <p className={styles.tileText}>{t("home.cottagesText")}</p>
            <FeatureDots className={styles.tileDots} items={c.homeCottageDots} />
          </div>
        </Link>
        <Link
          href={localePath(locale, "/spa")}
          className={`${styles.tile} ${styles.tileSpaBox}`}
          data-reveal=""
        >
          <div className={`${styles.tilePhoto} ${styles.tileSpa}`} />
          <div className={styles.tileShade} />
          <div className={styles.tileBody}>
            <div className={styles.tileHead}>
              <h3 className={styles.tileTitle}>{t("home.spaTile")}</h3>
              <span className={styles.tileArrow}>›</span>
            </div>
            <span className={styles.tileEyebrow}>{t("home.spaEyebrow")}</span>
            <p className={styles.tileText}>{t("home.spaText")}</p>
            <FeatureDots className={styles.tileDots} items={c.homeSpaDots} />
          </div>
        </Link>
      </section>

      <Reviews />

      <section className={ui.soft}>
        <div className={ui.section}>
          <Lines className={`${ui.display} ${styles.planTitle}`} lines={[t("home.planTitle")]} />
          <PlanMap />
          <div className={styles.planNote} data-reveal="">
            <span>{t("home.planLegend")}</span>
          </div>
        </div>
      </section>

      <section className={ui.section}>
        <div className={styles.why}>
          <div className={styles.whyText}>
            <Lines className={ui.display} lines={[t("home.whyTitle")]} />
            <p className={`${ui.body} ${styles.whyBody}`} data-reveal="">
              <b>{t("home.whyLead")}</b>
              <br />
              {t("home.whyRoots")}
              <br />
              {t("home.whyPlace", { name: <b>{t("home.whyName")}</b> })}
              <br />
              <br />
              {t("home.whyLegend")}
              <br />
              <br />
              {t("home.whyToday")}
            </p>
            <Lines
              as="h3"
              className={styles.whySub}
              lines={[t("home.whySub1"), t("home.whySub2")]}
            />
          </div>
          <Media
            className={styles.square}
            src="/assets/home-about.jpg"
            pos="center 55%"
            parallax={0.08}
          />
        </div>
      </section>

      <section className={ui.soft}>
        <div className={ui.section}>
          <div className={styles.offer}>
            <Media className={styles.square} src="/assets/home-offer.jpg" pos="center 55%" zoom />
            <div className={styles.offerText}>
              <div className={styles.offerTag} data-reveal="">
                <span className={styles.offerLabel}>{t("home.offerLabel")}</span>
                <span className={styles.offerWhen}>{t("home.offerWhen")}</span>
              </div>
              <Lines
                className={ui.display}
                lines={[t("home.offerTitle1"), t("home.offerTitle2")]}
              />
              <p className={`${ui.body} ${styles.offerBody}`} data-reveal="">
                {t("home.offerBody")}
              </p>
              <div className={styles.offerActions} data-reveal="">
                <BookButton className={ui.btn} magnet />
                {OFFERS_ENABLED && (
                  <Link href={localePath(locale, "/offers")} className={ui.underline}>
                    {t("home.allOffers")}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.faq}>
          <div className={styles.faqText}>
            <Lines className={ui.display} lines={[t("home.faqTitle1"), t("home.faqTitle2")]} />
            <Faq items={c.faq} />
          </div>
          <Media
            className={styles.faqPhoto}
            src="/assets/home-faq-hammock.jpg"
            pos="center 60%"
            parallax={0.08}
          />
        </div>
      </section>

      <ContactSection />
    </>
  );
}
