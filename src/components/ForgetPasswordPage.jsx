import React, { useState } from "react";
import axios from "axios";

function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{3}$/.test(email);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("يرجى إدخال البريد الإلكتروني.");
      return;
    }

    if (!validateEmail(email)) {
      setError("يرجى إدخال بريد إلكتروني صحيح.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("https://api.example.com/forgot-password", { email });
      setMessage("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.");
    } catch (err) {
      setError("فشل إرسال البريد. تأكد من صحة البريد الإلكتروني.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="ForgetPassword">
        <h3>Enter Your Email</h3>
        <div className="input-box">
          <span className="icon">
            <i className="fa-solid fa-envelope" />
          </span>
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label>Email</label>
        </div>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "جاري الإرسال..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default ForgetPasswordPage;
