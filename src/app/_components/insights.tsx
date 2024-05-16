import { type Insights as InsightsType } from "@prisma/client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const Insights = ({
  keyInsights,
  pmfViabilityScore,
  potentialEnhancements,
  readout,
  reasoning,
  strengths,
  weaknesses,
}: InsightsType) => {
  return (
    <div className="grid min-h-screen w-full">
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-thin md:text-5xl">Overall</h1>
          </div>
          <div className="grid gap-6">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Based on the survey response data, the key insights are:</p>
                <ul className="mt-4 list-disc space-y-2 pl-6">{keyInsights}</ul>
              </CardContent>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Readout</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{readout}</p>
              </CardContent>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Product-Market Fit Viability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{pmfViabilityScore}</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      PMF Viability Score
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Reasoning</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {reasoning}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-6">
                  {Array.isArray(strengths) &&
                    strengths?.map((strength, i) => (
                      <li key={i}>{String(strength)}</li>
                    ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-6">
                  {Array.isArray(strengths) &&
                    strengths?.map((strength, i) => (
                      <li key={i}>{String(strength)}</li>
                    ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Weaknesses</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-6">
                  {Array.isArray(weaknesses) &&
                    weaknesses?.map((weakness, i) => (
                      <li key={i}>{String(weakness)}</li>
                    ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Potential Enhancements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-6">
                  {Array.isArray(potentialEnhancements) &&
                    potentialEnhancements?.map((potentialEnhancement, i) => (
                      <li key={i}>{String(potentialEnhancement)}</li>
                    ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Insights;
