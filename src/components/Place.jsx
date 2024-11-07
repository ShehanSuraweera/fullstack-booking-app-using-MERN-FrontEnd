import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Place = ({ places, setPlaces }) => {
  return (
    <div className="flex flex-col gap-4 mt-4 text-black">
      {places.length > 0 &&
        places.map((place) => (
          <Link
            to={"/account/place/" + place._id}
            className="flex gap-4 p-4 bg-gray-100 cursor-pointer rounded-2xl"
            key={place}
          >
            <div className="flex w-32 h-32 bg-gray-300 shrink-0">
              {place.photos.length > 0 && (
                <img
                  className="object-cover "
                  src={"http://localhost:4000/uploads/" + place.photos[0]}
                  alt=""
                />
              )}
            </div>
            <div className=" grow-0 shrink">
              <h2 className="text-xl ">{place.title}</h2>
              <p className="mt-2 text-sm">{place.description}</p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Place;
