import SubscriptionCard from "@/components/SubscriptionCard";
import { HOME_SUBSCRIPTIONS, Subscription } from "@/constants/data";
import React, { useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { styled } from "react-native-css";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const Subscriptions = () => {
  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<
    string | null
  >(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSubscriptionPress = (item: Subscription) => {
    setExpandedSubscriptionId((current) =>
      current === item.id ? null : item.id,
    );
  };

  const filteredData = HOME_SUBSCRIPTIONS.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      item.plan.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-5 pt-5">
        <Text className="text-3xl font-bold text-dark mb-5">Subscriptions</Text>
        <TextInput
          className="bg-card rounded-xl px-4 py-3 text-dark mb-4"
          placeholder="Search subscriptions..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredData}
        renderItem={({ item }: { item: Subscription }) => (
          <SubscriptionCard
            {...item}
            onPress={() => handleSubscriptionPress(item)}
            expanded={expandedSubscriptionId === item.id}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 20,
          gap: 12,
        }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        ListEmptyComponent={
          <Text className="text-center text-dark mt-10">
            No subscriptions found
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default Subscriptions;
