"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { ProjectForm } from "@/components/dashboard/project-form";
import { useToast } from "@/hooks/use-toast";

export default function ProjectsPage() {
  const [editingProject, setEditingProject] = useState<any>(null);
  const projects = useQuery(api.projects.getProjects, {});
  const deleteProject = useMutation(api.projects.deleteProject);
  const { toast } = useToast();

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject({ id: projectId as any });
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Projects</h1>
        <Dialog>
                   <DialogTrigger asChild>
                     <Button>
                       <Plus className="w-4 h-4 mr-2" />
                       New Project
                     </Button>
                   </DialogTrigger>
                   <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
                     <DialogHeader>
                       <DialogTitle>Create New Project</DialogTitle>
                       <DialogDescription>
                         Add a new project to your portfolio.
                       </DialogDescription>
                     </DialogHeader>
                     <ProjectForm />
                   </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {projects?.map((project) => (
          <Card key={project._id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                  <div className="flex gap-2 mt-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`/projects/${project._id}`, '_blank')}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Dialog>
                     <DialogTrigger asChild>
                       <Button variant="outline" size="sm" onClick={() => setEditingProject(project)}>
                         <Edit className="w-4 h-4" />
                       </Button>
                     </DialogTrigger>
                     <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
                       <DialogHeader>
                         <DialogTitle>Edit Project</DialogTitle>
                         <DialogDescription>
                           Update your project.
                         </DialogDescription>
                       </DialogHeader>
                       <ProjectForm
                         project={editingProject}
                         onSuccess={() => setEditingProject(null)}
                       />
                     </DialogContent>
                  </Dialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Project</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{project.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteProject(project._id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}