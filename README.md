# 🎓 MentorLagbe — Smart Tuition & Mentorship Platform

MentorLagbe is a modern tuition and mentorship platform that connects students with qualified tutors. Students can discover tuition opportunities, apply for their preferred tuition, and track their applications, while tutors can create tuition listings, manage applicants, and grow their teaching opportunities.

The platform provides role-based dashboards for Students, Tutors, and Admins, along with a secure authentication system and subscription-based premium features.

---

## 🌐 Live Website

🔗 **Live Site:** [https://mentorlagbe-frontend.vercel.app](https://mentorlagbe-frontend.vercel.app)

🔗 **Backend API:** [https://mentorlagbe-backend.vercel.app](https://mentorlagbe-backend.vercel.app)

---

## 📸 Project Overview

MentorLagbe makes the tuition-finding and tutoring process easier, smarter, and more organized.

Students can browse tuition listings by subject, class level, teaching mode, location, and budget. Tutors can post tuition opportunities and manage student applications. Admins can monitor users, approve tuition listings, and manage platform transactions.

---

## ✨ Key Features

### 👨‍🎓 Student Features

- Register and log in securely with email/password, Google, or GitHub.
- Browse approved and active tuition listings.
- Search tuitions by title, subject, or tutor name.
- Filter tuitions by subject, class level, location, and teaching mode.
- Sort listings by newest or tuition fee.
- View detailed tuition information.
- Apply for tuition opportunities.
- Prevent duplicate applications.
- Track application status.
- Cancel pending applications.
- Upgrade to a Pro student membership.
- Update profile information and profile photo.

### 👨‍🏫 Tutor Features

- Register as a Tutor.
- Create tuition listings.
- Upload tuition banner images.
- Manage created tuition posts.
- Edit and delete tuition listings.
- Toggle tuition status between Active and Closed.
- Track admin approval status.
- Manage student applicants.
- Accept or reject student applications.
- Upgrade to a Pro tutor membership.
- Free tutors can create up to 2 tuition posts.
- Pro tutors can create unlimited tuition posts.

### 🛡️ Admin Features

- View platform statistics.
- Manage registered users.
- Create user accounts and change user roles.
- View all tuition listings.
- Approve or reject tuition posts.
- Manage student and tutor transactions.
- Monitor total revenue.
- Access a dedicated admin dashboard.

### 💳 Payment Features

- Free and Pro subscription plans.
- Stripe Checkout integration.
- Pro Tutor Plan — **$15 one-time payment**.
- Pro Student Plan — **$10 one-time payment**.
- Secure payment processing.
- Payment success pages.
- Payment cancellation handling.
- Transaction history.
- Automatic subscription plan updates after successful payment.

### 🔐 Authentication & Security

- Better Auth authentication.
- Email and password authentication.
- Google and GitHub social login.
- Role-based authorization.
- JWT plugin integration.
- Protected dashboard routes.
- Server-side role checks.
- Secure API communication.
- Environment variable configuration.

---

## 🧑‍💻 User Roles

| Role | Description |
|------|-------------|
| Student | Browse tuition listings, apply for tuitions, manage applications, and upgrade membership. |
| Tutor | Create tuition listings, manage applicants, and upgrade membership. |
| Admin | Manage users, tuition listings, approvals, and transactions. |

---

## 🛠️ Technology Stack

### Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui and Base UI
- Lucide React
- Recharts

### Authentication

- Better Auth
- MongoDB adapter
- JWT
- Role-based authentication

### Backend

- Node.js
- Express.js
- MongoDB
- [mentorlagbe-backend](https://github.com/mdmahadih673/mentorlagbe-backend)

### Payment

- Stripe Checkout
- Stripe.js

### Image Upload

- ImgBB API

### Deployment

- Vercel (Frontend)
- Vercel (Backend)

---

## 📄 Pages & Routes

### Public Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero section, featured tuitions, pricing, and platform information |
| `/tuitions` | Browse, search, filter, and sort approved tuition listings |
| `/tuitions/[id]` | Tuition details and application form |
| `/pricing` | Free and Pro subscription plans |
| `/how-it-works` | Step-by-step guide for students and tutors |
| `/about` | Platform information |
| `/sign-in` | User login |
| `/sign-up` | User registration as a Student or Tutor |
| `/unauthorized` | Access denied page |
| `/success` | Legacy payment success redirect |

### Dashboard Pages

| Route | Description |
|-------|-------------|
| `/dashboard` | Role-based dashboard overview |
| `/dashboard/profile` | Update user profile and photo |
| `/dashboard/my-applications` | Student: manage tuition applications |
| `/dashboard/student-payment` | Student: upgrade to Pro |
| `/dashboard/student-payment/success` | Student: payment confirmation |
| `/dashboard/post-tuition` | Tutor: create a tuition listing |
| `/dashboard/my-tuitions` | Tutor: manage created tuition posts |
| `/dashboard/my-tuitions/[id]/edit` | Tutor: edit a tuition listing |
| `/dashboard/applicants` | Tutor: manage student applications |
| `/dashboard/applicants/[id]` | Tutor: review a single applicant |
| `/dashboard/payment` | Tutor: upgrade to Pro |
| `/dashboard/payment/success` | Tutor: payment confirmation |
| `/dashboard/admin/users` | Admin: user management |
| `/dashboard/tuitions` | Admin: tuition approval management |
| `/dashboard/transactions` | Admin: payment and transaction management |

---

## 📊 Dashboard Overview

### Student Dashboard

- Total Applications
- Accepted Applications
- Pending Applications
- Available Tuitions
- My Applications
- Application Status Tracking

### Tutor Dashboard

- Total Tuitions Posted
- Approved Tuitions
- Total Applicants
- Pending Review
- My Tuitions
- Applicant Management

### Admin Dashboard

- Total Users
- Total Tutors
- Pending Tuitions
- Approved Tuitions
- Rejected Tuitions
- Total Applications
- Total Revenue
- User Management
- Tuition Moderation
- Transaction Management

---

## 🎨 UI & Design

- Modern and clean interface.
- Responsive design for mobile, tablet, and desktop.
- Consistent typography and spacing.
- Reusable shadcn/ui components.
- Professional color palette.
- Equal-sized tuition cards.
- Interactive navigation.
- Dashboard sidebar.
- Loading skeletons.
- Custom error and not-found pages.
- Toast notifications.
- Smooth animations and transitions.

---

## 🚀 Getting Started

Follow these instructions to run the frontend project locally.

### Prerequisites

Make sure you have installed:

- Node.js (Latest LTS recommended)
- npm
- Git
- MongoDB connection string
- Stripe account
- ImgBB account
- Google and GitHub OAuth apps

### 1. Clone the Repository

```bash
git clone https://github.com/mdmahadih673/mentorlagbe-frontend.git
```

### 2. Navigate to the Project Directory

```bash
cd mentorlagbe-frontend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory.

```env
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
MONGODB_URL=your_mongodb_connection_string

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

IMAGEBB_API=your_imgbb_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

> Never expose secret keys or private credentials in frontend environment variables. Only variables prefixed with `NEXT_PUBLIC_` are sent to the browser.

### 5. Run the Development Server

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

The backend must be running separately. See the [backend repository](https://github.com/mdmahadih673/mentorlagbe-backend) for its setup instructions.

---

## 📁 Project Structure

```text
mentorlagbe-frontend/
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── sign-in/
│   │   │   └── sign-up/
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── checkout_sessions/
│   │   │   ├── student/
│   │   │   └── upload/
│   │   ├── dashboard/
│   │   │   ├── (admin)/
│   │   │   │   ├── admin/
│   │   │   │   ├── transactions/
│   │   │   │   └── tuitions/
│   │   │   ├── (student)/
│   │   │   │   ├── my-applications/
│   │   │   │   └── student-payment/
│   │   │   ├── (tutor)/
│   │   │   │   ├── applicants/
│   │   │   │   ├── my-tuitions/
│   │   │   │   ├── payment/
│   │   │   │   └── post-tuition/
│   │   │   ├── profile/
│   │   │   └── page.tsx
│   │   ├── tuitions/
│   │   │   ├── [id]/
│   │   │   └── page.tsx
│   │   ├── pricing/
│   │   ├── how-it-works/
│   │   ├── about/
│   │   ├── unauthorized/
│   │   ├── page.tsx
│   │   ├── error.tsx
│   │   └── not-found.tsx
│   │
│   ├── components/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   ├── sections/
│   │   ├── tuition/
│   │   └── ui/
│   │
│   ├── hooks/
│   ├── lib/
│   │   ├── api/
│   │   ├── types/
│   │   ├── auth.ts
│   │   ├── auth-client.ts
│   │   └── stripe.ts
│   └── ...
│
├── components.json
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔑 Demo Accounts

- **Student / Tutor:** create an account from `/sign-up` and choose the desired role.
- **Admin:** admin access is granted by setting the user's role to `admin` in the database. Admin passwords are never committed to this repository.

> If you are reviewing this project, sign up as a Student or Tutor to explore the dashboard. Admin credentials can be shared privately by the developer.

---

## 🔗 Project Links

| Resource | Link |
|----------|------|
| Live Website | [https://mentorlagbe-frontend.vercel.app](https://mentorlagbe-frontend.vercel.app) |
| Backend API | [https://mentorlagbe-backend.vercel.app](https://mentorlagbe-backend.vercel.app) |
| Client Repository | [https://github.com/mdmahadih673/mentorlagbe-frontend](https://github.com/mdmahadih673/mentorlagbe-frontend) |
| Server Repository | [https://github.com/mdmahadih673/mentorlagbe-backend](https://github.com/mdmahadih673/mentorlagbe-backend) |

---

## 📦 Important Packages

Some of the major packages used in this project:

- `next`
- `react`
- `react-dom`
- `better-auth`
- `stripe`
- `@stripe/stripe-js`
- `mongodb`
- `@better-auth/mongo-adapter`
- `lucide-react`
- `tailwindcss`
- `shadcn`
- `recharts`

---

## 🎯 Future Improvements

- Advanced tuition recommendation system.
- Real-time notifications.
- Student review and rating system.
- Saved tuition listings.
- Dark and light theme.
- Server-side pagination.
- Improved search experience.
- AI-powered tutor recommendations.

---

## 👨‍💻 Developer

**Md Mahadi Hasan**

- GitHub: [mdmahadih673](https://github.com/mdmahadih673)
- LinkedIn: [Md Mahadi Hasan](https://www.linkedin.com/in/md-mahadi-hasan-792ba8344/)

---

## 📜 License

This project was developed for educational purposes as part of Assignment 9 - Category 001.
