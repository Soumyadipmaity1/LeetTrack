"use client"
import Reminders from "@components/Essentials/Reminders"


const Page = () => {

  return (
    <>
      <div className="mt-12 h-full w-100% ">
          <h1 className="text-2xl font-semibold ">LeetCode Reminder DashBoard</h1>
          <Reminders/>
      </div>
    </>
  )
}

export default Page