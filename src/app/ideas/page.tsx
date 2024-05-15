"use server";
import Link from "next/link";
import React from "react";
import { Card, CardTitle } from "~/components/ui/card";
import { api } from "~/trpc/server";

// type Props = {};

const Ideas = async () => {
  const data = await api.idea.listUserIdeas();
  return (
    <div className="mx-auto max-w-[1200px]">
      <h1 className="my-10 text-center text-3xl">Ideas</h1>
      <div className="grid grid-cols-3 gap-10">
        {data.map((idea) => (
          <Link href={`/ideas/${idea.id}`} key={idea.id}>
            <Card className="p-3">
              <CardTitle>{idea.content}</CardTitle>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Ideas;
