# 🚢 Shippex Frontend

A mobile-first React application for Shippex, designed for ship crew members to order supplies while their vessel is docked at port.

The frontend is built using **React**, **Vite**, and **Tailwind CSS**, and integrates with the Shippex Spring Boot backend through REST APIs.

---

# 📱 Features

- User Registration
- Username Availability Check
- WhatsApp OTP Verification
- Secure Login using JWT
- Protected Routes
- User Profile
- Logout with Confirmation Dialog
- Responsive Mobile-First UI
- Toast Notifications
- Docker Support

---

# 🛠️ Tech Stack

- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast
- Lucide React
- Docker

---

# 📂 Project Structure

```text
src
├── api
├── assets
├── components
│   ├── auth
│   ├── common
│   ├── home
│   └── register
├── config
├── context
├── data
├── features
│   └── auth
│       └── services
├── pages
├── routes
└── utils
```

---

# ⚙️ Prerequisites

One of the following:

## Option 1 (Recommended)

- Docker Desktop

## Option 2

- Node.js 22+
- npm

---

# 🚀 Running using Docker

Clone the repository

```bash
git clone <frontend-repository-url>

cd shippex-frontend
```

Build and start the application

```bash
docker compose up --build -d
```

Frontend will be available at

```
http://localhost:5173
```

---

# 💻 Running without Docker

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

Application runs on

```
http://localhost:5173
```

---

# 🔗 Backend Requirement

The frontend communicates with the Shippex Spring Boot backend.

Ensure the backend is running before using the application.

Default backend URL:

```
http://localhost:8080
```

---

# 🔐 Authentication Flow

1. Register
2. Verify WhatsApp OTP
3. Login
4. JWT stored locally
5. Protected pages require authentication
6. Logout clears the session

---

# 📱 Protected Routes

Authenticated users can access:

- Cart
- Checkout
- Orders
- Profile

Unauthenticated users are redirected to the Login page.

---

# 🐳 Docker Commands

Start

```bash
docker compose up --build -d
```

Stop

```bash
docker compose down
```

View Logs

```bash
docker compose logs -f
```

Restart

```bash
docker compose restart
```

---

---

# 🤖 GitHub Actions & Docker Image Publishing

The frontend Docker image is automatically built and published to **GitHub Container Registry (GHCR)** whenever changes are pushed to the `main` branch.

Published Docker image:

```text
ghcr.io/shippexdevs/shippex-frontend:latest

# 📸 Current Screens

- Home
- Categories
- Product Details
- Register
- Login
- Profile
- Cart
- Checkout
- Orders

---

# 📌 Current Status

Completed

- User Registration
- Login
- JWT Authentication
- Protected Routes
- Profile Integration
- Logout
- Docker Support

Upcoming

- Forgot Password
- Profile Update
- Persistent Cart
- Order Placement
- Order Tracking
- Payment Integration
- Admin Dashboard

---

# 🤝 Contributing

1. Create a feature branch

```bash
git checkout -b feature/your-feature-name
```

2. Commit your changes

```bash
git commit -m "feat: add new feature"
```

3. Push the branch

```bash
git push origin feature/your-feature-name
```

4. Open a Pull Request

---

# 👨‍💻 Developed By

**Santojeet and Zunaid**

Frontend for the Shippex platform.