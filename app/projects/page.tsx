"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Navigation from "@/components/home/navigation";

export default function ProjectsPage() {
  const projects = useQuery(api.projects.getProjects, {});

  if (!projects) {
    return (
      <div className="flex min-h-screen bg-background">
        <Navigation />
        <main className="flex-1 px-8 py-20 pb-20 md:pb-0">
          <div className="max-w-6xl">
            <Link
              href="/"
              className="text-accent hover:underline mb-12 inline-block text-sm"
            >
              ← back
            </Link>
            <h1 className="text-4xl font-bold text-foreground mb-12">
              Projects
            </h1>
            <div className="space-y-20">
              <div>Loading projects...</div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Navigation />
      <main className="flex-1 overflow-auto md:ml-64 pb-20 md:pb-0">
        <div className="max-w-6xl">
          <Link
            href="/"
            className="text-accent hover:underline mb-12 inline-block text-sm"
          >
            ← back
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-12">Projects</h1>

          <div className="space-y-20">
            {projects.map((project, index) => (
              <div
                key={project._id}
                className="grid md:grid-cols-2 gap-8 items-start"
              >
                <div className={index % 2 === 1 ? "md:order-2" : "md:order-1"}>
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full rounded-lg border border-border overflow-hidden"
                  />
                </div>

                <div className={index % 2 === 1 ? "md:order-1" : "md:order-2"}>
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    {project.title}
                  </h2>

                  <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                    {project.description}
                  </p>

                  <div className="flex gap-2 mb-6 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded bg-card border border-border text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      className="text-accent hover:underline text-sm font-medium"
                    >
                      GitHub →
                    </a>
                    <a
                      href={project.live}
                      className="text-accent hover:underline text-sm font-medium"
                    >
                      Live Demo →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
