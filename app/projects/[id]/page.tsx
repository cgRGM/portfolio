"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { use } from "react";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const project = useQuery(api.projects.getProject, {
    id: id as Id<"projects">,
  });

  // Update document title for SEO
  useEffect(() => {
    if (project) {
      document.title = `CG Stewart | ${project.title}`;
    }
  }, [project]);

  if (!project) {
    return (
      <div className="flex-1 overflow-auto md:ml-64 md:pb-0">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Project not found
          </h1>
          <Link href="/projects" className="text-accent hover:underline">
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto md:ml-64 md:pb-0">
      <main className="flex-1 px-8 py-20 pb-20 md:pb-0">
        <div className="max-w-3xl">
          <Link
            href="/projects"
            className="text-accent hover:underline mb-8 inline-block text-sm"
          >
            ← back to projects
          </Link>

          <article>
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="w-full rounded-lg border border-border overflow-hidden mb-8 max-h-96 object-cover"
            />

            <h1 className="text-4xl font-bold text-foreground mb-4">
              {project.title}
            </h1>

            <div className="flex gap-2 mb-8 flex-wrap">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded bg-card border border-border text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            {project.about && (
              <div className="prose prose-invert max-w-none mb-8">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold text-foreground mb-4">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-bold text-foreground mt-6 mb-3">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside text-muted-foreground mb-4 space-y-2">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-muted-foreground">{children}</li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground my-4">
                        {children}
                      </blockquote>
                    ),
                    code: ({ children }) => (
                      <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                        {children}
                      </pre>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className="text-accent hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                    strong: ({ children }) => (
                      <strong className="text-foreground font-semibold">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="text-muted-foreground italic">
                        {children}
                      </em>
                    ),
                  }}
                >
                  {project.about}
                </ReactMarkdown>
              </div>
            )}

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
  );
}
