
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { type Survey } from '@prisma/client';

export const surveyRouter = createTRPCRouter({
    // Create a new survey


    // Retrieve a survey by its ID including its questions
    getSurveyById: protectedProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ ctx, input }): Promise<Survey | null> => {
            return ctx.db.survey.findUnique({
                where: { id: input.id },
                include: {
                    questions: true,
                },
            });
        }),

    getSurveyByIdeaId: protectedProcedure
        .input(z.object({ ideaId: z.number() }))
        .query(async ({ ctx, input }) => {
            return ctx.db.survey.findFirst({
                where: { ideaId: input.ideaId },
                include: {
                    questions: {
                        select: {
                            id: true,
                            content: true,
                            section: true,
                            responses: {
                                select: {
                                    answer: true,
                                    id: true,
                                    persona: { select: { id: true, name: true } },
                                }
                            }
                        }
                    }
                },
            });
        }),

    // List all surveys for an idea
    listSurveysForIdea: protectedProcedure
        .input(z.object({ ideaId: z.number() }))
        .query(async ({ ctx, input }): Promise<Survey[]> => {
            return ctx.db.survey.findMany({
                where: { ideaId: input.ideaId },
                include: {
                    questions: true,
                },
            });
        }),

    // Update an existing survey
    updateSurvey: protectedProcedure
        .input(z.object({
            id: z.number(),
            updates: z.object({
                title: z.string().min(1).optional(),
                // Assumes you might want to update questions, 
                // if updating questions is more complex consider a separate method
            }),
        }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.survey.update({
                where: { id: input.id },
                data: input.updates,
            });
        }),

    // Delete a survey
    deleteSurvey: protectedProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.survey.delete({
                where: { id: input.id },
            });
        }),
});

export type SurveyRouter = typeof surveyRouter;
