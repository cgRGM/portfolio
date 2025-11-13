"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { use } from "react";
import { api } from "@/convex/_generated/api";

export default function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = useQuery(api.posts.getPost, { slug });

  if (!post) {
    return (
      <div className="flex min-h-screen bg-background items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Post not found</h1>
          <Link href="/posts" className="text-accent hover:underline">
            Back to posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1 px-8 py-20 pb-20 md:pb-0">
        <div className="max-w-3xl">
          <Link href="/posts" className="text-accent hover:underline mb-8 inline-block text-sm">
            ← back to posts
          </Link>

          <article>
            <h1 className="text-4xl font-bold text-foreground mb-4">{post.title}</h1>
            <time className="text-sm text-muted-foreground block mb-12">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>

            <div className="prose prose-invert max-w-none">
              {(() => {
                // Check if content is HTML
                if (post.content.includes('<') && post.content.includes('>')) {
                  return (
                    <div
                      className="prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-code:text-accent"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  );
                }

                // Fall back to plain text rendering (legacy content)
                return post.content.split("\n\n").map((paragraph, index) => (
                  <div key={index}>
                    {paragraph.startsWith("#") ? (
                      <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{paragraph.replace(/^#+\s/, "")}</h2>
                      ) : paragraph.startsWith("-") ? (
                        <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                          {paragraph.split("\n").map((item, i) => (
                            <li key={i}>{item.replace(/^-\s/, "")}</li>
                          ))}
                        </ul>
                      ) : (
                      <p className="text-muted-foreground leading-relaxed mb-4">{paragraph}</p>
                    )}
                  </div>
                ));
              })()}
            </div>
          </article>
        </div>
      </main>
    </div>
  )
}