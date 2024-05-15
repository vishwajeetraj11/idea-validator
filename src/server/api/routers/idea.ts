import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";


export const ideaRouter = createTRPCRouter({
    // Submit a new idea
    createIdea: protectedProcedure
        .input(z.object({ content: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.idea.create({
                data: {
                    content: input.content,
                    createdBy: { connect: { id: ctx.session.user.id } },
                },
            });
        }),

    // Retrieve an idea by its ID
    getIdeaById: protectedProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ ctx, input }) => {
            return ctx.db.idea.findUnique({
                where: { id: input.id },
                include: {
                    essence: true,
                    surveys: true,
                },
            });
        }),

    // List all ideas a user has created
    listUserIdeas: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.idea.findMany({
            where: { createdById: ctx.session.user.id },
            include: {
                essence: true,
            },
        });
    }),

    // Update an existing idea
    updateIdea: protectedProcedure
        .input(z.object({ id: z.number(), content: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.idea.update({
                where: { id: input.id },
                data: { content: input.content },
            });
        }),

    // Delete an idea
    deleteIdea: protectedProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.idea.delete({
                where: { id: input.id },
            });
        }),
});

export type IdeaRouter = typeof ideaRouter;
