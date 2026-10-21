import Link from "next/link";
import { notFound } from "next/navigation";

import { BookButton } from "@/components/booking/BookButton";
import { LazyImage } from "@/components/ui/LazyImage";
import { BLOG_POSTS, blogPath, findPost } from "@/content/blog";
import { alternates } from "@/lib/seo";
import { intlLocale, LOCALES, localePath } from "@/locales/config";
import { getI18n, initLocale } from "@/locales/server";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import styles from "@/components/blog/Blog.module.css";
import ui from "@/components/ui/ui.module.css";

export function generateStaticParams(): { locale: string; slug: string }[] {
  return LOCALES.flatMap((locale) => BLOG_POSTS.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata(
  props: PageProps<"/[locale]/blog/[slug]">,
): Promise<Metadata> {
  const locale = await initLocale(props.params);
  const { slug } = await props.params;
  const post = findPost(slug);
  if (post === undefined) {
    return {};
  }
  const { title, excerpt } = post[locale];
  return {
    title,
    description: excerpt,
    alternates: alternates(locale, blogPath(slug)),
    openGraph: {
      type: "article",
      title,
      description: excerpt,
      publishedTime: post.date,
      images: [{ url: post.cover, alt: title }],
    },
  };
}

export default async function BlogPostPage(
  props: PageProps<"/[locale]/blog/[slug]">,
): Promise<ReactNode> {
  const locale = await initLocale(props.params);
  const { slug } = await props.params;
  const t = await getI18n();
  const post = findPost(slug);
  if (post === undefined) {
    notFound();
  }
  const text = post[locale];
  const date = new Intl.DateTimeFormat(intlLocale(locale), { dateStyle: "long" });
  return (
    <article className={styles.article}>
      <Link href={localePath(locale, blogPath())} className={styles.back}>
        ← {t("blog.back")}
      </Link>
      <header className={styles.head}>
        <time className={styles.date} dateTime={post.date}>
          {date.format(new Date(post.date))}
        </time>
        <h1 className={styles.title}>{text.title}</h1>
        <p className={styles.lead}>{text.excerpt}</p>
      </header>
      <div className={styles.hero}>
        <LazyImage
          src={post.cover}
          sizes="(max-width: 899px) 100vw, 860px"
          alt={text.title}
          eager
        />
      </div>
      <div className={styles.body}>
        {text.body.map((s, i) => (
          <section key={s.h ?? i} className={styles.body}>
            {s.h !== undefined && <h2 className={styles.h2}>{s.h}</h2>}
            {s.p.map((p) => (
              <p key={p} className={styles.p}>
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
      <BookButton className={`${ui.btn} ${styles.cta}`}>{t("blog.cta")}</BookButton>
    </article>
  );
}
