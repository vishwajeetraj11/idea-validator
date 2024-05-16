import React from "react";
import PersonaLoader from "~/app/_components/loaders/persona";

const loading = () => {
  return (
    <div className="mx-auto max-w-[1200px] px-14 py-10">
      <h2 className="mt-10 text-5xl font-thin">Personas</h2>
      <h3 className="mb-5 mt-2">
        Here are AI Personas who can answer the survey.
      </h3>
      <PersonaLoader />
    </div>
  );
};

export default loading;
