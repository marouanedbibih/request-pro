import React, { useEffect, useState } from "react";
import Input from "../../components/inputs/Input";
import { useDemandeContext } from "../../context/DemandeProvider";
import Error from "../../components/alert/Error";
import Spinner from "../../components/spinner/Spinner";
import axiosClient from "../../api/axios";
import { useStateContext } from "../../context/ContextProvider";
import Success from "../../components/alert/Success";
import { useNavigate, useParams } from "react-router-dom";

const TYPE_DEMANDE = ["MATERIAL", "CONSUMABLE", "HUMAN_AID"];

function DemandeEdit() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [selectedType, setSelectedType] = useState(""); // Define selectedType state

  const { demande, updateDemande } = useDemandeContext();
  const { user,success ,_setSuccess } = useStateContext();
  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(() => {
    if (id){
      getDemandeById(id);
    }
  },[id]);

  const getDemandeById = (id) => {
    setLoading(true);
    axiosClient
      .get(`/demandes/${id}`)
      .then(({ data }) => {
        console.log(data);
        setSelectedType(data.demande.type);
        updateDemande(data.demande);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };


  const onSubmit = (ev) => {
    ev.preventDefault();
    setLoading(true);
    const payload = { ...demande, type: selectedType, clientId: user.clientId }; // Include selectedType in the payload
    console.log(payload);
    if (id) {
      putDemandeApi(payload);
    }
    postDemandeApi(payload);
  };

  const putDemandeApi = (payload) => {
    axiosClient
      .put(`/demandes/${id}`, payload)
      .then(({ data }) => {
        console.log(data);
        setLoading(false);
        _setSuccess(data.success);
        navigate("/demandes");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setErrors(["Failed to update demande. Please try again."]);
      });
  }

  const postDemandeApi = (payload) => {
    axiosClient
      .post("/demandes", payload)
      .then(({ data }) => {

        console.log(data);
        setLoading(false);
        _setSuccess(data.success);
        navigate("/demandes");
        
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setErrors(["Failed to submit demande. Please try again."]);
      });
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value); // Update selectedType when an option is selected
  };

  return (
    <div className="w-1/2">
      {errors && (
        <div className="fixed right-4 bottom-4 z-50 flex flex-col-reverse justify-end items-end space-y-4">
          {errors.map((e) => (
            <Error message={e} key={e} />
          ))}
        </div>
      )}
      {loading && <Spinner />}
      {success && (<Success message={success} />)}

      <div className="w-full card animated fadeInDown ">
        <form className="grid grid-cols-1 gap-4" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-8">
            <Input
              placeholder={"Description"}
              value={demande.description}
              onChange={(value) =>
                updateDemande({ ...demande, description: value })
              }
            />
            <select
              value={selectedType} // Use selectedType for value
              onChange={handleTypeChange} // Handle type change
              className="mb-4 outline-none bg-white w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-base transition duration-300 focus:border-gray-600"
            >
              <option value="" disabled>
                Select Category
              </option>
              {TYPE_DEMANDE.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 w-2/12">
            <button
              className="select-none rounded-lg bg-green-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40  active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DemandeEdit;
