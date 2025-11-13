import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import AuthForm from "./AuthForm";
import { BsFillAirplaneEnginesFill } from "react-icons/bs";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "login";
  const [loading, setLoading] = useState(false);
  const { loginWithRedirect, handleRedirectCallback, isAuthenticated } =
    useAuth0();
  const navigate = useNavigate();

  const handleGoogle = () => {
    loginWithRedirect({
      authorizationParams: { connection: "google-oauth2" },
    });
  };

  const handleSubmit = async (formData) => {
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: mode,
          email: formData.email,
          password: formData.password,
          ...(mode === "signup" && {
            firstName: formData.firstName,
            lastName: formData.lastName,
          }),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // 1. Build fake callback URL
      const state = encodeURIComponent(
        JSON.stringify({ appState: { target: "/" } })
      );
      const fakeCallbackUrl = `${window.location.origin}/?id_token=${data.id_token}&access_token=&expires_in=86400&token_type=Bearer&state=${state}`;

      // 2. Call handleRedirectCallback() ← THIS SAVES THE TOKEN
      await handleRedirectCallback(fakeCallbackUrl);

      alert(mode === "signup" ? "Account created!" : "Signed in!");
      navigate("/");
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const switchTo = (newMode) => {
    navigate(`/auth?mode=${newMode}`, { replace: true });
  };

  const close = () => {
    navigate("/");
  };

  if (isAuthenticated) {
    navigate("/");
    return null;
  }
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
              ❌
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
              onSubmit={handleSubmit}
              switchTo={switchTo}
              isInModal={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
