// src/components/LogoutButton.jsx
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.js";

const LogoutButton = () => {
  const handleLogout = () => {
    signOut(auth);
    alert("Logged out");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
