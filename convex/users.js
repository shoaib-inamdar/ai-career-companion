import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateUser=mutation({
    args:{
        name:v.string(),
        email:v.string()
    },
    handler:async(convexToJson,args)=>{
        const userData=await convexToJson.db.query('users')
        .filter(q=>q.eq(q.field('email'),args.email))
        .collect();

        if(userData?.length==0)
        {
            const data={
                name:args.name,
                email:args.email,
                credits:50000
            }
            const result=await convexToJson.db.insert('users',{
                ...data
            });
            return { _id: result, ...data };
        }
        return userData[0]
    }
})

export const UpdateUserToken = mutation({
    args: {
        id: v.id('users'),
        credits: v.number()
    },

    handler: async (ctx, args) =>{
        await ctx.db.patch(args.id, {
            credits: args.credits
        });
    }
});