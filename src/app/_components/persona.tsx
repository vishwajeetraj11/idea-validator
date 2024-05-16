"use client";
import { type Persona as PersonaType } from "@prisma/client";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { AvatarFallback } from "~/components/ui/avatar";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

const Persona = ({
  age,
  occupation,
  name,
  goals,
  challenges,
  habits,
  motivations,
}: PersonaType) => {
  return (
    <Card className="flex h-full w-full flex-col">
      <CardHeader className="flex items-center gap-4 p-6">
        <Avatar>
          <AvatarImage alt={name + " Avatar"} src="/placeholder-avatar.jpg" />
          <AvatarFallback className="flex h-12 w-12 items-center justify-center">
            {name[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center space-y-1">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-500 dark:text-gray-400">
            {occupation}, {age}
          </p>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4 p-6">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Goals</h4>
          <p className="text-gray-500 dark:text-gray-400">{goals.join(", ")}</p>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Challenges</h4>
          <p className="text-gray-500 dark:text-gray-400">
            {challenges.join(", ")}
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Habits</h4>
          <p className="text-gray-500 dark:text-gray-400">
            {habits.join(", ")}
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Motivations</h4>
          <p className="text-gray-500 dark:text-gray-400">
            {motivations.join(", ")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Persona;
