import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  bios: defineTable({
    name: v.string(),
    title: v.string(),
    bio: v.array(v.string()),
    resumeId: v.optional(v.id("_storage")),
    socialLinks: v.object({
      github: v.string(),
      twitter: v.string(),
      linkedin: v.string(),
    }),
  }).index("by_name", ["name"]),
  
  posts: defineTable({
    title: v.string(),
    slug: v.string(),
    date: v.string(),
    content: v.string(),
    published: v.boolean(),
  }).index("by_slug", ["slug"])
    .index("by_date", ["date"])
    .index("by_published", ["published"]),
    
  projects: defineTable({
    title: v.string(),
    description: v.string(),
    about: v.optional(v.string()),
    image: v.string(),
    tags: v.array(v.string()),
    github: v.string(),
    live: v.string(),
    featured: v.boolean(),
  }).index("by_featured", ["featured"])
    .index("by_title", ["title"]),
});