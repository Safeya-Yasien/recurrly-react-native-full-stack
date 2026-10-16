import { TIcon } from "@/constants/data";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AppIcon({
  icon,
  size = 28,
  color = "#081126",
}: {
  icon: TIcon;
  size?: number;
  color?: string;
}) {
  if (icon.library === "fa") {
    return <FontAwesome6 name={icon.name} size={size} color={color} brand />;
  }
  if (icon.library === "fontisto") {
    return <Fontisto name={icon.name} size={size} color={color} />;
  }
  return <Ionicons name={icon.name} size={size} color={color} />;
}
