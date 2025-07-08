README.md

## 🦸‍♂️ Local Heroes – Platform for Community Recognition

Local Heroes is a community-powered recognition platform designed to spotlight everyday heroes — the unsung volunteers, student leaders, parents, neighbors, and mentors who are quietly making a difference in their communities. In a world where social media attention goes to viral trends and influencers, Local Heroes shifts the spotlight to people who truly matter — those creating change on the ground. The platform allows users to nominate heroes, share their stories, and inspire others to do good. It’s a feel-good, user-generated space that encourages kindness, youth leadership, and community pride — especially useful for schools, non-profits, and local neighborhoods.

#### Here is the MVP

🔐 Authentication ✅ User signup/login (email/password) ✅ Users must be logged in to nominate a hero or thank/comment ✅ Public visitors can view heroes without logging in
📝 Hero Nomination ✅ Nominate form: Name, Description, Location, Photo (optional) ✅ Store in database with created_by user ID ✅ After submission, redirect to Hero's profile
🌟 Hero Feed ✅ Paginated list/grid of all nominated heroes ✅ Show name, photo, short story, thanks count ✅ Filter by location, tags, or search
🙌 Thank & Comment ✅ Users can “Thank” a hero (one per user per hero) ✅ Add public, positive comments under a hero story ✅ Basic moderation (only delete your own comment)
🎨 UI & Design ✅ Responsive layout (grid/card view for hero feed) ✅ Pages: Login, Signup, Hero Feed, Nominate, Hero Profile, Dashboard ✅ Clean, friendly UI with uplifting messaging

#### Here is the stretch

- 🎓 School & Organization Tags ✅ Add optional school/org tags when submitting a hero ✅ Filter heroes by tag (e.g., “Lincoln High”, “Red Crescent Youth”)
- 📊 Hero Analytics (Admin Only) ✅ Track most thanked heroes, top locations ✅ Admin dashboard for managing inappropriate content
- 🏆 Leaderboard ✅ Display “Top Heroes of the Month” ✅ Weekly or monthly leaderboard by community votes
- 📤 Shareable Profile Links ✅ Generate social media preview card ✅ Encourage sharing hero stories outside the app

#### Here is the Resources

API Documentation
https://github.com/duraanali/localheroes

## Local Heroes API Documentation

- Base URL: https://localheroes.vercel.app

#### Register User

- POST /api/auth/register

#### Login

- POST /api/auth/login

#### Logout

- POST /api/auth/logout

#### Get All Heroes

- GET /api/heroes

#### Create Hero

- POST /api/heroes

#### Get Hero by ID

-GET /api/heroes/:id

#### Delete Hero

- DELETE /api/heroes/:id

#### Thank Hero

- POST /api/heroes/:id/thank

#### Get Hero Comments

- GET /api/heroes/:id/comments

#### Add Comment

-POST /api/heroes/:id/comments

#### Get Current User

- GET /api/users/me

#### Get User's Heroes

- GET /api/users/:id/heroes

## Features

- Responsive with different devices
- Nomination Form with validation
- Authentication (login, protected routes)
- Heroes page listed on different Heroes.

## Technologies

Frontend:

- React
- React Router
- React Hook Form + Zod (Validation)
- Tailwind CSS
  State Management:
- Redux Toolkit
- Axios
  Deployment:
- Vite
- Vercel

## About Us

- Abdillahi Mohamoud - Forms and validation
- Maria Yusuf- UI & UX and Deployment
- Abdifatah Omer- UI & UX
- Abdirahman Ali- Authentication and State Management
