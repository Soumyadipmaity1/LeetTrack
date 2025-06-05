"use server";

import { getQuestionOfTheDay, searchQuestion } from "@lib/leetcode";
import { authActionClient } from "@lib/safe-action";
import { z } from "zod";

// const searchQuestionsSchema = z.object({
//   questionTitle: z.string().optional(),
//   questionTags: z.array(z.string()).optional(),
//   questionDifficulty: z.enum(["EASY", "MEDIUM", "HARD"]).optional(),
// });

// // Fetching details of leetcode question
// export const searchQuestions = authActionClient
//   .schema(searchQuestionsSchema)
//   .action(async ({ parsedInput }) => {
//     return await searchQuestion({
//       questionTitle: parsedInput.questionTitle,
//       questionTags: parsedInput.questionTags,
//       questionDifficulty: parsedInput.questionDifficulty,
//     });
//   });

// Get QOTD
export const getQOTD = authActionClient.action(async () => {
  return await getQuestionOfTheDay();
});

const createReminderSchema = z.object({
  questionTitle: z.string(),
  scheduledDate: z.date(),
});

// Used for creating a reminder.
export const createReminder = authActionClient
  .schema(createReminderSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { questionTitle } = parsedInput;
    console.log(questionTitle);
    const data = await searchQuestion({
      questionTitle: questionTitle,
    });
    console.log(data);
    // await ctx.db.reminder.create({
    //   data: {
    //     userId: ctx.user.id,
    //     ...parsedInput,
    //   },
    // });
  });

// Used for fetching reminders for the authenticated user.
export const getReminders = authActionClient.action(async ({ ctx }) => {
  // Note: You can check the status of each reminder based on REMINDER_STATUS enum
  // and filter them accordingly if needed (refer to prisma schema for details).
  return await ctx.db.reminder.findMany({
    where: {
      userId: ctx.user.id,
    },
  });
});

const updateReminderSchema = z.object({
  reminderId: z.string().cuid(),
  problemId: z.string().optional(),
  problemName: z.string().optional(),
  problemStatement: z.string().optional(),
  problemTags: z.array(z.string()).optional(),
  problemDifficulty: z.enum(["EASY", "MEDIUM", "HARD"]).optional(),
  problemLink: z.string(),
  scheduledDate: z.date(),
});

// Used for updating a reminder.
export const updateReminder = authActionClient
  .schema(updateReminderSchema)
  .action(async ({ ctx, parsedInput }) => {
    await ctx.db.reminder.update({
      where: {
        id: parsedInput.reminderId,
      },
      data: {
        userId: ctx.user.id,
        ...parsedInput,
      },
    });
  });

const deleteReminderSchema = z.object({
  reminderId: z.string().cuid(),
});
// Used for deleting a reminder by its ID.
export const deleteReminder = authActionClient
  .schema(deleteReminderSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { reminderId } = parsedInput;
    return await ctx.db.reminder.delete({
      where: {
        id: reminderId,
      },
    });
  });
