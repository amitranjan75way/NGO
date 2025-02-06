

# **NGO Crowdfunding Platform (HopeFund)**

## **Description**
HopeFund is a web-based crowdfunding platform designed to enable users to donate to a non-profit organization (NGO) through recurring payments. Users can sign up, select funding plans, and subscribe to make recurring donations. The platform also allows the NGO admin to manage funding plans and track donations.

Built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with TypeScript, the platform is optimized for a smooth, simple, and attractive user experience with a robust backend system.

## **Key Features**
### **User Features:**
- **Sign Up / Log In**: Users can register and log in using email and password.
- **Password Management**: Users can reset and change their passwords.
- **Profile Management**: Users can view and edit their profile.
- **Payment Methods**: Users can securely add, manage, and delete payment methods (cards and bank accounts).
- **Fundraising Plans**: Users can view available fundraising plans created by the NGO and select the one they want to contribute to.
- **Recurring Donations**: Users can subscribe to a fundraising plan for recurring payments (monthly, quarterly, etc.).
- **Error Handling & Notifications**: Users receive feedback in the form of success or error messages during key actions (e.g., adding payment method, subscribing to plans).

### **Admin Features:**
- **Manage Funding Plans**: Admins can create, update, or delete fundraising plans with specific amounts and durations (monthly, quarterly, yearly).
- **Track Donations**: The admin can track the total raised amount and monitor the progress of each fundraising plan.

### **UX/UI:**
- **Responsive Design**: The platform has a responsive and attractive UI, designed for smooth navigation.
- **Animation and Smooth Transitions**: Enhancements with smooth animations for interactions to provide a better user experience.
- **Error & Success Notifications**: Instant feedback for successful or failed actions using toast notifications.

## **Tech Stack**
- **Frontend**: React.js, Redux Toolkit, TypeScript, CSS Modules
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB 
- **Authentication**: JWT-based authentication using Passport.js
- **Payment Integration**: Integration with third-party payment gateways for payment method handling (e.g., Stripe, PayPal)
- **Error Handling**: Custom error codes and messages with dynamic feedback through toast notifications.

## **Installation**
### 1. Clone the repository:
```bash
git clone https://github.com/your-username/hopefund.git
```

### 2. Install dependencies:
Navigate to both the `backend` and `frontend` folders and run the following:
```bash
cd backend
npm install
```
```bash
cd frontend
npm install
```

### 3. Set up environment variables:
Create a `.env` file in both the frontend and backend directories with appropriate values. For example:

**Backend .env example:**
```bash
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

**Frontend .env example:**
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start the project:
For the backend:
```bash
cd backend
npm run dev
```

For the frontend:
```bash
cd frontend
npm start
```

### 5. Access the application:
Once both frontend and backend are running, open the browser and go to:
```
http://localhost:3000
```

## **Usage**
1. **Sign Up**: Create a new account as a user or admin.
2. **Login**: Sign in with your credentials.
3. **Manage Profile**: View and update your user profile.
4. **Add Payment Methods**: Add a new payment method (card or bank account).
5. **Subscribe to Plans**: Choose a funding plan and subscribe to make recurring donations.
6. **Admin Actions**: Admins can manage plans, view donations, and track progress.

## **Contributing**
We welcome contributions! Feel free to fork this repository, create a feature branch, and submit a pull request. Ensure your code adheres to the project structure and is well-documented.

### Steps for contributing:
1. Fork the repository.
2. Clone the forked repository to your local machine.
3. Create a new branch for the feature or bug fix you're working on.
4. Make changes and commit them with meaningful commit messages.
5. Push your changes to the branch and submit a pull request.

## **License**
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to update the template with your specific repository information or any other details relevant to your project.
