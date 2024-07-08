import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

// eslint-disable-next-line react/prop-types
function Success({ message }) {
  return (
    <View style={tw`absolute right-4 bottom-4 z-40 p-4 bg-green-600 text-white rounded-md`}>
      <Text style={tw`text-white`}>{message}</Text>
    </View>
  );
}

export default Success;
