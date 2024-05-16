export type sortedQuestionsType = Record<
    string,
    {
        question: string;
        response: {
            answer?: string;
            id?: number;
            persona?: {
                id?: number;
                name?: string;
            };
        }[];
    }[]
>

export type responsePerPersonaType = Record<
    string,
    {
        persona: {
            id: number;
            name: string;
        };
        responses: Record<
            string,
            {
                question: string;
                answer: string;
                id: number;
            }[]
        >;
    }
>