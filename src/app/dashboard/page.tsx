"use client"


import React from "react"
import SearchFilter from "@/components/Essentials/SearchFilter"
import { Button } from "@/components/ui/button"

import Reminders from "@components/Essentials/Reminders"



const Page = () => {

  return (

    <div className="flex justify-center items-start min-h-screen px-4 pt-32">
      <div className="w-full max-w-5xl space-y-6">
        <div>
          <Button variant="outline" size="sm" className="gap-2">
            List View
          </Button>
        </div>
        <SearchFilter />
      </div>
    </div>

    <>
      <div className="mt-12 h-full w-100% ">
          <h1 className="text-2xl font-semibold ">LeetCode Reminder DashBoard</h1>
          <Reminders/>
      </div>
    </>

  )
}

export default Page