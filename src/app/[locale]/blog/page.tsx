import Link from "next/link";

import { LazyImage } from "@/components/ui/LazyImage";
import { BLOG_POSTS, blogPath } from "@/content/blog";
import { alternates } from "@/lib/seo";
import { intlLocale, localePath } from "@/locales/config";
import { getI18n, initLocale } from "@/locales/server";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import styles from "@/components/blog/Blog.module.css";

export async function generateMetadata(props: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const locale = await initLocale(props.params);
  const t = await getI18n();
  return {
    title: t("blog.title"),
    description: t("blog.lead"),
    alternates: alternates(locale, blogPath()),
  };
}

export default async function BlogPage(props: PageProps<"/[locale]/blog">): Promise<ReactNode> {
  const locale = await initLocale(props.params);
  const t = await getI18n();
  const date = new Intl.DateTimeFormat(intlLocale(locale), { dateStyle: "long" });
  return (
    <section className={styles.page}>
      <div className={styles.head}>
        <h1 className={styles.title}>{t("blog.title")}</h1>
        <p className={styles.lead}>{t("blog.lead")}</p>
      </div>
      <div className={styles.grid}>
        {BLOG_POSTS.map((post) => {
          const text = post[locale];
          return (
            <Link
              key={post.slug}
              href={localePath(locale, blogPath(post.slug))}
              className={styles.card}
            >
              <div className={styles.cover}>
                <LazyImage
                  src={post.cover}
                  sizes="(max-width: 899px) 100vw, 420px"
                  className={styles.coverImg}
                />
              </div>
              <time className={styles.date} dateTime={post.date}>
                {date.format(new Date(post.date))}
              </time>
              <h2 className={styles.cardTitle}>{text.title}</h2>
              <p className={styles.excerpt}>{text.excerpt}</p>
              <span className={styles.more}>{t("blog.read")} →</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
