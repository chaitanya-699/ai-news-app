export function getGoogleClientIds() {
  return {
    android: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID!,
    web: process.env.EXPO_PUBLIC_WEB_CLIENT_ID!,
  };
}
