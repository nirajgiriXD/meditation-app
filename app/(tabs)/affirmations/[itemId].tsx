/**
 * External dependencies.
 */
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

/**
 * Internal dependencies.
 */
import { GalleryPreviewData } from "@/constants/models/AffirmationCategory";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";
import AppGradient from "@/components/AppGradient";

const AffirmationPractice = () => {
  const { itemId } = useLocalSearchParams();
  const router = useRouter();

  const [affirmation, setAffirmation] = useState<GalleryPreviewData>();
  const [sentences, setSentences] = useState<string[]>([]);

  useEffect(() => {
    for (let id = 0; id < AFFIRMATION_GALLERY.length; id++) {
      const affirmationData = AFFIRMATION_GALLERY[id].data;
      const affirmationToStart = affirmationData.find(
        (item) => item.id === Number(itemId)
      );

      if (affirmationToStart) {
        setAffirmation(affirmationToStart);

        const affirmationArray = affirmationToStart.text.split(".");
        if (affirmationArray[affirmationArray.length - 1] === "") {
          affirmationArray.pop();
        }

        setSentences(affirmationArray);

        return;
      }
    }
  }, []);

  return (
    <View className="flex-1">
      <ImageBackground
        source={affirmation?.image}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["rgba(0,0,0,0.3)", "rgba(0, 0, 0, 0.9)"]}>
          <Pressable
            onPress={() => router.back()}
            className="absolute top-5 left-5 z-10"
          >
            <AntDesign name="leftcircleo" size={50} color="white" />
          </Pressable>

          <ScrollView className="mt-32" showsVerticalScrollIndicator={false}>
            <View className="h-full justify-center">
              <View className="h-[4/5] justify-center">
                {sentences.map((sentence, key) => {
                  return (
                    <Text
                      className="text-white text-2xl mb-4 font-bold text-center"
                      key={key}
                    >
                      {sentence}.
                    </Text>
                  );
                })}
              </View>
            </View>
          </ScrollView>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default AffirmationPractice;
