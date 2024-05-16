import React from "react";
import { IdeaEssence } from "~/app/_components/idea-essence";
import Persona from "~/app/_components/persona";
import Survey from "~/app/_components/survey";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

import { api } from "~/trpc/server";

type Props = {
  params: { id: string };
};

const ID = async (props: Props) => {
  const ideaId = props.params.id;

  const ideaEssence = await api.ideaEssence.getIdeaEssenceById({
    id: parseInt(ideaId),
  });

  const personas = await api.persona.listPersonasByIdeaId({
    ideaId: parseInt(ideaId),
  });

  console.log(personas);

  const survey = await api.survey.getSurveyByIdeaId({
    ideaId: parseInt(ideaId),
  });

  console.log(survey);

  // const responses = await api.response.getResponseById

  const sortedQuestions: Record<
    string,
    {
      question: string;
      response: {
        answer?: string;
        id?: number;
        persona?: { id?: number; name?: string };
      }[];
    }[]
  > = {};
  survey?.questions.forEach((question) => {
    if (sortedQuestions[question.section]) {
      sortedQuestions[question?.section]?.push({
        question: question.content,
        response: question.responses || [],
      });
    } else {
      sortedQuestions[question.section] = [];
    }
  });

  console.log(sortedQuestions);

  return (
    <div className="mx-auto max-w-[1200px] py-10">
      <div>
        <h2 className="mb-5 text-5xl font-thin">Idea Essence</h2>
        {ideaEssence && <IdeaEssence {...ideaEssence} />}
      </div>
      {/* Personas */}
      {personas?.length > 0 ? (
        <>
          <h2 className="mb-5 mt-10 text-5xl font-thin">Personas</h2>
          <Carousel className="w-full max-w-4xl">
            <CarouselContent>
              {personas.map((persona) => (
                <CarouselItem
                  key={persona.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <Persona {...persona} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </>
      ) : null}

      {/* Survey */}
      <h2 className="mb-5 mt-10 text-5xl font-thin">Survey</h2>
      <Survey sortedQuestion={sortedQuestions} />
    </div>
  );
};

export default ID;
