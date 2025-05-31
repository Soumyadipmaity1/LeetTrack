import axios from "axios";
import { ResponseDataWithTags, ResponseDataWithTitle } from "./types";
const BASE_URL = process.env.BASE_URL;

type SearchQuestionParams = {
  questionTitle: string | undefined;
  questionTags: string[] | undefined;
  questionDifficulty: string | undefined;
};

export async function searchQuestion(data: SearchQuestionParams) {
  if (data.questionTitle) {
    const responseData = await axios.get(
      `${BASE_URL}/select?titleSlug=${data.questionTitle}`
    );

    return responseData.data as ResponseDataWithTitle;
  }

  const responseData = await axios.get(
    `${BASE_URL}/problems?tags=${
      data.questionTags?.join(",") || ""
    }&difficulty=${data.questionDifficulty || ""}`
  );

  return responseData.data as ResponseDataWithTags;
}
