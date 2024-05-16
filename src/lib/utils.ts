import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const transformResponseData = (
  data: Record<
    string,
    {
      question: string;
      response: {
        answer: string;
        id: number;
        persona: { id: number; name: string };
      }[];
    }[]
  >,
  personasLikesResponses?: {
    id: number;
    name: string;
    likes: string | null;
    mainReasonToBuy: string | null;
    mainReasonNotToBuy: string | null;
  }[]
) => {
  const result: Record<
    string,
    {
      persona: { id: number; name: string };
      responses: Record<
        string,
        { question: string; answer: string; id: number }[]
      >;
    }
  > = {};
  if (!data) return result;
  // Iterate over each category in the data object
  Object.keys(data).forEach((section) => {
    data[section]?.forEach(({ question, response }) => {
      // Iterate over each response within a question
      response.forEach(({ persona, answer, id }) => {
        const name = persona?.name;

        // Initialize a new persona object if it doesn't exist
        if (!result[name]) {
          result[name] = {
            persona,
            responses: {},
          };
        }

        // Initialize a new section array if it doesn't exist
        if (!result?.[name]?.responses?.[section]) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          result[name].responses[section] = [];
        }

        // Add the response to the section array
        result?.[name]?.responses?.[section]?.push({ question, answer, id });

      });
    });
  });

  return result;
};