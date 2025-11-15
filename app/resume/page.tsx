"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";

export default function ResumePage() {
  const bio = useQuery(api.bio.getBio, {});

  if (!bio) {
    return (
      <div className="flex min-h-screen bg-background items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Loading...
          </h1>
        </div>
      </div>
    );
  }

  if (!bio.resumeId) {
    return (
      <div className="flex min-h-screen bg-background items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Resume Not Available
          </h1>
          <p className="text-muted-foreground mb-8">
            The resume has not been uploaded yet.
          </p>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return <ResumeContent bio={bio} />;
}

function ResumeContent({ bio }: { bio: any }) {
  const resumeUrl = useQuery(api.bio.getResumeUrl, { resumeId: bio.resumeId });

  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1 px-8 py-20 md:pb-0">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="text-accent hover:underline inline-flex items-center text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to home
            </Link>
            {resumeUrl && (
              <Button asChild>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={`${bio.name || "Resume"}.pdf`}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </a>
              </Button>
            )}
          </div>

          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h1 className="text-2xl font-bold text-foreground">
                {bio.name || "Resume"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {bio.title || "Professional Resume"}
              </p>
            </div>

            <div className="p-6">
              <iframe
                src={resumeUrl}
                className="w-full h-[800px] border-0 rounded"
                title="Resume PDF"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
