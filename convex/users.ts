import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    uid: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("args", args);
    const user = await ctx.db.query("users").filter(q => q.eq(q.field("email"), args.email)).first();
    if (!user) {
      const result = await ctx.db.insert("users", {
        name: args.name,
        email: args.email,
        picture: args.picture,
        uid: args.uid,
        token: 50000,
      });
      return result;
    }
    return user;
  }
})

export const GetUser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.query("users").filter(q => q.eq(q.field("email"), args.email)).first();
    return user;
  }
})

export const UpdateTokens = mutation({
  args: {
    token: v.number(),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {    
    const result = await ctx.db.patch(args.userId, {
      token: args.token,
    });
    return result;
  }
})
