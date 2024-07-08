import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import tw from "twrnc"; // Import twrnc for Tailwind CSS support

function Spinner() {
  return (
    <View style={tw`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50`}>
      {/* Spinner */}
      <View style={tw`grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible`}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    </View>
  );
}

export default Spinner;
