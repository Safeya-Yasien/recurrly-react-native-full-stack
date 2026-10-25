module.exports = ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    posthog: {
      projectToken: process.env.EXPO_PUBLIC_POSTHOG_PROJECT_TOKEN,
      host: process.env.EXPO_PUBLIC_POSTHOG_HOST,
    },
  },
  android: {
    package: "com.safeya.recurrly",
  },
});
