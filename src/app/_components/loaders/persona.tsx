import React from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Skeleton } from "~/components/ui/skeleton";
import { ChevronLeftIcon, ChevronRightIcon } from "../Icons";

const PersonaLoader = () => {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {[1, 2, 3].map((_, index) => (
          <CarouselItem key={index}>
            <Card className="flex h-full w-full flex-col">
              <CardHeader className="flex items-center gap-4 p-6">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex flex-col items-center space-y-1">
                  <Skeleton className="h-4 w-[120px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4 p-6">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[80px]" />
                  <Skeleton className="h-4 w-[240px]" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[80px]" />
                  <Skeleton className="h-4 w-[240px]" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[80px]" />
                  <Skeleton className="h-4 w-[240px]" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[80px]" />
                  <Skeleton className="h-4 w-[240px]" />
                </div>
              </CardContent>
            </Card>
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
  );
};

export default PersonaLoader;
