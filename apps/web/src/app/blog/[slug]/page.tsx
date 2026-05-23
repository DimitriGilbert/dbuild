import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, Clock, FolderOpen } from "lucide-react";

import { MarkdownRenderer } from "@/components/markdown-renderer";
import { PrefetchLink } from "@/components/prefetch-link";
import { TableOfContents } from "@/components/table-of-contents";
import { Badge } from "@/components/ui/badge";
import { getPostBySlug, getAllPosts, getTranslationPosts } from "@/lib/blog";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  createBlogPostingJsonLd,
  createBreadcrumbListJsonLd,
  createNotFoundMetadata,
  formatAbsoluteImageUrl,
  formatCanonicalUrl,
  formatOpenGraphLocale,
  formatTaxonomySlug,
  formatTitle,
  serializeJsonLd,
} from "@/lib/seo";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts
    .filter((post) => !post.isCategory)
    .map((post) => ({
      slug: post.slug,
    }));
}

function createPostCanonicalUrl(slug: string, canonical?: string): string {
  return canonical ?? formatCanonicalUrl(`/blog/${slug}`);
}

function createPostLanguageAlternates(
  post: NonNullable<ReturnType<typeof getPostBySlug>>
): Record<string, string> | undefined {
  if (!post.lang || !post.translationKey) {
    return undefined;
  }

  const translations = getTranslationPosts(post);
  const languages: Record<string, string> = {
    [post.lang]: createPostCanonicalUrl(post.slug, post.canonical),
  };

  for (const translation of translations) {
    if (translation.lang) {
      languages[translation.lang] = createPostCanonicalUrl(
        translation.slug,
        translation.canonical
      );
    }
  }

  return languages;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return createNotFoundMetadata("Post Not Found");
  }

  const title = formatTitle(post.title);
  const description = post.description || `Read ${post.title} on ${SITE_NAME}`;
  const url = createPostCanonicalUrl(slug, post.canonical);
  const ogImage = formatAbsoluteImageUrl(post.ogImage || DEFAULT_OG_IMAGE);
  const languages = createPostLanguageAlternates(post);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.ogImageAlt || post.title,
        },
      ],
      locale: formatOpenGraphLocale(post.lang),
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedAt,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || post.isCategory) {
    notFound();
  }

  const description = post.description || `Read ${post.title} on ${SITE_NAME}`;
  const canonicalUrl = createPostCanonicalUrl(slug, post.canonical);
  const imageUrl = formatAbsoluteImageUrl(post.ogImage || DEFAULT_OG_IMAGE);
  const keywords = Array.from(new Set([post.category, ...post.tags]));
  const jsonLd = createBlogPostingJsonLd({
    headline: post.title,
    description,
    datePublished: post.date,
    dateModified: post.updatedAt,
    url: canonicalUrl,
    imageUrl,
    keywords,
    inLanguage: post.lang ?? "en",
  });
  const breadcrumbJsonLd = createBreadcrumbListJsonLd([
    { name: "Home", pathname: "/" },
    { name: "Blog", pathname: "/blog" },
    { name: post.title, pathname: `/blog/${slug}` },
  ]);

  return (
    <div className="min-h-screen pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <PrefetchLink
                href="/blog"
                className="hover:text-primary transition-colors"
              >
                Blog
              </PrefetchLink>
              {post.directory && (
                <>
                  <span>/</span>
                  <FolderOpen className="w-4 h-4" />
                  <span>{post.directory}</span>
                </>
              )}
            </div>

            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

            {post.description && (
              <p className="text-xl text-muted-foreground mb-6">
                {post.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary">{post.category}</Badge>
              {post.tags.map((tag) => (
                  <PrefetchLink
                    key={tag}
                    href={`/blog/tags/${formatTaxonomySlug(tag)}`}
                  >
                  <Badge
                    variant="outline"
                    className="hover:bg-primary hover:text-primary-foreground"
                  >
                    {tag}
                  </Badge>
                </PrefetchLink>
              ))}
            </div>
          </header>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Table of Contents */}
            {post.toc.length > 0 && (
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <TableOfContents toc={post.toc} />
                </div>
              </div>
            )}

            {/* Content */}
            <article
              className={
                post.toc.length > 0 ? "lg:col-span-3" : "lg:col-span-4"
              }
            >
              <MarkdownRenderer content={post.content} />
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
