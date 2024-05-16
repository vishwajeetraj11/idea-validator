import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { type IdeaEssence } from '@prisma/client';

export const ideaEssenceRouter = createTRPCRouter({
    createIdea: protectedProcedure
        .input(z.object({ content: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.idea.create({
                data: {
                    content: input.content,
                },
            });
        }),
    createIdeaEssence: protectedProcedure
        .input(z.object({
            ideaId: z.number(),
            name: z.string(),
            description: z.string(),
            usp: z.string(),
            problem: z.string(),
            solution: z.string(),
            features: z.array(z.string()),
        }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.ideaEssence.create({
                data: {
                    ideaId: input.ideaId,
                    name: input.name,
                    description: input.description,
                    usp: input.usp,
                    problem: input.problem,
                    solution: input.solution,
                    features: input.features,
                },
            });
        }),

    // Retrieve idea essence by ID
    getIdeaEssenceById: protectedProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ ctx, input }): Promise<IdeaEssence | null> => {
            return ctx.db.ideaEssence.findUnique({
                where: { id: input.id },
            });
        }),

    // Update an existing idea essence
    updateIdeaEssence: protectedProcedure
        .input(z.object({
            id: z.number(),
            updates: z.object({
                name: z.string().optional(),
                description: z.string().optional(),
                usp: z.string().optional(),
                problem: z.string().optional(),
                solution: z.string().optional(),
                features: z.array(z.string()).optional(),
            }),
        }))
        .mutation(async ({ ctx, input }) => {
            const { id, updates } = input;
            return ctx.db.ideaEssence.update({
                where: { id },
                data: updates,
            });
        }),

    // List all idea essences
    listIdeaEssences: protectedProcedure.query(async ({ ctx }): Promise<IdeaEssence[]> => {
        return ctx.db.ideaEssence.findMany();
    }),

    // Delete idea essence
    deleteIdeaEssence: protectedProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.ideaEssence.delete({
                where: { id: input.id },
            });
        }),
});

export type IdeaEssenceRouter = typeof ideaEssenceRouter;