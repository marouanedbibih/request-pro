import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";

const Card = ({ demande ,navigateToEditDemande,onDeleteApi}) => {
  return (
    <View
      style={tw`relative flex flex-col mt-6 text-green-700 bg-white shadow-md bg-clip-border rounded-xl w-96`}
    >
      <View style={tw`p-6`}>
        <View style={tw`flex flex-row justify-between  items-start`}>
          <Text
            style={tw`block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-green-900`}
          >
            {demande.type}
          </Text>
          <Text
            style={tw`block font-sans text-base antialiased font-light leading-relaxed text-inherit`}
          >
            {demande.date}
          </Text>
        </View>

        <Text
          style={tw`block font-sans text-base antialiased font-light leading-relaxed text-inherit`}
        >
          {demande.status}
        </Text>
        <Text
          style={tw`block font-sans text-base antialiased font-light leading-relaxed text-inherit`}
        >
          {demande.description}
        </Text>
      </View>
      <View style={tw`p-6 pt-0 flex flex-row justify-start items-center gap-4`}>
        <TouchableOpacity
          style={tw`align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-green-900 text-white shadow-md shadow-green-900/10 hover:shadow-lg hover:shadow-green-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none`}
          onPress={() => {
            navigateToEditDemande(demande.id);
          }}
        >
          <Text style={tw`text-white`}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-red-900 text-white shadow-md shadow-red-900/10 hover:shadow-lg hover:shadow-red-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none`}
          onPress={() => {
            onDeleteApi(demande.id);
          }}
        >
          <Text style={tw`text-white`}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Card;
