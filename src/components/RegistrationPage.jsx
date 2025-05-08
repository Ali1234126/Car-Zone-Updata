import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegistrationPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();  // لاستخدام التوجيه

  // ✅ التحقق من اسم المستخدم (3 أحرف على الأقل)
  const isValidUsername = (username) => username.length >= 3;

  // ✅ التحقق من صحة البريد الإلكتروني
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email);

  // ✅ التحقق من كلمة المرور (6 أحرف على الأقل)
  const isValidPassword = (password) => password.length >= 6;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // ✅ التحقق من صحة البيانات قبل الإرسال
    if (!isValidUsername(formData.username)) {
      setError("اسم المستخدم يجب أن يكون 3 أحرف على الأقل.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("البريد الإلكتروني غير صالح. استخدم تنسيق example@domain.com");
      return;
    }

    if (!isValidPassword(formData.password)) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل.");
      return;
    }

    setLoading(true);

    // محاكاة عملية التسجيل
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');  // تخزين حالة التسجيل
      localStorage.setItem('username', formData.username);  // تخزين اسم المستخدم
      setSuccess("تم التسجيل بنجاح! يمكنك الآن تسجيل الدخول.");
      navigate('/');  // التوجيه إلى صفحة الهوم بعد التسجيل
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="containerR">
      <div className="form-box register">
        <h2>Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <span className="icon">
              <i className="fa-solid fa-user" />
            </span>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label>Username</label>
          </div>
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
              type="password"
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
              <input type="checkbox" required /> I agree to the terms & conditions
            </label>
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "جاري التسجيل..." : "Register"}
          </button>
          <div className="login-register">
            <p>
              Already have an account?{" "}
              <Link to="/LoginPage" className="login-link">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
