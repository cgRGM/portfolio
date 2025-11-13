"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";

interface ProjectFormProps {
  project?: any;
  onSuccess?: () => void;
}

export function ProjectForm({ project, onSuccess }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    tags: project?.tags || [],
    github: project?.github || "",
    live: project?.live || "",
    featured: project?.featured || false,
  });

  const [tagInput, setTagInput] = useState("");

  const createProject = useMutation(api.projects.createProject);
  const updateProject = useMutation(api.projects.updateProject);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (project) {
        await updateProject({ id: project._id, ...formData });
        toast({
          title: "Success",
          description: "Project updated successfully",
        });
      } else {
        await createProject(formData);
        toast({
          title: "Success",
          description: "Project created successfully",
        });
        // Reset form
        setFormData({
          title: "",
          description: "",
          image: "",
          tags: [],
          github: "",
          live: "",
          featured: false,
        });
        setTagInput("");
      }
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${project ? 'update' : 'create'} project`,
        variant: "destructive",
      });
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Project title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Project description"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex gap-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={handleTagKeyPress}
            placeholder="Add a tag"
          />
          <Button type="button" onClick={addTag} variant="outline">
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => removeTag(tag)}
              />
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="github">GitHub URL</Label>
        <Input
          id="github"
          value={formData.github}
          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
          placeholder="https://github.com/username/repo"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="live">Live Demo URL</Label>
        <Input
          id="live"
          value={formData.live}
          onChange={(e) => setFormData({ ...formData, live: e.target.value })}
          placeholder="https://example.com"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="featured"
          checked={formData.featured}
          onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
        />
        <Label htmlFor="featured">Featured project</Label>
      </div>

      <Button type="submit">{project ? 'Update' : 'Create'} Project</Button>
    </form>
  );
}