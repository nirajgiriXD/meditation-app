/**
 * External dependencies.
 */
import { View, Text, ImageBackground, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";

/**
 * Internal dependencies.
 */
import meditationImages from "@/constants/meditation-images";
import AppGradient from "@/components/AppGradient";
import CustomButton from "@/components/CustomButton";
import { MEDITATION_DATA, AUDIO_FILES } from "@/constants/meditation-data";
import { TimerContext } from "@/context/TimerContext";

const Meditate = () => {
  const { id } = useLocalSearchParams();

  const { duration: secondsRemaining, setDuration: setSecondsRemaining } =
    useContext(TimerContext);

  const [isMeditating, setIsMeditating] = useState(false);
  const [audio, setAudio] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (secondsRemaining === 0) {
      setIsMeditating(false);
      return;
    }

    if (isMeditating) {
      timerId = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timerId);
  }, [secondsRemaining, isMeditating]);

  useEffect(() => {
    return () => {
      setSecondsRemaining(60);
      audio?.unloadAsync();
    };
  }, [audio]);

  const toggleMeditationSessionStatus = async () => {
    if (secondsRemaining === 0) setSecondsRemaining(60);

    setIsMeditating((prev) => !prev);

    await toggleSound();
  };

  const toggleSound = async () => {
    const sound = audio ?? (await initializeSound());
    const status = await sound?.getStatusAsync();

    if (status?.isLoaded && !isPlaying) {
      await sound.playAsync();
      setIsPlaying(true);
    } else {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const initializeSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;
    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);
    setAudio(sound);
    return sound;
  };

  const handleDuration = () => {
    if (isMeditating) toggleMeditationSessionStatus();
    router.push("/(modal)/adjust-meditation-duration");
  };

  // Format time
  const formattedTimeMinutes = String(
    Math.floor(secondsRemaining / 60)
  ).padStart(2, "0");
  const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, "0");

  return (
    <View className="flex-1">
      <ImageBackground
        source={meditationImages[Number(id) - 1]}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["transparent", "rgba(0,0,0,0.8)"]}>
          <Pressable
            onPress={() => router.back()}
            className="absolute top-6 left-6 z-10"
          >
            <AntDesign name="leftcircleo" size={50} color="white" />
          </Pressable>

          <View className="flex-1 justify-center">
            <View className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
              <Text className="text-3xl text-blue-800 font-rmono">
                {formattedTimeMinutes}:{formattedTimeSeconds}
              </Text>
            </View>
          </View>

          <View className="mb-5">
            <CustomButton title="Adjust Duration" onPress={handleDuration} />
            <CustomButton
              title={isMeditating ? "Pause Meditation" : "Start Meditation"}
              onPress={toggleMeditationSessionStatus}
              containerStyles="mt-4"
            />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default Meditate;
