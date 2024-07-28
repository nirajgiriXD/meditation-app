/**
 * External dependencies.
 */
import React from "react";
import { View, Text, FlatList, Pressable, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

/**
 * Internal dependencies.
 */
import AppGradient from "@/components/AppGradient";
import { MEDITATION_DATA } from "@/constants/meditation-data";
import meditationImages from "@/constants/meditation-images";
import { LinearGradient } from "expo-linear-gradient";

const NatureMeditate = () => {
  return (
    <View className="flex-1">
      <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
        <View className="mb-6">
          <Text className="text-gray-200 mb-4 font-bold text-3xl">
            Welcome User
          </Text>
          <Text className="text-indigo-100 font-medium text-xl">
            Start your meditation practice today
          </Text>
        </View>
        <View>
          <FlatList
            data={MEDITATION_DATA}
            className="mb-8"
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => router.push(`/meditate/${item.id}`)}
                className="h-48 my-3 rounded-md overflow-hidden"
              >
                <ImageBackground
                  source={meditationImages[item.id - 1]}
                  resizeMode="cover"
                  className="flex-1 rounded-lg justify-center"
                >
                  <LinearGradient
                    colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
                    className="flex-1 justify-center items-center"
                  >
                    <Text className="text-gray-100 text-2xl font-bold text-center">
                      {item.title}
                    </Text>
                  </LinearGradient>
                </ImageBackground>
              </Pressable>
            )}
          />
        </View>
        <StatusBar style="light" />
      </AppGradient>
    </View>
  );
};

export default NatureMeditate;
