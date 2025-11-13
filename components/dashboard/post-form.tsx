"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import Editor from 'react-simple-wysiwyg';

interface PostFormProps {
  post?: any;
  onSuccess?: () => void;
}

export function PostForm({ post, onSuccess }: PostFormProps) {
  // Convert post content to editor format on initialization
  const getInitialFormContent = () => {
    if (!post?.content) return "";

    try {
      const parsed = JSON.parse(post.content);
      // If it's already valid JSON, keep it as is for the form data
      return post.content;
    } catch {
      // If it's plain text, keep it as is
      return post.content;
    }
  };

  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    date: post?.date || new Date().toISOString().split('T')[0],
    content: getInitialFormContent(),
    published: post?.published || false,
  });

  // Convert content for react-simple-wysiwyg (expects HTML)
  const getInitialContent = () => {
    if (!formData.content) return '';

    try {
      // If it's already HTML, return as is
      if (formData.content.includes('<') && formData.content.includes('>')) {
        return formData.content;
      }

      // Try to parse as JSON (from Novel editor)
      const parsed = JSON.parse(formData.content);
      // For now, just return plain text - we can enhance this later
      return formData.content;
    } catch {
      // Plain text content
      return formData.content;
    }
  };

  const createPost = useMutation(api.posts.createPost);
  const updatePost = useMutation(api.posts.updatePost);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (post) {
        await updatePost({ id: post._id, ...formData });
        toast({
          title: "Success",
          description: "Post updated successfully",
        });
      } else {
        await createPost(formData);
        toast({
          title: "Success",
          description: "Post created successfully",
        });
        // Reset form
        setFormData({
          title: "",
          slug: "",
          date: new Date().toISOString().split('T')[0],
          content: "",
          published: false,
        });
      }
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${post ? 'update' : 'create'} post`,
        variant: "destructive",
      });
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Post title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          placeholder="url-friendly-slug"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Editor
          value={getInitialContent()}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          style={{ minHeight: '300px' }}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="published"
          checked={formData.published}
          onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
        />
        <Label htmlFor="published">Publish immediately</Label>
      </div>

      <Button type="submit">{post ? 'Update' : 'Create'} Post</Button>
    </form>
  );
}