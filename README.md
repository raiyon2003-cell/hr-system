# HR Management System

Full-stack HR Management System built with:
- React + Vite (JavaScript)
- Tailwind CSS
- Firebase Authentication (Email/Password)
- Firestore Database

## Features

- User signup, login, and logout
- Protected routes for authenticated users
- Dashboard page after login
- Employee management:
  - Add employee (name, email, role, salary)
  - View employee list
  - Delete employee

## Project Structure

```text
src/
  components/
    Navbar.jsx
    ProtectedRoute.jsx
  firebase/
    config.js
  hooks/
    useAuth.js
  pages/
    DashboardPage.jsx
    EmployeeManagementPage.jsx
    LoginPage.jsx
    SignupPage.jsx
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.example .env
```

3. Update `.env` with your Firebase project values:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start development server:

```bash
npm run dev
```

## Firebase Configuration Guide

1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a project (or use an existing one).
3. Add a Web App and copy the Firebase config values.
4. In **Authentication**:
   - Go to **Sign-in method**
   - Enable **Email/Password**
5. In **Firestore Database**:
   - Create database in test mode for development
   - Create a collection named `employees` (optional, app will create on first write)

## Firestore Security Rules (Example for development)

Use stricter rules for production. Example:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /employees/{employeeId} {
      allow read, write: if request.auth != null;
    }
  }
}
```
