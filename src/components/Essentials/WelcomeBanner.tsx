"use client";

type WelcomeBannerProps = {
  name: string;
};

export default function WelcomeBanner({name} : WelcomeBannerProps){
return (
    <div className="py-1 pr-1">
        <h1 className="text-3xl font-bold text-black">Welcome Back, {name} !</h1>
    </div>
)
}