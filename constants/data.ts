import Ionicons from "@expo/vector-icons/Ionicons";
import { ComponentProps } from "react";

type TIconName = ComponentProps<typeof Ionicons>["name"];

export type TTab = {
  name: string;
  title: string;
  icon: TIconName;
};

export const tabs: TTab[] = [
  { name: "index", title: "Home", icon: "home-outline" },
  { name: "subscriptions", title: "Subscriptions", icon: "people-outline" },
  { name: "insights", title: "Insights", icon: "analytics-outline" },
  { name: "settings", title: "Settings", icon: "settings-outline" },
];
