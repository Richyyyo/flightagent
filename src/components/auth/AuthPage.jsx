// src/components/auth/AuthPage.jsx
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import AuthForm from "./AuthForm";
import { BsFillAirplaneEnginesFill } from "react-icons/bs";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "login";
  const [loading, setLoading] = useState(false);

  const {
    loginWithRedirect, // for Google
    getAccessTokenSilently,
    isAuthenticated,
    isLoading: auth0Loading,
  } = useAuth0();

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth0Loading && isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, auth0Loading, navigate]);

  if (auth0Loading)
    return <div className="auth0-lock-overlay">Initializing…</div>;

  // Google (needs redirect)
  const handleGoogle = () => {
    loginWithRedirect({
      authorizationParams: { connection: "google-oauth2" },
    });
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      // 1. SIGNUP
      if (mode === "signup") {
        const res = await fetch("/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "signup",
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
      }

      // 2. LOGIN
      const loginRes = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "login",
          email: formData.email,
          password: formData.password,
        }),
      });

      const loginData = await loginRes.json();
      if (!loginRes.ok) throw new Error(loginData.error);

      // 3. STORE TOKEN CORRECTLY
      const domain = import.meta.env.VITE_AUTH0_DOMAIN;
      const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
      const key = `@@auth0spajs@@::${clientId}::@@auth0spajs@@::${domain}::openid profile email`;

      localStorage.setItem(
        key,
        JSON.stringify({
          body: {
            credentials: {
              id_token: loginData.id_token,
              access_token: loginData.id_token,
              token_type: "Bearer",
              expires_in: 86400,
            },
            client_id: clientId,
            scope: "openid profile email",
            audience: "",
            decodedToken: {
              user: {
                email: formData.email,
                name: `${formData.firstName || ""} ${
                  formData.lastName || ""
                }`.trim(),
                picture: null,
              },
            },
          },
          expiresAt: Date.now() + 86400 * 1000,
        })
      );

      // 4. FULL RELOAD TO APPLY SESSION
      window.location.href = "/";
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const switchTo = (newMode) =>
    navigate(`/auth?mode=${newMode}`, { replace: true });
  const close = () => navigate("/");

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
