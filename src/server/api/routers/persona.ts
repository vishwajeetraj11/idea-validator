
import { type Persona } from '@prisma/client';
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const personaRouter = createTRPCRouter({

    getPersonaById: protectedProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ ctx, input }): Promise<Persona | null> => {
            return ctx.db.persona.findUnique({
                where: { id: input.id },
            });
        }),

    // List all personas
    listPersonas: protectedProcedure.query(async ({ ctx }): Promise<Persona[]> => {
        return ctx.db.persona.findMany();
    }),

    listPersonasByIdeaId: protectedProcedure.input(z.object({ ideaId: z.number() })).query(async ({ ctx, input }): Promise<Persona[]> => {
        return ctx.db.persona.findMany({ where: { ideaId: input.ideaId } });
    }),


    // Update an existing persona
    updatePersona: protectedProcedure
        .input(z.object({
            id: z.number(),
            updates: z.object({
                name: z.string().optional(),
                age: z.number().positive().optional(),
                occupation: z.string().optional(),
                goals: z.array(z.string()).nonempty().optional(),
                challenges: z.array(z.string()).nonempty().optional(),
                habits: z.array(z.string()).nonempty().optional(),
                motivations: z.array(z.string()).nonempty().optional(),
            }),
        }))
        .mutation(async ({ ctx, input }) => {
            const { id, updates } = input;
            return ctx.db.persona.update({
                where: { id },
                data: updates,
            });
        }),

    // Delete a persona by their ID
    deletePersona: protectedProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.persona.delete({
                where: { id: input.id },
            });
        }),
});

export type PersonaRouter = typeof personaRouter;
