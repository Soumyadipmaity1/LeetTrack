import { authActionClient } from "@lib/safe-action";

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
