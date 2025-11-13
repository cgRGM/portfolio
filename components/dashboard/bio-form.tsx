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

interface BioFormProps {
  bio: any;
}

export function BioForm({ bio }: BioFormProps) {
  const [formData, setFormData] = useState({
    name: bio?.name || "",
    title: bio?.title || "",
    bio: bio?.bio || [""],
    socialLinks: {
      github: bio?.socialLinks?.github || "",
      twitter: bio?.socialLinks?.twitter || "",
      linkedin: bio?.socialLinks?.linkedin || "",
    },
  });

  const updateBio = useMutation(api.bio.updateBio);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBio(formData);
      toast({
        title: "Success",
        description: "Bio updated successfully",
      });
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

          <Button type="submit">Save Bio</Button>
        </form>
      </CardContent>
    </Card>
  );
}