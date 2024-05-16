"use client";
import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "~/app/_components/Icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Button } from "~/components/ui/button";
import {
  type responsePerPersonaType,
  type sortedQuestionsType,
} from "~/lib/types";
import { cn } from "~/lib/utils";

type Props = {
  sortedQuestion: sortedQuestionsType;
  responsePerPersona?: responsePerPersonaType;
  renderResponses: boolean;
  personasLikesResponses: {
    id: number;
    name: string;
    likes: string | null;
    mainReasonToBuy: string | null;
    mainReasonNotToBuy: string | null;
  }[];
};

const Survey = ({
  renderResponses = true,
  responsePerPersona,
  sortedQuestion,
  personasLikesResponses,
}: Props) => {
  const [type, setType] = useState<"question" | "persona">("question");
  const isQuestion = type === "question" || !renderResponses;
  const isPersona = type === "persona";

  return (
    <>
      {renderResponses && (
        <div className="flex gap-4">
          <Button
            variant={isQuestion ? "default" : "secondary"}
            onClick={() => {
              setType("question");
            }}
          >
            Aggregated per-question results
          </Button>
          <Button
            variant={isPersona ? "default" : "secondary"}
            onClick={() => setType("persona")}
          >
            Individual responses
          </Button>
        </div>
      )}
      {isQuestion &&
        Object.entries(sortedQuestion).map(([section, questions], i) => (
          <div key={i}>
            <p className="my-4 text-xl font-normal">{section}</p>
            {questions.map((question, i) => (
              <div
                className={cn("pt-3", { "border-t-2": renderResponses })}
                key={i}
              >
                <p key={i}>{question.question}</p>
                {renderResponses && (
                  <>
                    <p>Answers</p>
                    <Carousel className="mt-2">
                      <CarouselContent>
                        {question.response.map((response, i) => (
                          <CarouselItem key={i}>
                            <div className="w-min whitespace-nowrap rounded-xl bg-gray-400 px-2 py-1.5 text-sm">
                              {response?.persona?.name}
                            </div>

                            <p className="text-gray-600">{response.answer}</p>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious>
                        <Button size="icon" variant="outline">
                          <ChevronLeftIcon className="h-4 w-4" />
                          <span className="sr-only">Previous</span>
                        </Button>
                      </CarouselPrevious>
                      <CarouselNext>
                        <Button size="icon" variant="outline">
                          <ChevronRightIcon className="h-4 w-4" />
                          <span className="sr-only">Next</span>
                        </Button>
                      </CarouselNext>
                    </Carousel>
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      {isPersona && responsePerPersona && renderResponses && (
        <div className="mt-4">
          <ResponsePerPersona
            personasLikesResponses={personasLikesResponses}
            responsePerPersona={responsePerPersona}
          />
        </div>
      )}
    </>
  );
};

const ResponsePerPersona = ({
  responsePerPersona,
  personasLikesResponses,
}: {
  personasLikesResponses: {
    id: number;
    name: string;
    likes: string | null;
    mainReasonToBuy: string | null;
    mainReasonNotToBuy: string | null;
  }[];
  responsePerPersona: responsePerPersonaType;
}) => {
  const [activePersona, setPersona] = useState<string>("");
  const names = Object.entries(responsePerPersona).map(([key]) => key);

  const onPersonaClick = (name: string) => {
    const foundName = names.find((n) => n === name);
    if (foundName) {
      setPersona(foundName);
    }
  };

  const activePersonaResponse = responsePerPersona[activePersona];
  const activePersonaLikes = personasLikesResponses.find(
    (persona) => persona.name === activePersona,
  );

  return (
    <>
      <div className="flex gap-3">
        {names.map((name, i) => (
          <Button
            variant={name === activePersona ? "default" : "secondary"}
            key={i}
            onClick={() => onPersonaClick(name)}
          >
            {name}
          </Button>
        ))}
      </div>
      <div>
        {activePersonaLikes && (
          <>
            <div className="my-4">
              <p>{`Likes, Dislikes, Want's to Buy`}</p>
              <div className="my-2">
                <p>Likes</p>
                <p className="text-gray-600">{activePersonaLikes.likes}</p>
              </div>
              <div className="my-2">
                <p>Main Reason to buy</p>
                <p className="text-gray-600">
                  {activePersonaLikes.mainReasonNotToBuy}
                </p>
              </div>
              <div className="my-2">
                <p>Main Reason to not buy</p>
                <p className="text-gray-600">
                  {activePersonaLikes.mainReasonToBuy}
                </p>
              </div>
            </div>
          </>
        )}
        {activePersonaResponse &&
          Object.entries(activePersonaResponse?.responses).map(
            ([section, questions]) => (
              <div className="my-4" key={section}>
                <p>{section}</p>
                <div>
                  {questions.map((question) => (
                    <div className="my-2" key={question.id}>
                      <p>{question.question}</p>
                      <p className="text-gray-600">{question.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            ),
          )}
      </div>
    </>
  );
};

export default Survey;
