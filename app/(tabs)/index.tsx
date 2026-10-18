import SubscriptionCard from "@/components/SubscriptionCard";
import UpcomingSubscriptionCard from "@/components/UpcomingSubscriptionCard";
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
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      {/* header */}

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

            {/* <View> */}
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
          <SubscriptionCard {...item} />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
