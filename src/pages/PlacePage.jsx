import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllphotos, setShowAllphotos] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/place/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  if (showAllphotos) {
    return (
      <div className="fixed inset-0 min-h-screen overflow-y-auto text-white bg-black abosulte">
        <div className="grid gap-4 p-8 bg-black ">
          <div>
            <h2 className="text-3xl ">Photos of {place.title}</h2>
            <button
              onClick={() => {
                setShowAllphotos(false);
              }}
              className="fixed flex p-2 text-black bg-white rounded-lg shadow-md top-10 right-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
              Close Photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div key={photo}>
                <img
                  className="w-full "
                  src={"http://localhost:4000/uploads/" + photo}
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 py-4 mt-8 -mx-8 bg-gray-100">
      <h1 className="text-2xl ">{place.title}</h1>
      <a
        target="_blank"
        className="block my-2 font-semibold underline "
        href={"https://maps.google.com/?q=" + place.address}
      >
        {place.address}
      </a>

      <div className="relative ">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
          <div>
            {place.photos?.[0] && (
              <div className="">
                <img
                  className="object-cover aspect-square"
                  src={"http://localhost:4000/uploads/" + place.photos[0]}
                />
              </div>
            )}
          </div>
          <div className="grid ">
            {place.photos?.[1] && (
              <img
                className="object-cover aspect-square"
                src={"http://localhost:4000/uploads/" + place.photos[1]}
              />
            )}
            <div className="overflow-hidden ">
              {place.photos?.[2] && (
                <img
                  className="relative object-cover aspect-square top-2"
                  src={"http://localhost:4000/uploads/" + place.photos[2]}
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAllphotos(true)}
          className="absolute flex gap-2 px-3 py-1 bg-white rounded-lg shadow-md bottom-2 right-2 shadow-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          Show more photos
        </button>
      </div>

      <div className="my-4 ">
        <h2 className="text-2xl font-semibold">Description</h2>
        <p>{place.description}</p>
      </div>
    </div>
  );
};

export default PlacePage;
