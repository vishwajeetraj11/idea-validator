import { ideaRouter } from "~/server/api/routers/idea";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { ideaEssenceRouter } from "~/server/api/routers/idea-essence";
import { personaRouter } from "~/server/api/routers/persona";
import { questionRouter } from "~/server/api/routers/question";
import { responseRouter } from "~/server/api/routers/response";
import { surveyRouter } from "~/server/api/routers/survey";
import { openAIRouter } from "./routers/openai";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  idea: ideaRouter,
  ideaEssence: ideaEssenceRouter,
  persona: personaRouter,
  question: questionRouter,
  response: responseRouter,
  survey: surveyRouter,
  openAi: openAIRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
