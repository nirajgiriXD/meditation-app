/**
 * External dependencies.
 */
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

interface AppGradientProps {
  children: any;
  colors: string[];
}

const AppGradient = ({ children, colors }: AppGradientProps) => {
  return (
    <LinearGradient className="flex-1" colors={colors}>
      <SafeAreaView className="flex-1 mx-4 my-12 justify-betwee">
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AppGradient;
