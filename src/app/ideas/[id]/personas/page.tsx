import React from "react";
import Persona from "~/app/_components/persona";
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

const Personas = async (props: Props) => {
  const ideaId = props.params.id;

  const personas = await api.persona.listPersonasByIdeaId({
    ideaId: parseInt(ideaId),
  });

  return (
    <div className="mx-auto max-w-[1200px] px-14 py-10">
      {personas?.length > 0 ? (
        <>
          <h2 className="mt-10 text-5xl font-thin">Personas</h2>
          <h3 className="mb-5 mt-2">
            Here are AI Personas who can answer the survey.
          </h3>
          <Carousel className="w-full">
            <CarouselContent>
              {personas.map((persona) => (
                <CarouselItem key={persona.id} className="">
                  <Persona {...persona} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </>
      ) : null}
    </div>
  );
};

export default Personas;
