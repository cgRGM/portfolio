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
import { X, Upload, Image as ImageIcon } from "lucide-react";

interface ProjectFormProps {
  project?: any;
  onSuccess?: () => void;
}

export function ProjectForm({ project, onSuccess }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    about: project?.about || "",
    image: project?.image || "",
    tags: project?.tags || [],
    github: project?.github || "",
    live: project?.live || "",
    featured: project?.featured || false,
  });

  const [tagInput, setTagInput] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const createProject = useMutation(api.projects.createProject);
  const createProjectWithImage = useMutation(api.projects.createProjectWithImage);
  const updateProject = useMutation(api.projects.updateProject);
  const updateProjectWithImage = useMutation(api.projects.updateProjectWithImage);
  const generateUploadUrl = useMutation(api.projects.generateUploadUrl);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let finalImageValue = formData.image;

      // Upload image if selected
      if (selectedImage) {
        const imageId = await uploadImage();
        if (!imageId) {
          throw new Error("Failed to upload image");
        }
        finalImageValue = imageId;
      }

      const projectData = {
        title: formData.title,
        description: formData.description,
        about: formData.about,
        image: finalImageValue,
        tags: formData.tags,
        github: formData.github,
        live: formData.live,
        featured: formData.featured
      };

      if (project) {
        // Update existing project
        if (selectedImage) {
          await updateProjectWithImage({
            id: project._id,
            title: formData.title,
            description: formData.description,
            about: formData.about,
            image: finalImageValue,
            tags: formData.tags,
            github: formData.github,
            live: formData.live,
            featured: formData.featured
          });
        } else {
          await updateProject({
            id: project._id,
            ...projectData
          });
        }
        toast({
          title: "Success",
          description: "Project updated successfully",
        });
      } else {
        // Create new project
        if (selectedImage) {
          await createProjectWithImage({
            title: formData.title,
            description: formData.description,
            about: formData.about,
            image: finalImageValue,
            tags: formData.tags,
            github: formData.github,
            live: formData.live,
            featured: formData.featured
          });
        } else {
          await createProject(projectData);
        }
        toast({
          title: "Success",
          description: "Project created successfully",
        });
        // Reset form
        setFormData({
          title: "",
          description: "",
          about: "",
          image: "",
          tags: [],
          github: "",
          live: "",
          featured: false,
        });
        setTagInput("");
        setSelectedImage(null);
        setImagePreview(null);
      }
      onSuccess?.();
    } catch (error) {
      console.error("Form submission error:", error);
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
      tags: formData.tags.filter((tag: string) => tag !== tagToRemove),
    });
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!selectedImage) return null;

    try {
      setIsUploading(true);

      // Step 1: Get upload URL
      const uploadUrl = await generateUploadUrl();

      // Step 2: Upload file
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": selectedImage.type },
        body: selectedImage,
      });

      if (!result.ok) {
        throw new Error("Upload failed");
      }

      const { storageId } = await result.json();
      return storageId;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    } finally {
      setIsUploading(false);
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
         <Label htmlFor="about">About</Label>
         <Textarea
           id="about"
           value={formData.about}
           onChange={(e) => setFormData({ ...formData, about: e.target.value })}
           placeholder="Detailed project write-up (supports Markdown)"
           rows={8}
           required
         />
       </div>

       <div className="space-y-2">
         <Label htmlFor="image">Project Image</Label>
         <div className="space-y-4">
           {imagePreview && (
             <div className="relative">
               <img
                 src={imagePreview}
                 alt="Preview"
                 className="w-full max-w-sm h-48 object-cover rounded-lg border"
               />
               <Button
                 type="button"
                 variant="destructive"
                 size="sm"
                 className="absolute top-2 right-2"
                 onClick={() => {
                   setSelectedImage(null);
                   setImagePreview(null);
                 }}
               >
                 <X className="w-4 h-4" />
               </Button>
             </div>
           )}
           <div className="flex items-center gap-4">
             <Input
               type="file"
               accept="image/*"
               onChange={handleImageSelect}
               className="flex-1"
             />
             <Button
               type="button"
               variant="outline"
               onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
               disabled={isUploading}
             >
               <Upload className="w-4 h-4 mr-2" />
               {isUploading ? "Uploading..." : "Upload"}
             </Button>
           </div>
           <p className="text-sm text-muted-foreground">
             Upload a project image or provide an image URL below
           </p>
         </div>
       </div>

       <div className="space-y-2">
         <Label htmlFor="image-url">Image URL (optional - if not uploading above)</Label>
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
          {formData.tags.map((tag: string) => (
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