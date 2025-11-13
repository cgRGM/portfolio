"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Eye, ArrowRight } from "lucide-react";

export default function BlogPosts() {
  const posts = useQuery(api.posts.getPosts, { publishedOnly: true });

  if (!posts) {
    return (
      <section id="writing" className="px-8 py-20 border-t border-border max-w-4xl">
        <h2 className="text-2xl font-bold text-foreground mb-8">Writing</h2>
        <div className="space-y-4">
          <div className="py-3">Loading posts...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="writing" className="px-8 py-20 border-t border-border max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-8">Writing</h2>

      <div className="space-y-6">
        {posts.slice(0, 3).map((post) => (
          <div key={post._id} className="group border border-border rounded-lg p-6 hover:border-accent transition-colors">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <Link href={`/posts/${post.slug}`} className="group-hover:text-accent transition-colors">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{post.title}</h3>
                </Link>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {post.content.replace(/<[^>]*>/g, '').substring(0, 120)}...
                </p>
              </div>
              <time className="text-sm text-muted-foreground whitespace-nowrap shrink-0">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link href={`/posts/${post.slug}`}>
                  <Eye className="w-4 h-4 mr-2" />
                  Read Post
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm" className="flex-1">
                <Link href="/posts">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  View All
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {posts.length > 3 && (
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link href="/posts">
              View All Posts ({posts.length - 3} more)
            </Link>
          </Button>
        </div>
      )}
    </section>
  )
}