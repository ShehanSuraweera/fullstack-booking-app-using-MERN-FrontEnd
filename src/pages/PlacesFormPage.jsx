import React, { useDeferredValue, useEffect, useState } from "react";
import PhotosUploader from "../components/PhotosUploader";
import axios from "axios";
import Perks from "../components/Perks";
import AccountNavigation from "../components/AccountNavigation";
import { Navigate, useParams } from "react-router-dom";

const PlacesFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice] = useState(1000);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/place/${id}`).then((response) => {
      const { data } = response;
      setTitle(data.title || "");
      setAddress(data.address || "");
      setPhotos(data.photos || []);
      setDescription(data.description || "");
      setPerks(data.perks || []);
      setExtraInfo(data.extraInfo || "");
      setCheckIn(data.checkIn || "");
      setCheckOut(data.checkOut || "");
      setMaxGuest(data.maxGuest || 1);
      setPrice(data.price || 1000);
    });
  }, [id]);

  function inputHeder(text) {
    return <h2 className="mt-4 text-xl">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-sm text-gray-500 ">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeder(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(e) {
    e.preventDefault();
    const placeData = {
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuest,
      price,
    };

    if (id) {
      await axios.put("/places", {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      //new place
      await axios.post("/places", placeData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNavigation />
      <form onSubmit={savePlace}>
        {preInput("Title", "Title for your place.")}
        <input
          type="text"
          placeholder="title, for example: My love"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {preInput("Address", "")}

        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {preInput("Photos", "More = better")}
        <PhotosUploader photos={photos} onChange={setPhotos} />

        {preInput("Description", "Description of the place")}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {preInput("Perks", " select all the perks of your place")}
        <Perks selected={perks} onChange={setPerks} />

        {preInput("Extra Info", "house rules, etc")}

        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        {preInput(
          "Check in&out times, max guests",
          "add check in and out times, remeber to have some time window for cleaning the room between guests"
        )}

        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1 ">Check in time</h3>
            <input
              type="text"
              placeholder="14:00"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3>Check out time</h3>
            <input
              type="text"
              placeholder="11"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          <div>
            <h3>Max number of guests</h3>
            <input
              type="number"
              value={maxGuest}
              onChange={(e) => setMaxGuest(e.target.value)}
            />
          </div>
          <div>
            <h3>Price per night</h3>
            <input
              type="number"
              placeholder="11"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <button className="my-4 primary">{id ? "Update Place" : "Save"}</button>
      </form>
    </div>
  );
};

export default PlacesFormPage;
