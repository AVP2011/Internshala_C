import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { auth, provider } from "../firebase/firebase";
import { Search } from "lucide-react";
import { signInWithPopup, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, selectUser } from "../Feature/userSlice";
import LanguageSwitcher from "@/Components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import axios from "axios";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Login with Google
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
const userData = {
  uid: result.user?.uid ?? null,
  email: result.user?.email ?? null,
  name: result.user?.displayName ?? null,
  photo: result.user?.photoURL ?? null,
  phoneNumber: result.user?.phoneNumber ?? null,
};
      // dispatch(login(userData));
      toast.success(t("loginSuccess"));

      // 🔐 Trigger OTP if language is French
      if (i18n.language === "fr" && userData.email) {
        try {
          await axios.post("/api/verify-language", {
            language: "fr",
            email: userData.email,
          });
        } catch (err) {
          console.error("OTP trigger failed:", err);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(t("loginFailed"));
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      setIsProfileDropdown(false);
      toast.info(t("logoutSuccess"));
    } catch (error) {
      console.error(error);
      toast.error(t("logoutFailed"));
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
            <span className="text-xl font-bold text-[#008bdc]"></span>
          </Link>

          {/* Navigation & Search */}
          <div className="flex items-center gap-6">
           <Link href="/internship" className="text-gray-700 hover:text-[#008bdc] font-medium">
  {t("navbar.internships")}
</Link>
 
             
            <Link
              href="/job"
              className="text-gray-700 hover:text-[#008bdc] font-medium"
            >
              {t("navbar.jobs")}
            </Link>

            <div className="relative flex items-center">
              <Search className="absolute left-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                className="pl-9 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#008bdc] text-sm w-56"
              />
            </div>
          </div>

          {/* Auth/Profile */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center gap-2 focus:outline-none"
                  onClick={() => setIsProfileDropdown((prev) => !prev)}
                >
                  <img
                    src={user.photo || "/default-profile.png"}
                    alt="Profile"
                    className="w-9 h-9 rounded-full border cursor-pointer"
                  />
                </button>

                {isProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <Link
                      href="/userapplication"
                      className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
                    >
                      {t("viewApplications")}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      {t("logout")}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLogin}
                  className="bg-[#008bdc] text-white px-4 py-2 rounded-md font-medium hover:bg-[#006fa8]"
                >
                  {t("loginWithGoogle")}
                </button>
                <Link
                  href="/adminlogin"
                  className="text-red-500 font-bold hover:underline"
                >
                  ADMIN
                </Link>
                <LanguageSwitcher />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
