"use client"

import React from "react"
import SearchFilter from "@/components/Essentials/SearchFilter"
import { Button } from "@/components/ui/button"

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
  )
}

export default Page