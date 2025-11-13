import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getProjects = query({
  args: {
    featuredOnly: v.optional(v.boolean()),
  },
  returns: v.array(v.object({
    _id: v.id("projects"),
    _creationTime: v.number(),
    title: v.string(),
    description: v.string(),
    image: v.string(),
    tags: v.array(v.string()),
    github: v.string(),
    live: v.string(),
    featured: v.boolean(),
  })),
  handler: async (ctx, args) => {
    if (args.featuredOnly) {
      return await ctx.db
        .query("projects")
        .withIndex("by_featured", (q) => q.eq("featured", true))
        .collect();
    }

    return await ctx.db.query("projects").collect();
  },
});

export const getProject = query({
  args: {
    id: v.id("projects"),
  },
  returns: v.union(
    v.object({
      _id: v.id("projects"),
      _creationTime: v.number(),
      title: v.string(),
      description: v.string(),
      image: v.string(),
      tags: v.array(v.string()),
      github: v.string(),
      live: v.string(),
      featured: v.boolean(),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createProject = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    image: v.string(),
    tags: v.array(v.string()),
    github: v.string(),
    live: v.string(),
    featured: v.boolean(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.insert("projects", args);
    return null;
  },
});

export const updateProject = mutation({
  args: {
    id: v.id("projects"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    image: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    github: v.optional(v.string()),
    live: v.optional(v.string()),
    featured: v.optional(v.boolean()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return null;
  },
});

export const deleteProject = mutation({
  args: {
    id: v.id("projects"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return null;
  },
});