import Link from "next/link";

import { BookButton } from "@/components/booking/BookButton";
import { ContactSection } from "@/components/forms/ContactSection";
import { Faq } from "@/components/home/Faq";
import { PlanMap } from "@/components/home/PlanMap";
import { Reviews } from "@/components/home/Reviews";
import { FeatureDots } from "@/components/ui/FeatureDots";
import { Lines } from "@/components/ui/Lines";
import { Media } from "@/components/ui/Media";
import { FAQ, FEATURES } from "@/content/site";

import type { ReactNode } from "react";

import styles from "./page.module.css";
import ui from "@/components/ui/ui.module.css";

export default function HomePage(): ReactNode {
  return (
    <>
      <section className={styles.hero}>
        <div className={ui.parallax} data-parallax="0.3">
          <div className={`${ui.parallaxDeep} ${styles.heroPhoto}`} />
        </div>
        <div className={styles.heroShade} />
        <div className={styles.heroContent}>
          <Lines as="h1" className={styles.heroTitle} lines={["Хутір Солонець"]} />
          <p className={styles.heroLead} data-reveal="">
            Ідеальний варіант для вашого відпочинку у центрі Карпат
          </p>
        </div>
      </section>

      <section className={ui.section}>
        <div className={styles.intro}>
          <div className={styles.introText}>
            <Lines
              className={styles.introTitle}
              lines={["Подалі від метушні.", "Ближче до природи."]}
            />
            <p className={ui.body} data-reveal="">
              Ми подбали про місце де хочеться залишитись довше. Серед карпатських гір, де
              Буковинська гостинність поєднується із сучасним комфортом.
            </p>
            <BookButton className={`${ui.btn} ${styles.start}`} magnet reveal />
          </div>
          <Media
            className={styles.introPhoto}
            src="/assets/home-intro.jpg"
            pos="center 60%"
            parallax={0.08}
          >
            <div className={styles.introFade} />
            <div className={styles.introCaption}>
              <span className={styles.introName}>Хутір Солонець</span>
              <span className={styles.introPlace}>Мигове, Чернівецька область</span>
            </div>
          </Media>
          <div className={styles.features}>
            {FEATURES.map((f) => (
              <div key={f.num} className={styles.feature} data-reveal="">
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureText}>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.split}>
        <Link href="/cottages" className={styles.tile} data-reveal="">
          <div className={`${styles.tilePhoto} ${styles.tileCottages}`} />
          <div className={styles.tileShade} />
          <div className={styles.tileBody}>
            <div className={styles.tileHead}>
              <h3 className={styles.tileTitle}>Котеджі</h3>
              <span className={styles.tileArrow}>›</span>
            </div>
            <span className={styles.tileEyebrow}>ВМІЩАЮТЬ: ВІД 6 ДО 14 ОСІБ.</span>
            <p className={styles.tileText}>
              Простір, у якому продумано все для вашого відпочинку. Наші котеджі повністю
              облаштовані всім необхідним, щоб ви почувалися як удома.
            </p>
            <FeatureDots
              className={styles.tileDots}
              items={["Кухня", "Тераса", "Мангал", "Вид на гори"]}
            />
          </div>
        </Link>
        <Link href="/spa" className={`${styles.tile} ${styles.tileSpaBox}`} data-reveal="">
          <div className={`${styles.tilePhoto} ${styles.tileSpa}`} />
          <div className={styles.tileShade} />
          <div className={styles.tileBody}>
            <div className={styles.tileHead}>
              <h3 className={styles.tileTitle}>SPA і басейни</h3>
              <span className={styles.tileArrow}>›</span>
            </div>
            <span className={styles.tileEyebrow}>Кілька кроків від будинку.</span>
            <p className={styles.tileText}>
              Два криті басейни, відкритий басейн, джакузі та чан на дровах — для спокійних ранків і
              теплих вечорів.
            </p>
            <FeatureDots
              className={styles.tileDots}
              items={["Криті басейни", "Відкритий басейн", "Джакузі", "Чан"]}
            />
          </div>
        </Link>
      </section>

      <Reviews />

      <section className={ui.soft}>
        <div className={ui.section}>
          <Lines
            className={`${ui.display} ${styles.planTitle}`}
            lines={["Прогуляйтеся територією"]}
          />
          <PlanMap />
          <div className={styles.planNote} data-reveal="">
            <span>Натисніть на номер будинку, щоб дізнатися більше</span>
            <span>Ліс · котеджі · SPA-зона · паркінг</span>
          </div>
        </div>
      </section>

      <section className={ui.section}>
        <div className={styles.why}>
          <div className={styles.whyText}>
            <Lines className={ui.display} lines={['Чому саме "Хутір Солонець"?']} />
            <p className={`${ui.body} ${styles.whyBody}`} data-reveal="">
              <b>У кожного місця є своя історія.</b>
              <br />
              І наша сягає корінням у минуле рідного краю.
              <br />
              Ми розташовані у тихій зоні села Мигове, серед мальовничих Буковинських Карпат, у
              місцевості яку здавна називають <b>Солонцем</b>.
              <br />
              <br />
              За місцевими переказами, своєю назвою цей куточок завдячує природному джерелу із
              характерно солонуватою на смак водою, що стало його особливою прикметою.
              <br />
              <br />
              Ми бережемо і плекаємо історію рідного краю. І сьогодні вона знаходить своє
              продовження - як данина місцю, його традиціям і людям, які зберегли цю назву крізь
              покоління.
            </p>
            <Lines as="h3" className={styles.whySub} lines={["Ліс поруч.", "Місто далеко."]} />
          </div>
          <Media
            className={styles.square}
            src="/assets/home-about.jpg"
            pos="center 65%"
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
                <span className={styles.offerLabel}>Акція</span>
                <span className={styles.offerWhen}>До кінця жовтня</span>
              </div>
              <Lines className={ui.display} lines={["−1000 грн", "від двох діб."]} />
              <p className={`${ui.body} ${styles.offerBody}`} data-reveal="">
                Бронюйте будинок від двох діб — і ми зменшимо вартість на 1000 грн. Достатньо часу,
                щоб сповільнитись: чан увечері, прогулянка лісом зранку.
              </p>
              <div className={styles.offerActions} data-reveal="">
                <BookButton className={ui.btn} magnet />
                <Link href="/offers" className={ui.underline}>
                  Усі пропозиції
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.faq}>
          <div className={styles.faqText}>
            <Lines className={ui.display} lines={["Часті", "запитання"]} />
            <Faq items={FAQ} />
          </div>
          <Media
            className={styles.faqPhoto}
            src="/assets/home-faq.jpg"
            pos="center 50%"
            parallax={0.08}
          />
        </div>
      </section>

      <ContactSection />
    </>
  );
}
