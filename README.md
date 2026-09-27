&lt;div align="center"&gt;

# 💪 FitLog
### Your Gym Companion & Workout Tracker

**Browse. Learn. Lift. Repeat.**
FitLog is a sleek, dark-themed workout companion that helps you discover exercises,
master the technique, and crush your daily plan — all from one beautiful dashboard.

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-F000B8?style=for-the-badge&logo=daisyui&logoColor=white)

![License](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-4f46e5?style=flat-square)
![Responsive](https://img.shields.io/badge/100%25-Responsive-f59e0b?style=flat-square)

[🚀 Quick Start](#-getting-started) · [✨ Features](#-key-features) · [🛠 Tech Stack](#-tech-stack)

&lt;/div&gt;

---

## 🚀 Tech Stack

| Layer        | Technology                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------ |
| **Framework** | [Next.js 14 (App Router)](https://nextjs.org/)                                                    |
| **Language** | [TypeScript](https://www.typescriptlang.org/)                                                     |
| **Styling**  | [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)                        |
| **Icons**    | [React Icons](https://react-icons.github.io/react-icons/)                                         |
| **Toasts**   | [React Toastify](https://fkhadra.github.io/react-toastify/)                                       |
| **State**    | React Context API + LocalStorage (zero-config persistence)                                        |

---

## 🔥 Key Features

### 🏋️ Interactive Workout Library
A responsive **3×4 grid** (large screens) powered by the FitLog REST API. Every card shows:
- 🏷 Visual category badges
- 🧰 Equipment requirements
- ⏱ Duration & 🔥 calories burned
- ⭐ User ratings

### 📖 Deep-Dive Exercise Pages
Two-column detail layouts with high-quality exercise images, numbered step-by-step instructions, and full technical specs (sets, reps, difficulty) — plus one-tap buttons to **schedule** or **save**.

### ⏱ Live Counters & Smart Limits
Dynamic navbar badges (`Plan` / `Saved`) update in real time. FitLog enforces a **5-lift daily cap** with friendly toast notifications — no overtraining, no clutter.

### 📊 Real-Time Plan Metrics
Total workout **duration** and **calorie burn** recalculate instantly as you:
- ✅ Add lifts
- ✔️ Mark exercises complete
- 🗑 Remove items from your routine

### 🔃 Sorting & Persistence
Sort planned and saved lifts by **duration**, **calories**, or **rating**. Everything survives page reloads via browser LocalStorage — close the tab, come back stronger.

---

## 🛠️ Getting Started

```bash
# 1️⃣ Clone & install
npm install

# 2️⃣ Fire up the dev server
npm run dev