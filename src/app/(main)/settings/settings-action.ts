"use server";

import { authActionClient } from "@lib/safe-action";
import { NOTIFICATION_METHOD } from "@prisma-client";
import z from "zod";

const updateNotificationSettingsSchema = z.object({
  preferredNotificationMethod: z.nativeEnum(NOTIFICATION_METHOD),
});

export const updateNotificationSettings = authActionClient
  .schema(updateNotificationSettingsSchema)
  .action(async ({ ctx, parsedInput }) => {
    return await ctx.db.user.update({
      where: { externalUserId: ctx.user.externalUserId },
      data: { ...parsedInput },
    });
  });

export const getSettings = authActionClient.action(async ({ ctx }) => {
  return await ctx.db.user.findUnique({
    where: { externalUserId: ctx.user.externalUserId },
  });
});
