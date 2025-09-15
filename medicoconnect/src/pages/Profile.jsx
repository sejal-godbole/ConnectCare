import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Pencil, Mail, User, UserCircle } from "lucide-react"; // icon library
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState({ name: "", username: "", email: "" });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {

    const user = auth.currentUser;

    if(!user){
        navigate("/login");
        return;
    }

    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData({ ...docSnap.data(), email: user.email });
        }
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        name: userData.name,
        username: userData.username,
      });
      setEditMode(false);
    }
  };

  const navigate = useNavigate()

  const handleLogout = async() => {
    try {
        await signOut(auth);
        alert("Logged out");
        navigate("/login")
    } catch (error) {
        console.log("Logout failed");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#e3f0fc] to-[#f3e8ff] px-4">
      <div className="bg-white/90 rounded-3xl shadow-2xl p-10 w-full max-w-md text-center border border-[#43cea2]/30 backdrop-blur-md">
        <img
          src="https://ui-avatars.com/api/?name=User&background=random"
          alt="Avatar"
          className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-[#43cea2]/30 shadow-lg"
        />
        {!editMode ? (
          <>
            <h2 className="text-3xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#43cea2] via-[#185a9d] to-[#faffd1] drop-shadow-lg">{userData.name || "Name not set"}</h2>
            {/* <h2 className="text-3xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#43cea2] via-[#185a9d] to-[#e3f0fc] drop-shadow-lg">{userData.name || "Name not set"}</h2> */}
            <p className="text-[#185a9d] mb-1 flex items-center justify-center gap-1 font-medium">
              <UserCircle size={16} />
              @{userData.username || "username"}
            </p>
            <p className="text-[#185a9d] mb-4 flex items-center justify-center gap-1 font-medium">
              <Mail size={16} />
              {userData.email}
            </p>
            <div className="flex flex-col items-center justify-center">
                <button
              onClick={() => setEditMode(true)}
              className="mt-2 px-6 py-2 bg-gradient-to-r from-[#43cea2] to-[#185a9d] text-white rounded-2xl font-bold shadow-md hover:from-[#185a9d] hover:to-[#43cea2] transition-all duration-200"
            >
              <Pencil size={16} className="inline-block mr-1" />
              Edit Profile
            </button>

            <button
                onClick={handleLogout}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-[#f06292] to-[#43cea2] text-white rounded-2xl font-bold shadow-md hover:from-[#43cea2] hover:to-[#f06292] transition-all duration-200"
            >
                Logout
            </button>
            </div>

          </>
        ) : (
          <>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={userData.name}
              onChange={handleChange}
              className="w-full mb-3 p-3 border-2 border-[#e0f7fa] rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-[#43cea2] bg-[#e3f0fc] text-[#185a9d] shadow-sm"
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={userData.username}
              onChange={handleChange}
              className="w-full mb-3 p-3 border-2 border-[#e0f7fa] rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-[#43cea2] bg-[#e3f0fc] text-[#185a9d] shadow-sm"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              disabled
              className="w-full mb-3 p-3 border-2 border-[#e0f7fa] rounded-2xl bg-gray-100 cursor-not-allowed text-lg text-[#185a9d] shadow-sm"
            />
            <button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-[#43cea2] to-[#185a9d] text-white py-2 rounded-2xl font-bold shadow-md hover:from-[#185a9d] hover:to-[#43cea2] transition-all duration-200 mb-2"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="w-full bg-gradient-to-r from-[#f06292] to-[#43cea2] text-white py-2 rounded-2xl font-bold shadow-md hover:from-[#43cea2] hover:to-[#f06292] transition-all duration-200"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
