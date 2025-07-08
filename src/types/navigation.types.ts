import { NavigatorScreenParams } from "@react-navigation/native";

// types/navigation.ts
export type AuthStackParamList = {
  AuthScreen: undefined;
  RegistrationScreen:undefined; 
};

// export type MainStackParamList = {
//   Home: undefined;
//   Profile: { userId: string };
//   Settings: undefined;
// };

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
//   MainStack: NavigatorScreenParams<MainStackParamList>;
//   Splash: undefined;
};