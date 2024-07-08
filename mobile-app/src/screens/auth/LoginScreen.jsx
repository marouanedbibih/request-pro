import React, { useState } from "react";
import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";
import tw from "twrnc";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthContext } from "../../contexts/AuthProvider";
import { useGlobalContext } from "../../contexts/GlobalProvider";
import axiosClient from "../../api/axios";
import Error from "../../components/alert/Error";
import Success from "../../components/alert/Success";

function LoginScreen({ navigation }) {
  const { credentials, resetCredentials, updateCredentials } = useAuthContext();
  const {
    errors,
    loading,
    user,
    success,
    role,
    token,
    updateErrors,
    updateLoading,
    updateRole,
    updateSuccess,
    updateToken,
  } = useGlobalContext();

  const onSubmit = () => {
    updateLoading(true);
    const payload = { ...credentials };
    console.log("Login Credentials ", payload);
    loginApi(payload);
  };

  const loginApi = (payload) => {
    if (token) {
      // Remove the 'JWT_TOKEN' item
      AsyncStorage.removeItem("JWT_TOKEN")
        .then(() => {
          console.log("JWT_TOKEN removed successfully");
        })
        .catch((error) => {
          console.error("Error removing JWT_TOKEN:", error);
        });
    }

    axiosClient
      .post("/auth/login", payload)
      .then(({ data }) => {
        console.log("Login Response Data ", data);
        updateLoading(false);
        updateToken(data.token);
        updateRole(data.role);
        updateSuccess(data.success);
        navigation.navigate("Client");
      })
      .catch((error) => {
        console.log(error)
        // console.log("Error from api", error.response.data.errors);
        // updateErrors(error.response.data.errors);
        console.log("Errors ", errors);
        updateLoading(false);
      });
  };

  return (
    <>
      <View style={tw`flex-1 justify-center items-center`}>
        <View style={tw`w-5/6 p-4 bg-white rounded-lg shadow`}>
          <View style={tw`flex-col justify-start items-start gap-3`}>
            <Text style={tw`text-neutral-800 text-2xl font-bold`}>Login</Text>
            <Text style={tw`text-slate-500 text-base font-bold`}>
              Nice to meet you! Enter your credentials to login.
            </Text>

            <TextInput
              value={credentials.email}
              onChangeText={(text) =>
                updateCredentials({ ...credentials, email: text })
              }
              placeholder="Email"
              style={tw`mb-4 outline-none bg-white w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-base`}
            />
            <TextInput
              value={credentials.password}
              onChangeText={(text) =>
                updateCredentials({ ...credentials, password: text })
              }
              placeholder="Password"
              secureTextEntry={true}
              style={tw`mb-4 outline-none bg-white w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-base`}
            />
            <TouchableOpacity
              style={tw`w-full bg-gray-800 rounded-lg px-5 py-2.5 justify-center items-center`}
              onPress={onSubmit}
            >
              <Text style={tw`text-white text-sm font-bold`}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={tw`w-full flex justify-center items-center p-4`}>
          <Text style={tw`mr-2 text-slate-500 font-bold`}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={tw`font-bold`}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={tw`w-full flex justify-center items-center pb-4 px-4`}>
          <Text style={tw`mr-2 text-slate-500 font-bold`}>
            Forgot your password?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgetPassword")}
          >
            <Text style={tw`font-bold`}>Reset Password</Text>
          </TouchableOpacity>
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

export default LoginScreen;
