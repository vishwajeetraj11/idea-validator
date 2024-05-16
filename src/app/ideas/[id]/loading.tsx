import React, { Fragment } from "react";
import IdeaEssenceLoader from "~/app/_components/loaders/idea-essence";
import PersonaLoader from "~/app/_components/loaders/persona";

import { Skeleton } from "~/components/ui/skeleton";

export default function loading() {
  return (
    <div className="mx-auto max-w-[1200px] py-10">
      <div>
        <h2 className="mb-5 text-5xl font-thin">Idea Essence</h2>
        <IdeaEssenceLoader />
      </div>

      <h2 className="mb-5 mt-10 text-5xl font-thin">Personas</h2>
      <PersonaLoader />

      {/* Survey */}
      <h2 className="mb-5 mt-10 text-5xl font-thin">Survey</h2>

      {[1, 2, 3, 4].map((_, index) => (
        <Fragment key={index}>
          <Skeleton className="mb-4 mt-4 h-5 w-[60px]" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-[390px]" />
            <Skeleton className="h-4 w-[450px]" />
          </div>
        </Fragment>
      ))}
    </div>
  );
}
