import { ArrowRight, X } from "lucide-react";
import { useState } from "react";
import sharepalLogo from "../../assets/sharepal-navigation-logo.png";

export function SharepalLoginModal({ open, onClose }) {
  const [phoneNumber, setPhoneNumber] = useState("");

  if (!open) return null;

  return (
    <div className="sharepal-login-overlay" onMouseDown={onClose}>
      <section
        className="sharepal-login-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-dialog-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="sharepal-login-close"
          aria-label="Close login"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <img className="sharepal-login-logo" src={sharepalLogo} alt="SharePal" />
        <h2 id="login-dialog-title">Login/Signup to Your Account</h2>
        <p className="sharepal-login-subtitle">
          Enter your WhatsApp number to continue
        </p>
        <label className="sharepal-login-phone">
          <select aria-label="Country code" defaultValue="+91">
            <option value="+91">+91</option>
          </select>
          <input
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="Enter your number"
            value={phoneNumber}
            onChange={(event) =>
              setPhoneNumber(event.target.value.replace(/\D/g, ""))
            }
            aria-label="WhatsApp number"
          />
        </label>
        <div className="sharepal-login-coupon">
          <span aria-hidden="true">🎉</span>
          <p>
            <strong>Use code SHAREPAL & get 10%</strong> on orders above ₹1500.
            Maximum discount: ₹300
            <br />
            Use Coupon - SHAREPAL
          </p>
        </div>
        <button
          type="button"
          className="sharepal-login-otp"
          disabled={phoneNumber.length !== 10}
        >
          Get OTP <ArrowRight size={20} />
        </button>
        <p className="sharepal-login-terms">
          By continuing, you agree to the{" "}
          <a href="#terms">Terms of Service</a> and acknowledge the{" "}
          <a href="#privacy">Privacy Policy</a>.
        </p>
      </section>
    </div>
  );
}
