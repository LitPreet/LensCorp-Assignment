
# Task App
<img src="https://github.com/LitPreet/Dev-Vault/blob/master/public/assets/images/pic2.png" />
A task management application built with Next.js, designed to help users efficiently create, track, and manage their tasks. This app offers features such as task creation, categorization by status (e.g., pending, in-progress, completed), and task progress visualization using charts. With a user-friendly interface, real-time updates, filtering options.

## 🌐Demo

Explore the live project - https://lens-corp-assignment.vercel.app/


## 🚀Key Features
- Task Management: Create, update, and track tasks.
- Task Filtering: Filter tasks by status and set priorities.
- Real-time Updates: View live task status and summaries.
- Toast Notifications: Get success/error alerts for task actions.
- Responsive Dashboard: Optimized for all screen sizes.
- User Profile & Settings: Manage your profile and dashboard preferences.
- Light/Dark Mode: Toggle between light and dark modes.


## 🛠️Tech Stack
- Next.js 14
- TypeScript
- Tailwind CSS
- MongoDB
- Mongoose
- Clerk for Authentication
- Shadcn UI for reusable components
- LUCIDE Icons
- Zod for Form validation
- Next themes for theme management
- Vercel for deployment
## 🏁 Get Started
To get this project up and running in your development environment, follow these step-by-step instructions.
## 📝 Prerequisites
In order to install and run this project locally, you would need to have the following installed on your local machine.
- [Node js](https://nodejs.org/en/)
- [NPM](https://docs.npmjs.com/getting-started)
- [Git](https://git-scm.com/downloads)
## ⚙️ Installation and Run Locally

#### step 1
Download or clone this repo by using the link below:
```
https://github.com/LitPreet/LensCorp-Assignment
```
#### step 2
Execute the following command in the root directory of the downloaded repo in order to install dependencies:
```
npm install
```
### step 3
Execute the following command in order to run the development server locally:
```
npm run dev
```
### step 4
Open http://localhost:3000 with your browser to see the result.
## 📜 Scripts
| Script       | Action         
| ------------- |:-------------
| ```npm install```      | Installs dependencies
| ```npm run dev```      | Starts local dev server at ```localhost:3000  ```  
| ```npm run build``` | Build your production site to ```./dist/```    
| ```npm run start``` | Start your production site locally
| ```npm run lint``` | Run ESLint |

## 🔒 Environment Variables
```
WEBHOOK_SECRET
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard
MONGODB_URL=<YOUR_MONGODB_URL>
```
## 🚀 Deployment
You can create an optimized production build with the following command:
```
npm run build
```
#### Deploy on Vercel
The easiest way to deploy this Next.js app is to use the Vercel Platform.
[Vercel Platform](https://vercel.com)
