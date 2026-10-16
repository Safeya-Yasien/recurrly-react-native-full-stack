import { Subscription } from "@/constants/data";
import React from "react";
import { Pressable, Text, View } from "react-native";
import AppIcon from "./AppIcon";

const SubscriptionCard = ({
  name,
  price,
  currency,
  icon,
  billing,
  color,
  category,
  plan,
  renewalDate,
  paymentMethod,
  startDate,
  status,
}: Subscription) => {
  return (
    <Pressable className="">
      <View className="sub-head">
        <View className="sub-main">
          <AppIcon icon={icon} />
          <View className="sub-copy">
            <Text numberOfLines={1} className="sub-title">
              {name}
            </Text>
            <Text numberOfLines={1} ellipsizeMode="tail" className="sub-meta">
              {category?.trim() || plan?.trim()}
            </Text>
          </View>
        </View>

        <View className="sub-price-box">
          <Text className="sub-price">
            {price} {currency}
          </Text>
          <Text className="sub-billing">{billing}</Text>
        </View>
      </View>
    </Pressable>
  );
};
export default SubscriptionCard;
