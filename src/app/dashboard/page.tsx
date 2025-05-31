"use client"
import { Calendar } from "@/components/ui/calendar"
import { Roboto } from "next/font/google"
import * as React from "react"

const roboto =Roboto({
  weight:"400",
  subsets:['latin'],
})
type ReminderStats={
    "Total Reminders":number,
    "Upcoming Reminders":number,
    "Completed Reminders":number,
    "Missed Reminders":number
  }
const Page = () => {

  const data:ReminderStats={
    "Total Reminders":1,
    "Upcoming Reminders":2,
    "Completed Reminders":3,
    "Missed Reminders":4
  }
  const [date,setDate]=React.useState<Date |undefined>(new Date())


  return (
    <>
      <div className="mt-12 h-full w-100% ">
          <h1 className="text-2xl font-semibold ">LeetCode Reminder DashBoard</h1>
          <div className="m-5 gap-4 flex ">
            {Object.entries(data).map(([label,value])=>{
              return(
              <div key={label}>
                <div className=" flex rounded p-1 border border-black flex-col">
                  <h3 className={`${roboto.className} `}>{label}</h3>
                  <p className="font-semibold">{value}</p>
                </div>
              </div>
            )})}
            <div className="flex flex-col flex-wrap items-start gap-2 @md:flex-row">
              <Calendar className="rounded-md border shadow-sm"
            mode="single" selected ={date} onSelect={setDate}/>
            </div>

          </div>
      </div>
    </>
  )
}

export default Page