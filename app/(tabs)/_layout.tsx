import AppIcon from "@/components/AppIcon";
import { tabs } from "@/constants/data";
import "@/global.css";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelVisibilityMode: "unlabeled",

        tabBarStyle: {
          position: "absolute",
          bottom: Math.max(insets.bottom, 25),
          height: 72,
          elevation: 0,
          //  borderTopWidth: 0,
          marginHorizontal: 20,
        },
        tabBarBackground: () => (
          <View className="flex-1 bg-primary rounded-full "></View>
        ),
        tabBarItemStyle: {
          paddingVertical: 8,
          alignItems: "center",
        },
        tabBarIconStyle: {
          width: 48,
          height: 48,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => (
              <View className={`tabs-pill ${focused ? "tabs-active" : ""}  `}>
                <AppIcon icon={tab.icon} color="#fff8e7" size={32} />
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
