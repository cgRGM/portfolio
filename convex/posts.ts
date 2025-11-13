import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getPosts = query({
  args: {
    publishedOnly: v.optional(v.boolean()),
  },
  returns: v.array(v.object({
    _id: v.id("posts"),
    _creationTime: v.number(),
    title: v.string(),
    slug: v.string(),
    date: v.string(),
    content: v.string(),
    published: v.boolean(),
  })),
  handler: async (ctx, args) => {
    if (args.publishedOnly) {
      return await ctx.db
        .query("posts")
        .withIndex("by_published", (q) => q.eq("published", true))
        .collect();
    }

    return await ctx.db.query("posts").collect();
  },
});

export const getPost = query({
  args: {
    slug: v.string(),
  },
  returns: v.union(
    v.object({
      _id: v.id("posts"),
      _creationTime: v.number(),
      title: v.string(),
      slug: v.string(),
      date: v.string(),
      content: v.string(),
      published: v.boolean(),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    return post;
  },
});

export const createPost = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    date: v.string(),
    content: v.string(),
    published: v.boolean(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.insert("posts", args);
    return null;
  },
});

export const updatePost = mutation({
  args: {
    id: v.id("posts"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    date: v.optional(v.string()),
    content: v.optional(v.string()),
    published: v.optional(v.boolean()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return null;
  },
});

export const deletePost = mutation({
  args: {
    id: v.id("posts"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return null;
  },
});