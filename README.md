# MentorLagbe

MentorLagbe connects students with tutors through reviewed tuition listings, student applications, role-based dashboards, and Pro plan payments.

## Features

- Search, filter, sort, and browse approved active tuition listings.
- Student and tutor accounts with email/password, Google, and GitHub sign-in.
- Tutor tuition posting, editing, applicant management, and listing visibility controls.
- Student applications with request tracking and cancellation.
- Admin user management, tuition moderation, and transaction views.
- Stripe checkout for student and tutor Pro plans.
- ImgBB image uploads for profile and tuition images.

## Tech stack

- Next.js 16, React 19, TypeScript, and Tailwind CSS
- Better Auth with MongoDB
- JWT-protected private API requests
- Stripe and ImgBB
- shadcn/ui components and Lucide icons

## Local setup

```bash
npm install
npm run dev
```

Set the following environment variables in `.env`:

| Variable | Purpose |
| --- | --- |
| `MONGODB_URL` | MongoDB connection string used by Better Auth |
| `BETTER_AUTH_SECRET` | Better Auth secret |
| `BETTER_AUTH_URL` | Frontend base URL, such as `http://localhost:3000` |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google sign-in credentials |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub sign-in credentials |
| `NEXT_PUBLIC_API_BASE_URL` | MentorLagbe backend URL, such as `http://localhost:5000` |
| `STRIPE_SECRET_KEY` | Stripe server secret key |
| `IMAGEBB_API` | ImgBB API key used by the server upload route |

The backend must be running separately. See the backend repository README for its setup.

## Project links

- Live site: add the deployed URL after deployment.
- Admin access: document the created admin email for review; never commit an admin password or secret.

## Useful commands

```bash
npm run dev
npm run lint
npm run build
```
