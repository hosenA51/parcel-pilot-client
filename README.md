# ParcelPilot

Welcome to **ParcelPilot** – an efficient and user-friendly parcel booking and delivery management system. This README file provides an overview of the website, its features, and access credentials for administrators.

## Website Information

- **Website Name**: ParcelPilot
- **Admin Username**: `Mahsan Muaz`
- **Admin email**: `mahsan@muaz.com`
- **Admin Password**: `Mm@1234`
- **Delivery Men Username**: `Habib Rafi`
- **Delivery Men email**: `habib@rafi.com`
- **Delivery Men Password**: `Hr@1234`
- **Live Site URL**: [https://parcel-pilot-3f489.web.app/]

## Key Features

1. **Dynamic Dashboard**:
   - User-specific dashboard views based on roles: `Admin`, `Delivery Men`, and `User`.
   - Each role gets a tailored experience with access to specific features.

2. **Parcel Booking**:
   - Users can easily book parcels by filling in sender and receiver details, parcel type, weight, and requested delivery date.

3. **Parcel Management**:
   - Users can view, update, or cancel their booked parcels.
   - Admins can view all parcels, monitor statuses, and manage delivery assignments.

4. **Delivery Tracking**:
   - Delivery men can view their assigned delivery list and update statuses.

5. **Statistical Insights**:
   - Admins have access to a detailed statistics page showcasing platform performance and activity.

6. **User Management**:
   - Admins can view and manage all registered users and delivery personnel.

7. **Role-Based Access Control**:
   - Routes are protected with `PrivateRoute`, ensuring access only to authenticated users.
   - Specific routes for `Admin`, `User`, and `Delivery Men` using role-based guards.

8. **Responsive Design**:
   - Fully responsive layout for seamless use on desktop, tablet, and mobile devices.

9. **Secure Authentication**:
   - User login and sign-up with secure authentication flow.
   - Logout functionality for all users.

10. **Error Handling**:
    - A dedicated error page for handling invalid routes or unexpected issues.

## Tech Stack

- **Frontend**: React.js, React Router, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Firebase Authentication

## Getting Started

1. Visit the live site: [https://parcel-pilot-3f489.web.app/].
2. Use the admin credentials to log in and explore the admin features:
- **Admin email**: `mahsan@muaz.com`
- **Admin Password**: `Mm@1234`
3. Sign up as a regular user to test user-specific functionalities.

## Roles Overview

- **Admin**: Access to statistics, parcel management, and user management.
- **Delivery Men**: View and update their assigned delivery lists, leave reviews.
- **User**: Book parcels, view and update parcel details, and manage their profile.

---

For further assistance, please contact the development team or refer to the project documentation.
