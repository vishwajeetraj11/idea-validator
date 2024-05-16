'use server'
import { type Persona, type Survey } from "@prisma/client"
import OpenAI from "openai"
import { getSurveyResponseGeneratorPrompt } from "./prompts"
import { type ChatCompletionMessageParam } from "openai/resources/index.mjs";

const apiKey = process.env.OPENAI_API_KEY;

const openAI = new OpenAI({
    apiKey,
});

export const getPersonaFormResponse = async (persona: Persona, survey: Survey, prevResponse?: string) => {
    const prevMessage: Array<ChatCompletionMessageParam> = [
        { role: 'system', content: `Previous Response: ${prevResponse}` ?? '' },
        {
            role: "user",
            content: getSurveyResponseGeneratorPrompt(persona, survey),
        }];
    const currMessage: Array<ChatCompletionMessageParam> = [{
        role: "user",
        content: getSurveyResponseGeneratorPrompt(persona, survey),
    }]
    const personaFormResponse = await openAI.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        temperature: 1,
        messages: Boolean(prevResponse) ? prevMessage : currMessage,
        response_format: { type: "json_object" },
    })
    return personaFormResponse
}