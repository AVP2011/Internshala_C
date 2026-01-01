import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { store } from "../store/store";
import { Provider, useDispatch } from "react-redux";
import { useEffect } from "react";
import { auth } from "@/firebase/firebase";
import { login, logout } from "../Feature/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "../i18n/i18n"; // ✅ already initialized with SSR-safe config

// ✅ Auth listener as a component
function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            name: authUser.displayName ?? undefined,
            email: authUser.email,
            phone: authUser.phoneNumber,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
}

// ✅ Wrapper to delay rendering until i18n is ready
function AppContent({ Component, pageProps }: AppProps) {
  const { ready } = useTranslation();

  if (!ready) return null; // Prevent hydration mismatch

  return (
    <div className="bg-gray-500 min-h-screen flex flex-col">
      <ToastContainer />
      <Navbar />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

export default function App(props: AppProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <AuthListener />
        <AppContent {...props} />
      </Provider>
    </I18nextProvider>
  );
}
