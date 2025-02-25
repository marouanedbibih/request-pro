import React from "react";
import { View} from "react-native";
import { Picker } from "@react-native-picker/picker";
import tw from "twrnc";

function Select({ value, onChange, options, placeholder }) {
  const handleInputChange = (itemValue) => {
    onChange(itemValue);
  };

  return (
    <View style={tw`mb-4 bg-white border-2 border-gray-300 rounded-lg w-full`}>
      <Picker
        selectedValue={value}
        onValueChange={handleInputChange}
        style={tw`outline-none text-base px-4 py-3`}
      >
        <Picker.Item label={placeholder} value="" />
        {options.map((option) => (
          <Picker.Item
            key={option.id}
            label={option.name}
            value={option.name}
          />
        ))}
      </Picker>
    </View>
  );
}

export default Select;
