import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView className="f bg-background">
      <Text className="font-sans">Home</Text>
      <Text className="font-sans-bold">Home</Text>
      <Text className="font-sans-extrabold">Home</Text>
      <Text className="font-sans-medium">Home</Text>
      <Text className="font-sans-semibold">Home</Text>
    </SafeAreaView>
  );
}
