import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx';
import Store from './Pages/Store.jsx';
import Location from './Pages/Location.jsx';
import Events from './Pages/Events.jsx';
import LoginPage from './components/LoginPage.jsx';
import RegistrationPage from './components/RegistrationPage.jsx';
import ForgetPasswordPage from './components/ForgetPasswordPage.jsx';
import Home from './Pages/Home.jsx';
import Cart from './Pages/Cart.jsx'; // استيراد صفحة السلة

// استدعاء ملفات CSS
import './index.css';
import './CSS/style.css';
import './CSS/Responsive.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/store",
    element: <Store />,
  },
  {
    path: "/location",
    element: <Location />,
  },
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "/LoginPage",
    element: <LoginPage />,
  },
  {
    path: "/RegistrationPage",
    element: <RegistrationPage />,
  },
  {
    path: "/ForgetPasswordPage",
    element: <ForgetPasswordPage />,
  },
  {
    path: "/cart",
    element: <Cart />, // إضافة مسار صفحة السلة
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
