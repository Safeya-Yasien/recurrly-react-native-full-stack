import { useAuth, useSignUp } from "@clerk/expo";
import { Href, Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { signUp, errors, fetchStatus } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailEmpty = emailAddress.trim().length === 0;
  const passwordEmpty = password.length === 0;

  const emailFormatValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
  const passwordLengthValid = password.length >= 8;

  const showEmailError =
    (emailTouched || submitted) && (emailEmpty || !emailFormatValid);
  const showPasswordError =
    (passwordTouched || submitted) && (passwordEmpty || !passwordLengthValid);

  const getEmailError = () => {
    if (emailEmpty) return "Email is required";
    if (!emailFormatValid) return "Please enter a valid email address";
    return "";
  };

  const getPasswordError = () => {
    if (passwordEmpty) return "Password is required";
    if (!passwordLengthValid) return "Password must be at least 8 characters";
    return "";
  };

  const handleSignUp = async () => {
    setSubmitted(true);

    if (getEmailError() || getPasswordError()) return;

    const { error } = await signUp.password({ emailAddress, password });
    if (error) return;

    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) return;

    setIsVerifying(true);
  };

  const handleVerify = async () => {
    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (error) {
      return;
    }

    const { error: finalizeError } = await signUp.finalize({
      navigate: ({ session, decorateUrl }) => {
        if (session?.currentTask) return;

        const url = decorateUrl("/(tabs)");
        if (url.startsWith("http")) {
          if (typeof window !== "undefined" && window.location) {
            window.location.href = url;
          } else {
            router.replace("/(tabs)" as Href);
          }
        } else {
          router.replace(url as Href);
        }
      },
    });
    if (finalizeError) {
      return;
    }
  };

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return (
      <View>
        <Text>You&apos;re signed in</Text>
      </View>
    );
  }

  if (isVerifying) {
    return (
      <SafeAreaView className="auth-safe-area">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View className="auth-content">
              <View className="auth-card">
                <View className="auth-form">
                  <View className="auth-field">
                    <Text className="auth-label">Verification Code</Text>
                    <TextInput
                      className="auth-input"
                      value={code}
                      onChangeText={setCode}
                      keyboardType="number-pad"
                      placeholder="Enter 6-digit code"
                      placeholderTextColor="rgba(0, 0, 0, 0.4)"
                    />
                    {errors.fields.code && (
                      <Text className="auth-error">
                        {errors.fields.code.message}
                      </Text>
                    )}
                  </View>

                  <Pressable
                    className="auth-button"
                    onPress={handleVerify}
                    disabled={fetchStatus === "fetching"}
                  >
                    <Text className="auth-button-text">
                      {fetchStatus === "fetching"
                        ? "Verifying..."
                        : "Verify Email"}
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => signUp.verifications.sendEmailCode()}
                    disabled={fetchStatus === "fetching"}
                  >
                    <Text className="auth-link">Resend Code</Text>
                  </Pressable>
                  {errors.global?.map((e, i) => (
                    <Text key={i} className="auth-error">
                      {e.longMessage ?? e.message}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="auth-safe-area">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="auth-content">
            {/* Branding */}
            <View className="auth-brand-block">
              <View className="auth-logo-wrap">
                <View className="auth-logo-mark">
                  <Text className="auth-logo-mark-text">R</Text>
                </View>
                <View>
                  <Text className="auth-wordmark">Recurrly</Text>
                  <Text className="auth-wordmark-sub">SUBSCRIPTIONS</Text>
                </View>
              </View>
              <Text className="auth-title">Create your account</Text>
              <Text className="auth-subtitle">
                Start tracking your subscriptions and never miss a payment
              </Text>
            </View>

            {/* Sign-Up Form */}
            <View className="auth-card">
              <View className="auth-form">
                <View className="auth-field">
                  <Text className="auth-label">Email Address</Text>
                  <TextInput
                    className={`auth-input ${showEmailError ? "auth-input-error" : ""}`}
                    autoCapitalize="none"
                    placeholder="name@example.com"
                    placeholderTextColor="rgba(0, 0, 0, 0.4)"
                    keyboardType="email-address"
                    value={emailAddress}
                    onChangeText={setEmailAddress}
                    onBlur={() => setEmailTouched(true)}
                  />
                  {showEmailError ? (
                    <Text className="auth-error">{getEmailError()}</Text>
                  ) : errors.fields.emailAddress ? (
                    <Text className="auth-error">
                      {errors.fields.emailAddress.message}
                    </Text>
                  ) : null}
                </View>

                <View className="auth-field">
                  <Text className="auth-label">Password</Text>
                  <TextInput
                    className={`auth-input ${showPasswordError ? "auth-input-error" : ""}`}
                    placeholder="Create a strong password"
                    placeholderTextColor="rgba(0, 0, 0, 0.4)"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    onBlur={() => setPasswordTouched(true)}
                  />
                  {showPasswordError ? (
                    <Text className="auth-error">{getPasswordError()}</Text>
                  ) : errors.fields.password ? (
                    <Text className="auth-error">
                      {errors.fields.password.message}
                    </Text>
                  ) : (
                    <Text className="auth-helper">
                      Minimum 8 characters required
                    </Text>
                  )}
                </View>

                <Pressable
                  className={`auth-button ${fetchStatus === "fetching" ? "auth-button-disabled" : ""}`}
                  disabled={fetchStatus === "fetching"}
                  onPress={handleSignUp}
                >
                  <Text className="auth-button-text">
                    {fetchStatus === "fetching"
                      ? "Creating Account"
                      : "Create Account"}
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Sign-In Link */}
            <View className="auth-link-row">
              <Text className="auth-link-copy">Already have an account?</Text>
              <Link href="/(auth)/sign-in" asChild>
                <Pressable>
                  <Text className="auth-link">Sign In</Text>
                </Pressable>
              </Link>
            </View>

            {/* Required for Clerk's bot protection */}
            <View nativeID="clerk-captcha" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
