import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // لحفظ حالة إظهار/إخفاء كلمة المرور

  const navigate = useNavigate();

  // ✅ تحقق من صحة البريد
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email);

  // ✅ تحقق من كلمة المرور
  const isValidPassword = (password) => password.length >= 6;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ التحقق من صحة البيانات قبل الإرسال
    if (!isValidEmail(formData.email)) {
      setError("البريد الإلكتروني غير صالح. يجب أن يكون بتنسيق example@domain.com");
      return;
    }

    if (!isValidPassword(formData.password)) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("https://sunny-macaque-arguably.ngrok-free.app/api/login", formData);

           console.log("Login response:", response);  // <-- أضيفي ده

      localStorage.setItem("token", response.data.data.token);

      // تخزين حالة الدخول والبريد الإلكتروني
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("email", formData.email); // تخزين البريد الإلكتروني

      // التوجيه بعد النجاح
      navigate("/");
    } catch (err) {
      if (!err.response) {
        setError("حدث خطأ في الاتصال. حاول مرة أخرى.");
      } else {
        setError(err.response?.data?.message || "فشل تسجيل الدخول. تأكد من البريد وكلمة المرور.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-box login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <span className="icon">
              <i className="fa-solid fa-envelope" />
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label>Email</label>
          </div>
          <div className="input-box">
            <span className="icon">
              <i className="fa-solid fa-lock" />
            </span>
            <input
              type={passwordVisible ? "text" : "password"} // التبديل بين النص وكلمة المرور
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label>Password</label>
            <span
              className="eye-icon"
              onClick={() => setPasswordVisible(!passwordVisible)} // عند النقر يتم التبديل
            >
              <i className={`fa-solid ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`} />
            </span>
          </div>
          <div className="remember-forget">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/ForgetPasswordPage">Forget Password?</Link>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "جاري التحميل..." : "Login"}
          </button>
          <div className="login-register">
            <p>
              Don&apos;t have an account?{" "}
              <Link to="/RegistrationPage" className="register-link">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
