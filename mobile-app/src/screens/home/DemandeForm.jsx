import React, { useEffect } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import Select from "../../components/inputs/Select";
import axiosClient from "../../api/axios";
import Error from "../../components/alert/Error";
import Success from "../../components/alert/Success";
import { useHomeContext } from "../../contexts/HomeProvider";
import { useGlobalContext } from "../../contexts/GlobalProvider";

const TYPE_DEMANDE = ["MATERIAL", "CONSUMABLE", "HUMAN_AID"]; // Define options for the select component

function DemandeForm({ navigation, route }) {
  // Get the demandeId from the route parameters
  const { demandeId } = route.params;
  // Home context
  const { demande, updateDemande,demandes,updateDemandes } = useHomeContext();
  // Global context
  const {
    errors,
    loading,
    success,
    updateErrors,
    updateLoading,
    updateSuccess,
    user,
    token,
    updateUser,
  } = useGlobalContext();

  // Load the demande details if demandeId is provided
  useEffect(() => {
    getUserInfosByToken(token);
    if (demandeId) {
      getDemandeById(demandeId);
    }
  }, []);

  // Handle form submission
  const onSubmit = () => {
    const payload = { ...demande, clientId: user.clientId};
    if (demandeId) {
      putDemandeApi(payload);
    } else {
      postDemandeApi(payload);
    }
  };

  // Get demande details by ID  
  const getDemandeById = (id) => {
    axiosClient
      .get(`/demandes/${id}`)
      .then(({ data }) => {
        updateDemande(data.demande);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Update demande details by ID
  const putDemandeApi = (payload) => {
    axiosClient
      .put(`/demandes/${demandeId}`, payload)
      .then(({ data }) => {
        console.log(data);
        navigation.navigate("Home", { refreshDemandes: true }); // Pass refreshDemandes flag to trigger refetch
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Create new demande 
  const postDemandeApi = (payload) => {
    axiosClient
      .post("/demandes", payload)
      .then(({ data }) => {
        console.log(data);
        navigation.navigate("Home", { refreshDemandes: true }); // Pass refreshDemandes flag to trigger refetch
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Get user details by token
  const getUserInfosByToken = (token) => {
    axiosClient
      .get(`/users/profile?token=${token}`)
      .then(({ data }) => {
        console.log(data);
        updateUser(data.user);
      })
      .catch((error) => {
        console.log(error);
      });

  }

  
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <View style={tw`w-5/6 p-4 bg-white rounded-lg shadow`}>
        <View style={tw`flex-col justify-start items-start gap-3`}>
          <Text style={tw`text-slate-500 text-base font-bold`}>
            Enter your demande details.
          </Text>

          <TextInput
            value={demande.description}
            onChangeText={(text) =>
              updateDemande({ ...demande, description: text })
            }
            placeholder="Description"
            style={tw`mb-4 outline-none bg-white w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-base`}
          />
          <Select
            value={demande.type}
            onChange={(value) => updateDemande({ ...demande, type: value })}
            options={TYPE_DEMANDE.map((type) => ({
              id: type,
              name: type,
            }))}
            placeholder="Select Type"
          />
          <TouchableOpacity
            style={tw`w-full bg-green-800 rounded-lg px-5 py-2.5 justify-center items-center`}
            onPress={onSubmit}
          >
            <Text style={tw`text-white text-sm font-bold`}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Error Handling */}
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
    </View>
  );
}

export default DemandeForm;
