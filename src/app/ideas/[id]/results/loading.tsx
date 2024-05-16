import React from "react";
import { InsightsLoader } from "~/app/_components/loaders/insights";

const Loader = () => {
  return (
    <div className="mx-auto grid min-h-screen w-full max-w-[1200px]">
      <InsightsLoader />
    </div>
  );
};

export default Loader;
