import React from "react";
import { Card, CardContent } from "~/components/ui/card";
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

  const survey = await api.survey.getSurveyByIdeaId({
    ideaId: parseInt(ideaId),
  });

  const sortedQuestions: Record<string, string[]> = {};
  survey?.questions.forEach(
    (question: { section: string; content: string }) => {
      if (sortedQuestions[question.section]) {
        sortedQuestions[question?.section]?.push(question.content);
      } else {
        sortedQuestions[question.section] = [];
      }
    },
  );

  return (
    <div className="mx-auto max-w-[1200px] pb-10">
      <div>
        <h2 className="mb-5 text-5xl font-thin">Idea Essence</h2>
        <p>{ideaEssence?.name}</p>
        <p>{ideaEssence?.description}</p>
        <p>{ideaEssence?.usp}</p>
        <p>{ideaEssence?.problem}</p>
        <p>{ideaEssence?.solution}</p>
        {ideaEssence?.features.map((feat: string, i: number) => (
          <p key={i}>{feat}</p>
        ))}
      </div>
      {/* Personas */}
      <h2 className="mb-5 mt-10 text-5xl font-thin">Personas</h2>

      <Carousel className="w-full max-w-[600px]">
        <CarouselContent>
          {personas.map((persona, i) => (
            <div key={i} className="p-1">
              <Card>
                <CardContent className="flex aspect-square flex-col p-6">
                  <p className="mb-2 text-left text-2xl font-light">
                    {persona.name}
                  </p>
                  <p className="text-1xl text-left font-medium">
                    {persona.age} years old
                  </p>
                  <p className="text-1xl text-left font-medium">
                    {persona.occupation}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Survey */}
      <h2 className="mb-5 mt-10 text-5xl font-thin">Survey</h2>
      {Object.entries(sortedQuestions).map(([section, questions], i) => (
        <div key={i}>
          <p className="mb-2 text-xl font-normal">{section}</p>
          {questions.map((question, i) => (
            <p key={i}>{question}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ID;
