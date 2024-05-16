import React from "react";
import Insights from "~/app/_components/insights";
import Survey from "~/app/_components/survey";
import { transformResponseData } from "~/lib/utils";
import { api } from "~/trpc/server";

type Props = {
  params: { id: string };
};

const Results = async (props: Props) => {
  const ideaId = props.params.id;

  const insights = await api.insights.getInsightByIdeaId({
    ideaId: parseInt(ideaId),
  });

  const survey = await api.survey.getSurveyByIdeaId({
    ideaId: parseInt(ideaId),
  });

  const personasLikesResponses = await api.persona.getPersonaByIdeaId({
    ideaId: parseInt(ideaId),
  });

  console.log(personasLikesResponses);

  if (!insights) return <></>;
  const sortedQuestions: Record<
    string,
    {
      question: string;
      response: {
        answer: string;
        id: number;
        persona: { id: number; name: string };
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

  const responsePerPersona = sortedQuestions
    ? transformResponseData(sortedQuestions, personasLikesResponses)
    : null;

  return (
    <div className="mx-auto grid min-h-screen w-full max-w-[1200px]">
      <Insights {...insights} />
      {/* Responses */}
      <h2 className="mb-5 mt-10 text-5xl font-thin">Responses</h2>
      {responsePerPersona && (
        <Survey
          renderResponses
          responsePerPersona={responsePerPersona}
          sortedQuestion={sortedQuestions}
          personasLikesResponses={personasLikesResponses}
        />
      )}
    </div>
  );
};

export default Results;
