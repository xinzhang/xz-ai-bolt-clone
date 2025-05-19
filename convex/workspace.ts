import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateWorkspace = mutation({
  args: {
    messages: v.any(), //json object
    user: v.id("users"),
  },
  handler: async (ctx, args) => {
    const workspaceId = await ctx.db.insert("workspace", {
      messages: args.messages,
      user: args.user,
    });
    return workspaceId;
  }
})

export const GetWorkspace = query({
  args: {
    workspaceId: v.id("workspace"),
  },
  handler: async (ctx, args) => {
    const workspace = await ctx.db.get(args.workspaceId);
    return workspace;
  }
});

export const UpdateMessages = mutation({
  args: {
    workspaceId: v.id("workspace"),
    messages: v.any(),
  },
  handler: async (ctx, args) => {
    const workspaceId = await ctx.db.patch(args.workspaceId, {
      messages: args.messages,
    });
    return workspaceId;
  }
});

export const UpdateFiles = mutation({
  args: {
    workspaceId: v.id("workspace"),
    files: v.any()
  },
  handler: async (ctx, args) => {
    const workspaceId = await ctx.db.patch(args.workspaceId, {
      fileData: args.files,
    });
    return workspaceId;
  }
});

export const GetAllWorkspaces = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const workspaces = await ctx.db.query("workspace")
      .filter(q => q.eq(q.field("user"), args.userId)).collect();
    return workspaces;
  }
});
