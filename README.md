# 📚 Fable

A full-stack Ebook Sharing Platform where readers can discover and purchase original ebooks, writers can publish and manage their creations after verification, and administrators can oversee platform operations through a centralized dashboard.

---

## 🌐 Live Website

🔗 Live Site: [fable-munaimpro.vercel.app](https://fable-munaimpro.vercel.app/)

---

## 🚀 Getting Started

### Clone Client Repository

```bash
git clone https://github.com/munaimpro/fable.git
```

### Clone Server Repository

```bash
git clone https://github.com/munaimpro/fable-server.git
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

in your browser.

---

## 🎯 Project Overview

Fable is a modern digital ebook marketplace designed to connect readers and writers on a single platform.

Readers can browse, bookmark, and purchase ebooks securely using Stripe.

Writers can upload, publish, edit, and manage their ebooks after completing a one-time verification process.

Administrators have complete control over users, ebooks, transactions, and platform analytics.

---

# 👥 System Roles

### 📖 Reader (User)

- Browse ebooks
- Purchase ebooks
- Bookmark ebooks
- View purchase history
- Access purchased content

### ✍️ Writer

- Upload ebooks
- Edit ebooks
- Publish / Unpublish ebooks
- Delete ebooks
- View sales history
- Manage ebook catalog

### 🛡️ Admin

- Manage users
- Change user roles
- Delete users
- Manage all ebooks
- View platform transactions
- Monitor analytics

---

# ✨ Core Features

## 🔐 Authentication & Authorization

### Authentication

- Email & Password Login
- Google Authentication
- BetterAuth Integration
- Session Persistence
- Secure Authentication Flow

### Authorization

- Role-Based Access Control (RBAC)
- Protected Dashboard Routes
- Admin Route Protection
- Writer Route Protection
- Secure API Verification

---

## 📚 Ebook Management

### Writers Can

- Add New Ebook
- Edit Existing Ebook
- Delete Ebook
- Publish Ebook
- Unpublish Ebook

### Ebook Information

- Cover Image
- Title
- Writer Name
- Genre
- Price
- Description
- Full Content
- Publish Status
- Upload Date

---

## 💳 Ebook Purchase System

Readers can:

- Browse Available Ebooks
- View Ebook Details
- Purchase Ebooks via Stripe
- Access Purchased Content
- View Purchase History

### Purchase Flow

```text
Browse Ebook
      ↓
View Details
      ↓
Stripe Checkout
      ↓
Payment Success
      ↓
Purchase Stored
      ↓
Content Unlocked
```

---

## ⭐ Writer Verification System

Writers must complete a one-time verification payment before publishing ebooks.

### Verification Benefits

- Ebook Publishing Permission
- Writer Dashboard Access
- Ebook Management Features

### Payment Gateway

- Stripe Checkout
- Secure Verification Process

---

# 🌐 Public Pages

## Home Page

- Hero Banner
- Featured Ebooks
- Top Writers
- Ebook Genres
- Framer Motion Animations

## Browse Ebooks

Features include:

- Search by Ebook Title
- Search by Writer Name
- Genre Filtering
- Price Range Filtering
- Availability Filtering
- Sorting
- Pagination

## Ebook Details Page

Displays:

- High Resolution Cover
- Ebook Information
- Writer Information
- Purchase Option
- Bookmark Feature
- Purchased Content Access

---

# 📊 Dashboard Features

## Reader Dashboard

- Purchase History
- Purchased Ebooks
- Bookmarked Ebooks
- Profile Management

## Writer Dashboard

- Add Ebook
- Manage Ebooks
- Edit Ebook
- Publish / Unpublish Ebook
- Delete Ebook
- Sales History
- Bookmark Collection

## Admin Dashboard

- Analytics Overview
- User Management
- Ebook Management
- Transaction Monitoring
- Revenue Tracking
- Genre Statistics
- Monthly Sales Charts

---

# 📈 Analytics System

Platform analytics include:

- Total Users
- Total Writers
- Total Ebooks Sold
- Total Revenue
- Monthly Revenue Statistics
- Ebook Genre Distribution

---

# 🔍 Search, Filtering & Pagination

### Search

- Ebook Title Search
- Writer Name Search

### Filters

- Genre Filter
- Availability Filter
- Price Range Filter

### Sorting

- Newest First
- Price Low → High
- Price High → Low

### Pagination

---

# 🛡️ Security Features

- BetterAuth Authentication
- JWT Verification
- Protected API Routes
- Role-Based Authorization
- Secure Environment Variables
- MongoDB Credential Protection
- Server-Side Validation

---

# 🗄️ Database Collections

## Users

```text
name
email
image
role
createdAt
```

## Ebooks

```text
title
description
content
genre
price
coverImage
writerId
writerName
status
totalSale
createdAt
```

## Purchases

```text
ebookId
ebookTitle
buyerId
buyerName
writerId
writerName
price
paymentStatus
transactionId
purchaseDate
```

## Transactions

```text
transactionId
type
userEmail
amount
status
createdAt
```

## Verified Writers

```text
writerId
writerEmail
paymentStatus
transactionId
verificationDate
status
```

## Bookmarks

```text
ebookId
userId
createdAt
```

---

# 🔄 System Flow

```text
User Registration
        ↓
Role Selection
        ↓
Authentication
        ↓
Dashboard Access
        ↓
Browse Ebooks
        ↓
Bookmark / Purchase
        ↓
Stripe Payment
        ↓
Purchase Storage
        ↓
Content Unlock
        ↓
Analytics Update
```

---

# 🛠️ Tech Stack

## Frontend

- Next.js 16
- React 19
- Tailwind CSS 4
- Framer Motion
- Lucide React
- Recharts
- React Hot Toast

## Backend

- Node.js
- Express.js
- MongoDB

## Authentication

- BetterAuth
- JWT
- Google OAuth

## Payments

- Stripe Checkout

---

# 📦 NPM Packages Used

## Client

```json
{
  "@stripe/stripe-js": "^9.8.0",
  "better-auth": "^1.6.19",
  "jsonwebtoken": "^9.0.3",
  "lucide-react": "^1.21.0",
  "motion": "^12.40.0",
  "next": "^16.2.9",
  "react": "19.2.4",
  "react-dom": "19.2.4",
  "react-hot-toast": "^2.6.0",
  "recharts": "^3.8.1",
  "stripe": "^22.2.2"
}
```

## Server

```text
Express.js
MongoDB
JOSE
CORS
Dotenv
Stripe
```

---

# 🎯 Features Implemented

✅ Authentication System

✅ Role-Based Dashboard

✅ Ebook CRUD Operations

✅ Writer Verification Payment

✅ Ebook Purchase Payment

✅ Bookmark System

✅ Search & Filtering

✅ Pagination

✅ Analytics Dashboard

✅ Revenue Tracking

✅ Monthly Sales Charts

✅ Genre Statistics

✅ Responsive Design

✅ Loading States

✅ Error Handling

✅ Protected Routes

---

## 👨‍💻 Admin Credentials

```text
Email: admin@fable.com
Password: Admin@123
```

---

## 👨‍💻 Developed By

Munaim Khan

M.Sc. in Computer Science & Engineering

Full Stack Web Developer
