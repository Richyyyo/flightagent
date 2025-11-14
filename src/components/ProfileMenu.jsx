import { useAuth0 } from "@auth0/auth0-react";
import { CgProfile } from "react-icons/cg";
import LogoutButton from "./LogoutButton";

export default function ProfileMenu() {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated || !user) return null;

  return (
    <div className="user-menu">
      <div className="user-profile">
        <CgProfile className="profile-icon" />
        <p className="profile-text">{user?.name || user?.email}</p>
      </div>
      <LogoutButton />
    </div>
  );
}
