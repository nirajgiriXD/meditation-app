/**
 * External dependencies.
 */
import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

/**
 * Internal dependencies.
 */
import AppGradient from "@/components/AppGradient";
import CustomButton from "@/components/CustomButton";
import { TimerContext } from "@/context/TimerContext";

const AdjustMeditationDuration = () => {
  const { setDuration } = useContext(TimerContext);

  const handlePress = (duration: number) => {
    setDuration(duration);
    router.back();
  };

  return (
    <View className="flex-1 relative">
      <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
        <Pressable
          onPress={() => router.back()}
          className="absolute top-6 left-6 z-10"
        >
          <AntDesign name="leftcircleo" size={50} color="white" />
        </Pressable>
        <View className="justify-center h-4/5">
          <Text className="text-center font-bold text-2xl text-white mb-6">
            Adjust your meditation duration
          </Text>
          <View>
            <CustomButton
              title="2 Minutes"
              onPress={() => handlePress(120)}
              containerStyles="mb-4"
            />
            <CustomButton
              title="5 Minutes"
              onPress={() => handlePress(300)}
              containerStyles="mb-4"
            />
            <CustomButton
              title="10 Minutes"
              onPress={() => handlePress(600)}
              containerStyles="mb-4"
            />
            <CustomButton
              title="15 Minutes"
              onPress={() => handlePress(900)}
              containerStyles="mb-4"
            />
          </View>
        </View>
      </AppGradient>
    </View>
  );
};

export default AdjustMeditationDuration;
