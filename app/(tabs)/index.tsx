import SubscriptionCard from "@/components/SubscriptionCard";
import UpcomingSubscriptionCard from "@/components/UpcomingSubscriptionCard";
import { posthog } from "@/constants/posthog";
import { posthogLogger } from "@/constants/posthog-logger";
import {
  HOME_BALANCE,
  HOME_SUBSCRIPTIONS,
  HOME_USER,
  Subscription,
  UPCOMING_SUBSCRIPTIONS,
  UpcomingSubscription,
} from "@/constants/data";
import images from "@/constants/images";
import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";
import { styled } from "nativewind";
import { useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export default function Home() {
  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<
    string | null
  >(null);

  const handleSubscriptionPress = (item: Subscription) => {
    if (expandedSubscriptionId !== item.id) {
      posthog?.capture("subscription_details_opened", {
        category: item.category,
        billing_interval: item.billing.toLowerCase(),
        subscription_status: item.status,
      });
      posthogLogger.subscriptionDetailsOpened({
        category: item.category,
        billingInterval: item.billing.toLowerCase(),
        status: item.status,
      });
    }

    setExpandedSubscriptionId((current) =>
      current === item.id ? null : item.id,
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <FlatList
        ListHeaderComponent={() => (
          <>
            <View className="home-header">
              <View className="home-user">
                <Image source={images.avatar} className="home-avatar" />
                <Text className="home-user-name">{HOME_USER.name}</Text>
              </View>

              <Pressable
                onPress={() => console.log("press")}
                className="size-8 items-center justify-center rounded-full border border-muted-foreground"
              >
                <Text className="text-2xl leading-none">+</Text>
              </Pressable>
            </View>

            {/* balance */}
            <View className="home-balance-card ">
              <Text className="home-balance-label">Balance</Text>
              <View className="home-balance-row">
                <Text className="home-balance-amount">
                  {formatPrice(HOME_BALANCE.amount, "USD")}
                </Text>
                <Text className="home-balance-date">
                  {formatDate(HOME_BALANCE.nextRenewalDate)}
                </Text>
              </View>
            </View>

            <View className="">
              <View className="list-head">
                <Text className="list-title">Upcoming</Text>
                <Pressable className="list-action">
                  <Text className="list-action-text">View all</Text>
                </Pressable>
              </View>

              <FlatList
                data={UPCOMING_SUBSCRIPTIONS}
                renderItem={({ item }: { item: UpcomingSubscription }) => (
                  <UpcomingSubscriptionCard {...item} />
                )}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
              ></FlatList>
            </View>

            <View className="list-head">
              <Text className="list-title">All Subscriptions</Text>
              <Pressable className="list-action">
                <Text className="list-action-text">View all</Text>
              </Pressable>
            </View>
          </>
        )}
        data={HOME_SUBSCRIPTIONS}
        renderItem={({ item }: { item: Subscription }) => (
          <SubscriptionCard
            {...item}
            onPress={() => handleSubscriptionPress(item)}
            expanded={expandedSubscriptionId === item.id}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        // extraData={expandedSubscriptionId}
        contentContainerClassName="pb-30"
        ListEmptyComponent={
          <Text className="home-empty-state">No subscriptions yet.</Text>
        }
        ItemSeparatorComponent={() => <View className="h-4" />}
      />
    </SafeAreaView>
  );
}
