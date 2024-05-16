import Link from "next/link";
import React from "react";
import { IdeaEssence } from "~/app/_components/idea-essence";
import Survey from "~/app/_components/survey";
import { api } from "~/trpc/server";

type Props = {
  params: { id: string };
};

const ID = async (props: Props) => {
  const ideaId = props.params.id;

  const ideaEssence = await api.ideaEssence.getIdeaEssenceById({
    id: parseInt(ideaId),
  });

  const survey = await api.survey.getSurveyByIdeaId({
    ideaId: parseInt(ideaId),
  });
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

  return (
    <div className="mx-auto max-w-[1200px] py-10">
      <Link className="text-blue-500" href={`/ideas/${ideaId}/results`}>
        Results
      </Link>
      <Link className="ml-4 text-blue-500" href={`/ideas/${ideaId}/personas`}>
        Personas
      </Link>
      <div>
        <h2 className="mb-5 text-5xl font-thin">Idea Essence</h2>
        {ideaEssence && <IdeaEssence {...ideaEssence} />}
      </div>

      {/* Survey */}
      <h2 className="mb-5 mt-10 text-5xl font-thin">Survey</h2>
      <Survey sortedQuestion={sortedQuestions} renderResponses={false} />
    </div>
  );
};

export default ID;
