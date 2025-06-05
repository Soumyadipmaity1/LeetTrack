import axios from "axios";
import { QuestionOfTheDay, ResponseDataWithTitle } from "./types";
const BASE_URL = process.env.LEETCODE_BASE_URL;

type SearchQuestionParams = {
  questionTitle: string | undefined;
  // questionTags: string[] | undefined;
  // questionDifficulty: string | undefined;
};

/**
 * Follow the docs here:
 * https://github.com/alfaarghya/alfa-leetcode-api?tab=readme-ov-file#questions-details
 */
export async function searchQuestion(data: SearchQuestionParams) {
  if (data.questionTitle) {
    const responseData = await axios.get(
      `${BASE_URL}/select?titleSlug=${data.questionTitle}`
    );

    return responseData.data as ResponseDataWithTitle;
  }

  // const responseData = await axios.get(
  //   `${BASE_URL}/problems?tags=${
  //     data.questionTags?.join(",") || ""
  //   }&difficulty=${data.questionDifficulty || ""}`
  // );

  // return responseData.data as ResponseDataWithTags;
}

export async function getQuestionOfTheDay() {
  const responseData = await axios.get(`${BASE_URL}/daily`);
  return responseData.data as QuestionOfTheDay;
}
