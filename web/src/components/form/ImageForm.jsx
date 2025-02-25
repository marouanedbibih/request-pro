// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import default_avatar from "../../assets/images/default-avatar.jpg";
import { useClientContext } from "../../context/ClientContext";
import { useStateContext } from "../../context/ContextProvider";
import ConfirmNotification from "../notifications/ConfirmNotification";
import axiosClient from "../../api/axios";
import Spinner from "../spinner/Spinner";
import { useNavigate } from "react-router-dom";

function ImageForm({ idClient }) {
  // const [imageUrl, setImageUrl] = useState(default_avatar);
  const { imageInput, _setImageInput } = useClientContext();
  const [confirmNotification, setConfirmNotification] = useState(false);
  const { _setSuccess } = useStateContext();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

    /**
     * 
     * This function get the image form the iput file
     * convert to Based 64 code for sent the image by json
     * save the image into the context state imageInput 
     */
  const handleImageChange = (ev) => {
    const file = ev.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      _setImageInput(reader.result);
    };
    reader.readAsDataURL(file);
  };

  /**
   * this function remove the image from the input file
   * set the imageInput state to null
   */
  const handleRemoveImage = () => {
    _setImageInput(null);
  };
  
  /**
   * This function is used to handle the confirm notification.
   * The confirm notification is a modal that appears when the user clicks on the save button.
   * When the user clicks on the confirm button, the postImage function is called.
   * postImage function is used to save the image from the input file to the API.
   */
  const handleConfirm = () => {
    setConfirmNotification(false);
    setLoading(true);
    const payload = {
      picture: imageInput,
    };
    
    console.log("Payload Profile Picture : ", payload)

    postImage(payload);
    // _setSuccess("Image saved successfully");
  };

  /**
   * This function is used to handle the cancel notification.
   * The cancel notification is a modal that appears when the user clicks on the save button.
   * When the user clicks on the cancel button, the handleCancel function is called.
   */
  const handleCancel = () => {
    setConfirmNotification(false);
    _setSuccess("Delete action cancelled");
  };

  /**
   * This function is used to save the image from the input file to the API.
   * The image is sent as a JSON object.
   */
  const saveImage = (ev) => {
    ev.preventDefault();
    setConfirmNotification(true);
    console.log("Image in File Based 64 saved: ", imageInput);
  };

  // API functions
  /**
   * This function is used to save the image from the input file to the API.
   * The image is sent as a JSON object.
   * The API return respone jsone with the success message.
   * {"succed":"Image saved successfully"}
   */
  const postImage = async (payload) => {
    axiosClient.post(`/clients/profile-picture?id=${idClient}`, payload).then(({data}) => {
      setLoading(false);
      _setSuccess(data.success);
      navigate("/clients");
    })
    .catch((err) => {
      setErrors(err.response.data.errors);
      setLoading(false);
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-4 mt-2 grid min-h-[140px] w-1/3 place-items-center overflow-x-scroll lg:overflow-visible">
      {confirmNotification && (
        <ConfirmNotification
          message={"You are sure you want to change your image picture?"}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
      {loading && <Spinner />}
      <div className="flex flex-col gap-4 items-center justify-center">
        <img
          className="object-cover object-center rounded-full h-96 w-96"
          src={imageInput || default_avatar}
          alt="nature image"
        />
        <div className="flex justify-center items-center gap-2">
          <label htmlFor="profile-image" className="cursor-pointer ml-3">
            <FaEdit className="w-6 h-6 text-green-600" />
          </label>
          <button className="cursor-pointer ml-3" onClick={handleRemoveImage}>
            <FaTrash className="w-6 h-6 text-red-600 cursor-pointer" />
          </button>
          <form
            action=""
            onSubmit={saveImage}
            className="flex justify-center items-center"
          >
            {imageInput || idClient ? (
              <button className="cursor-pointer ml-3" type="submit">
                <FaSave className="w-6 h-6 text-gray-600 cursor-pointer" />
              </button>
            ) : null}

            <input
              type="file"
              id="profile-image"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ImageForm;
