import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const insightsRouter = createTRPCRouter({
    // Get Insight by ID
    getInsightById: protectedProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ ctx, input }) => {
            return ctx.db.insights.findUnique({
                where: { id: input.id },
            });
        }),

    getInsightByIdeaId: protectedProcedure
        .input(z.object({ ideaId: z.number() }))
        .query(async ({ ctx, input }) => {
            return ctx.db.insights.findFirst({
                where: { ideaId: input.ideaId },
            });
        }),

    // List all insights for a specific idea
    listInsightsByIdeaId: protectedProcedure
        .input(z.object({ ideaId: z.number() }))
        .query(async ({ ctx, input }) => {
            return ctx.db.insights.findMany({
                where: { ideaId: input.ideaId },
            });
        }),

    // Create a new Insight
    createInsight: protectedProcedure
        .input(z.object({
            keyInsights: z.string(),
            readout: z.string(),
            pmfViabilityScore: z.number(),
            reasoning: z.string(),
            strengths: z.array(z.string()),
            weaknesses: z.array(z.string()),
            potentialEnhancements: z.array(z.string()),
            ideaId: z.number(),
        }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.insights.create({
                data: input,
            });
        }),

    // Update an existing Insight
    updateInsight: protectedProcedure
        .input(z.object({
            id: z.number(),
            updates: z.object({
                keyInsights: z.string().optional(),
                readout: z.string().optional(),
                pmfViabilityScore: z.number().optional(),
                reasoning: z.string().optional(),
                strengths: z.any().optional(),
                weaknesses: z.any().optional(),
                potentialEnhancements: z.any().optional(),
            }),
        }))
        .mutation(async ({ ctx, input }) => {
            const { id, updates } = input;
            return ctx.db.insights.update({
                where: { id },
                data: updates,
            });
        }),

    // Delete an Insight
    deleteInsight: protectedProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.insights.delete({
                where: { id: input.id },
            });
        }),
});

export type InsightsRouter = typeof insightsRouter;