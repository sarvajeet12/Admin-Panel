import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/home/Home.jsx";
import About from "./components/about/About.jsx";
import Contact from "./components/contact/Contact.jsx";
import Service from "./components/service/Service.jsx";
import SignUp from "./components/signup/SignUp.jsx";
import Login from "./components/login/Login.jsx";
import Error from "./components/error/Error.jsx";
import { AuthProvider } from "./store/Auth.jsx";
import Logout from "./components/logout/Logout.jsx";

// Tost
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Admin Layout
import AdminLayout from "./components/layouts/AdminLayout.jsx";
import AdminUser from "./components/layouts/adminUser/AdminUser.jsx";
import AdminContact from "./components/layouts/adminContact/AdminContact.jsx";
import AdminUpdate from "./components/layouts/adminUpdate/AdminUpdate.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/service", element: <Service /> },
      { path: "/register", element: <SignUp /> },
      { path: "/login", element: <Login /> },
      { path: "/logout", element: <Logout /> },
      { path: "*", element: <Error /> },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { path: "users", element: <AdminUser /> },
          { path: "contacts", element: <AdminContact /> },
          { path: "users/:id/edit", element: <AdminUpdate /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClickrtl={true}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="colored"
        bodyClassName="toastBody"
      />
    </React.StrictMode>
  </AuthProvider>
);
