import React from "react";
import { CardTitle, CardHeader, CardContent, Card } from "~/components/ui/card";

export const InsightsLoader = () => {
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
                <div className="animate-pulse">
                  <div className="mb-4 h-4 w-full rounded bg-gray-200" />
                  <div className="mb-4 h-4 w-3/4 rounded bg-gray-200" />
                  <div className="mb-4 h-4 w-full rounded bg-gray-200" />
                  <div className="mb-4 h-4 w-2/3 rounded bg-gray-200" />
                  <div className="mb-4 h-4 w-full rounded bg-gray-200" />
                </div>
              </CardContent>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Readout</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="animate-pulse">
                  <div className="mb-4 h-4 w-full rounded bg-gray-200" />
                  <div className="mb-4 h-4 w-3/4 rounded bg-gray-200" />
                  <div className="mb-4 h-4 w-full rounded bg-gray-200" />
                </div>
              </CardContent>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Product-Market Fit Viability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="animate-pulse">
                  <div className="mb-4 h-8 w-1/2 rounded bg-gray-200" />
                  <div className="mb-4 h-4 w-full rounded bg-gray-200" />
                  <div className="mb-4 h-4 w-3/4 rounded bg-gray-200" />
                  <div className="mb-4 h-4 w-full rounded bg-gray-200" />
                </div>
              </CardContent>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="animate-pulse">
                  <div className="mb-4 h-4 w-full rounded bg-gray-200" />
                  <div className="mb-4 h-4 w-3/4 rounded bg-gray-200" />
                  <div className="mb-4 h-4 w-full rounded bg-gray-200" />
                  <div className="mb-4 h-4 w-2/3 rounded bg-gray-200" />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};
