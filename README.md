# blogAPI — Frontend

The frontend for **blogAPI**, a full-stack blogging platform where authors can publish posts and readers can log in to comment. Built with React, React Router, and Tailwind CSS, and backed by a separate Express + PostgreSQL API.

**Live demo:** [your-vercel-url-here](#)
**Backend repo:** [Blog-Backend](https://github.com/Raj102546/Blog-Backend)

---

## Features

- **Authentication** — JWT-based sign up and login, with the token persisted across page refreshes.
- **Role-based publishing** — only users with the `author` role can create, edit, or delete posts.
- **Posts** — create, read, update, and delete, with a published/draft state.
- **Comments** — logged-in users can comment on posts; authors can delete their own posts' comments.
- **Responsive UI** — mobile-friendly navbar with a slide-down menu, styled with Tailwind CSS.

## Tech stack

- [React 19](https://react.dev/)
- [React Router 7](https://reactrouter.com/)
- [Vite](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)

## Getting started

### Prerequisites

- Node.js 20+
- The [backend API](https://github.com/Raj102546/Blog-Backend) running locally or deployed

### Installation

```bash
git clone https://github.com/your-username/your-frontend-repo.git
cd your-frontend-repo
npm install
```

### Environment variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000/blog
```

Point this at your backend's URL — update it to your deployed backend's URL in production.

### Run locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Scripts

| Command           | Description                        |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start the development server        |
| `npm run build`   | Build for production                |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                          |

## Project structure

```
src/
├── AuthContext.jsx     # Auth state (token, logged-in user) shared app-wide
├── components/
│   ├── Layout.jsx       # Route layout — wraps pages with Navbar + AuthContext.Provider
│   ├── EditPost.jsx
│   └── Navbar.jsx        # Responsive nav bar
├── pages/
│   ├── Home.jsx           # Landing page + latest posts
│   ├── Login.jsx
│   ├── SignUp.jsx
│   ├── Posts.jsx           # Post list + create-post modal (author only)
│   └── OpenPost.jsx         # Single post + comments
├── main.jsx               # Root file
└── Routes.jsx             # Route definitions
```

## Deployment

This app is deployed on [Vercel](https://vercel.com/). A `vercel.json` rewrite is included so client-side routes (e.g. `/posts/5`) resolve correctly on page refresh. Set `VITE_API_URL` as an environment variable in your Vercel project settings, pointing to your deployed backend.