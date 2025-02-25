import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import tw from "twrnc"; // Import twrnc for Tailwind CSS support
import { useGlobalContext } from "../../contexts/GlobalProvider";
import { useAuthContext } from "../../contexts/AuthProvider";
import axiosClient from "../../api/axios";
import Success from "../../components/alert/Success";
import Error from "../../components/alert/Error";

function ForgetPassword({ navigation }) {
  const { credentials, updateCredentials, resetCredentials,removeJwtToken } = useAuthContext();
  const {
    errors,
    loading,
    success,
    updateErrors,
    updateLoading,
    updateSuccess,
  } = useGlobalContext();

  const onSubmit = (ev) => {
    ev.preventDefault();
    updateLoading(true);
    const payload = { ...credentials };
    forgetPasswordApi(payload);
  };

  const forgetPasswordApi = (payload) => {
    removeJwtToken();
    axiosClient
      .post("/auth/forget-password", payload)
      .then(({ data }) => {
        updateSuccess(data.success);
        updateLoading(false);
        navigation.navigate("CodeValidation");
      })
      .catch((err) => {
        updateErrors(err.response.data.errors);
        updateLoading(false);
      });
  };

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <View style={tw`w-full flex justify-center items-center p-8`}>
        <View
          style={tw`w-full h-auto p-6 bg-white rounded-lg shadow flex-col justify-center items-center inline-flex gap-4`}
        >
          <View
            style={tw`flex-col justify-start items-start gap-3 flex w-full`}
          >
            <Text
              style={tw`text-neutral-800 text-2xl font-bold font-['Roboto'] leading-9`}
            >
              Forget Password
            </Text>
            <Text
              style={tw`w-full text-start text-slate-500 text-base font-bold font-['Roboto'] leading-7`}
            >
              Enter your email to reset your account.
            </Text>
            <View style={tw`w-full`}>
              <TextInput
                value={credentials.email}
                onChangeText={(text) =>
                  updateCredentials({ ...credentials, email: text })
                }
                placeholder="Email"
                style={tw`mb-4 outline-none bg-white w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-base transition duration-300 focus:border-gray-600`}
              />
              <TouchableOpacity
                onPress={onSubmit}
                style={tw`self-stretch w-full px-5 py-2.5 bg-gray-800 rounded-lg shadow justify-center items-center gap-2 inline-flex hover:bg-gray-700 active:bg-gray-900`}
              >
                <Text
                  style={tw`text-white text-sm font-bold font-['Roboto'] uppercase leading-[21px]`}
                >
                  Sent Code
                </Text>
              </TouchableOpacity>
            </View>
            <View style={tw`w-full flex justify-center items-center p-4 `}>
              <Text
                style={tw`mr-2 text-slate-500 text-base font-bold font-['Roboto'] leading-7`}
              >
                Connect with password?
              </Text>
              <TouchableOpacity onPress={() => navigate("/login")}>
                <Text
                  style={tw`text-base font-bold font-['Roboto'] leading-7 text-gray-900`}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </View>
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
    </View>
  );
}

export default ForgetPassword;
