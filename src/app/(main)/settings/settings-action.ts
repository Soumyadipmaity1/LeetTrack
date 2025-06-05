"use server";

import { authActionClient } from "@lib/safe-action";
import { NOTIFICATION_METHOD } from "@prisma-client";
import z from "zod";

const updateUserProfileSchema = z.object({
  leetCodeUsername: z.string().optional(),
  bio: z.string().optional(),
  goals: z.string().optional(),
});

export const updateUserProfile = authActionClient
  .schema(updateUserProfileSchema)
  .action(async ({ ctx, parsedInput }) => {
    return await ctx.db.user.update({
      where: { id: ctx.user.userId },
      data: { ...parsedInput },
    });
  });

const updateNotificationSettingsSchema = z.object({
  preferredNotificationMethod: z.nativeEnum(NOTIFICATION_METHOD),
});

export const updateNotificationSettings = authActionClient
  .schema(updateNotificationSettingsSchema)
  .action(async ({ ctx, parsedInput }) => {
    return await ctx.db.user.update({
      where: { id: ctx.user.userId },
      data: { ...parsedInput },
    });
  });
