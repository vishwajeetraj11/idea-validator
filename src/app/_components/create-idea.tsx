"use client";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { Form, Field } from "react-final-form";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

export function CreateIdea() {
  const router = useRouter();

  const createIdea = api.idea.createIdea.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  const getIdeaEssence = api.openAi.getIdeaEssence.useMutation({});
  const getSurveyForm = api.openAi.getSurveyForm.useMutation({});
  const getPayingPersona = api.openAi.getPayingPersona.useMutation({});
  const personaFillingForm = api.openAi.personaFillingForm.useMutation({});
  const getInsights = api.openAi.getOverallResultAggregator.useMutation({});

  return (
    <>
      <Form
        initialValues={{
          content: "",
        }}
        onSubmit={async ({ content }: Record<string, string>) => {
          const idea = await createIdea.mutateAsync({ content: content ?? "" });
          const ideaEssence = await getIdeaEssence.mutateAsync({
            idea: idea.content,
            ideaId: idea.id,
          });
          // console.log(ideaEssence);
          const surveyPMF = await getSurveyForm.mutateAsync({
            ideaId: idea.id,
          });
          // console.log(surveyPMF);
          if (!surveyPMF) return;
          const persona = await getPayingPersona.mutateAsync({
            ideaId: idea.id,
          });
          // console.log(persona);
          const responses = await personaFillingForm.mutateAsync({
            ideaId: idea.id,
            surveyId: surveyPMF.id,
          });
          // console.log(responses);
          const insights = await getInsights.mutateAsync({
            ideaId: idea.id,
          });
          // console.log(insights);

          router.push(`/ideas/${idea.id}`);
        }}
      >
        {({ handleSubmit, submitting, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Field
                name="content"
                type="text"
                render={({ input }) => (
                  <div className={cn(createIdea.isSuccess ? "hidden" : "")}>
                    <Label htmlFor="idea">Enter Idea</Label>

                    <Textarea
                      id="idea"
                      className="mt-2"
                      onChange={input.onChange}
                      value={input.value as string}
                      placeholder="Please enter idea"
                    />
                  </div>
                )}
              />
              <Button
                className={cn(createIdea.isSuccess ? "hidden" : "")}
                disabled={!Boolean(values.content?.length)}
              >
                {createIdea.isPending ? "Loading..." : "Next"}{" "}
              </Button>
              {submitting && (
                <>
                  <p>
                    Idea Essence{" "}
                    {!getIdeaEssence.isSuccess && getIdeaEssence.isIdle
                      ? "loading..."
                      : "loaded"}
                  </p>
                  <p>
                    Survey Form{" "}
                    {!getSurveyForm.isSuccess && getSurveyForm.isIdle
                      ? "loading..."
                      : "loaded"}
                  </p>
                  <p>
                    Persona{" "}
                    {!getPayingPersona.isSuccess && getPayingPersona.isIdle
                      ? "generating..."
                      : "generated"}
                  </p>
                  <p>
                    Persona{" "}
                    {!personaFillingForm.isSuccess && personaFillingForm.isIdle
                      ? "Filling..."
                      : "Filled"}{" "}
                    Form
                  </p>
                  <p>
                    Insights{" "}
                    {!getInsights.isSuccess && getInsights.isIdle
                      ? "Generating..."
                      : "Generated"}{" "}
                    Form
                  </p>
                </>
              )}
            </form>
          );
        }}
      </Form>
      <></>
    </>
  );
}
