import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";

import { ComponentProps } from "react";

type TIonName = ComponentProps<typeof Ionicons>["name"];
type TFontAwesomeIconName = ComponentProps<typeof FontAwesome6>["name"];
type TFontistoName = ComponentProps<typeof Fontisto>["name"];

export type TIcon =
  | { library: "ion"; name: TIonName }
  | { library: "fa"; name: TFontAwesomeIconName }
  | { library: "fontisto"; name: TFontistoName };

export type TTab = {
  name: string;
  title: string;
  icon: TIcon;
};

export const tabs: TTab[] = [
  {
    name: "index",
    title: "Home",
    icon: { library: "ion", name: "home-outline" },
  },
  {
    name: "subscriptions",
    title: "Subscriptions",
    icon: { library: "ion", name: "people-outline" },
  },
  {
    name: "insights",
    title: "Insights",
    icon: { library: "ion", name: "analytics-outline" },
  },
  {
    name: "settings",
    title: "Settings",
    icon: { library: "ion", name: "settings-outline" },
  },
];

export const HOME_USER = {
  name: "Adrian | JS Mastery",
};

export const HOME_BALANCE = {
  amount: 2489.48,
  nextRenewalDate: "2026-03-18T09:00:00.000Z",
};

export interface UpcomingSubscription {
  id: string;
  icon: TIcon;
  name: string;
  price: number;
  currency: string;
  daysLeft: number;
}

export const UPCOMING_SUBSCRIPTIONS: UpcomingSubscription[] = [
  {
    id: "spotify",
    icon: { library: "fa", name: "spotify" },
    name: "Spotify",
    price: 5.99,
    currency: "USD",
    daysLeft: 2,
  },
  {
    id: "notion",
    icon: { library: "ion", name: "document-text-outline" },
    name: "Notion",
    price: 12.0,
    currency: "USD",
    daysLeft: 4,
  },
  {
    id: "figma",
    icon: { library: "ion", name: "logo-figma" },
    name: "Figma",
    price: 15.0,
    currency: "USD",
    daysLeft: 6,
  },
];

export interface Subscription {
  id: string;
  icon: TIcon;
  name: string;
  plan: string;
  category: string;
  paymentMethod: string;
  status: "active" | "paused" | "cancelled";
  startDate: string;
  price: number;
  currency: string;
  billing: "Monthly" | "Yearly";
  renewalDate: string;
  color: string;
}

export const HOME_SUBSCRIPTIONS: Subscription[] = [
  {
    id: "adobe-creative-cloud",
    icon: { library: "fontisto", name: "adobe" },
    name: "Adobe Creative Cloud",
    plan: "Teams Plan",
    category: "Design",
    paymentMethod: "Visa ending in 8530",
    status: "active",
    startDate: "2025-03-20T10:00:00.000Z",
    price: 77.49,
    currency: "USD",
    billing: "Monthly",
    renewalDate: "2026-03-20T10:00:00.000Z",
    color: "#f5c542",
  },
  {
    id: "github-pro",
    icon: { library: "fa", name: "github" },
    name: "GitHub Pro",
    plan: "Developer",
    category: "Developer Tools",
    paymentMethod: "Mastercard ending in 2408",
    status: "active",
    startDate: "2024-11-24T10:00:00.000Z",
    price: 9.99,
    currency: "USD",
    billing: "Monthly",
    renewalDate: "2026-03-24T10:00:00.000Z",
    color: "#e8def8",
  },
  {
    id: "claude-pro",
    icon: { library: "ion", name: "sparkles-outline" },
    name: "Claude Pro",
    plan: "Pro Plan",
    category: "AI Tools",
    paymentMethod: "Amex ending in 1010",
    status: "paused",
    startDate: "2025-06-27T10:00:00.000Z",
    price: 20.0,
    currency: "USD",
    billing: "Monthly",
    renewalDate: "2026-03-27T10:00:00.000Z",
    color: "#b8d4e3",
  },
  {
    id: "canva-pro",
    icon: { library: "ion", name: "color-palette-outline" },
    name: "Canva Pro",
    plan: "Yearly Access",
    category: "Design",
    paymentMethod: "Visa ending in 7784",
    status: "cancelled",
    startDate: "2024-04-02T10:00:00.000Z",
    price: 119.99,
    currency: "USD",
    billing: "Yearly",
    renewalDate: "2026-04-02T10:00:00.000Z",
    color: "#b8e8d0",
  },
];
