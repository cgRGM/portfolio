"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, X } from "lucide-react";

interface BioFormProps {
  bio: any;
}

export function BioForm({ bio }: BioFormProps) {
  const [formData, setFormData] = useState({
    name: bio?.name || "",
    title: bio?.title || "",
    bio: bio?.bio || [""],
    resumeId: bio?.resumeId || "",
    socialLinks: {
      github: bio?.socialLinks?.github || "",
      twitter: bio?.socialLinks?.twitter || "",
      linkedin: bio?.socialLinks?.linkedin || "",
    },
  });

  const [selectedResume, setSelectedResume] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const updateBio = useMutation(api.bio.updateBio);
  const generateUploadUrl = useMutation(api.bio.generateUploadUrl);
  const { toast } = useToast();

  const handleResumeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast({
          title: "Error",
          description: "Please select a PDF file",
          variant: "destructive",
        });
        return;
      }
      setSelectedResume(file);
    }
  };

  const uploadResume = async (): Promise<string | null> => {
    if (!selectedResume) return null;

    try {
      setIsUploading(true);

      // Step 1: Get upload URL
      const uploadUrl = await generateUploadUrl();

      // Step 2: Upload file
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": selectedResume.type },
        body: selectedResume,
      });

      if (!result.ok) {
        throw new Error("Upload failed");
      }

      const { storageId } = await result.json();
      return storageId;
    } catch (error) {
      console.error("Resume upload error:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let resumeId = formData.resumeId;

      // Upload resume if selected
      if (selectedResume) {
        resumeId = await uploadResume();
        if (!resumeId) {
          throw new Error("Failed to upload resume");
        }
      }

      await updateBio({
        ...formData,
        resumeId,
      });

      toast({
        title: "Success",
        description: "Bio updated successfully",
      });

      // Reset resume selection
      setSelectedResume(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update bio",
        variant: "destructive",
      });
    }
  };

  const updateBioParagraph = (index: number, value: string) => {
    const newBio = [...formData.bio];
    newBio[index] = value;
    setFormData({ ...formData, bio: newBio });
  };

  const addBioParagraph = () => {
    setFormData({ ...formData, bio: [...formData.bio, ""] });
  };

  const removeBioParagraph = (index: number) => {
    const newBio = formData.bio.filter((_, i) => i !== index);
    setFormData({ ...formData, bio: newBio });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bio Information</CardTitle>
        <CardDescription>
          Update your personal information and bio that appears on your portfolio.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Your professional title"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Bio Paragraphs</Label>
            {formData.bio.map((paragraph, index) => (
              <div key={index} className="flex gap-2">
                <Textarea
                  value={paragraph}
                  onChange={(e) => updateBioParagraph(index, e.target.value)}
                  placeholder={`Bio paragraph ${index + 1}`}
                  className="flex-1"
                />
                {formData.bio.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeBioParagraph(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addBioParagraph}>
              Add Paragraph
            </Button>
          </div>

          <div className="space-y-4">
            <Label>Social Links</Label>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  value={formData.socialLinks.github}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, github: e.target.value },
                    })
                  }
                  placeholder="https://github.com/username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  value={formData.socialLinks.twitter}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, twitter: e.target.value },
                    })
                  }
                  placeholder="https://twitter.com/username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={formData.socialLinks.linkedin}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, linkedin: e.target.value },
                    })
                  }
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Resume</Label>
            <div className="space-y-4">
              {selectedResume && (
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">{selectedResume.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedResume(null)}
                    className="ml-auto"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="application/pdf"
                  onChange={handleResumeSelect}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
                  disabled={isUploading}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {isUploading ? "Uploading..." : "Upload Resume"}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Upload your resume as a PDF file. This will be available for download on your portfolio.
              </p>
            </div>
          </div>

          <Button type="submit" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Save Bio"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}