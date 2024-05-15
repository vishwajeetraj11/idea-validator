import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { type Persona, type Survey } from '@prisma/client';
import { getAnotherPersonaPrompt, getIdeaEssencePrompt, getInitialPayingPersonaPrompt, getSurveyPrompt, getSurveyResponseGeneratorPrompt } from '~/lib/prompts';

import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

const openAI = new OpenAI({
    apiKey,
});

export const openAIRouter = createTRPCRouter({
    getIdeaEssence: protectedProcedure
        .input(z.object({
            idea: z.string(),
            ideaId: z.number(),
        }))
        .mutation(async ({ ctx, input, }) => {
            const ideaEssenseExists = await ctx.db.ideaEssence.findUnique({ where: { id: input.ideaId } });
            if (ideaEssenseExists) return ideaEssenseExists;

            const openaiResponse = await openAI.chat.completions.create({
                model: "gpt-3.5-turbo-1106",
                temperature: 1,
                messages: [
                    {
                        role: "user",
                        content: getIdeaEssencePrompt(input.idea),
                    },
                ],
                response_format: { type: "json_object" },

            })
            const parsedIdeaEssence = JSON.parse(String(openaiResponse?.choices?.[0]?.message?.content) ?? "{}") as {
                name: string;
                oneLineLiteralDescription: string;
                uniqueSellingPoint: string;
                problemStatement: string;
                solution: string;
                coreFeatures: string[];
            };

            return ctx.db.ideaEssence.create({
                data: {
                    ideaId: input.ideaId,
                    name: parsedIdeaEssence.name,
                    description: parsedIdeaEssence.oneLineLiteralDescription,
                    usp: parsedIdeaEssence.uniqueSellingPoint,
                    problem: parsedIdeaEssence.problemStatement,
                    solution: parsedIdeaEssence.solution,
                    features: parsedIdeaEssence.coreFeatures,
                },
            });
        }),
    getSurveyForm: protectedProcedure
        .input(z.object({
            ideaId: z.number(),
        }))
        .mutation(async ({ ctx, input, }) => {
            const ideaEssenseExists = await ctx.db.ideaEssence.findUnique({ where: { id: input.ideaId } });
            if (!ideaEssenseExists) return;
            const surveyExists = await ctx.db.survey.findFirst({
                where: { ideaId: ideaEssenseExists.id }, include: {
                    questions: true,
                }
            });

            if (surveyExists && surveyExists.questions.length !== 0) return surveyExists;
            const openaiResponse = await openAI.chat.completions.create({
                model: "gpt-3.5-turbo-1106",
                temperature: 1,
                messages: [
                    {
                        role: "user",
                        content: getSurveyPrompt(ideaEssenseExists),
                    },
                ],
                response_format: { type: "json_object" },

            })
            const parsedSurveyForm = JSON.parse(String(openaiResponse?.choices?.[0]?.message?.content) ?? "{}") as {
                survey: {
                    section: string,
                    questions: string[]
                }[]
            };
            console.log(surveyExists)
            let survey: Survey | undefined;
            if (!surveyExists) {
                const surveyCreated = await ctx.db.survey.create({
                    data: {
                        title: ideaEssenseExists.name,
                        ideaId: ideaEssenseExists.id,
                    }
                });
                survey = surveyCreated;
            } else {
                survey = surveyExists as Survey;
            }

            const questionsToInsert = parsedSurveyForm.survey.flatMap(section => {
                return section.questions.map(question => ({
                    surveyId: survey.id,
                    content: question,
                    section: section.section,
                    ideaId: input.ideaId,
                }));
            });

            const questions = await ctx.db.question.createMany({
                data: questionsToInsert,
            });

            return {
                ...survey,
            }
        }),
    getPayingPersona: protectedProcedure
        .input(z.object({
            ideaId: z.number(),
        }))
        .mutation(async ({ ctx, input, }) => {
            const ideaEssenseExists = await ctx.db.ideaEssence.findUnique({ where: { id: input.ideaId } });
            if (!ideaEssenseExists) return;

            const personas = await ctx.db.persona.findMany({ where: { ideaId: input.ideaId } });
            if (personas.length !== 0) return personas;

            const persona1Response = await openAI.chat.completions.create({
                model: "gpt-3.5-turbo-1106",
                temperature: 1,
                messages: [
                    {
                        role: "user",
                        content: getInitialPayingPersonaPrompt(ideaEssenseExists),
                    },
                ],
                response_format: { type: "json_object" },
            })
            const parsedPersona = JSON.parse(String(persona1Response?.choices?.[0]?.message?.content) ?? "{}") as Persona
            parsedPersona.ideaId = input.ideaId;
            const persona2Response = await openAI.chat.completions.create({
                model: "gpt-3.5-turbo-1106",
                temperature: 1,
                messages: [
                    {
                        role: 'system',
                        content: persona1Response?.choices?.[0]?.message?.content ?? ''
                    },
                    {
                        role: "user",
                        content: getAnotherPersonaPrompt(),
                    },
                ],
                response_format: { type: "json_object" },
            })
            const parsedPersona2 = JSON.parse(String(persona2Response?.choices?.[0]?.message?.content) ?? "{}") as Persona
            parsedPersona2.ideaId = input.ideaId;

            await ctx.db.persona.createMany({
                data: [parsedPersona, parsedPersona2]
            })

            return {
                parsedPersona,
                parsedPersona2
            }
        }),
    personaFillingForm: protectedProcedure
        .input(z.object({
            ideaId: z.number(),
            surveyId: z.number()
        }))
        .mutation(async ({ ctx, input, }) => {
            const ideaEssenseExists = await ctx.db.ideaEssence.findUnique({ where: { id: input.ideaId } });
            if (!ideaEssenseExists) return;

            const surveyExists = await ctx.db.survey.findUnique({
                where: { id: input.surveyId }, include: {
                    questions: true
                }
            });
            if (!surveyExists) return;


            const personas = await ctx.db.persona.findMany({ where: { ideaId: input.ideaId } });
            if (personas.length < 1) return;

            const formResponsePromises = personas.map(persona => openAI.chat.completions.create({
                model: "gpt-3.5-turbo-1106",
                temperature: 1,
                messages: [
                    {
                        role: "user",
                        content: getSurveyResponseGeneratorPrompt(persona, surveyExists),
                    },
                ],
                response_format: { type: "json_object" },
            }))
            if (personas[0]) {
                console.log(getSurveyResponseGeneratorPrompt(personas?.[0], surveyExists))
            }
            const unformattedFormResponses = await Promise.all(formResponsePromises);
            const formattedFormResponses = unformattedFormResponses.map(response => {
                return JSON.parse(response.choices[0]?.message?.content ?? '{}') as { formResponse: { personaId: number, surveyResponse: { questionId: number, answer: string }[] }[] }
            });
            console.log({ formattedFormResponses })
            const responses = formattedFormResponses.map(personaResponse => {
                const response: {
                    personaId: number;
                    questionId: number;
                    answer: string;
                    surveyId: number;
                }[] = [];
                personaResponse.formResponse.map(formRes => {
                    const res = formRes.surveyResponse.map(surveyRes => {
                        const result = {
                            personaId: formRes.personaId,
                            questionId: surveyRes.questionId,
                            answer: surveyRes.answer,
                            surveyId: surveyExists.id
                        }
                        return result;
                    })
                    response.push(...res);
                })

                return response
            })

            await ctx.db.response.createMany({ data: responses.flat().filter(res => !!res.answer) });
            return {
                responses
            }
        }),
});

export type IdeaEssenceRouter = typeof openAIRouter;