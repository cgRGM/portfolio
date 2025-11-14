"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function PostsPage() {
  const posts = useQuery(api.posts.getPosts, { publishedOnly: true });

  if (!posts) {
    return (
      <div className="flex min-h-screen bg-background m-20">
        <main className="flex-1 px-8 py-20 md:py-20 pb-20 md:pb-0">
          <div className="max-w-4xl">
            <Link
              href="/"
              className="text-accent hover:underline mb-12 inline-block text-sm"
            >
              ← back
            </Link>
            <h1 className="text-4xl font-bold text-foreground mb-12">
              Writing
            </h1>
            <div className="space-y-4">
              <div>Loading posts...</div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background m-20">
      <main className="flex-1 overflow-auto md:ml-64 pb-20 md:pb-0">
        <div className="max-w-4xl">
          <Link
            href="/"
            className="text-accent hover:underline mb-12 inline-block text-sm"
          >
            ← back
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-12">Writing</h1>

          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="group py-4 border-b border-border last:border-b-0"
              >
                <Link
                  href={`/posts/${post.slug}`}
                  className="flex items-center justify-between gap-4"
                >
                  <h2 className="text-lg text-foreground group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <time className="text-sm text-muted-foreground whitespace-nowrap">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
