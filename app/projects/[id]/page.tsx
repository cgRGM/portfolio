"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { use } from "react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = useQuery(api.projects.getProject, { id: id as Id<"projects"> });

  if (!project) {
    return (
      <div className="flex min-h-screen bg-background items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Project not found</h1>
          <Link href="/projects" className="text-accent hover:underline">
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1 px-8 py-20 pb-20 md:pb-0">
        <div className="max-w-3xl">
          <Link href="/projects" className="text-accent hover:underline mb-8 inline-block text-sm">
            ← back to projects
          </Link>

          <article>
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="w-full rounded-lg border border-border overflow-hidden mb-8 max-h-96 object-cover"
            />

            <h1 className="text-4xl font-bold text-foreground mb-4">{project.title}</h1>

            <div className="flex gap-2 mb-8 flex-wrap">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 rounded bg-card border border-border text-foreground">
                  {tag}
                </span>
              ))}
            </div>

            <div className="prose prose-invert max-w-none mb-8">
              <p className="text-lg text-muted-foreground leading-relaxed">{project.description}</p>
            </div>

            <div className="flex gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-accent text-background rounded hover:opacity-90 transition-opacity font-medium"
              >
                View on GitHub
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 border border-accent text-accent rounded hover:bg-accent hover:text-background transition-colors font-medium"
              >
                Live Demo
              </a>
            </div>
          </article>
        </div>
      </main>
    </div>
  )
}