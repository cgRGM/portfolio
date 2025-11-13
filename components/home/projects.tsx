"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  const projects = useQuery(api.projects.getProjects, {});

  if (!projects) {
    return (
      <section id="projects" className="px-8 py-20 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-12">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-48 bg-muted rounded-lg mb-4"></div>
                  <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
}

  const displayedProjects = projects.slice(0, 5);

  return (
    <section id="projects" className="px-8 py-20 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground mb-12">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedProjects.map((project) => (
            <Card key={project._id} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="aspect-video overflow-hidden rounded-lg mb-4">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <CardTitle className="text-xl group-hover:text-accent transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  {project.github && (
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        View GitHub
                      </a>
                    </Button>
                  )}
                  {project.live && (
                    <Button asChild variant="default" size="sm" className="flex-1">
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Live
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {projects.length > 5 && (
          <div className="text-center">
            <Button asChild variant="outline">
              <Link href="/projects">
                View All Projects ({projects.length - 5} more)
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}