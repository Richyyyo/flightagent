import { useAuth0 } from "@auth0/auth0-react";

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
