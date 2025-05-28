# 📌 LeetTrack – Your Daily LeetCode Reminder & Tracker

## 🧠 Introduction

**LeetTrack** is a smart productivity platform that helps developers stay consistent with their LeetCode practice. Get daily reminders about LeetCode’s Daily Problems and POTDs right in your inbox or browser – scheduled just before midnight to give you one last nudge before the day ends.


## 🎯 Objective

To build a platform that ensures developers **never miss** their daily coding challenge by sending **customizable reminders** via **email** or **browser notifications**.


## 🚀 Key Features

- 🔐 **User Registration & Login**
- 🧩 **Add, Track & Manage LeetCode Problem Reminders**
- ✉️ **Email & Push Notifications**
- 📅 **Calendar View for Tracking Progress**
- ⏰ **Custom Reminder Scheduling (default: 23:55 IST)**
- 📊 **LeetCode Stats Integration**
- 💬 **Daily Inspirational Coding Quotes**


## 🧰 Tech Stack

### ⚙️ Frontend
- [Next.js 13+ (App Router)](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [Shadcn UI](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion/) – for seamless UI animations

### 🧠 Backend
- [Auth.js](https://authjs.dev) – authentication
- [next-safe-action](https://github.com/theogravity/next-safe-action)
- [Prisma ORM](https://www.prisma.io)
- [PostgreSQL](https://www.postgresql.org)
- [LeetCode Unofficial API](https://github.com/ujjwalguptaofficial/leetcode-api)
- [Zen Quotes API](https://zenquotes.io)
- [Resend](https://resend.com) – transactional email service
- [GitHub Actions](https://github.com/features/actions) – scheduled jobs at `23:55 IST`

### 🛠 Development & Deployment
- **Editor**: VS Code
- **Version Control**: Git & GitHub
- **Deployment**: Vercel (Frontend) | Supabase (DB hosting)


## 📌 Features In Detail

### 🔐 Authentication
- Secure login/register using `Auth.js`
- Route protection for user dashboards

### 📝 Reminder Management
- Add LeetCode problems with URL & type (Daily/POTD)
- Choose notification method (Email / Push)
- Calendar view with marked completion status

### ⏰ Scheduler
- GitHub Action runs every day at **23:55 IST** to trigger reminders
- Optional: Users can set custom timings

### 📬 Notifications
- Send daily reminder emails using **Resend**
- Push Notifications via browser support (TBD)

### 📊 Analytics
- Fetch user's solved count, streaks, and recent activity using LeetCode API


## 🧪 Advanced Frontend Features
- Server components & partial pre-rendering
- Code splitting with dynamic imports
- Custom layouts & smooth transitions (Framer Motion)


## ⚙️ Advanced Backend Features
- Modular structure with next-safe-action
- Scheduled GitHub Actions
- Prisma-managed database with strong typing
- Zen Quotes API integration for daily motivation


## 📈 Non-Functional Requirements

### 🖥 Backend
- ⚡ Handles 1000+ concurrent users
- ⏱ Response time < 2 seconds
- 🔐 HTTPS-secured data transmission
- 🔧 Modular and maintainable code

### 🖌 Frontend
- 💨 Page load time < 2 seconds
- 🧩 Scalable and responsive UI
- 👁️‍🗨️ Intuitive and accessible interface
- 🔐 Strong data protection

