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
import { PostForm } from "@/components/dashboard/post-form";
import { useToast } from "@/hooks/use-toast";

export default function PostsPage() {
  const [editingPost, setEditingPost] = useState<any>(null);
  const posts = useQuery(api.posts.getPosts, {});
  const deletePost = useMutation(api.posts.deletePost);
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

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Blog Posts</h1>
        <Dialog>
                   <DialogTrigger asChild>
                     <Button>
                       <Plus className="w-4 h-4 mr-2" />
                       New Post
                     </Button>
                   </DialogTrigger>
                   <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
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
                   <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
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
  );
}