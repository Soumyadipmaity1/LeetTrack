'use client'
import { Button } from "@components/ui/button";
import { Camera } from "lucide-react";
import { Roboto } from "next/font/google";
import { useState } from "react";
import { useForm } from 'react-hook-form';

const roboto_l = Roboto({
    weight: "400",
    subsets: ['latin'],
})
const roboto = Roboto({
    weight: "600",
    subsets: ['latin'],
})

const Profile = () => {

    const [preview, setPreview] = useState<string | null>(null);

    type ProfileValues = {
        avatar: string,
        fullname: string,
        email: string,
        LeetCodeUsername: string,
        timezone: Date,
        bio: string,
        experiencelevel: string,
        goals: string
    }
    const onSubmit = () => {
        handleSubmit(data => console.log(data));
    }
    const timezone = [
        { value: 'UTC+0', label: 'UTC+0' },
        { value: 'UTC+5:30', label: 'UTC+5:30 (IST)' },
    ]
    const experiencelevel = [
        { label: "Beginner", message: "0-100 problems solved" },
        { label: "Intermediate", message: "100-500 problems solved" },
        { label: "Expert", message: "500+ problem solved" }
    ]

    const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.size < 2 * 1024 * 1024) { // 2MB max
            const imageURL = URL.createObjectURL(file);
            setPreview(imageURL);
        } else {
            setPreview(null);
            alert("File must be under 2MB");
        }
    };

    const { register, handleSubmit, watch, control, formState: { errors } } = useForm<ProfileValues>()
    return (
        <>
            <div className="border border-slate-300 p-2 rounded-xs">
                <div className="flex flex-col">
                    <h2 className={` ${roboto.className} text-2xl`}>Profile Information</h2>
                    <h4 className={` ${roboto_l.className} text-sm text-slate-400`}>Update your personal information and preferences</h4>
                </div>
                <br />

                <div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="px-4">
                            <div className="flex gap-2">
                                <div className="relative flex w-15 h-15 rounded-full overflow-hidden border">
                                    <img
                                        src={preview || "/default-avatar.png"}
                                        alt="avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                <label className="flex items-center gap-2 cursor-pointer text-black border w-fit rounded px-2">
                                    <Camera size={16} />
                                    <span>Change Avatar</span>
                                    <input type="file" accept="image/*" {...register("avatar")}
                                        onChange={handlePreview}
                                        className="hidden"
                                    />
                                </label>
                                <p className="text-xs text-slate-400 px-2">JPG,PNG or GIF Max size 2MB</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-px bg-gray-300 my-4" />
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row justify-between items-align px-4 gap-4">
                                <div className=" flex gap-1 flex-col w-full ">
                                    <label className="">Full Name</label>
                                    <input className=" border w-full border-gray-400 rounded-xs px-2" {...register("fullname")} type="text" placeholder="John Doe" />
                                </div>
                                <div className=" flex gap-1 flex-col w-full">
                                    <label >Email Address</label>
                                    <input className=" border border-gray-400 rounded-xs px-2" {...register("email")} type="text" placeholder="2305123@kiit.ac.in" />
                                </div>
                            </div>
                            <div className="flex flex-row justify-between items-align px-4 gap-4">
                                <div className="w-full gap-1 flex flex-col ">
                                    <label >LeetCode Username</label>
                                    <input className=" border w-full border-gray-400 rounded-xs px-2" {...register("LeetCodeUsername")} type="text" placeholder="Your LeetCode Username" />
                                </div>
                                <div className="w-full gap-1 flex flex-col ">
                                    <label >Timezone</label>
                                    <select className="border w-full border-gray-400 rounded-xs px-2"
                                        {...register("timezone")}
                                        name="timezone">
                                        <option value="">Select Timezone</option>
                                        {timezone.map((tz, idx) => (
                                            <option key={idx} value={tz.value}>
                                                {tz.label} ({tz.value})
                                            </option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col px-4 gap-2">
                            <div className="gap-1 flex flex-col">
                                <label>Bio</label>
                                <textarea
                                    {...register("bio")}
                                    rows={3}
                                    placeholder="Tell us about yourself"
                                    className="w-full border border-gray-400 px-2 py-1 rounded resize-y"
                                />
                            </div>
                            <div className="gap-1 flex flex-col">
                                <label htmlFor="experiencelevel">Experience Level</label>
                                <select {...register("experiencelevel")} className=" border w-full border-gray-400 rounded-xs px-2" name="experiencelevel">
                                    <option value="">Select your level</option>
                                    {experiencelevel.map((level, idx) => (
                                        <option key={idx} value={level.label}>{level.label} ({level.message})</option>
                                    ))}
                                </select>
                            </div>
                            <div className="gap-1 flex flex-col">
                                <label >Goals</label>
                                <input className=" border w-full border-gray-400 rounded-xs px-2" type="text" {...register("goals")} name="goals" placeholder="What are your coding goals"></input>
                            </div>
                        </div>
                        <br />
                        <div className="px-4 flex justify-end">
                            <Button className="hover:cursor-pointer" type="submit">🖫 Save Changes</Button>
                        </div>
                    </form>
                </div >
            </div >
        </>
    )
}

export default Profile
