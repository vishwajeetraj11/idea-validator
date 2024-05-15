export const getIdeaEssencePrompt = (idea: string) => `You are a startup idea consultant, and you have a critical role to play in my success.

I will share a business idea. Your goal is to help me generate a "product brief" that describes key details about the product. The fields I want are below. I want the response in a JSON format.

<idea>
${idea}
</idea>

Please brainstorm the details of this business idea and output the results in the following JSON
format:

{
  name: string;
  oneLineLiteralDescription: string;
  uniqueSellingPoint: string;
  problemStatement: string;
  solution: string;
  coreFeatures: string[];
}

For example:

{
  "name": "EcoGreen Delivery",
  "oneLineLiteralDescription": "Zero-emission last-mile delivery service using electric vehicles and cargo bikes.",
  "uniqueSellingPoint": "Eco-friendly, fast, and reliable delivery for businesses and consumers.",
  "problemStatement": "Last-mile delivery contributes significantly to urban air pollution and traffic congestion.",
  "solution": "Provide a sustainable, efficient, and cost-effective last-mile delivery solution using electric vehicles and cargo bikes.",
  "coreFeatures": [
    "Fleet of electric vans and cargo bikes",
    "Mobile app for ordering and tracking deliveries",
    "Integration with existing logistics platforms"
  ]
}

Do not include any explanations, preamble, or other text before the JSON output
`

export const getSurveyPrompt = (ideaEssence: object) => `
You are an expert in evaluating product market fit. Given the ${JSON.stringify(ideaEssence)}, I want you to generate me a set of questions that will help me assess whether this idea has product market fit. I want it in the form of a survey, where there are different clearly labeled sections, and 3-5 questions per section. We will refer to this as the survey. Ensure there are at least 3 questions assessing willingness to pay. 
JSON format: 
{
  "survey": [
    {
      "section": "Section Name",
      "questions": ["Question 1", "Question 2", "Question 3"]
    }
    ...
  ]
}
`

export const getInitialPayingPersonaPrompt = (ideaEssence: object) => `
You are a user researcher, skilled in creating user personas. Given the ${JSON.stringify(ideaEssence)}, generate me a user persona of someone who would want to pay for this product. 
JSON format:
{
  name: string;
  age: number;
  occupation: string;
  goals: string[];
  challenges: string[];
  habits: string[];
  motivations: string[];
  createdAt: Date;
  updatedAt: Date;
}
`

export const getAnotherPersonaPrompt = () => `Thank you for that last persona! I want you to generate another persona that also would pay for this idea, that is a slightly different archetype / sub-persona than the last persona you helped me generate. In JSON format as above.`

export const getSurveyResponseGeneratorPrompt = (persona1: object, survey: object) => `Have ${JSON.stringify(persona1)} fill out the survey. Additionally, include their thoughts on what they like about the product, the main reason they would want to purchase it, and the main reason they wouldn’t.
Please send elaborate answers as per different personas.
The Survey: ${JSON.stringify(survey)};

Send an appropriate JSON response.
JSON Format: 
{
  formResponse: {personaId: number, surveyResponse: {questionId: number, answer: string}[]}[]
}
`
export const getOverallResultAggregatorPrompt = () => `Based on all of the responses from the personas, synthesize the key insights and provide a readout. Then, provide a PMF viability score from a scale of 1-10, with 1 being low likelihood of PMF and 10 being extremely high likelihood of PMF, with your reasoning for why. List three strengths of this idea, and three weaknesses, as well as three potential enhancements`;

export const getIndividualQResultAggregatorPrompt = () => `Based on all the responses for this individual question, I want to aggregate the responses and distill the insights, for each question. Give me a readout, with 3-5 insights`