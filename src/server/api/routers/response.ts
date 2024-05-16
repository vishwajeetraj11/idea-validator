import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { type Response } from '@prisma/client';

export const responseRouter = createTRPCRouter({
    // Submit a new response
    submitResponse: protectedProcedure
        .input(z.object({
            questionId: z.number(), // ID of the question being answered
            personaId: z.number(),  // ID of the persona submitting the response
            answer: z.string(),     // The actual response to the question
        }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.response.create({
                data: {
                    questionId: input.questionId,
                    personaId: input.personaId,
                    answer: input.answer,
                },
            });
        }),

    // Retrieve a response by its ID
    getResponseById: protectedProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ ctx, input }): Promise<Response | null> => {
            return ctx.db.response.findUnique({
                where: { id: input.id },
            });
        }),
    // Retrieve a response by survey ID
    getResponseBySurveyId: protectedProcedure
        .input(z.object({ surveyId: z.number() }))
        .query(async ({ ctx, input }): Promise<Response | null> => {
            return ctx.db.response.findFirst({
                where: { surveyId: input.surveyId },
            });
        }),

    // List all responses for a specific question
    listResponsesForQuestion: protectedProcedure
        .input(z.object({ questionId: z.number() }))
        .query(async ({ ctx, input }): Promise<Response[]> => {
            return ctx.db.response.findMany({
                where: { questionId: input.questionId },
                // Possibly include related objects like question or persona
            });
        }),

    // Update an existing response
    updateResponse: protectedProcedure
        .input(z.object({
            id: z.number(),
            updates: z.object({
                answer: z.string().optional(),
                // Add any additional fields that may be updatable for a response
            }),
        }))
        .mutation(async ({ ctx, input }) => {
            const { id, updates } = input;
            return ctx.db.response.update({
                where: { id },
                data: updates,
            });
        }),

    // Delete a response by its ID
    deleteResponse: protectedProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.response.delete({
                where: { id: input.id },
            });
        }),
});

export type ResponseRouter = typeof responseRouter;