import { NavigatorScreenParams } from "@react-navigation/native";
// types/navigation.ts


export type AuthStackParamList = {
  StartScreen:undefined;
  AuthScreen: undefined;
  RegistrationScreen:undefined; 
  LoadScreen:undefined;
};
export type HomeStackParamList={
  HomeScreen:undefined;
  AddGoalScreen:undefined;
}
export type SettingsStackParamList={
  SettingsScreen:undefined,
}
export type BudgetStackParamList={
  BudgetScreen:undefined,
  AddBudgetPlan:undefined,
}
export type CurrencyStackParamList={
  CurrencyScreen:undefined;
}

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Home:NavigatorScreenParams<HomeStackParamList>;
  Settings:NavigatorScreenParams<SettingsStackParamList>;
  Budget:NavigatorScreenParams<BudgetStackParamList>;
  Currency:NavigatorScreenParams<CurrencyStackParamList>;
};