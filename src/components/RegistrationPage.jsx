import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/main.css"
function RegistrationPage() {
  const [formData, setFormData] = useState({
    fname: "", // First name
    lname: "", // Last name
    email: "",
    password: "",
    phone_no: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const isValidUsername = (name) => name.length >= 3;
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email);
  const isValidPassword = (password) => password.length >= 6;
  const isValidPhone = (phone) => /^[0-9]{11}$/.test(phone); // تأكد من أن رقم الهاتف مكون من 10 أرقام

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setError("");
    setSuccess("");

    if (!isValidUsername(formData.fname)) {
      setError("اسم المستخدم يجب أن يكون 3 أحرف على الأقل.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("البريد الإلكتروني غير صالح.");
      return;
    }

    if (!isValidPassword(formData.password)) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل.");
      return;
    }

    if (!formData.phone_no) {
      setError("رقم الهاتف مطلوب.");
      return;
    }

    if (!isValidPhone(formData.phone_no)) {
      setError("رقم الهاتف يجب أن يكون مكون من 11 أرقام.");
      return;
    }

    setLoading(true);

    try {
     const response = await axios.post(
        "https://sunny-macaque-arguably.ngrok-free.app/api/register",
        {
          fname: formData.fname,
          lname: formData.lname,
          email: formData.email,
          password: formData.password,
          phone_no: formData.phone_no,
          address: formData.address,
        },
        // {
        //   headers: {
        //     'Content-Type': 'application/json', // أخبر السيرفر بأن البيانات بصيغة JSON
        //     'Accept': 'application/json',        // أخبر السيرفر بأنك تتوقع استلام JSON
        //   },
        // }
      );
      
      localStorage.setItem("email", formData.email); // تخزين البريد الإلكتروني
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", formData.fname);


      setSuccess("تم التسجيل بنجاح!");
      navigate('/');
    } catch (err) {
  if (!err.response) {
    setError("حدث خطأ في الاتصال.");
  } else {
    console.log("Registration error response:", err.response.data); // أطبع التفاصيل
    // لو موجود errors من Laravel
    const errorData = err.response.data;
    if (errorData.errors) {
      const firstError = Object.values(errorData.errors)[0][0]; // أول رسالة خطأ
      setError(firstError);
    } else {
      setError(errorData.message || "فشل التسجيل.");
    }
  }
}
 finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-page">
    <div className="containerR">
      <div className="form-box register">
        <h2>Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <span className="icon"><i className="fa-solid fa-user" /></span>
            <input type="text" name="fname" value={formData.fname} onChange={handleChange} required placeholder=" " />
            <label>First Name</label>
          </div>

          <div className="input-box">
            <span className="icon"><i className="fa-solid fa-user" /></span>
            <input type="text" name="lname" value={formData.lname} onChange={handleChange} required placeholder=" " />
            <label>Last Name</label>
          </div>

          <div className="input-box">
            <span className="icon"><i className="fa-solid fa-envelope" /></span>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder=" " />
            <label>Email</label>
          </div>

          <div className="input-box">
            <span className="icon"><i className="fa-solid fa-phone" /></span>
            <input type="text" name="phone_no" value={formData.phone_no} onChange={handleChange}  placeholder=" " />
            <label>Phone Number</label>
          </div>

          <div className="input-box">
            <span className="icon"><i className="fa-solid fa-location-dot" /></span>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required placeholder=" " />
            <label>Address</label>
          </div>

          <div className="input-box">
            <span className="icon"><i className="fa-solid fa-lock" /></span>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label>Password</label>
            <span className="eye-icon" onClick={() => setPasswordVisible(!passwordVisible)}>
              <i className={`fa-solid ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`} />
            </span>
          </div>

          <div className="remember-forget">
            <label><input type="checkbox" required /> I agree to the terms & conditions</label>
          </div>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "جاري التسجيل..." : "Register"}
          </button>

          <div className="login-register">
            <p>
              Already have an account? <Link to="/LoginPage" className="login-link">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default RegistrationPage;
