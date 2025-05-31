"use server";

import { searchQuestion } from "@lib/leetcode";
import { authActionClient } from "@lib/safe-action";
import { z } from "zod";

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

const searchQuestionsSchema = z.object({
  questionTitle: z.string().optional(),
  questionTags: z.array(z.string()).optional(),
  questionDifficulty: z.enum(["EASY", "MEDIUM", "HARD"]).optional(),
});

// Fetching details of leetcode question
export const searchQuestions = authActionClient
  .schema(searchQuestionsSchema)
  .action(async ({ parsedInput }) => {
    return await searchQuestion({
      questionTitle: parsedInput.questionTitle,
      questionTags: parsedInput.questionTags,
      questionDifficulty: parsedInput.questionDifficulty,
    });
  });
