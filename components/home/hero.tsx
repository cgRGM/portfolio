"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { TypeScript, ReactLight, Nextjs, Nodejs, PostgreSQL, GitHubLight, Twitter, LinkedIn } from "@ridemountainpig/svgl-react";

export default function Hero() {
  const bio = useQuery(api.bio.getBio, {});

  if (!bio) {
    return (
      <section id="about" className="md:ml-64 px-8 py-24 md:py-32 max-w-4xl">
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
              Loading...
            </h1>
          </div>
        </div>
      </section>
    );
  }

  const technologies = [
    { name: "TypeScript", icon: TypeScript },
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: Nextjs },
    { name: "Node.js", icon: Nodejs },
    { name: "PostgreSQL", icon: PostgreSQL },
  ];

  return (
    <section id="about" className="md:ml-64 px-8 py-24 md:py-32 max-w-4xl">
      <div className="space-y-8">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            {bio.name}
          </h1>
          <p className="text-xl text-primary font-light">{bio.title}</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-4 text-base text-muted-foreground leading-relaxed">
          {bio.bio.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          <p>
            When I'm not coding, you can find me contributing to open source,
            writing about web development, or exploring new technologies. Feel
            free to connect with me on{" "}
            <a
              href={bio.socialLinks.github}
              className="text-accent hover:underline inline-flex items-center gap-1"
            >
              <GitHubLight className="w-4 h-4" />
              GitHub
            </a>
            ,{" "}
            <a
              href={bio.socialLinks.twitter}
              className="text-accent hover:underline inline-flex items-center gap-1"
            >
              <Twitter className="w-4 h-4" />
              X
            </a>
            , or{" "}
            <a
              href={bio.socialLinks.linkedin}
              className="text-accent hover:underline inline-flex items-center gap-1"
            >
              <LinkedIn className="w-4 h-4" />
              LinkedIn
            </a>
            .
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Tech Stack</h3>
          <div className="flex flex-wrap gap-3">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2 px-3 py-2 rounded-md bg-card border border-border text-sm text-foreground hover:border-accent transition-colors"
              >
                <tech.icon className="w-4 h-4" />
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
