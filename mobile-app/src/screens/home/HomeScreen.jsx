import React, { useEffect, useState, useRef } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import Success from "../../components/alert/Success";
import axiosClient from "../../api/axios";
import { useHomeContext } from "../../contexts/HomeProvider";
import { useGlobalContext } from "../../contexts/GlobalProvider";
import Card from "../../components/card/Card";
import Spinner from "../../components/spinner/Spinner"; // Import Spinner component

function HomeScreen({ navigation, route }) {
  const { success, updateUser, user, token } = useGlobalContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [endReached, setEndReached] = useState(false);
  const { demandes, updateDemandes } = useHomeContext();

  useEffect(() => {
    // Fetch user information when token changes
    if (token) {
      getUserInfosByToken(token);
    }
  }, [token]);

  useEffect(() => {
    // Fetch demandes when currentPage changes
    fetchClientDemandes(currentPage);
  }, [currentPage]);

  useEffect(() => {
    // Reset state and fetch demandes when route parameters change
    if (route.params && route.params.refreshDemandes) {
      setCurrentPage(1);
      setEndReached(false);
      updateDemandes([]);
      fetchClientDemandes(1); // Fetch the first page when refreshing
    }
  }, [route.params]);

  const getUserInfosByToken = (token) => {
    axiosClient
      .get(`/users/profile?token=${token}`)
      .then(({ data }) => {
        updateUser(data.user);
      })
      .catch((error) => {
        console.error("Error fetching user information:", error);
      });
  };

  const fetchClientDemandes = (page) => {
    if (!user) return;
    setLoading(true);
    axiosClient
      .get(`/demandes/client/${user.clientId}?page=${page}`)
      .then(({ data }) => {
        if (data.demandes.length === 0) {
          setEndReached(true);
        } else {
          updateDemandes((prevDemandes) => [...prevDemandes, ...data.demandes]);
          setCurrentPage((prevPage) => prevPage + 1);
          setTotalPages(data.totalPages);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteDemandeApi = (demandeId) => {
    axiosClient
      .delete(`/demandes/${demandeId}`)
      .then(({ data }) => {
        updateDemandes((prevDemandes) =>
          prevDemandes.filter((demande) => demande.id !== demandeId)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const navigateToEditDemande = (demandeId) => {
    navigation.navigate("DemandeForm", { demandeId });
  };

  const navigateToNewDemande = () => {
    navigation.navigate("DemandeForm", { demandeId: null });
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      fetchClientDemandes(currentPage + 1);
    }
  };

  return (
    <View style={tw`flex-1 justify-start items-center p-4`}>
      {user ? (
        <TouchableOpacity
          style={tw`w-2/4 bg-green-800 rounded-lg px-5 py-2.5 justify-center items-center`}
          onPress={navigateToNewDemande}
        >
          <Text style={tw`text-white text-sm font-bold`}>New Demande</Text>
        </TouchableOpacity>
      ) : (
        <ActivityIndicator size="large" color="#00000" />
      )}
      <ScrollView style={tw`flex-1`}>
        {demandes.map((demande, index) => (
          <Card
            key={index}
            demande={demande}
            navigateToEditDemande={navigateToEditDemande}
            onDeleteApi={deleteDemandeApi}
          />
        ))}
        {endReached && (
          <Text style={tw`text-center text-gray-500 mt-4`}>
            End of list reached
          </Text>
        )}
      </ScrollView>
      {success && <Success message={success} />}
      {!endReached && (
        <TouchableOpacity
          style={tw`bg-blue-500 px-4 py-2 rounded-lg mt-2`}
          onPress={handleLoadMore}
          disabled={loading} // Disable button while loading
        >
          <Text style={tw`text-white text-sm font-bold`}>Read More</Text>
        </TouchableOpacity>
      )}
    </View>

    // Test

  );
}

export default HomeScreen;
