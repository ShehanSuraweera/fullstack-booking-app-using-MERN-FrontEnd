import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="grid grid-cols-2 mt-8 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/place/" + place._id}>
            <div className="flex mb-2 bg-gray-400 rounded-2xl">
              {place.photos?.[0] && (
                <img
                  className="object-cover rounded-2xl aspect-square"
                  src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                />
              )}
            </div>
            <h2 className="text-sm leading-4 ">{place.title}</h2>
            <h3 className="font-bold ">{place.address}</h3>
            <div className="mt-1">
              <span className="font-bold ">Rs.{place.price} per night</span>
            </div>
          </Link>
        ))}
    </div>
  );
}
