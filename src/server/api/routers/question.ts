import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { type Question } from '@prisma/client';

export const questionRouter = createTRPCRouter({
    // Create a new question associated with a survey
    createQuestion: protectedProcedure
        .input(z.object({
            surveyId: z.number(),
            content: z.string().min(1),
            section: z.string(),
            ideaId: z.number(),
        }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.question.create({
                data: {
                    surveyId: input.surveyId,
                    content: input.content,
                    section: input.section,
                    ideaId: input.ideaId
                },
            });
        }),

    // Retrieve a question by its ID
    getQuestionById: protectedProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ ctx, input }): Promise<Question | null> => {
            return ctx.db.question.findUnique({
                where: { id: input.id },
            });
        }),

    // List all questions for a survey
    listQuestionsForSurvey: protectedProcedure
        .input(z.object({ surveyId: z.number() }))
        .query(async ({ ctx, input }): Promise<Question[]> => {
            return ctx.db.question.findMany({
                where: { surveyId: input.surveyId },
            });
        }),

    // Update an existing question
    updateQuestion: protectedProcedure
        .input(z.object({
            id: z.number(),
            updates: z.object({
                content: z.string().min(1).optional(),
            }),
        }))
        .mutation(async ({ ctx, input }) => {
            const { id, updates } = input;
            return ctx.db.question.update({
                where: { id },
                data: updates,
            });
        }),

    // Delete a question
    deleteQuestion: protectedProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.question.delete({
                where: { id: input.id },
            });
        }),
});

export type QuestionRouter = typeof questionRouter;