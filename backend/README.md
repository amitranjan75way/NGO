

# **HopeFund Backend (NGO Crowdfunding Platform)**

## **Overview**
HopeFund is a non-profit organization crowdfunding platform that connects donors with causes through a seamless donation system. The backend is built using **Node.js**, **Express.js**, and **MongoDB** with **JWT-based authentication**. The system allows users to donate to an NGO, subscribe to funding plans, manage donations, and track funding goals.

## **Tech Stack**
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A web framework for Node.js that simplifies building APIs and web applications.
- **MongoDB**: A NoSQL database for storing user, payment, and funding data.
- **JWT (JSON Web Tokens)**: For secure and stateless authentication.
- **Passport.js**: For handling user authentication strategies (Local and JWT).
- **Bcrypt.js**: For hashing passwords and securely storing them.
- **Swagger UI Express**: For API documentation and testing.
- **Nodemailer**: For sending emails, such as password reset emails.
- **Dotenv**: For managing environment variables.

## **Environment Variables**
Ensure you have the following environment variables set in your `.env` file for the application to function correctly:

```env
PORT=4000
JWT_SECRET="AMITRANJAN"
MONGODB_URI="mongodb+srv://iamakrdev:109L6Wh7u8cUFeaG@cluster0.wmup7.mongodb.net/ngo?retryWrites=true&w=majority&appName=Cluster0"
BASE_URL="http://localhost:5173"

MAIL_USER=""
MAIL_PASS=""

NODE_ENV="development"

ACCESS_TOKEN_SECRET="amitranjanaccesstokensecret"
REFRESH_TOKEN_SECRET="amitranjanrefreshtokensecret"
ACCESS_TOKEN_EXPIRY="15min"
REFRESH_TOKEN_EXPIRY="7d"
```

### **Environment Variables Breakdown:**
- **PORT**: The port on which the backend server will run (default `4000`).
- **JWT_SECRET**: Secret key used to sign JWT tokens.
- **MONGODB_URI**: MongoDB connection URI for accessing the database.
- **BASE_URL**: The base URL where the frontend is hosted (used for sending links in emails).
- **MAIL_USER**: Email address for sending emails (e.g., password reset).
- **MAIL_PASS**: Password for the email used above (ensure this is kept secure).
- **NODE_ENV**: The current environment (`development` or `production`).
- **ACCESS_TOKEN_SECRET**: Secret key for signing access tokens.
- **REFRESH_TOKEN_SECRET**: Secret key for signing refresh tokens.
- **ACCESS_TOKEN_EXPIRY**: Expiry time for access tokens.
- **REFRESH_TOKEN_EXPIRY**: Expiry time for refresh tokens.

## **Features**
### **Core Features:**
- **User Authentication**: JWT-based authentication system for secure login and registration.
- **Password Reset**: Users can reset their passwords via email.
- **Donation & Subscription**: Donors can select from funding plans and subscribe for recurring donations.
- **API Documentation**: Automatic API documentation using Swagger UI for easy testing.
- **Rate Limiting**: To prevent abuse of the API, rate limits are applied to specific routes.
- **Email Notification**: Uses Nodemailer to send notifications such as password reset links.

### **Admin Features:**
- **Manage Plans**: Admin can add, update, and delete funding plans.
- **Track Donations**: Admin can view total funds raised and track ongoing donations.

## **Installation & Setup**

### 1. **Clone the repository:**

```bash
git clone https://github.com/amitranjan75way/NGO/tree/main/backend
```

### 2. **Install dependencies:**

Navigate to the backend folder and install the dependencies:

```bash
cd hopefund-backend
npm install
```

### 3. **Set up environment variables:**

Create a `.env` file in the root directory and add the environment variables as shown in the **Environment Variables** section above.

### 4. **Run the application in development mode:**

```bash
npm run dev
```

The backend will run on `http://localhost:4000`.

### 5. **Build for production:**

```bash
npm run build
npm run prod
```

This will build the project and start it in production mode.

## **API Documentation**

You can view the API documentation via **Swagger UI** at the following URL once the server is running:

- [Swagger UI - API Docs](http://localhost:4000/api-docs)


## **Key Libraries & Their Usage**

### 1. **Express.js**:
- **Purpose**: Create the server and handle routing.
- **Use case**: Serve REST API endpoints for user authentication, donations, and plans.

### 2. **MongoDB & Mongoose**:
- **Purpose**: Store user and donation data.
- **Use case**: Models for users, donations, and funding plans are defined using Mongoose.

### 3. **JWT & Passport.js**:
- **Purpose**: Secure authentication using JSON Web Tokens.
- **Use case**: Implement login and token-based authentication with Passport.js and JWT.

### 4. **Nodemailer**:
- **Purpose**: Send password reset emails.
- **Use case**: Used for sending email notifications, such as password reset links.

### 5. **Dotenv**:
- **Purpose**: Load environment variables.
- **Use case**: Securely manage environment variables for connecting to databases, email services, and defining secrets.

### 6. **Rate Limiting**:
- **Purpose**: Prevent brute force attacks and API abuse.
- **Use case**: Limit the number of requests to specific routes within a time period.

### 7. **Swagger UI**:
- **Purpose**: Automatically generate API documentation.
- **Use case**: Provide interactive API documentation to test and view all available API routes.

## **Testing**

To run tests for your application, you can use the following:

```bash
npm run lint    # To run ESLint and check for code issues
npm run format  # To run Prettier and format the code
```

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

This README can be updated with any changes to the backend's features, API, or environment variables as needed.
