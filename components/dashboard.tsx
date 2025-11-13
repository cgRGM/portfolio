"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Plus, Edit, Trash2, Eye, FileText, Briefcase, User, BarChart3 } from "lucide-react";
import { BioForm } from "@/components/dashboard/bio-form";
import { PostForm } from "@/components/dashboard/post-form";
import { ProjectForm } from "@/components/dashboard/project-form";
import { useToast } from "@/hooks/use-toast";

export function Dashboard() {
  const [activeView, setActiveView] = useState("overview");
  const [editingPost, setEditingPost] = useState<any>(null);
  const [editingProject, setEditingProject] = useState<any>(null);

  const bio = useQuery(api.bio.getBio, {});
  const posts = useQuery(api.posts.getPosts, {});
  const projects = useQuery(api.projects.getProjects, {});

  const deletePost = useMutation(api.posts.deletePost);
  const deleteProject = useMutation(api.projects.deleteProject);
  const { toast } = useToast();

  const handleDeletePost = async (postId: string) => {
    try {
      await deletePost({ id: postId as any });
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      });
    }
  };

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

  const sidebarItems = [
    {
      title: "Overview",
      value: "overview",
      icon: BarChart3,
    },
    {
      title: "Bio",
      value: "bio",
      icon: User,
    },
    {
      title: "Posts",
      value: "posts",
      icon: FileText,
    },
    {
      title: "Projects",
      value: "projects",
      icon: Briefcase,
    },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="px-4 py-2">
            <h2 className="text-lg font-semibold">Dashboard</h2>
            <p className="text-sm text-muted-foreground">Manage your portfolio</p>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarItems.map((item) => (
                  <SidebarMenuItem key={item.value}>
                    <SidebarMenuButton
                      onClick={() => setActiveView(item.value)}
                      isActive={activeView === item.value}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">
              {sidebarItems.find(item => item.value === activeView)?.title}
            </h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">

          {activeView === "overview" && (
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Bio Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {bio ? "Complete" : "Not Set"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {bio ? "Your bio information is configured" : "Set up your bio information"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{posts?.length || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    Total blog posts
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{projects?.length || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    Total projects
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeView === "bio" && (
            <BioForm bio={bio} />
          )}

          {activeView === "posts" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Blog Posts</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      New Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New Post</DialogTitle>
                      <DialogDescription>
                        Add a new blog post to your portfolio.
                      </DialogDescription>
                    </DialogHeader>
                    <PostForm />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4">
                  {posts?.map((post) => (
                    <Card key={post._id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{post.title}</CardTitle>
                            <CardDescription>
                              {new Date(post.date).toLocaleDateString()} •
                              <Badge variant={post.published ? "default" : "secondary"} className="ml-2">
                                {post.published ? "Published" : "Draft"}
                              </Badge>
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(`/posts/${post.slug}`, '_blank')}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setEditingPost(post)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Edit Post</DialogTitle>
                                  <DialogDescription>
                                    Update your blog post.
                                  </DialogDescription>
                                </DialogHeader>
                                <PostForm
                                  post={editingPost}
                                  onSuccess={() => setEditingPost(null)}
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
                                  <AlertDialogTitle>Delete Post</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{post.title}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeletePost(post._id)}>
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
          )}

          {activeView === "projects" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Projects</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      New Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
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
                              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
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
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}