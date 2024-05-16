import { type IdeaEssence as IdeaEssenceType } from "@prisma/client";
import React from "react";

export const IdeaEssence = ({
  name,
  problem,
  usp,
  solution,
  features,
  description,
}: IdeaEssenceType) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-950">
      <div className="p-6 md:p-8 lg:p-10">
        <div className="space-y-4 md:space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {name}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">{description}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Key Features</h3>
              <ul className="space-y-2 text-gray-500 dark:text-gray-400">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckIcon className="mr-2 h-5 w-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                Our Unique Selling Proposition
              </h3>
              <p className="text-gray-500 dark:text-gray-400">{usp}</p>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">The Problem We Solve</h3>
            <p className="text-gray-500 dark:text-gray-400">{problem}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">The Solution We Provide</h3>
            <p className="text-gray-500 dark:text-gray-400">{solution}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

function CheckIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
