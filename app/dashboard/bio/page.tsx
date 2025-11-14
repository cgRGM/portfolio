"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { BioForm } from "@/components/dashboard/bio-form";

export default function BioPage() {
  const bio = useQuery(api.bio.getBio, {});

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold">Bio</h1>
      </div>
      <BioForm bio={bio} />
    </div>
  );
}