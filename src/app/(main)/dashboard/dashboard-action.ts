"use server";

import { getQuestionOfTheDay, searchQuestion } from "@lib/leetcode";
import { authActionClient } from "@lib/safe-action";
import { PROBLEM_DIFFICULTY, REMINDER_STATUS } from "@prisma-client";
import { revalidatePath } from "next/cache";
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
  problemSlug: z.string(),
  scheduledDate: z.date(),
});

// Used for creating a reminder.
export const createReminder = authActionClient
  .schema(createReminderSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { problemSlug, scheduledDate } = parsedInput;
    const questionData = await searchQuestion({
      questionTitleSlug: problemSlug,
    });

    if (!questionData) {
      throw new Error("Question not found!");
    }

    await ctx.db.reminder.create({
      data: {
        userId: ctx.user.externalUserId,
        problemSlug,
        problemTitle: questionData.questionTitle,
        scheduledDate: scheduledDate,
        problemDifficulty:
          questionData.difficulty.toUpperCase() as PROBLEM_DIFFICULTY,
      },
    });
    return revalidatePath("/dashboard");
  });

// Used for fetching reminders for the authenticated user.
export const getReminders = authActionClient.action(async ({ ctx }) => {
  // Note: You can check the status of each reminder based on REMINDER_STATUS enum
  // and filter them accordingly if needed (refer to prisma schema for details).
  return await ctx.db.reminder.findMany({
    where: {
      userId: ctx.user.externalUserId,
    },
  });
});

const updateReminderSchema = z.object({
  reminderId: z.string().cuid(),
  problemSlug: z.string(),
  scheduledDate: z.date(),
  reminderStatus: z.nativeEnum(REMINDER_STATUS),
});

// Used for updating a reminder.
export const updateReminder = authActionClient
  .schema(updateReminderSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { problemSlug, scheduledDate, reminderId, reminderStatus } =
      parsedInput;
    const questionData = await searchQuestion({
      questionTitleSlug: problemSlug,
    });

    if (!questionData) {
      throw new Error("Question not found!");
    }

    await ctx.db.reminder.update({
      where: {
        id: reminderId,
      },
      data: {
        userId: ctx.user.externalUserId,
        scheduledDate,
        problemSlug: problemSlug,
        problemTitle: questionData.questionTitle,
        problemDifficulty:
          questionData.difficulty.toUpperCase() as PROBLEM_DIFFICULTY,
        reminderStatus,
      },
    });
    return revalidatePath("/dashboard");
  });

const deleteReminderSchema = z.object({
  reminderId: z.string().cuid(),
});
// Used for deleting a reminder by its ID.
export const deleteReminder = authActionClient
  .schema(deleteReminderSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { reminderId } = parsedInput;
    await ctx.db.reminder.delete({
      where: {
        id: reminderId,
      },
    });
    return revalidatePath("/dashboard");
  });
