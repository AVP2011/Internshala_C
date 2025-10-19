import { useTranslation } from "react-i18next";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "@/Feature/userSlice"; // ✅ Use correct path

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const user = useSelector(selectUser);

  const changeLanguage = async (lng: string) => {
    i18n.changeLanguage(lng);

    if (lng === "fr" && user?.email) {
      try {
        await axios.post("/api/verify-language", {
          language: "fr",
          email: user.email,
        });
      } catch (err) {
        console.error("OTP trigger failed:", err);
      }
    }
  };

  return (
    <select
      onChange={(e) => changeLanguage(e.target.value)}
      className="p-2 rounded bg-white text-black"
    >
      <option value="en">English</option>
      <option value="hi">Hindi</option>
      <option value="es">Spanish</option>
      <option value="fr">French</option>
      <option value="pt">Portuguese</option>
      <option value="zh">Chinese</option>
    </select>
  );
};

export default LanguageSwitcher;
