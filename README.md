# Shyam Digital Print Billing Software

---

## 📋 Project Overview
Billing software for **Digital Print** (CMYK digital printing business).

### Features (Planned):
* Customer management
* Order management
* Sticker / card / sheet billing
* Invoice generation

---

## 🛠 Tech Stack

### Backend
* **Framework:** Laravel (PHP)
* **Version:** 12.12.2

### Frontend
* **Framework:** React (Vite)
* **Version:** Vite 8.x

### Database (Planned)
* MySQL

---

## ⚙️ System Requirements
* **Node.js:** 22.x (recommended)
* **npm:** 10+
* **PHP:** 8.2+
* **Composer:** Latest

---

## 📂 Project Structure
```text
shyam-digital-print/
 ├── backend/
 ├── frontend/
 ├── README.md
 └── .gitignore


---

## Backend Setup (Laravel)

* 1. Navigate to backend
```text
cd backend

* 2. Install Laravel
```text
composer create-project laravel/laravel .

* 3. Generate application key
```text
php artisan key:generate

* 4. Run migrations
```text
php artisan migrate

* 5. Start server
```text
php artisan serve


---


## Frontend Setup (React + Vite)
*1. Navigate to frontend
```text
cd frontend

*2. Create project
```text
npm create vite@latest .

*Select:

React
JavaScript


---

## Tailwind CSS Setup

* 1. Install Tailwind CSS
```text
npm install -D tailwindcss@3.4.1 postcss autoprefixer
```

* 2. Initialize Tailwind
```text
npx tailwindcss init -p
```

* 3. Update `tailwind.config.js`
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

* 4. Update `src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

* 5. Ensure CSS import exists in `src/main.jsx`
```js
import './index.css'
```

---


