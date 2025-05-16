import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // استيراد useNavigate
function ResetPasswordPage() {
  const navigate = useNavigate();  // تهيئة useNavigate

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email || !otp || !password || !passwordConfirmation) {
      setError("يرجى ملء جميع الحقول.");
      return;
    }

    if (!validateEmail(email)) {
      setError("يرجى إدخال بريد إلكتروني صحيح.");
      return;
    }

    if (password !== passwordConfirmation) {
      setError("كلمة المرور وتأكيدها غير متطابقين.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://sunny-macaque-arguably.ngrok-free.app/api/reset-password",
        {
          email,
          otp,
          password,
          password_confirmation: passwordConfirmation,
        }
      );
      setMessage("تم إعادة تعيين كلمة المرور بنجاح.");
      setEmail("");
      setOtp("");
      setPassword("");
      setPasswordConfirmation("");

      // بعد ثانيتين (2000 مللي ثانية) نوجه المستخدم لصفحة تسجيل الدخول
      setTimeout(() => {
        navigate("/LoginPage");
      }, 2000);

    } catch (err) {
      if (err.response && err.response.data) {
        console.log("Error response data:", err.response.data);
        setError(`فشل إعادة تعيين كلمة المرور: ${JSON.stringify(err.response.data)}`);
      } else {
        setError("فشل إعادة تعيين كلمة المرور. تحقق من البيانات المدخلة.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-page">
    <div className="reset-password-container">
      <form onSubmit={handleSubmit} className="ResetPassword">
        <h3>Reset Password</h3>

        <div className="input-box">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            required
          />
          <label>Email</label>
        </div>

        <div className="input-box">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder=" "
            required
          />
          <label>OTP Code</label>
        </div>

        <div className="input-box">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
            required
          />
          <label>New Password</label>
        </div>

        <div className="input-box">
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder=" "
            required
          />
          <label>Confirm New Password</label>
        </div>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "جاري الإرسال..." : "Reset Password"}
        </button>
      </form>
    </div>
    </div>
  );
}

export default ResetPasswordPage;
