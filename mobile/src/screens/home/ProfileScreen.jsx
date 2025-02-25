import React from "react";
import { Text, View } from "react-native";
import { useGlobalContext } from "../../contexts/GlobalProvider";
import Success from "../../components/alert/Success";
import tw from "twrnc";

function ProfileScreen({ navigation }) {
  const {
    errors,
    loading,
    role,
    token,
    success,
    updateErrors,
    updateLoading,
    updateRole,
    updateSuccess,
    updateToken,
  } = useGlobalContext();
  return (
    <View style={tw`h-screen`}>
      <Text>Profile Screen</Text>
      <Text>{role}</Text>
      <Text>{token}</Text>
      {success && <Success message={success} />}
    </View>
  );
}

export default ProfileScreen;
