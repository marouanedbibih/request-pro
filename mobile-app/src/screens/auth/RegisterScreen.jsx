import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Error from "../../components/alert/Error";
import axiosClient from "../../api/axios";
import tw from "twrnc"; // Import tailwind-react-native-classnames
import { useAuthContext } from "../../contexts/AuthProvider";
import { useGlobalContext } from "../../contexts/GlobalProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Success from "../../components/alert/Success";

function RegisterScreen({ navigation }) {
  const { userRegister, updateUserRegister, resetUserRegister } =
    useAuthContext();

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

  const onSubmit = (ev) => {
    ev.preventDefault();
    updateLoading(true);
    const payload = { ...userRegister };
    registerApi(payload);
  };

  const registerApi = (payload) => {
    AsyncStorage.removeItem("JWT_TOKEN")
      .then(() => {
        console.log("JWT_TOKEN removed successfully");
      })
      .catch((error) => {
        console.error("Error removing JWT_TOKEN:", error);
      });
    axiosClient
      .post("/auth/register", payload)
      .then(({ data }) => {
        console.log(data);
        updateSuccess(data.success);
        updateToken(data.token);
        updateRole(data.role);
        navigation.navigate("Client", { screen: "Profile" });
      })
      .catch((err) => {
        console.log(err);
        updateErrors(err.response.data.errors);
        updateLoading(false);
      });
  };

  return (
    <>
      {/* {loading && <Spinner />} */}
      {success && <Success message={success} />}
      <View style={tw`flex-1 justify-center items-center`}>
        <View style={tw`w-3/4 p-6 bg-white rounded-lg shadow`}>
          <View style={tw`mb-6`}>
            <Text style={tw`text-2xl font-bold mb-2`}>Sign Up</Text>
            <Text style={tw`text-base text-gray-600`}>
              Nice to meet you! Enter your details to register.
            </Text>
          </View>
          <View>
            <TextInput
              value={userRegister.firstname}
              onChangeText={(text) =>
                updateUserRegister({ ...userRegister, firstname: text })
              }
              placeholder="First name"
              style={tw`mb-4 px-4 py-2 bg-white border border-gray-300 rounded-lg`}
            />
            <TextInput
              value={userRegister.lastname}
              onChangeText={(text) =>
                updateUserRegister({ ...userRegister, lastname: text })
              }
              placeholder="Last name"
              style={tw`mb-4 px-4 py-2 bg-white border border-gray-300 rounded-lg`}
            />
            <TextInput
              value={userRegister.email}
              onChangeText={(text) =>
                updateUserRegister({ ...userRegister, email: text })
              }
              placeholder="Enter your email"
              style={tw`mb-4 px-4 py-2 bg-white border border-gray-300 rounded-lg`}
            />
            <TextInput
              value={userRegister.phone}
              onChangeText={(text) =>
                updateUserRegister({ ...userRegister, phone: text })
              }
              placeholder="Enter your phone number"
              style={tw`mb-4 px-4 py-2 bg-white border border-gray-300 rounded-lg`}
            />
            <TextInput
              value={userRegister.password}
              onChangeText={(text) =>
                updateUserRegister({ ...userRegister, password: text })
              }
              placeholder="Password"
              secureTextEntry={true}
              style={tw`mb-4 px-4 py-2 bg-white border border-gray-300 rounded-lg`}
            />
            <TextInput
              value={userRegister.confirm_password}
              onChangeText={(text) =>
                updateUserRegister({ ...userRegister, confirm_password: text })
              }
              placeholder="Confirm Password"
              secureTextEntry={true}
              style={tw`mb-4 px-4 py-2 bg-white border border-gray-300 rounded-lg`}
            />

            {/* Other input fields... */}
            <TouchableOpacity
              onPress={onSubmit}
              style={tw`bg-gray-800 rounded-lg p-3  justify-center items-center`}
            >
              <Text style={tw`text-white text-md font-bold`}>Register</Text>
            </TouchableOpacity>
          </View>
          <View style={tw`flex-row items-center mt-6`}>
            <Text style={tw`text-gray-700 font-bold mr-2`}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Auth", { screen: "Login" })
              }
            >
              <Text style={tw`text-blue-500 font-bold`}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {errors && Array.isArray(errors) && (
        <View
          style={{
            position: "absolute",
            width: "50%",
            right: 20,
            bottom: 10,
            zIndex: 50,
            flexDirection: "column-reverse",
            justifyContent: "end",
            alignItems: "end",
            spaceY: 4,
          }}
        >
          {errors.map((e, index) => (
            <Error message={e} key={index} />
          ))}
        </View>
      )}
      {success && <Success message={success} />}
    </>
  );
}

export default RegisterScreen;
