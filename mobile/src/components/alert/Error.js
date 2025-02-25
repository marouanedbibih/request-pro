import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

// eslint-disable-next-line react/prop-types
function Error({ message }) {
  return (
    <View style={tw`p-3 bg-red-600 text-white rounded-md my-2 w-full`}>
      <Text style={tw`text-white`}>
        {message}
      </Text>
    </View>
  );
}

export default Error;
