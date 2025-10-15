import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase"; // your config file

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Firebase UID:", user.uid); // ✅ This is the firebaseId for your post
    console.log("User info:", {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    });
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

signInWithGoogle();
