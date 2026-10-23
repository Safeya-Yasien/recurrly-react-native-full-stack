import { posthog } from "@/constants/posthog";

type AuthenticationMethod = "password" | "email_code";

type SubscriptionDetails = {
  category: string;
  billingInterval: string;
  status: string;
};

export const posthogLogger = {
  authenticationCompleted(authenticationMethod: AuthenticationMethod) {
    posthog?.logger.info("Authentication completed", {
      authentication_method: authenticationMethod,
    });
  },

  accountCreated() {
    posthog?.logger.info("Account created");
  },

  subscriptionDetailsOpened({
    category,
    billingInterval,
    status,
  }: SubscriptionDetails) {
    posthog?.logger.info("Subscription details opened", {
      category,
      billing_interval: billingInterval,
      subscription_status: status,
    });
  },
};
