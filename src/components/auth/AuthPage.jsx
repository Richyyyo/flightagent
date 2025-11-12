// src/components/auth/AuthPage.jsx
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import AuthForm from "./AuthForm";
import { BsFillAirplaneEnginesFill } from "react-icons/bs";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "login";
  const [loading, setLoading] = useState(false);
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const handleGoogle = () => {
    loginWithRedirect({
      authorizationParams: { connection: "google-oauth2" },
    });
  };

  const handleSuccess = (id_token) => {
    localStorage.setItem("auth0.id_token", id_token);
    window.location.reload(); // Auth0 SDK will detect token
  };

  const switchTo = (newMode) => {
    navigate(`/auth?mode=${newMode}`, { replace: true });
  };

  return (
    <div className="auth0-lock-overlay">
      <div className="auth0-lock-container">
        <div className="auth0-lock-widget">
          <div className="auth0-lock-header">
            <div className="auth0-lock-header-logo">
              <BsFillAirplaneEnginesFill className="airplane" />
              <h2>Flight Agent</h2>
            </div>
            <button className="auth0-lock-close" onClick={close}>
              ×
            </button>
          </div>

          <div className="auth0-lock-tabs">
            <button
              className={mode === "login" ? "active" : ""}
              onClick={() => switchTo("login")}
            >
              Log In
            </button>
            <button
              className={mode === "signup" ? "active" : ""}
              onClick={() => switchTo("signup")}
            >
              Sign Up
            </button>
          </div>

          <div className="auth0-lock-content">
            <AuthForm
              mode={mode}
              loading={loading}
              setLoading={setLoading}
              onGoogle={handleGoogle}
              switchTo={switchTo}
              isInModal={false}
              onSuccess={handleSuccess}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
