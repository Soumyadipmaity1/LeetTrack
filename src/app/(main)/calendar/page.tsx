"use server";

import { getReminders } from "../dashboard/dashboard-action";
import CalendarPage from "./_components/Calendar";

export default async function Calendar() {
  const receivedData = await getReminders();

  if (receivedData?.serverError) {
    return <>An error occurred while fetching reminders.</>;
  }

  return <CalendarPage reminders={receivedData?.data || []} />;
}
