import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { TableOfContents } from "@/components/table-of-contents";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FolderOpen } from "lucide-react";
import { PrefetchLink } from "@/components/prefetch-link";
import { getPostBySlug, getAllPosts } from "@/lib/blog";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const title = `${post.title} | Dbuild.dev`;
  const description = post.description || `Read ${post.title} on Dbuild.dev`;
  const url = `https://dbuild.dev/blog/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Dbuild.dev",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-20">
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
                  href={`/blog/tags/${tag.toLowerCase()}`}
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
