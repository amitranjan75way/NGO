
# **HopeFund Frontend (NGO Crowdfunding Platform)**

## **Overview**
HopeFund is a modern, fully responsive NGO crowdfunding platform built using **React.js**, **TypeScript**, and **Vite**. The frontend features an intuitive and attractive user interface with smooth animations, dynamic page layouts, and lazy loading for a seamless experience. This repository integrates with the backend to allow users to donate to a non-profit organization (NGO) and subscribe to recurring funding plans.

## **Tech Stack**
- **React.js**: A popular JavaScript library for building user interfaces.
- **TypeScript**: A statically typed superset of JavaScript.
- **Vite**: A fast build tool that provides a modern development experience.
- **Redux Toolkit**: A state management library to manage authentication and user data.
- **Material UI**: A set of React components that implement Google's Material Design.
- **Framer Motion**: A library for animations, allowing smooth UI transitions and animations.
- **React Hook Form**: A form management library that simplifies form handling and validation.
- **Yup**: A validation library used alongside React Hook Form.
- **React Router DOM**: A routing library to manage navigation in a React application.
- **React-Toastify**: A notification library to display success or error messages.
- **SASS**: A CSS preprocessor to make writing CSS easier and more maintainable.

## **Features**
### **Core Features:**
- **Responsive UI**: The application adapts to different screen sizes and devices.
- **Smooth Animations**: Using Framer Motion, the UI includes smooth transitions, page load animations, and dynamic effects.
- **Dynamic Data Loading**: Implementing lazy loading for components to improve performance.
- **Redux State Management**: Uses Redux Toolkit to manage global states such as authentication, user profile, and payment methods.
- **Form Handling & Validation**: Uses React Hook Form with Yup for easy form handling and validation (e.g., user registration, profile update, password reset).
- **Notifications**: React-Toastify for success, error, and info notifications.

### **User Features:**
- **Sign Up & Login**: Users can register and log in to their accounts.
- **Password Reset**: Users can reset their password.
- **Profile Management**: Users can view and edit their profile, including email, password, and personal information.
- **Add Payment Methods**: Users can securely add payment methods (card/bank).
- **Select and Subscribe to Plans**: Users can choose from available funding plans and subscribe to make recurring donations.

### **Admin Features:**
- **Manage Plans**: Admins can manage funding plans (create, update, delete).
- **Track Donations**: Admins can view total funds raised and track donations in real time.


## **Installation & Setup**

### 1. **Clone the repository:**

```bash
git clone https://github.com/amitranjan75way/NGO/tree/main/frontend
```

### 2. **Install dependencies:**

Navigate to the frontend folder and install the dependencies:

```bash
cd hopefund-frontend
npm install --legacy-peer-deps
```

### 3. **Set up environment variables:**

Create a `.env` file in the root directory and set the following:

```env
VITE_API_URL=http://localhost:5173/api
```

This will be used to connect to your backend.

### 4. **Run the application:**

```bash
npm run dev
```

Visit the application in your browser at `http://localhost:5173`.

### 5. **Build for Production:**

```bash
npm run build
```

## **Key Libraries & Their Usage**

### 1. **React**: 
- **Purpose**: Build user interfaces with reusable components.
- **Use case**: Components like `PaymentCard`, `PlanCard`, `ProfileForm`, etc.

### 2. **React Router DOM**: 
- **Purpose**: Handle routing between pages.
- **Use case**: Managing navigation between pages like login, profile, etc.

### 3. **Redux Toolkit**: 
- **Purpose**: Manage global state.
- **Use case**: Store user data, payment methods, and subscription plans.

### 4. **Material UI**: 
- **Purpose**: Prebuilt UI components following Material Design guidelines.
- **Use case**: Buttons, modals, forms, and layouts.

### 5. **Framer Motion**: 
- **Purpose**: Add smooth animations and transitions.
- **Use case**: Animating page transitions, loading states, and interactive elements.

### 6. **React Hook Form & Yup**:
- **Purpose**: Handle forms and validation.
- **Use case**: Sign up, login, and payment form validation.

### 7. **React Toastify**: 
- **Purpose**: Display toast notifications for success or error feedback.
- **Use case**: Show notifications for actions like subscribing to a plan or adding payment methods.

### 8. **Vite**:
- **Purpose**: Fast development server and build tool.
- **Use case**: Provides fast hot module replacement (HMR) for smooth development experience.

### 9. **SASS**: 
- **Purpose**: Write cleaner and more maintainable CSS.
- **Use case**: Global styles, theming, and responsive layouts.

### 10. **@reduxjs/toolkit**: 
- **Purpose**: Simplify Redux state management.
- **Use case**: Handling auth and user state, fetching payment methods, managing subscriptions.

## **Key Features Implemented:**
- **Smooth UI Transitions**: Using `framer-motion` for animating page transitions and interactive elements.
- **Lazy Loading**: Implemented lazy loading for heavy components such as Plan details and Payment methods using React’s `Suspense` and `lazy` for faster initial load time.
- **Layouts**: Common layout components like `Navbar`, `Footer`, and `Sidebar` are created to ensure a consistent look and feel across the app.
- **Form Validation**: Using `React Hook Form` integrated with `Yup` for form validation in the user registration and profile editing process.
- **Payment Handling**: Users can securely add, view, and manage payment methods, along with subscribing to funding plans for donations.

## **Contributing**
We welcome contributions to improve the platform! If you have any bug fixes, new features, or improvements in mind, feel free to fork this repository, create a feature branch, and submit a pull request.

### How to contribute:
1. Fork the repository.
2. Clone your fork to your local machine.
3. Create a new branch for your changes.
4. Implement your changes and commit them with clear, descriptive messages.
5. Push your branch to your fork and submit a pull request.

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

You can update this README as necessary to fit your specific project or add more details about your components, features, and functionality.
