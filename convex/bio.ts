import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getBio = query({
  args: {},
  returns: v.union(
    v.object({
      _id: v.id("bios"),
      _creationTime: v.number(),
      name: v.string(),
      title: v.string(),
      bio: v.array(v.string()),
      resumeId: v.optional(v.id("_storage")),
      socialLinks: v.object({
        github: v.string(),
        twitter: v.string(),
        linkedin: v.string(),
      }),
    }),
    v.null()
  ),
  handler: async (ctx) => {
    const bio = await ctx.db.query("bios").first();
    return bio;
  },
});

export const updateBio = mutation({
  args: {
    name: v.string(),
    title: v.string(),
    bio: v.array(v.string()),
    resumeId: v.optional(v.id("_storage")),
    socialLinks: v.object({
      github: v.string(),
      twitter: v.string(),
      linkedin: v.string(),
    }),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const existingBio = await ctx.db.query("bios").first();

    if (existingBio) {
      await ctx.db.patch(existingBio._id, args);
    } else {
      await ctx.db.insert("bios", args);
    }
    return null;
  },
});

export const generateUploadUrl = mutation({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const getResumeUrl = query({
  args: {
    resumeId: v.id("_storage"),
  },
  returns: v.string(),
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.resumeId) || "";
  },
});