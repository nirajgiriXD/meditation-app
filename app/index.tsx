/**
 * External dependencies.
 */
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import React from "react";

/**
 * Internal dependencies.
 */
import beachImage from "@/assets/meditation-images/beach.webp";
import CustomButton from "@/components/CustomButton";
import AppGradient from "@/components/AppGradient";

const App = () => {
  return (
    <View className="flex-1">
      <ImageBackground
        source={beachImage}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}>
          <SafeAreaView className="flex-1 justify-between">
            <View>
              <Text className="text-center text-white font-bold text-4xl">
                Simple Meditation
              </Text>
              <Text className="text-center text-white text-regular text-xl mt-3">
                Simplifying Meditation for Everyone
              </Text>
            </View>
            <CustomButton
              onPress={() => router.push("/nature-meditate")}
              title="Get Started"
            />
            <StatusBar style="light" />
          </SafeAreaView>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default App;
