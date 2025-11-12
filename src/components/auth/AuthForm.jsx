// src/components/auth/AuthForm.jsx
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../LoginButton";
import SignupButton from "../SignupButton";
import GoogleButton from "./GoogleButton";

export default function AuthForm({
  mode,
  loading,
  setLoading,
  onGoogle,
  switchTo,
  onSuccess, // ← NEW: receives JWT
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // --- VALIDATE ---
    if (!email || !password) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    if (mode === "signup") {
      if (!firstName || !lastName) {
        setError("First and last name are required");
        setLoading(false);
        return;
      }
      if (password.length < 8) {
        setError("Password must be 8+ characters");
        setLoading(false);
        return;
      }
      if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
        setError("Password must have a letter and a number");
        setLoading(false);
        return;
      }
    }

    const payload = {
      action: mode,
      email: email.trim(),
      password,
      ...(mode === "signup" && {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      }),
    };

    console.log("Sending:", payload); // ← CHECK THIS!

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      onSuccess(data.id_token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="auth0-lock-form">
      {mode === "login" && (
        <>
          <div className="auth0-lock-input">
            <label>Email</label>
            <div className="auth0-lock-input-field">
              <span className="auth0-lock-input-icon">📧</span>
              <input
                type="email"
                placeholder="something@youremail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="auth0-lock-input">
            <label>Password</label>
            <div className="auth0-lock-input-field">
              <span className="auth0-lock-input-icon">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="auth0-lock-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          <button type="button" className="auth0-lock-forgot">
            Don't remember your password?
          </button>

          <LoginButton loading={loading} isInModal={true} />

          <div className="auth0-lock-or-divider">or</div>

          <GoogleButton
            loading={loading}
            onClick={onGoogle}
            label="Log in with Google"
          />

          <div className="auth0-lock-footer">
            Don't have an account?{" "}
            <button type="button" onClick={() => switchTo("signup")}>
              Sign Up
            </button>
          </div>
        </>
      )}

      {mode === "signup" && (
        <>
          {/* Similar inputs for signup with First Name */}
          <div className="auth0-lock-input">
            <label>First Name</label>
            <div className="auth0-lock-input-field">
              <span className="auth0-lock-input-icon">👤</span>
              <input
                type="text"
                placeholder="your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>
          <div className="auth0-lock-input">
            <label>Last Name</label>
            <div className="auth0-lock-input-field">
              <span className="auth0-lock-input-icon">👤</span>
              <input
                type="text"
                placeholder="your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>
          <div className="auth0-lock-input">
            <label>Email</label>
            <div className="auth0-lock-input-field">
              <span className="auth0-lock-input-icon">📧</span>
              <input
                type="email"
                placeholder="something@youremail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>
          <div className="auth0-lock-input">
            <label>Password</label>
            <div className="auth0-lock-input-field">
              <span className="auth0-lock-input-icon">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="auth0-lock-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>
          {/* Email and Password same as login */}
          <SignupButton loading={loading} isInModal={true} />
          <div className="auth0-lock-or-divider">or</div>
          <GoogleButton
            loading={loading}
            onClick={onGoogle}
            label="Sign up with Google"
          />

          <div className="auth0-lock-footer">
            Have an account?{" "}
            <button type="button" onClick={() => switchTo("login")}>
              Log In
            </button>
          </div>
        </>
      )}
    </form>
  );
}
