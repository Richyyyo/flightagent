import { useSearchParams } from "react-router-dom";
import AuthPage from "./AuthPage";

export default function AuthRoute() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "login";

  return <AuthPage initialMode={mode} />;
}
