{
  /* import { useAuth0 } from "@auth0/auth0-react";

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();
  const handleSignup = () => {
    loginWithRedirect({
      initialScreen: "signup",
      prompt: "login",
    });
  };
  return <button onClick={handleSignup}>Create Account</button>;
};

export default SignupButton;
*/
}

// src/components/SignupButton.jsx

export default function SignupButton({ loading, onClick }) {
  return (
    <button
      type="submit"
      className="auth0-btn primary"
      disabled={loading}
      onClick={onClick}
    >
      {loading ? "Creating..." : "Sign Up"}
    </button>
  );
}
