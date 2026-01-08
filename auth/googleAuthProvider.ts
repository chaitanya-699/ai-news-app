// import { useAuth } from "@/auth/useAuth";
// import { baseUrl } from "@/constants/requests";
// import {
//   GoogleSignin,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";
// import axios from "axios";
// import { useEffect, useState } from "react";
// export function useGoogleAuth() {
//   const { login } = useAuth();
//   const [googleLoading, setGoogleLoading] = useState(false);

//   // ✅ Configure ONCE
//   useEffect(() => {
//     console.log("Web Client ID:", process.env.EXPO_PUBLIC_WEB_CLIENT_ID);

//     GoogleSignin.configure({
//       webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
//       offlineAccess: true,
//       forceCodeForRefreshToken: true,
//     });
//   }, []);

//   const handleGoogleSignUp = async () => {
//     try {
//       setGoogleLoading(true);

//       // ✅ Ensure Play Services
//       await GoogleSignin.hasPlayServices({
//         showPlayServicesUpdateDialog: true,
//       });

//       // ✅ Sign in
//       const userInfo: any = await GoogleSignin.signIn();

//       console.log("Google User Info:", userInfo);
//       // 🔑 Extract ID TOKEN
//       const idToken = userInfo.data.idToken;

//       if (!idToken) {
//         throw new Error("Google ID token not found");
//       }

//       console.log("requesting backend auth with ID token:", idToken);
//       // 🔐 Send ID token to backend
//       const res = await axios.post(`${baseUrl}/auth/google`, {
//         idToken,
//       });
//       login({
//         token: res.data.token,
//         user: res.data.data,
//       });
//       setGoogleLoading(false);
//       console.log("Backend Google Auth Response:", res.data);
//     } catch (error: any) {
//       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//         console.log("User cancelled Google Sign-In");
//       } else if (error.code === statusCodes.IN_PROGRESS) {
//         console.log("Google Sign-In already in progress");
//       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//         console.log("Play Services not available");
//       } else {
//         console.error("Google Sign-In error:", error);
//       }
//     }
//   };

//   return {
//     handleGoogleSignUp,
//     googleLoading,
//   };
// }
