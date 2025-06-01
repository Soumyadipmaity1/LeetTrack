"use client"
import { Calendar } from "@/components/ui/calendar"
import { Oswald, Roboto_Condensed } from "next/font/google"
import * as React from "react"

const roboto =Roboto_Condensed({
  weight:"400",
  subsets:['latin'],
})
const oswald =Oswald({
  weight:"400",
  subsets:['latin'],
})
type ReminderStats={
    "Total Reminders":number,
    "Upcoming Reminders":number,
    "Completed Reminders":number,
    "Missed Reminders":number
  }
const Reminders = () => {

    const data:ReminderStats={
        "Total Reminders":1,
        "Upcoming Reminders":2,
        "Completed Reminders":3,
        "Missed Reminders":4
      }
      const [date,setDate]=React.useState<Date |undefined>(new Date())

  return (
    <div>
        <div className="m-4 gap-3 flex ">
            {Object.entries(data).map(([label,value])=>{
              return(
              <div key={label}>
                <div className=" flex rounded p-2 border shadow-gray-300 shadow-sm flex-col">
                  <h3 className={`${oswald.className} text-xs`}>{label}</h3>
                  <p className="font-bold text-xl">{value}</p>
                </div>
              </div>
            )})}
            <div className="flex flex-col flex-wrap items-start gap-2 @md:flex-row">
              <Calendar className="rounded-md border shadow-sm"
            mode="single" selected ={date} onSelect={setDate}/>
            </div>

          </div>
    </div>
  )
}

export default Reminders
