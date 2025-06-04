'use client'
import { Button } from "@components/ui/button";
import { Roboto } from "next/font/google";
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
    const experiencelevel = [
        { label: "beginner", message: "0-100 problems solved" },
        { label: "Intermediate", message: "100-500 problems solved" },
        { label: "expert", message: "500+ problem solved" }
    ]

    const { register, handleSubmit, watch, control, formState: { errors } } = useForm<ProfileValues>()
    return (
        <>
            <div className="border border-slate-300 p-2">
                <div className="flex flex-col">
                    <h2 className={` ${roboto.className} text-2xl`}>Profile Information</h2>
                    <h4 className={` ${roboto_l.className} text-sm text-slate-400`}>Update your personal informationa and preferences</h4>
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div></div>
                        <div>
                            <label >Full Name</label>
                            <input {...register("fullname")} type="text" placeholder="John Doe" />

                            <label >Email Address</label>
                            <input {...register("email")} type="text" placeholder="2305123@kiit.ac.in" />

                            <label >LeetCode Username</label>
                            <input {...register("LeetCodeUsername")} type="text" placeholder="Your LeetCode Username" />

                            <label >Timezone</label>
                            <input {...register("timezone")} type="text" placeholder="UTC" />

                        </div>
                        <div>
                            <label>Bio</label>
                            <input {...register("bio")} type="text" placeholder="tell us about yourself" />
                            <label htmlFor="experiencelevel">Experience Level</label>
                            <select {...register("experiencelevel")} name="experiencelevel">
                                <option value="">Select your level</option>
                                {experiencelevel.map((level, idx) => (
                                    <option key={idx} value={level.label}>{level.label} ({level.message})</option>
                                ))}
                            </select>
                            <label >Goals</label>
                            <input type="text" {...register("goals")} name="goals"></input>
                        </div>
                        <div>
                            <Button>Save Changes</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Profile
