<!-- # Ticket Management System [Live Link](https://ticket-management-system-one.vercel.app/)

## Project Overview
The Ticket Management System is a backend solution designed for managing bus ticketing operations. The system enables users to register, log in, and purchase tickets for buses. Admin users can manage buses and tickets through a robust set of APIs. This project is built using Node.js, Express.js, and MongoDB with Mongoose, following a modular design pattern. TypeScript enhances the codebase for better type safety and maintainability.

## Features
### User Features:
- Register, login, and logout functionalities.
- View available buses and their schedules.
- Purchase tickets for specific buses at desired time slots.

### Admin Features:
- Add, update, and delete bus information.
- Manage tickets, including uploading, updating, and deleting them.

## Technology Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Language:** TypeScript

## Installation and Setup
1. **Clone the repository:**
   ```bash
   git clone <https://github.com/sayedhasan019283/Ticket-Management-System>
   cd ticket-management-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=mongodb URI
   BCRYPT_SALT_ROUNDS=12
   DEFAULT_PASS=password12

   JWT_ACCESS_SECRET=0996fa1eff8f97b904c72a02c84b30b07d9e836a4c37ace8075bd3aa1844162e
   JWT_ACCESS_EXPIRES_IN=30d
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Run the production build:**
   ```bash
   npm run build
   npm run start:dev
   ```

## API Endpoints

### Authentication APIs
- **POST /auth/register** - Register a new user.
- **POST /auth/login** - Log in a user.
- **POST /auth/logout** - Log out a user.

### Admin APIs
- **POST /admin/bus** - Add a new bus.
- **PUT /admin/bus/:id** - Update bus information.
- **DELETE /admin/bus/:id** - Delete a bus.
- **POST /admin/ticket** - Add a new ticket for a specific bus.
- **PUT /admin/ticket/:id** - Update ticket information.
- **DELETE /admin/ticket/:id** - Delete a ticket.

### User APIs
- **GET /buses** - View all available buses.
- **GET /tickets** - View available tickets for specific buses.
- **POST /tickets/purchase** - Purchase a ticket for a specific bus and time.

## Postman Documentation
Access the full API documentation with sample requests and responses on [Postman](https://documenter.getpostman.com/view/22627564/2sAYJ6CLCZ).

## ER Diagram
The entity-relationship diagram outlines the relationships between Users, Buses, and Tickets. Access the diagram [here](https://drive.google.com/file/d/1YWUHFBb5iwQXHhysK_iBqeOdnYNtX_4V/view?usp=sharing).


## Testing
- Ensure all APIs are functional and return appropriate responses.
- Include test cases for critical flows.

## Contribution Guidelines
1. Fork the repository and clone it locally.
2. Create a new branch for your feature/bugfix.
3. Commit your changes with descriptive messages.
4. Push the branch and submit a pull request.

## Live Deployment
Access the live API deployment [here](https://ticket-management-system-one.vercel.app/).

# CoBag-Backend
# CoBag-Backend -->
