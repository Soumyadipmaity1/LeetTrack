"use client"
import Profile from "@components/Essentials/Profile"
import { Roboto } from "next/font/google"
const roboto =Roboto({
  weight:"400",
  subsets:['latin'],
})

const Page = () => {
  return (
    <>
    <main className=" min-h-screen flex flex-col items-center pt-12">
      <div className="w-full max-w-5xl">
        <div className=" items-center justify-between mb-6">
          <h1 className="text-3xl font-bold ">Settings</h1>
          <h5 className={` ${roboto.className} text-xs text-slate-400`}>Manage your account settings and preferences.</h5>
        </div>
        <Profile/>
      </div>
    </main>

    </>
  )
}

export default Page