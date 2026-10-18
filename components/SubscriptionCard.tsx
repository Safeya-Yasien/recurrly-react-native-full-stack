import { SubscriptionCardProps } from "@/constants/data";
import { formatSubscriptionDateTime } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";
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
  onPress,
  expanded,
}: SubscriptionCardProps) => {
  return (
    <Pressable
      onPress={onPress}
      className={`sub-card ${expanded ? "sub-card-expanded" : "bg-card"}`}
      style={!expanded && color ? { backgroundColor: color } : undefined}
    >
      <View className="sub-head">
        <View className="sub-main">
          <AppIcon icon={icon} />
          <View className="sub-copy">
            <Text numberOfLines={1} className="sub-title">
              {name}
            </Text>
            <Text numberOfLines={1} ellipsizeMode="tail" className="sub-meta">
              {category?.trim() ||
                plan?.trim() ||
                (renewalDate ? formatSubscriptionDateTime(renewalDate) : "")}
            </Text>
          </View>
        </View>

        <View className="sub-price-box">
          <Text className="sub-price">{formatPrice(price, currency)}</Text>
          <Text className="sub-billing">{billing}</Text>
        </View>
      </View>

      {expanded && (
        <View className="sub-bdy">
          <View className="sub-details">
            <View className="sub-row">
              <View className="sub-row-copy">
                <Text className="sub-label">Payment:</Text>
                <Text
                  className="sub-value"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {paymentMethod?.trim() ?? "Not provided"}
                </Text>
              </View>
            </View>
            <View className="sub-row">
              <View className="sub-row-copy">
                <Text className="sub-label">Category:</Text>
                <Text
                  className="sub-value"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {(category?.trim() || plan?.trim()) ?? "Not provided"}
                </Text>
              </View>
            </View>
            <View className="sub-row">
              <View className="sub-row-copy">
                <Text className="sub-label">Started:</Text>
                <Text
                  className="sub-value"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {startDate
                    ? formatSubscriptionDateTime(startDate)
                    : "Not provided"}
                </Text>
              </View>
            </View>
            <View className="sub-row">
              <View className="sub-row-copy">
                <Text className="sub-label">Renewal date:</Text>
                <Text
                  className="sub-value"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {renewalDate
                    ? formatSubscriptionDateTime(renewalDate)
                    : "Not provided"}
                </Text>
              </View>
            </View>
            <View className="sub-row">
              <View className="sub-row-copy">
                <Text className="sub-label">Status:</Text>
                <Text
                  className="sub-value capitalize"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {status}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
};
export default SubscriptionCard;
