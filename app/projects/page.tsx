"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

export default function ProjectsPage() {
  const projects = useQuery(api.projects.getProjects, {});

  if (!projects) {
    return (
      <div className="flex min-h-screen bg-background m-20">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
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
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background m-20">
      <main className="flex-1 overflow-auto md:ml-64 pb-20 md:pb-0">
        <div className="max-w-6xl">
          <Link
            href="/"
            className="text-accent hover:underline mb-12 inline-block text-sm"
          >
            ← back
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-12">Projects</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link key={project._id} href={`/projects/${project._id}`}>
                <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
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
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.github, '_blank', 'noopener,noreferrer');
                          }}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          View GitHub
                        </Button>
                      )}
                      {project.live && (
                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.live, '_blank', 'noopener,noreferrer');
                          }}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Live
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
