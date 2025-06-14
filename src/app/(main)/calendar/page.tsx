"use server";

import { getReminders } from "../dashboard/dashboard-action";
import CalendarPage from "./_components/Calendar";

export default async function Calendar() {
  const receivedData = await {data: []};
  return <CalendarPage reminders={receivedData?.data || []} />;
}
