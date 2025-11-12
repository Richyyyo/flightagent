{
  /* import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;
*/
}

// src/components/LoginButton.jsx

export default function LoginButton({ loading, onClick }) {
  return (
    <button
      type="submit"
      className="auth0-btn primary"
      disabled={loading}
      onClick={onClick}
    >
      {loading ? "Logging in..." : "Log In"}
    </button>
  );
}
