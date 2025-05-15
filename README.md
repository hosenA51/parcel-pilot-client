# ParcelPilot

[Live Site](https://parcel-pilot-3f489.web.app)

ParcelPilot is an efficient and user-friendly parcel booking and delivery management system designed to streamline the entire parcel delivery process with role-based access, real-time updates, and a responsive interface.

---

## Project Overview

ParcelPilot is a web application built to manage parcel bookings and deliveries effectively. The platform supports different user roles including Admin, Delivery Personnel, and Regular Users, each having tailored dashboards and functionalities. It offers an intuitive interface for booking parcels, tracking delivery status, managing users, and monitoring system-wide statistics.

---

## Complete List of Features

### User Roles & Dashboards
- Role-based dashboards for Admin, Delivery Men, and Users
- Personalized access to features based on user roles

### Parcel Booking & Management
- Easy parcel booking with sender/receiver details, parcel type, weight, and requested delivery date
- Users can view, update, or cancel their parcels
- Admins can monitor all parcels, assign deliveries, and manage statuses

### Delivery Tracking
- Delivery men can view and update their assigned delivery list and parcel status

### Statistical Insights
- Admin dashboard with detailed platform statistics and performance metrics

### User Management
- Admins can view, add, edit, or remove registered users and delivery personnel

### Security & Access Control
- Secure authentication with Firebase Authentication
- Role-based route protection using PrivateRoute and guards
- Logout functionality for all users

### Responsive Design
- Fully responsive layout for desktop, tablet, and mobile devices

### Error Handling
- Custom error page for handling invalid routes or unexpected errors

---

## Tech Stack Used

| Layer          | Technologies                  |
| -------------- | ---------------------------- |
| Frontend       | React.js, React Router, TailwindCSS |
| Backend        | Node.js, Express.js           |
| Database       | MongoDB                      |
| Authentication | Firebase Authentication       |

---

## Setup and Installation Instructions

### Prerequisites
- Node.js installed
- MongoDB database setup (or use MongoDB Atlas)
- Firebase project for Authentication setup

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/parcelpilot.git
   cd parcelpilot
2. Install Backend Dependencies:
   ```bash
   npm install
3. Install Frontend Dependencies:
   ```bash
   cd client
   npm install

## 🌐 Live Project Link

🔗 [ParcelPilot Live](https://parcel-pilot-3f489.web.app)

---

## 🧪 Default Credentials (for Testing)

| Role         | Username       | Email              | Password |
|--------------|----------------|--------------------|----------|
| Admin        | Mahsan Muaz    | mahsan@muaz.com    | Mm@1234  |
| Delivery Men | Habib Rafi     | habib@rafi.com     | Hr@1234  |

You can also **register a new account** to test the User functionalities.

---

## 👥 Roles Overview

### 🛡️ Admin
- Access statistics dashboard  
- Manage users and delivery men  
- Assign and track parcel deliveries  

### 🚚 Delivery Men
- View assigned delivery list  
- Update delivery statuses  
- Leave parcel reviews  

### 📦 Regular User
- Book parcels  
- View, update, or cancel parcels  
- Manage personal profile  


## 🔐 Default Credentials

### 🛡️ Admin Account
- **Username:** Mahsan Muaz  
- **Email:** mahsan@muaz.com  
- **Password:** Mm@1234  

### 🚚 Delivery Men Account
- **Username:** Habib Rafi  
- **Email:** habib@rafi.com  
- **Password:** Hr@1234  

