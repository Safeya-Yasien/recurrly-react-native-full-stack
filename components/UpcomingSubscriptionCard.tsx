import { UpcomingSubscription } from "@/constants/data";
import React from "react";
import { Text, View } from "react-native";
import AppIcon from "./AppIcon";
import { formatPrice } from "@/utils/formatPrice";

const UpcomingSubscriptionCard = ({
  icon,
  name,
  price,
  currency,
  daysLeft,
}: UpcomingSubscription) => {
  return (
    <View className="upcoming-card">
      <View className="upcoming-row">
        <AppIcon icon={icon} size={40} />

        <View>
          <Text className="upcoming-price">{formatPrice(price, currency)}</Text>
          <Text className="upcoming-meta" numberOfLines={1}>
            {daysLeft > 1 ? `${daysLeft} days left` : "Last day"}
          </Text>
        </View>
      </View>

      <Text className="upcoming-name" numberOfLines={1}>
        {name}
      </Text>
    </View>
  );
};

export default UpcomingSubscriptionCard;
